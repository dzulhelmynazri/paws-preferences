import { useEffect, useState } from "react";
import { useWindowSize } from "react-use";

interface UseConfettiOptions {
	/**
	 * Whether to show the confetti
	 */
	trigger: boolean;
	/**
	 * Delay in milliseconds before showing confetti (default: 300)
	 */
	showDelay?: number;
	/**
	 * Duration in milliseconds before hiding confetti (default: 5000)
	 */
	duration?: number;
}

interface UseConfettiReturn {
	/**
	 * Whether confetti should be displayed
	 */
	showConfetti: boolean;
	/**
	 * Window dimensions for confetti rendering
	 */
	windowDimensions: {
		width: number;
		height: number;
	};
}

/**
 * Custom hook to manage confetti animation
 * @param options Configuration options
 * @returns Confetti state and window dimensions
 */
export function useConfetti({
	trigger,
	showDelay = 300,
	duration = 5000,
}: UseConfettiOptions): UseConfettiReturn {
	const { width, height } = useWindowSize();
	const [showConfetti, setShowConfetti] = useState(false);

	useEffect(() => {
		if (trigger) {
			const showTimer = setTimeout(() => setShowConfetti(true), showDelay);
			const hideTimer = setTimeout(
				() => setShowConfetti(false),
				showDelay + duration
			);

			return () => {
				clearTimeout(showTimer);
				clearTimeout(hideTimer);
			};
		} else {
			requestAnimationFrame(() => setShowConfetti(false));
		}
	}, [trigger, showDelay, duration]);

	return {
		showConfetti,
		windowDimensions: { width, height },
	};
}
