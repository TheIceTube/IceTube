import { State, GameState } from '../state';
import { convertRange, lerp, loadImage, randomInteger } from '../utils';

// Sprites
import spriteLeft from '../../sprites/penguin-left.png';
import spriteRight from '../../sprites/penguin-right.png';

// Preload images
const penguinLeft = loadImage(spriteLeft);
const penguinRight = loadImage(spriteRight);

// Global game state
const GAME: GameState = State();

export class Penguin {
	public readonly type = 'penguin';
	public readonly spriteHeight = 92;
	public readonly spriteWidth = 92;

	public involvement: number;
	public exists: boolean;
	
	public state: 'spawning' | 'walking' | 'leaving';
	public direction: 'left' | 'right';
	
	public frame: number;
	public x: number;
	public y: number;
	public visible: boolean;

	public width: number;
	public height: number;

	constructor(x: number, y: number) {
		this.x = x;
		this.y = y;
		this.visible = (GAME.optimize === false);

		this.state = 'spawning';
		this.frame = randomInteger(0, 20);
		this.direction = randomInteger(0, 1) ? 'left' : 'right';

		this.width = this.spriteWidth / 2;
		this.height = 0;
		this.exists = true;
		this.involvement = randomInteger(75, 125);
	}

	/**
	 * Draw penguin
	 */
	public draw(): void {
		const ctx = GAME.ctx;

		// Remove if its unmounted
		if (!this.exists || !this.visible) return;

		if (!GAME.started) return;

		const sprite = this.direction === 'left' ? penguinLeft : penguinRight;
		const size = convertRange(this.y, { min: 0, max: GAME.element.height }, { min: 0, max: 2 });
		const posY = convertRange(this.y, { min: 0, max: GAME.element.height }, { min: GAME.element.height / 5, max: GAME.element.height });

		// Skip drawing if its reversed
		if (size < 0) return;

		ctx.save();
		ctx.translate(this.x, posY);
		ctx.scale(size, size);

		ctx.drawImage(sprite, -(this.width / 2), -this.height + 18, this.width, this.height);
		ctx.restore();
		
        // ctx.font = '16px Segoe UI';
        // ctx.textAlign = 'center';
        // ctx.fillText(this.involvement.toFixed(2), this.x, posY);
	}

	/**
	 * Update penguin state
	 */
	public update(): void {
		const width: number = GAME.element.width;
		const height: number = GAME.element.height;

		if (!GAME.started) return;

		// Remove if its unmounted
		if (!this.exists) return;

		// Lower involvement
		this.involvement -= 0.05;

		// Lower involvement one more time
		if (GAME.relevance <= 0.5) this.involvement -= 0.05;
		
		// 
		if (GAME.relevance >= 1) this.involvement += 0.02;

		// If penguin is not involved
		if (this.involvement <= 0) {
			if (!this.visible) {
				this.exists = false;
				return;
			}

			if (GAME.optimize) {
				const hiddenPenguin = GAME.entities.find(entity => {
					return entity.type === 'penguin' && entity.involvement > 0 && entity.visible === false;
				}) as Penguin;

				if (hiddenPenguin) {
					this.involvement = hiddenPenguin.involvement;
					hiddenPenguin.involvement = 0;
					hiddenPenguin.exists = false;
					return;
				} else {
					this.state = 'leaving';
				}
			} else {
				this.state = 'leaving';
			}
		}

		// Dont update visibility parameters
		if (!this.visible) return;

		// Update frame
		this.frame += 1;
		if (this.frame > 20) this.frame = 0;

		// Add views
		if (this.frame === 0) GAME.views += 10;

		// If walking
		if (this.state === 'walking') {
			this.height = this.frame >= 10 ? lerp(this.height, this.spriteHeight - 24, 0.2) : lerp(this.height, this.spriteHeight + 4, 0.2);

			if (this.direction === 'left') {
				this.x -= convertRange(this.y, { min: 0, max: height }, { min: 0, max: 2 });
				if (this.x <= -this.width) this.x = width + this.width;
			} else {
				this.x += convertRange(this.y, { min: 0, max: height }, { min: 0, max: 2 });
				if (this.x >= width + this.width) this.x = -this.width;
			}
		}

		// Spawning penguin
		if (this.state === 'spawning') {
			this.width = lerp(this.width, this.spriteWidth, 0.1);
			this.height = lerp(this.height, this.spriteHeight, 0.1) + 0.1;
			if (this.height >= this.spriteHeight) {
				this.state = 'walking';
				this.width = this.spriteWidth;
				this.height = this.spriteHeight;
			}
		}

		// Removing penguin
		if (this.state === 'leaving') {
			this.width = lerp(this.width, 0, 0.1);
			this.height = lerp(this.height, 0, 0.1) - 0.1;
			if (this.height <= 10) this.exists = false;
		}
	}
}
