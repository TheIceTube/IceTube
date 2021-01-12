import { State, GameState } from '../state';
import { convertRange, loadImage, numberWithCommas, lerp } from '../utils';

// Sprites
import fishImage from '../../sprites/fish-shadow.png';

// Preload images
const fish = loadImage(fishImage);

// Global game state
const GAME: GameState = State();

export class Fish {
    public readonly type: 'fish';

    public readonly spriteHeight = 92;
	public readonly spriteWidth = 92;
    public readonly alwaysOnTop: boolean = true;


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
        this.width = this.spriteWidth;
        this.height = this.spriteHeight;
    }

    /**
     * Draw sprite on canvas
     */
    public draw(): void {
        const ctx = GAME.ctx;

        if (this.exists === false) return;

        const size = convertRange(this.spawnY, { min: 0, max: GAME.element.height }, { min: 0, max: 2 });
        const posY: number = convertRange(this.y, { min: 0, max: GAME.element.height }, { min: GAME.element.height / 5, max: GAME.element.height });

        ctx.save();
        ctx.translate(this.x, posY);
        ctx.scale(size, size);
		ctx.drawImage(fish, -(this.width / 2), -this.height + 18, this.width, this.height);
        ctx.restore();
    }

    /**
     * Update billboard state
     */
    public update(): void {
        if (this.exists === false) return;

        this.frame += 1;
        
        if (this.frame < 50) {
            this.y = lerp(this.y, this.spawnY - 256, 0.05);
        } else {
            this.width = lerp(this.width, 0, 0.1); 
            this.height = lerp(this.height, 0, 0.1); 
            this.y = lerp(this.y, this.y - 256, 0.1); 
            if (this.width < 5) this.exists = false;
        }
    }
}