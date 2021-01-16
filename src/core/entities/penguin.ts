import { Fish } from './fish';  

import { State, GameState } from '../state';
import { convertRange, lerp, loadImage, randomInteger } from '../utils';

// Sprites
import penguinLeftImage from '../../sprites/penguin-left.png';
import penguinRightImage from '../../sprites/penguin-right.png';
import angryPenguinLeftImage from '../../sprites/penguin-left-angry.png';
import anrgyPenguinRightImage from '../../sprites/penguin-right-angry.png';
import boredPenguinLeftImage from '../../sprites/penguin-left-bored.png';
import boredPenguinRightImage from '../../sprites/penguin-right-bored.png';

import junkieLeftImage from '../../sprites/junkie-left.png';
import junkieRightImage from '../../sprites/junkie-right.png';


// Preload images
const penguinLeft = loadImage(penguinLeftImage);
const penguinRight = loadImage(penguinRightImage);
const angryPenguinLeft = loadImage(angryPenguinLeftImage);
const angryPenguinRight = loadImage(anrgyPenguinRightImage);
const boredPenguinLeft = loadImage(boredPenguinLeftImage);
const boredPenguinRight = loadImage(boredPenguinRightImage);
const junkieLeft = loadImage(junkieLeftImage);
const junkieRight = loadImage(junkieRightImage);

// Global game state
const GAME: GameState = State();

export class Penguin {
	public readonly type = 'penguin';
	public readonly spriteHeight = 92;
	public readonly spriteWidth = 92;
	
	public state: 'spawning' | 'walking' | 'leaving';
	public direction: 'left' | 'right';
	public exists: boolean;

	public mood: 'normal' | 'bored' | 'angry';
	
	public emotionFrame: number;
	public spawnFrame: number;
	public frame: number;
	public x: number;
	public y: number;

	public width: number;
	public height: number;

	constructor(x: number, y: number) {
		this.x = x;
		this.y = y;
		
		this.mood = 'normal';
		
		this.state = 'spawning';
		this.frame = randomInteger(0, 20);
		this.direction = randomInteger(0, 1) ? 'left' : 'right';
		
		this.width = this.spriteWidth / 2;
		this.height = 0;
		this.exists = true;
		
		this.emotionFrame = 0;
		this.spawnFrame = randomInteger(0, 200);
	}

	/**
	 * Set penguin mood
	 * @param mood Mood of the penguin
	 */
	public setMood(mood: 'angry' | 'bored'): void {
		this.mood = mood;
		this.emotionFrame = mood === 'angry' ? randomInteger(200, 400) : randomInteger(150, 300);
	}

	/**
	 * Remove penguin from stage
	 */
	public despawn(): void {
		this.state = 'leaving';
	}

	/**
	 * Draw penguin
	 */
	public draw(): void {
		const ctx = GAME.ctx;

		if (!GAME.started) return;

		// Remove if its unmounted
		if (!this.exists) return;

		let sprite = this.direction === 'left' ? penguinLeft : penguinRight;
		const size = convertRange(this.y, { min: 0, max: GAME.element.height }, { min: 0, max: 2 });
		const posY = convertRange(this.y, { min: 0, max: GAME.element.height }, { min: GAME.element.height / 5, max: GAME.element.height });

		// Bored sprite
		if (this.mood === 'bored') {
			sprite = this.direction === 'left' ? boredPenguinLeft : boredPenguinRight;
		}
		
		// Angry sprite
		if (this.mood === 'angry') {
			sprite = this.direction === 'left' ? angryPenguinLeft : angryPenguinRight;
		}
		
		// Skip drawing if its reversed
		if (size < 0) return;

		// Junkie mode
		if ((window as any).junkie === true) sprite = this.direction === 'left' ? junkieLeft : junkieRight;

		ctx.save();
		ctx.translate(this.x, posY);
		ctx.scale(size, size);
		ctx.drawImage(sprite, -(this.width / 2), -this.height + 18, this.width, this.height);
		ctx.restore();		
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

		// Spawn fish
		if (this.spawnFrame === 100 && this.state === 'walking' && this.mood === 'normal') {
			const fish = new Fish(this.x, this.y - 1);
			GAME.entities.push(fish);
		}

		// Update emotion frame
		if (this.mood !== 'normal') {
			this.emotionFrame -= 1;
			if (this.emotionFrame <= 0) {
				this.emotionFrame = 0;
				this.mood = 'normal';
			}
		}

		// Update frame
		this.frame += 1;
		if (this.frame > 20) this.frame = 0;

		// Update spawn frame
		this.spawnFrame += 1;
		if (this.spawnFrame > 100) {
			this.spawnFrame = 0;
		}

		// If walking
		if (this.state === 'walking') {
			this.height = this.frame >= 10 ? lerp(this.height, this.spriteHeight - 24, 0.3) : lerp(this.height, this.spriteHeight + 4, 0.3);
			this.width = this.frame >= 10 ? lerp(this.width, this.spriteWidth + 16, 0.2) : lerp(this.width, this.spriteWidth - 4, 0.2);

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
			this.width = lerp(this.width, 0, 0.05);
			this.height = lerp(this.height, 0, 0.1) - 0.05;
			if (this.height <= 10) this.exists = false;
		}
	}
}
