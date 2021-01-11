import { State, GameState } from '../state';
import { convertRange, loadImage, numberWithCommas, lerp } from '../utils';

// Sprites
import fishImage from '../../sprites/fish.png';

// Preload images
const fish = loadImage(fishImage);

// Global game state
const GAME: GameState = State();

export class Fish {
    public readonly type: 'fish';

    public exists: boolean;
    public frame: number;
    
    public x: number;
    public y: number;
    public width: number;
    public height: number;

    public spawnY: number;

    /**
     * Billboard initialization
     */
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.spawnY = this.y;
        this.frame = 0;
        this.exists = true;
        this.width = 92;
        this.height = 92;
    }

    /**
     * Draw sprite on canvas
     */
    public draw(): void {
        const ctx = GAME.ctx;

        const size = convertRange(this.spawnY, { min: 0, max: GAME.element.height }, { min: 0, max: 2 });
		const posY = convertRange(this.y, { min: 0, max: GAME.element.height }, { min: GAME.element.height / 5, max: GAME.element.height });

        if (this.exists === false) return;

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
        this.frame += 1;
        
        if (this.exists === false) return;

        if (this.frame < 50) {
            this.y = lerp(this.y, this.spawnY - 64, 0.02);
        } else {
            this.y = lerp(this.y, -100, 0.02); 
            this.x = lerp(this.x, GAME.element.width / 2, 0.02); 

            if (this.y < 10) this.exists = false;
        }
    }
}