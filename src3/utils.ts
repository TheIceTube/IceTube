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
