import { randomInteger, loadImage, randomFromArray } from './utils';

import penguinLeftImage from '../sprites/penguin-left.png';
import penguinRightImage from '../sprites/penguin-right.png';
import fishImage from '../sprites/fish.png';
import { time } from 'console';

interface Penguin
{
    x: number;
    y: number;
    imageIndex: number;
    rot: number;
    speed: number;
    rotSpeed: number;
    scale: number;
}

export default class startMenuCanvas
{
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private stopped: boolean;
    private timePrev: number;
    private penguins: Penguin[] = [];
    private images: HTMLImageElement[] = [];

    public constructor(canvas: HTMLCanvasElement)
    {
        this.stopped = false;
        this.canvas = canvas;
        this.canvas.width = window.innerWidth * window.devicePixelRatio;
        this.canvas.height = window.innerHeight * window.devicePixelRatio;
        this.ctx = this.canvas.getContext('2d', {alpha: false});
        requestAnimationFrame(this.firstLoop);

        // Load images
        // this.images.push(loadImage(penguinLeftImage));
        // this.images.push(loadImage(penguinRightImage));
        this.images.push(loadImage(fishImage));
        
        // Spawn
        for (let i = 0; i < 500; i++)
        {
            let penguin = this.createPinguin();
            this.penguins.push(penguin);
        }
    }

    private createPinguin (): Penguin
    {
        let penguin = {
            x: randomInteger(-400, this.canvas.width),
            y: randomInteger(-400, this.canvas.height + 100),
            imageIndex: randomInteger(0, this.images.length - 1),
            rot: 0,
            speed: randomInteger(1, 3),
            scale: Math.random() * 0.3 + 0.3,
            rotSpeed: Math.random() * 4 + -2,
        }

        return penguin;
    }

    public firstLoop =  (timeNow: number) =>
    {
        this.timePrev = timeNow;
        this.loop(timeNow);
    }

    public loop = (timeNow: number) =>
    {
        // If not `stopped` then update it and keep the loop, otherwise the loop should stop
        if (this.stopped)
        {
            return;
        }

        
        let timePassed = timeNow - this.timePrev;
        this.timePrev = timeNow;
        
        this.update(timePassed);

        requestAnimationFrame(this.loop);
    }

    private update (timePassed: number)
    {
        let ctx = this.ctx;
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
        
        this.penguins.forEach((penguin, index) =>
        {
            penguin.y += penguin.speed;
            if (penguin.y > this.canvas.height)
            {
                penguin.y = -400;
                penguin.x = randomInteger(0, this.canvas.width);
            }
            penguin.rot += penguin.rotSpeed * 0.01;

            ctx.save();
            ctx.translate(penguin.x + 128, penguin.y + 128);
            ctx.rotate(penguin.rot);
            ctx.scale(penguin.scale, penguin.scale);
            ctx.drawImage(this.images[penguin.imageIndex], -128, -128);
            ctx.restore();
        });
    }

    public stop ()
    {
        this.stopped = true;
    }

}