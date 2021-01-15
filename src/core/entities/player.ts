import { State, GameState } from '../state';
import { convertRange, loadImage, lerp } from '../utils';

// Sprites
import stoneImage from '../../sprites/stone.png';
import penguinAnthenaImage from '../../sprites/penguin-anthena.png';
import mainPenguinImage from '../../sprites/main-penguin.png';
import mainPenguinLoudspeakerImage from '../../sprites/main-penguin-loudspeaker.png';

// Sounds
import { playSpeachSound } from '../audio';

// Preload images
const stone = loadImage(stoneImage);
const anthenaPenguin = loadImage(penguinAnthenaImage);
const mainPenguin = loadImage(mainPenguinImage);
const mainPenguinLoudspeaker = loadImage(mainPenguinLoudspeakerImage);

// Global game state
const GAME: GameState = State();

export class Player {
	public readonly type = 'player';
	public readonly stoneSpriteHeight = 400;
	public readonly stoneSpriteWidth = 400;
	public readonly penguinSpriteHeight = 98;
	public readonly penguinSpriteWidth = 98;
	public readonly penguinOffsetX = 48;
	public readonly penguinOffsetY = -50;

	public readonly anthenaPenguinSpriteHeight = 98;
	public readonly anthenaPenguinSpriteWidth = 98;
	public readonly anthenaPenguinOffsetX = 85;
	public readonly anthenaPenguinOffsetY = -232;

	public state: 'idle' | 'speaking';
	public frame: number;
	public speakFrame: number;
    public anthenaFrame: number;

	public exists: boolean;
	public x: number;
	public y: number;
	public width: number;
	public height: number;

	public anthenaWidth: number;
	public anthenaHeight: number;

	/**
	 * Player initialization
	 */
	constructor() {
		this.x = GAME.element.width / 2;
		this.y = GAME.element.height / 1.75;
		this.width = this.penguinSpriteWidth;
		this.height = this.penguinSpriteHeight;
		this.exists = true;
		this.frame = 0;
		this.speakFrame = 0;
        this.state = 'idle';
        this.anthenaFrame = 0;
		this.anthenaWidth = this.anthenaPenguinSpriteWidth;
		this.anthenaHeight = this.anthenaPenguinSpriteHeight;
	}

	/**
	 * Draw sprite on canvas
	 */
	public draw(): void {
		const ctx = GAME.ctx;

		const size = convertRange(this.y, { min: 0, max: GAME.element.height }, { min: 0, max: 2 });
		const posY = convertRange(this.y, { min: 0, max: GAME.element.height }, { min: GAME.element.height / 5, max: GAME.element.height });
		const sprite = this.state === 'speaking' ? mainPenguinLoudspeaker : mainPenguin;

		ctx.save();
		ctx.translate(this.x, posY);
		ctx.scale(size, size);
		ctx.drawImage(stone, -(this.stoneSpriteWidth / 2), -this.stoneSpriteHeight + 48, this.stoneSpriteWidth, this.stoneSpriteHeight);

		ctx.drawImage(
			anthenaPenguin,
			-(this.anthenaWidth / 2) + this.anthenaPenguinOffsetX,
			-(this.anthenaHeight + 16) + this.anthenaPenguinOffsetY,
			this.anthenaWidth,
			this.anthenaHeight
		);

		ctx.drawImage(sprite, -(this.width / 2) + this.penguinOffsetX, -(this.height + 16) + this.penguinOffsetY, this.width, this.height);
		ctx.restore();
	}

	/**
	 * Update player state
	 */
	public update(): void {
		this.x = Math.floor(GAME.element.width / 2);
		this.y = Math.floor(GAME.element.height / 1.75);

		// Frame update
		this.frame += 1;
		if (this.frame > 100) {
			this.frame = 0;
        }

        // Athena character frame update
		this.anthenaFrame += 1;
		if (this.anthenaFrame > 60) {
			this.anthenaFrame = 0;
        }

        // Anthena character
        if (this.anthenaFrame > 30) {
            this.anthenaHeight = lerp(this.anthenaHeight, this.anthenaPenguinSpriteHeight - 16, 0.1);
            this.anthenaWidth = lerp(this.anthenaWidth, this.anthenaPenguinSpriteWidth + 16, 0.1);
        } else {
            this.anthenaHeight = lerp(this.anthenaHeight, this.anthenaPenguinSpriteHeight, 0.1);
            this.anthenaWidth = lerp(this.anthenaWidth, this.anthenaPenguinSpriteWidth, 0.1);
        }

		// Idle state
		if (this.state === 'idle') {
			if (this.frame > 50) {
				this.height = lerp(this.height, this.penguinSpriteHeight, 0.05);
				this.width = lerp(this.width, this.penguinSpriteWidth, 0.05);
			} else {
				this.height = lerp(this.height, this.penguinSpriteHeight - 16, 0.05);
				this.width = lerp(this.width, this.penguinSpriteWidth + 8, 0.05);
			}
		}

		// Speaking animation
		if (this.state === 'speaking') {
			this.frame += 8;
			this.speakFrame += 1;

            if (this.speakFrame === 1) playSpeachSound();
            
			if (this.frame > 50) {
				this.height = lerp(this.height, this.penguinSpriteHeight + 16, 0.1);
				this.width = lerp(this.width, this.penguinSpriteWidth - 8, 0.1);
			} else {
				this.height = lerp(this.height, this.penguinSpriteHeight - 32, 0.1);
				this.width = lerp(this.width, this.penguinSpriteWidth + 16, 0.1);
			}
		}

		// Stop speaking after some frames
		if (this.speakFrame > 100) {
			this.speakFrame = 0;
			this.state = 'idle';
		}
	}
}
