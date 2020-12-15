import Canvaser from "./Canvaser";
import PenguinImage1 from '../penguin.png'
import PenguinImage2 from '../penguinuk.png'

enum PenguinState
{
    coming,
    standing,
    leaving
}

export default class Penguin
{

    public canvaser: Canvaser;
    public image: HTMLImageElement;
    private x: number;
    public y: number;

    private state: PenguinState;

    constructor(canvaser: Canvaser)
    {
        this.image = Canvaser.loadHTMLImage(this.randomInArray([PenguinImage1, PenguinImage2]));
        this.canvaser = canvaser;

        //this.x = this.randomInArray([-64, this.canvaser.width]) + 100;
        this.x = this.randomInRange(64, this.canvaser.width - 128);
        this.y = this.randomInRange(64, this.canvaser.height - 128);

        this.state = PenguinState.coming;
    }

    public move ()
    {
        this.x += this.randomSign(1);
        this.y += this.randomSign(1);
    }

    public draw ()
    {
        let ctx = this.canvaser.ctx;
        ctx.save();
        ctx.shadowBlur = 5;
        ctx.shadowOffsetY = 5;
        ctx.shadowColor = 'rgba(0, 0, 0, 0.8)'
        this.canvaser.drawImage(this.image, this.x, this.y);
    }


    public randomInRange (min: number, max: number): number
    {
        max++;
        return Math.floor(Math.random() * (max - min)) + min;
    }

    public randomInArray<T> (array: T[]): T
    {
        return array[Math.floor(Math.random() * array.length)];
    }

    public randomSign (num: number): number
    {
        return this.randomInArray([-num, num]);
    }

}