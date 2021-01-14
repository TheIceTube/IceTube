import { State, GameState } from './state';

// Get state
const GAME: GameState = State();

/**
 * Alternative to `setInterval`, but using request animation frame
 * @param callback Callback that will be executed after delay
 * @param delay Delay before executing
 */
export function requestInterval(callback: () => void, delay: number): (newDelay?: number) => void {
	let start: number = Date.now();
	let passed: number = 0;
	let canceled: boolean = false;

	const loop = () => {
		const current = Date.now();

		// Stop interval if its canceled
		if (canceled) return;

		// If game paused
		if (GAME.paused) {
			start = current;
			window.requestAnimationFrame(loop);
			return
		};

		passed += current - start;
		start = current;
		
		if (passed >= delay) {
			callback();
			passed = 0;
		}
		
		window.requestAnimationFrame(loop);
	}

	
	loop();

	return newDelay => {
		if (newDelay) {
			delay = newDelay;
		} else {
			canceled = true;
		}
	};
}

/**
 * Alternative to `setTimeout`, but using request animation frame
 * @param callback Callback that will be executed after delay
 * @param delay Delay before executing
 */
export function requestTimeout(callback: () => void, delay: number): () => void {
	let start: number = Date.now();
	let passed: number = 0;
	let canceled: boolean = false;

	const loop = () => {
		const current = Date.now();

		// Stop interval if its canceled
		if (canceled) return;

		// If game paused
		if (GAME.paused) {
			start = current;
			window.requestAnimationFrame(loop);
			return
		};

		passed += current - start;
		start = current;
		
		if (passed >= delay) {
			callback();
			return;
		}

		window.requestAnimationFrame(loop);
	}

	loop();

	return () => {
		canceled = true;
	};
}