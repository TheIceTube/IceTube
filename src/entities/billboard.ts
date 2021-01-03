import { State, GameState } from '../state';
import { convertRange, loadImage } from '../utils';

// Sprites
import billboardImage from '../sprites/billboard.png';

// Preload images
const billboard = loadImage(billboardImage);

// Global game state
const GAME: GameState = State<GameState>();

export class Billboard {
    public readonly type: 'billboard';

    public x: number;
    public y: number;
    public width: number;
    public height: number;

    /**
     * Billboard initialization
     * @param x X position
     * @param y Y position
     */
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;

        this.width = 400;
        this.height = 400;
    }

    /**
     * Draw sprite on canvas
     */
    public draw(): void {
        const ctx = GAME.ctx;

        const size = convertRange(this.y, { min: 0, max: GAME.stage.height }, { min: 0, max: 2 });
        const posY = convertRange(this.y, { min: 0, max: GAME.stage.height }, { min: GAME.skyline, max: GAME.stage.height });

        ctx.save();
        ctx.translate(this.x, posY);
        ctx.scale(size, size);

        ctx.drawImage(billboard, -(this.width / 2), -this.height + 32, this.width, this.height);
        ctx.restore();
    }

    /**
     * Update billboard state
     */
    public update(): void {
        // Nothing for now
    }

}