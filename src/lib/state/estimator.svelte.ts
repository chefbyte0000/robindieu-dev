import { themeState } from '$lib/state/theme.svelte';

export type EstimatorItem = {
	id: string;
	label: string;
	complexity: number;
	days: number;
};

export type EstimatorConfig = {
	bases: EstimatorItem[];
	powerUps: EstimatorItem[];
	polish: EstimatorItem[];
};

// --- DATA DICTIONARIES ---

const saasConfig: EstimatorConfig = {
	bases: [
		{ id: 'saas_mvp', label: 'MVP Core', complexity: 20, days: 14 },
		{ id: 'saas_dash', label: 'Dashboard App', complexity: 35, days: 21 },
		{ id: 'saas_internal', label: 'Internal Tool', complexity: 25, days: 18 }
	],
	powerUps: [
		{ id: 'pu_sso', label: 'Enterprise SSO', complexity: 15, days: 7 },
		{ id: 'pu_stripe', label: 'Stripe Billing', complexity: 20, days: 10 },
		{ id: 'pu_ws', label: 'Real-time WebSockets', complexity: 30, days: 14 },
		{ id: 'pu_ai', label: 'LLM / AI Integration', complexity: 40, days: 14 }
	],
	polish: [
		{ id: 'pol_std', label: 'Standard UI', complexity: 5, days: 3 },
		{ id: 'pol_custom', label: 'Custom Interactive Visuals', complexity: 25, days: 14 }
	]
};

const localConfig: EstimatorConfig = {
	bases: [
		{ id: 'loc_store', label: 'Storefront', complexity: 10, days: 7 },
		{ id: 'loc_service', label: 'Service Landing', complexity: 15, days: 10 }
	],
	powerUps: [
		{ id: 'pu_seo', label: 'SEO Booster', complexity: 10, days: 5 },
		{ id: 'pu_maps', label: 'Google Maps Sync', complexity: 15, days: 5 },
		{ id: 'pu_reviews', label: 'Review Importer', complexity: 15, days: 7 }
	],
	polish: [
		{ id: 'pol_clean', label: 'Clean & Professional', complexity: 5, days: 3 },
		{ id: 'pol_lux', label: 'High-End Luxury', complexity: 20, days: 10 }
	]
};

// --- THE STATE ENGINE ---

class EstimatorState {
	// Deeply reactive state via Svelte 5 Runes
	selectedBase = $state<string | null>(null);
	selectedPowerUps = $state<string[]>([]);
	selectedPolish = $state<string | null>(null);

    email = $state('');
	isSubmitted = $state(false);

	// Dynamically swap available options based on the global Dual-Soul toggle
	get config() {
		return themeState.mode === 'saas' ? saasConfig : localConfig;
	}

	// Svelte 5 automatically caches and derives getters that read $state!
	get complexityScore() {
		let score = 0;
		const cfg = this.config;
		
		const base = cfg.bases.find((b) => b.id === this.selectedBase);
		if (base) score += base.complexity;

		this.selectedPowerUps.forEach((id) => {
			const pu = cfg.powerUps.find((p) => p.id === id);
			if (pu) score += pu.complexity;
		});

		const polish = cfg.polish.find((p) => p.id === this.selectedPolish);
		if (polish) score += polish.complexity;

		return score;
	}

	get timelineDays() {
		let days = 0;
		const cfg = this.config;
		
		const base = cfg.bases.find((b) => b.id === this.selectedBase);
		if (base) days += base.days;

		this.selectedPowerUps.forEach((id) => {
			const pu = cfg.powerUps.find((p) => p.id === id);
			if (pu) days += pu.days;
		});

		const polish = cfg.polish.find((p) => p.id === this.selectedPolish);
		if (polish) days += polish.days;

		return days;
	}

	// --- MUTATIONS ---

	togglePowerUp(id: string) {
		if (this.selectedPowerUps.includes(id)) {
			// Remove
			this.selectedPowerUps = this.selectedPowerUps.filter((pId) => pId !== id);
		} else {
			// Add
			this.selectedPowerUps = [...this.selectedPowerUps, id];
		}
	}

	setBase(id: string) {
		this.selectedBase = id;
	}

	setPolish(id: string) {
		this.selectedPolish = id;
	}
    
    submitBlueprint(clientEmail: string) {
		this.email = clientEmail;
		this.isSubmitted = true;
		
		// In production, this is where you trigger your Vercel API endpoint 
		// to save the lead to Turso and trigger the Resend email sequence!
		// fetch('/api/leads', { method: 'POST', body: JSON.stringify({ email: this.email, score: this.complexityScore, ... }) })
	}

	// Update your reset function to clear the new state
	reset() {
		this.selectedBase = null;
		this.selectedPowerUps = [];
		this.selectedPolish = null;
		this.email = '';
		this.isSubmitted = false;
	}
}

// Export the singleton
export const estimatorState = new EstimatorState();