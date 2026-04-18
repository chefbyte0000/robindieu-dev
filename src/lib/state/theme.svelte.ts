import { estimatorState } from '$lib/state/estimator.svelte';
export type SiteMode = 'saas' | 'local';

class ThemeState {
	mode = $state<SiteMode>('saas');

	constructor() {
		if (typeof document !== 'undefined') {
			this.updateDocumentClass();
		}
	}

	// Now accepts an optional MouseEvent to originate the bleed animation
	toggle(event?: MouseEvent) {
		const nextMode = this.mode === 'saas' ? 'local' : 'saas';
		
		if (!event || !document.startViewTransition) {
			this.setMode(nextMode);
			return;
		}

		// Calculate the exact click coordinates for the origin point
		const x = event.clientX;
		const y = event.clientY;
		const endRadius = Math.hypot(
			Math.max(x, window.innerWidth - x),
			Math.max(y, window.innerHeight - y)
		);

		const transition = document.startViewTransition(() => {
			this.setMode(nextMode);
		});

		// Apply the circular clip-path animation natively
		transition.ready.then(() => {
			const clipPath = [
				`circle(0px at ${x}px ${y}px)`,
				`circle(${endRadius}px at ${x}px ${y}px)`
			];
			document.documentElement.animate(
				{
					clipPath: this.mode === 'local' ? clipPath : [...clipPath].reverse(),
				},
				{
					duration: 600,
					easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
					pseudoElement: this.mode === 'local' 
						? '::view-transition-new(root)' 
						: '::view-transition-old(root)',
				}
			);
		});
	}

	setMode(newMode: SiteMode) {
		this.mode = newMode;
		this.updateDocumentClass();
		
		// Wipe the estimator canvas clean when shifting realities
		if (typeof estimatorState !== 'undefined') {
			estimatorState.reset();
		}
	}

	private updateDocumentClass() {
		if (typeof document !== 'undefined') {
			document.documentElement.setAttribute('data-mode', this.mode);
			if (this.mode === 'saas') {
				document.documentElement.classList.add('dark');
			} else {
				document.documentElement.classList.remove('dark');
			}
		}
	}
}

export const themeState = new ThemeState();