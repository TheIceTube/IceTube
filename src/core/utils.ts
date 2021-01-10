/**
 * Linear interpolation function
 * @param v0 Range start
 * @param v1 Range end
 * @param t Position in range ( from 0 to 1 )
 */
export function lerp(v0: number, v1: number, t: number): number {
	return v0 * (1 - t) + v1 * t;
}

/**
 * Load image
 * @param src Image path
 */
export function loadImage(src: string): HTMLImageElement {
	const image = new Image();
	image.src = src;
	return image;
}

/**
 * Preload image
 * @param src Image path
 */
export function preloadImage(src: string): Promise<HTMLImageElement> {
	return new Promise((resolve, reject) => {
		const image = new Image();
		image.onload = () => resolve(image);
		image.src = src;
	});
}

/**
 * Sort objects by field
 * @param array Array to sort
 * @param field To sort by
 */
export function insertionSort(array: object[], field: string): object[] {
	for (let i = 0; i < array.length; i++) {
		const value = array[i];

		for (var j = i - 1; j > -1 && array[j][field] > value[field]; j--) {
			array[j + 1] = array[j];
		}

		array[j + 1] = value;
	}

	return array;
}

/**
 * Generate random integer
 * @param min Minimal
 * @param max Maximal
 */
export function randomInteger(min: number, max: number): number {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Convert value from one range to another
 * @param {Number} value value to convert
 * @param {Object} oldRange min, max of values range
 * @param {Object} newRange min, max of desired range
 * @return {Number} value converted to other range
 */
export function convertRange(value: number, oldRange: { min: number; max: number }, newRange: { min: number; max: number }) {
	return ((value - oldRange.min) * (newRange.max - newRange.min)) / (oldRange.max - oldRange.min) + newRange.min;
}

/**
 * Shuffle array
 * Taken from https://stackoverflow.com/a/2450976/7442791
 * @param array Array to shuffle
 */
export function shuffle(array: any[]): any[] {
	let currentIndex: number = array.length;
	let temporaryValue: number;
	let randomIndex: number;

	while (0 !== currentIndex) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}

	return array;
}

/**
 * Get index of random value from array.
 * @param array Array to take from.
 */
export function randomFromArray(array: any[]): number {
	return Math.floor(Math.random() * array.length);
}

/**
 * Alternative to `setInterval`, but using request animation frame
 * @param callback Callback that will be executed after delay
 * @param delay Delay before executing
 */
export function requestInterval(callback: () => void, delay: number): (number?: number) => void {
	let start = Date.now();
	let canceled = false;

	function loop() {
		if (canceled) return;

		let current = Date.now();
		let delta = current - start;

		if (delta >= delay) {
			callback();
			start = Date.now();
		}

		window.requestAnimationFrame(loop);
	}

	loop();

	return (number) => {
		if (number) {
			delay = number;
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
	let start = Date.now();
	let canceled = false;

	function loop() {
		if (canceled) return;

		let current = Date.now();
		let delta = current - start;

		if (delta >= delay) {
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

/**
 * Add commas to number
 * @param number Number to add commas to
 */
export function numberWithCommas(num: number): string {
	return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

/**
 * Calculate average value of all numbers
 * @param nums Array of number
 * @param floor Round returned value
 */
export function average(nums: number[], floor: boolean = true): number {
	const result: number = nums.reduce((a, b) => a + b, 0) / nums.length;
	return floor ? Math.floor(result) : result;
}
