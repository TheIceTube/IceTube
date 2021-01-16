import { State, GameState } from '../state';
import { requestTimeout } from '../timers';
import { convertRange, loadImage, lerp } from '../utils';

// Sprites
import fishImage from '../../sprites/fish-shadow.png';

// Sounds
import { playPopSound } from '../audio';

// Preload images
const fish = loadImage(fishImage);

// Global game state
const GAME: GameState = State();

// Element
const fishCounter = document.getElementById('fish');

export class Fish {
	public readonly type = 'fish';
	public readonly spriteHeight = 92;
	public readonly spriteWidth = 92;

	public collected: boolean;

	public exists: boolean;
	public frame: number;

	public y: number;
	public x: number;

	public width: number;
	public height: number;

	public spawnY: number;

	/**
	 * Billboard initialization
	 */
	constructor(x: number, y: number) {
		this.x = x;
		this.y = y;
		this.spawnY = y;
		this.frame = 0;
		this.exists = true;
		this.collected = false;
		this.width = this.spriteWidth / 4;
		this.height = this.spriteHeight / 4;

		if (this.x < 128) this.x = 128;
		if (this.x > GAME.element.width - 128) this.x = GAME.element.width - 128;
	}

	/**
	 * Draw sprite on canvas
	 */
	public draw(): void {
		const ctx = GAME.ctx;

		if (this.exists === false) return;

		const size = convertRange(this.spawnY, { min: 0, max: GAME.element.height }, { min: 0, max: 2 });
		const posY: number = convertRange(
			this.y,
			{ min: 0, max: GAME.element.height },
			{ min: GAME.element.height / 5, max: GAME.element.height }
		);

		ctx.save();
		ctx.translate(this.x, posY);
		ctx.scale(size, size);
		ctx.drawImage(fish, -(this.width / 2), -(this.height / 2), this.width, this.height);
		ctx.restore();
	}

	/**
	 * Update billboard state
	 */
	public update(): void {
		if (this.exists === false) return;

		// Next frame
		this.frame += 1;

		// If not collected
		if (!this.collected) {

			// Spawn animation
			if (this.frame < 50) {
				const posY: number = convertRange(
					this.spawnY - 512,
					{ min: 0, max: GAME.element.height },
					{ min: GAME.element.height / 5, max: GAME.element.height }
				);
				this.y = lerp(this.y, posY, 0.05);
				this.width = lerp(this.width, this.spriteWidth, 0.05);
				this.height = lerp(this.height, this.spriteHeight, 0.05);
			}

			// Despawn
			if (this.frame > 150) {
				this.width = lerp(this.width, 0, 0.2);
				this.height = lerp(this.height, 0, 0.2);
				if (this.width < 16) this.exists = false;
				return;
			}

			// Check mouse collision
			if (GAME.mouseX <= this.x + 48 && GAME.mouseX >= this.x - 48) {
				this.collected = true;
				playPopSound();
			} else {
				return;
			}
		}

		// Size animation
		if (this.y < 64) {
			this.width = lerp(this.width, 0, 0.1);
			this.height = lerp(this.height, 0, 0.1);
		}

		// Change position
		const posX = GAME.element.width / 2;
		const posY = 0 - GAME.element.height / 5;
		this.x = lerp(this.x, posX, 0.1);
		this.y = lerp(this.y, posY, 0.1);

		// Counter animation
		if (this.width < 8) {
			this.exists = false;
			GAME.fish += 1;

			// Counter animation
			fishCounter.className = 'added';
			requestTimeout(() => {
				fishCounter.className = '';
			}, 10);
		}
	}
}
