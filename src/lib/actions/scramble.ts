export function scramble(node: HTMLElement, targetText: string) {
	const chars = 'ABCDEGHJKNOPQRSUVXYZabcdeghknopqrsuvxyz';
	let frameId: number;

	node.textContent = '';
	
	node.style.display = 'inline-grid';
	node.style.gridTemplateAreas = '"stack"';
	
	const ghost = document.createElement('span');
	ghost.style.gridArea = 'stack';
	ghost.style.visibility = 'hidden'; 
	ghost.style.pointerEvents = 'none';

	const display = document.createElement('span');
	display.style.gridArea = 'stack';
	display.style.whiteSpace = 'nowrap'; 

	node.appendChild(ghost);
	node.appendChild(display);

	function animate(text: string) {
		let iteration = 0;
		let frameCount = 0;
		
		ghost.textContent = text;
		let currentScramble = text.split('');

		const loop = () => {
			frameCount++;
			
			if (frameCount % 3 === 0) {
				currentScramble = text.split('').map((char, index) => {
					// THE FIX: If the character is NOT a letter (e.g., a space, period, or comma), 
					// return it immediately so it never scrambles.
					if (!/[a-zA-Z]/.test(char)) return char;
					
					if (index < Math.floor(iteration)) return char; // Locked in
					return chars[Math.floor(Math.random() * chars.length)];
				});
			} else {
				for (let i = 0; i < Math.floor(iteration); i++) {
					currentScramble[i] = text[i];
				}
			}

			display.textContent = currentScramble.join('');

			if (iteration >= text.length) {
				display.textContent = text; 
				cancelAnimationFrame(frameId);
				return;
			}

			iteration += 0.3; 
			frameId = requestAnimationFrame(loop);
		};

		cancelAnimationFrame(frameId);
		frameId = requestAnimationFrame(loop);
	}

	animate(targetText);

	return {
		update(newText: string) {
			animate(newText);
		},
		destroy() {
			cancelAnimationFrame(frameId);
		}
	};
}