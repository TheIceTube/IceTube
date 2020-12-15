import Canvaser from "./Canvaser";
import PenguinImage from '../penguin.png'

export default class Penguin
{

    public canvaser: Canvaser;
    public image: HTMLImageElement;
    private x: number;
    private y: number;

    constructor(canvaser: Canvaser)
    {
        this.image = Canvaser.loadHTMLImage(PenguinImage);
        this.canvaser = canvaser;
        this.x = 400 + this.random(350);
        this.y = 400 + this.random(350);
    }

    public move ()
    {
        this.x += this.random(1);
        this.y += this.random(1);
    }

    public draw ()
    {
        this.canvaser.drawImage(this.image, this.x, this.y);
    }

    public random (maxAbs: number): number
    {
        return Math.floor(Math.random() * (maxAbs * 2 + 1)) - maxAbs;
    }

}