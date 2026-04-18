// src/lib/state/theme.svelte.ts
export type SiteMode = 'saas' | 'local';

class ThemeState {
	mode = $state<SiteMode>('saas');

	constructor() {
		// Run initial update on initialization if browser exists
		if (typeof document !== 'undefined') {
			this.updateDocumentClass();
		}
	}

	toggle() {
		this.setMode(this.mode === 'saas' ? 'local' : 'saas');
	}

	setMode(newMode: SiteMode) {
		this.mode = newMode;
		this.updateDocumentClass();
	}

	private updateDocumentClass() {
		if (typeof document !== 'undefined') {
			document.documentElement.setAttribute('data-mode', this.mode);
			// Also support standard dark mode class for shadcn compatibility if needed
			if (this.mode === 'saas') {
				document.documentElement.classList.add('dark');
			} else {
				document.documentElement.classList.remove('dark');
			}
		}
	}
}

export const themeState = new ThemeState();