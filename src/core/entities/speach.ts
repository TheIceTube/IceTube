import { State, GameState } from '../state';
import { convertRange, loadImage, numberWithCommas, lerp } from '../utils';

// Sprites
import speachBubbleImage from '../../sprites/speech_bubble.png';

// Preload images
const speachBubble = loadImage(speachBubbleImage);

// Global game state
const GAME: GameState = State();

export class Speach {
    public readonly type = 'speach';
    public readonly spriteHeight = 128;
	public readonly spriteWidth = 128;

    public exists: boolean;
    public frame: number;

    public message: string;
    
    public y: number;
    public x: number;

    public width: number;
    public height: number;

    /**
     * Billboard initialization
     */
    constructor(x: number, y: number, message: string) {
        this.x = x;
        this.y = y;
        this.message = message;
        this.frame = 0;
        this.exists = true;
        this.width = 0;
        this.height = 0;
    }

    /**
     * Draw sprite on canvas
     */
    public draw(): void {
        const ctx = GAME.ctx;

        if (this.exists === false) return;

        const size: number = convertRange(this.y, { min: 0, max: GAME.element.height }, { min: 0, max: 2 });
        const posY: number = convertRange(this.y, { min: 0, max: GAME.element.height }, { min: GAME.element.height / 5, max: GAME.element.height });

        ctx.save();
        ctx.translate(this.x, posY);
        ctx.scale(size, size);
        ctx.drawImage(speachBubble, -(this.width / 2) + 48, -this.height - 48, this.width, this.height);
        
        ctx.font = '16px Segoe UI';
        ctx.textAlign = 'center';
        ctx.fillText(this.message, 0 + 48, 0 - 128);

        ctx.restore();
    }

    /**
     * Update billboard state
     */
    public update(): void {
        if (this.exists === false) return;

        this.frame += 1;

        if (this.frame < 300) {
            this.width = lerp(this.width, this.spriteWidth, 0.1); 
            this.height = lerp(this.height, this.spriteHeight, 0.1); 
            return;
        }

        this.width = lerp(this.width, 0, 0.05); 
        this.height = lerp(this.height, 0, 0.05); 

        if (this.width < 16) {
            this.exists = false;
        }
    }
}