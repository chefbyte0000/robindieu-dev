export function reveal(node: HTMLElement, targetText: string) {
	// Clear the node
	node.textContent = '';
	
	// Split by words for a highly elegant, readable stagger
	const words = targetText.split(' ');

	words.forEach((word, index) => {
		// Wrap each word in a span so we can animate them individually
		const span = document.createElement('span');
		span.textContent = word;
		span.style.display = 'inline-block';
		span.style.opacity = '0';
		span.style.willChange = 'opacity, transform, filter'; // Hint to the GPU

		node.appendChild(span);

		// Maintain natural text wrapping by inserting real spaces between the spans
		if (index < words.length - 1) {
			const space = document.createTextNode(' ');
			node.appendChild(space);
		}

		// The Native Web Animations API (Zero layout thrashing, 100% GPU accelerated)
		span.animate([
			{ 
				opacity: 0, 
				transform: 'translateY(12px) rotateX(-15deg)', 
				filter: 'blur(8px)' 
			},
			{ 
				opacity: 1, 
				transform: 'translateY(0) rotateX(0deg)', 
				filter: 'blur(0px)' 
			}
		], {
			duration: 1200, // Long, luxurious duration
			easing: 'cubic-bezier(0.16, 1, 0.3, 1)', // The "Apple" custom ease-out curve
			delay: index * 120, // Stagger each word by 120ms
			fill: 'forwards'
		});
	});

	return {
		// Re-trigger if the text changes
		update(newText: string) {
			// A simple reload for dynamic text updates, though in your setup it mostly mounts fresh
			node.textContent = '';
			reveal(node, newText); 
		},
		destroy() {}
	};
}