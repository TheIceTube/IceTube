import { State, GameState } from '../state';
import { convertRange, loadImage, numberWithCommas } from '../utils';

// Sprites
import billboardImage from '../../sprites/billboard.png';

// Preload images
const billboard = loadImage(billboardImage);

// Global game state
const GAME: GameState = State();

export class Billboard {
    public readonly type: 'billboard';
	public readonly spriteHeight = 400;
    public readonly spriteWidth = 400;
    
    public exists: boolean;
    
    public x: number;
    public y: number;
    public width: number;
    public height: number;

    /**
     * Billboard initialization
     */
    constructor() {
        this.x = GAME.element.width / 2;
        this.y = GAME.element.height / 1.5
        this.width = this.spriteWidth;
        this.height = this.spriteHeight;
        this.exists = true;
    }

    /**
     * Draw sprite on canvas
     */
    public draw(): void {
        const ctx = GAME.ctx;

        const views = 0;
        const penguins = GAME.started ? numberWithCommas(GAME.entities.length - 1) : 0;
        const relevance = GAME.relevance.toFixed(2);

        const size = convertRange(this.y, { min: 0, max: GAME.element.height }, { min: 0, max: 2 });
        const posY = convertRange(this.y, { min: 0, max: GAME.element.height }, { min: GAME.element.height / 5, max: GAME.element.height });

        ctx.save();
        ctx.translate(this.x, posY);
        ctx.scale(size, size);

        ctx.drawImage(billboard, -(this.width / 2), -this.height + 32, this.width, this.height);
        ctx.restore();

        ctx.font = 'italic 24px Segoe UI';
        ctx.textAlign = 'center';

        
        ctx.fillText(`Relevance: ${relevance}`, this.x, posY - 400);
        ctx.fillText(`Views: ${views}`, this.x, posY - 360);
        ctx.fillText(`Penguins: ${penguins}`, this.x, posY - 320);
    }

    /**
     * Update billboard state
     */
    public update(): void {
        this.x = GAME.element.width / 2;
        this.y = GAME.element.height / 1.5;
    }
}