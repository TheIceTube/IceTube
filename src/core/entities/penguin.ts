import { State, GameState } from '../state';
import { convertRange, lerp, loadImage, randomInteger } from '../utils';

// Sprites
import spriteLeft from '../../sprites/penguin-left.png';
import spriteRight from '../../sprites/penguin-right.png';
import { threadId } from 'worker_threads';

// Preload images
const penguinLeft = loadImage(spriteLeft);
const penguinRight = loadImage(spriteRight);

// Global game state
const GAME: GameState = State<GameState>();

export class Penguin {
	public readonly type = 'penguin';
	public readonly spriteHeight = 92;
    public readonly spriteWidth = 92;
    
	public exists: boolean;

	public state: 'spawning' | 'walking' | 'leaving';
	public direction: 'left' | 'right';

	public frame: number;
	public x: number;
	public y: number;

	public width: number;
	public height: number;

	constructor(x: number, y: number) {
		this.x = x;
		this.y = y;

		this.state = 'spawning';
		this.frame = randomInteger(0, 20);
		this.direction = randomInteger(0, 1) ? 'left' : 'right';

		this.width = this.spriteWidth;
        this.height = 0;
        this.exists = true;
	}

	/**
	 * Draw penguin
	 */
	public draw(): void {
		const sprite = this.direction === 'left' ? penguinLeft : penguinRight;
		const size = convertRange(this.y, { min: 0, max: GAME.element.height }, { min: 0, max: 2 });
		const posY = convertRange(this.y, { min: 0, max: GAME.element.height }, { min: GAME.element.height / 5, max: GAME.element.height });

		// Skip drawing if its reversed
		if (size < 0) return;

		GAME.ctx.save();
		GAME.ctx.translate(this.x, posY);
		GAME.ctx.scale(size, size);

		GAME.ctx.drawImage(sprite, -(this.width / 2), -this.height + 18, this.width, this.height);
		GAME.ctx.restore();
	}

	/**
	 * Update penguin state
	 */
	public update(): void {
		const width: number = GAME.element.width;
		const height: number = GAME.element.height;

		// Update frame
		this.frame += 1;
		if (this.frame > 20) this.frame = 0;

		// If walking
		if (this.state === 'walking') {
			this.height = this.frame >= 10 ? lerp(this.height, this.spriteHeight - 24, 0.3) : lerp(this.height, this.spriteHeight + 4, 0.3);

			if (this.direction === 'left') {
				this.x -= convertRange(this.y, { min: 0, max: height }, { min: 0, max: 2 });
				if (this.x <= -this.width) this.x = width + this.width;
			} else {
				this.x += convertRange(this.y, { min: 0, max: height }, { min: 0, max: 2 });
				if (this.x >= width + this.width) this.x = -this.width;
			}

			if (this.x <= -100) this.x = width;
		}

		// Spawning penguin
		if (this.state === 'spawning') {
			this.height = lerp(this.height, this.spriteHeight, 0.1) + 0.1;
			if (this.height >= this.spriteHeight) this.state = 'walking';
		}

		// Removing penguin
		if (this.state === 'leaving') {
            this.height = lerp(this.height, 0, 0.1) - 0.05;
            if (this.height <= 0) this.exists = false;
		}
	}
}
