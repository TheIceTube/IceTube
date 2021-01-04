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

    public views: number = 0;

    /**
     * Billboard initialization
     */
    constructor() {
        this.x = GAME.stage.width / 2;
        this.y = GAME.stage.height / 1.5;

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

        ctx.font = 'italic 24px Segoe UI';
        ctx.textAlign = 'center';
        ctx.fillText(`Views: ${this.views}`, this.x, this.y - 270)
    }

    /**
     * Update billboard state
     */
    public update(): void {
        this.x = GAME.stage.width / 2;
        this.y = GAME.stage.height / 1.5;
        this.views += 1;
    }

}