import { State, GameState } from '../state';
import { convertRange, loadImage, lerp } from '../utils';

/// @ts-ignore
import stoneImage from '../../sprites/stone.png';
/// @ts-ignore
import penguinAnthenaImage from '../../sprites/penguin-anthena.png';
/// @ts-ignore
import penguinLoudspeakerImage from '../../sprites/penguin-loudspeaker.png';
/// @ts-ignore
import penguinLoudspeakerSpeakImage from '../../sprites/penguin-loudspeaker-speak.png';
/// @ts-ignore
import junkieLeftImage from '../../sprites/junkie-left.png';
/// @ts-ignore
import junkieRightImage from '../../sprites/junkie-right.png';

// Sounds
import { playSpeachSound } from '../audio';

// Preload images
const stone = loadImage(stoneImage);
let anthenaPenguin = loadImage(penguinAnthenaImage);
const penguinLoudspeaker = loadImage(penguinLoudspeakerImage);
const penguinLoudspeakerSpeak = loadImage(penguinLoudspeakerSpeakImage);
const junkieLeft = loadImage(junkieLeftImage);
const junkieRight = loadImage(junkieRightImage);

// Global game state
const GAME: GameState = State();

export class Characters {
	public readonly type = 'characters';

	public readonly stoneSpriteHeight = 400;
	public readonly stoneSpriteWidth = 400;

	public readonly penguinLoudspeakerSpriteHeight = 98;
	public readonly penguinLoudspeakerSpriteWidth = 98;
	public readonly penguinLoudspeakerOffsetX = 48;
	public readonly penguinLoudspeakerOffsetY = -50;

	public readonly penguinAnthenaSpriteHeight = 98;
	public readonly penguinAnthenaSpriteWidth = 98;
	public readonly penguinAnthenaOffsetX = 85;
	public readonly penguinAnthenaOffsetY = -232;

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
	 * Characters initialization
	 */
	constructor() {
		this.x = GAME.element.width / 2;
		this.y = GAME.element.height / 1.75;
		this.width = this.penguinLoudspeakerSpriteWidth;
		this.height = this.penguinLoudspeakerSpriteHeight;
		this.exists = true;
		this.frame = 0;
		this.speakFrame = 0;
		this.state = 'idle';
		this.anthenaFrame = 0;
		this.anthenaWidth = this.penguinAnthenaSpriteWidth;
		this.anthenaHeight = this.penguinAnthenaSpriteHeight;
	}

	/**
	 * Draw sprite on canvas
	 */
	public draw(): void {
		const ctx = GAME.ctx;

		const size = convertRange(this.y, { min: 0, max: GAME.element.height }, { min: 0, max: 2 });
		const posY = convertRange(this.y, { min: 0, max: GAME.element.height }, { min: GAME.element.height / 5, max: GAME.element.height });
		let loudspeakerSprite = this.state === 'speaking' ? penguinLoudspeakerSpeak : penguinLoudspeaker;
		
		// Junkie mode
		if ((window as any).junkie === true) {
			loudspeakerSprite = junkieLeft;
			anthenaPenguin = junkieRight;
		}

		ctx.save();
		ctx.translate(this.x, posY);
		ctx.scale(size, size);
		ctx.drawImage(stone, -(this.stoneSpriteWidth / 2), -this.stoneSpriteHeight + 48, this.stoneSpriteWidth, this.stoneSpriteHeight);

		ctx.drawImage(
			anthenaPenguin,
			-(this.anthenaWidth / 2) + this.penguinAnthenaOffsetX,
			-(this.anthenaHeight + 16) + this.penguinAnthenaOffsetY,
			this.anthenaWidth,
			this.anthenaHeight
		);

		ctx.drawImage(
			loudspeakerSprite,
			-(this.width / 2) + this.penguinLoudspeakerOffsetX,
			-(this.height + 16) + this.penguinLoudspeakerOffsetY,
			this.width,
			this.height
		);

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
			this.anthenaHeight = lerp(this.anthenaHeight, this.penguinAnthenaSpriteHeight - 16, 0.1);
			this.anthenaWidth = lerp(this.anthenaWidth, this.penguinAnthenaSpriteWidth + 16, 0.1);
		} else {
			this.anthenaHeight = lerp(this.anthenaHeight, this.penguinAnthenaSpriteHeight, 0.1);
			this.anthenaWidth = lerp(this.anthenaWidth, this.penguinAnthenaSpriteWidth, 0.1);
		}

		// Idle state
		if (this.state === 'idle') {
			if (this.frame > 50) {
				this.height = lerp(this.height, this.penguinLoudspeakerSpriteHeight, 0.05);
				this.width = lerp(this.width, this.penguinLoudspeakerSpriteWidth, 0.05);
			} else {
				this.height = lerp(this.height, this.penguinLoudspeakerSpriteHeight - 16, 0.05);
				this.width = lerp(this.width, this.penguinLoudspeakerSpriteWidth + 8, 0.05);
			}
		}

		// Speaking animation
		if (this.state === 'speaking') {
			this.frame += 8;
			this.speakFrame += 1;
			this.anthenaFrame += 1;

			if (this.speakFrame === 1) playSpeachSound();

			if (this.frame > 50) {
				this.height = lerp(this.height, this.penguinLoudspeakerSpriteHeight + 16, 0.1);
				this.width = lerp(this.width, this.penguinLoudspeakerSpriteWidth - 8, 0.1);
			} else {
				this.height = lerp(this.height, this.penguinLoudspeakerSpriteHeight - 32, 0.1);
				this.width = lerp(this.width, this.penguinLoudspeakerSpriteWidth + 16, 0.1);
			}
		}

		// Stop speaking after some frames
		if (this.speakFrame > 100) {
			this.speakFrame = 0;
			this.state = 'idle';
		}
	}
}
