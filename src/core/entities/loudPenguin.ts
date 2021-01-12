import { State, GameState } from '../state';
import { convertRange, loadImage, numberWithCommas } from '../utils';

// Sprites
import billboardImage from '../../sprites/main-penguin.png';
import billboardImage2 from '../../sprites/main-penguin-loudspeaker.png';

// Preload images
const billboard = loadImage(billboardImage);
const billboard2 = loadImage(billboardImage2);

// Global game state
const GAME: GameState = State();

export class LoudPenguin {
    public readonly type: 'loudPenguin';
	public readonly spriteHeight = 400;
    public readonly spriteWidth = 400;
    
    public exists: boolean;
    
    public x: number;
    public y: number;
    public width: number;
    public height: number;
    public frame:number;

    public current:HTMLImageElement;

    /**
     * Billboard initialization
     */
    constructor() {
        this.x = GAME.element.width / 2;
        this.y = GAME.element.height / 1.5
        this.width = this.spriteWidth;
        this.height = this.spriteHeight;
        this.frame = 0;
        this.exists = true;
        this.current = billboard;
    }

    /**
     * Draw sprite on canvas
     */
    public draw(): void {
        const penguins = GAME.started ? numberWithCommas(GAME.entities.length - 1) : 0;
        const ctx = GAME.ctx;

        const size = convertRange(this.y, { min: 0, max: GAME.element.height }, { min: 0, max: 2 });
        const posY = convertRange(this.y, { min: 0, max: GAME.element.height }, { min: GAME.element.height / 5, max: GAME.element.height });

        ctx.save();
        ctx.translate(this.x, posY);
        ctx.scale(size, size);
        // this.loudSpeaker();
        ctx.drawImage(this.current, -(this.width / 2), -this.height + 32, this.width, this.height);
        ctx.restore();
        ctx.fillText(`Penguins: ${penguins}`, this.x, posY - 320);

    }
    
    // public  loudSpeaker ():void {
    //     if (GAME.posted) {

    //         this.current = billboard2;

    //         this.frame += 1;

    //         if(this.frame = 90) {
    //             this.current = billboard;
    //         }

    //     }
    // }

    /**
     * Update billboard state
     */
    public update(): void {
        this.x = GAME.element.width / 2;
        this.y = GAME.element.height / 1.5;
    }
}