import { randomInteger, preloadImage, convertRange, insertionSort } from '../utils';

/**
 * HOW TO USE:
 *
 * 1. Get canvas to draw the rain on
 * 2. new FallersRain(canvas, true) (true for resize)
 * Now the rain will be drawn on the canvas every frame
 *
 * If canvas has an ID, then the FallerRain will automatically stop its loop when the canvas is removed from the DOM.
 * Otherwise use fallersRain.finish() to stop the animation loop
 *
 */

/// @ts-ignore
import fishImage from '../../sprites/fish.png';

interface Faller {
	x: number;
	y: number;
	// Larger the depth: lesser the speed, lesser the scale
	depth: number;
	// Image of that index will be used from `images` array
	imageIndex: number;
	// Current rotation
	rot: number;
	// Angular speed
	rotSpeed: number;
	// Image width and height
	width: number;
	height: number;
}

enum FALLER_CFG 
{
    FrontSpeed = 2,
    BackSpeed = 1,
    FrontScale = 0.8,
    BackScale = 0.4,
    TopDownScaleDiff = 0.3,
    MaxRotSpeed = 0.010,
    MinRotSpeed = 0.004,
    TotalFallers = 100,
}

function randomFloat(min: number, max: number): number {
	return Math.random() * (max - min) + min;
}

function unitRangeToRange(value: number, min: number, max: number): number {
	return convertRange(value, { min: 0, max: 1 }, { min: min, max: max });
}

export default class FallersRain
{
    private ctx: CanvasRenderingContext2D;

    private finished: boolean;

    private fallers: Faller[] = [];
    private images: HTMLImageElement[] = [];

    private imagesToLoad: number;

    public constructor(canvas: HTMLCanvasElement, resize: boolean = true)
    {
        requestAnimationFrame(this.loop);

        // If this.loop (from requestAnimationFrame) will run when `finished=true`, the animation will be finished (loop won't loop anymore)
        this.finished = false;

        // Resize canvas, get ctx
        canvas = canvas;
        if (resize)
        {
            canvas.width = window.innerWidth * window.devicePixelRatio;
            canvas.height = window.innerHeight * window.devicePixelRatio;
        }
        this.ctx = canvas.getContext('2d');
        
        // Load images
        this.imagesToLoad = 0;
        this.loadImages(fishImage);

    }

    private spawnFallers ()
    {
        
        for (let i = 0; i < FALLER_CFG.TotalFallers; i++)
        {
            let faller = this.createFaller(false, i);
            this.fallers.push(faller);
        }

        insertionSort(this.fallers, 'depth');
        this.fallers.reverse();
    }

    private loadImages (...imagePaths: string[])
    {
        this.imagesToLoad = imagePaths.length;
        imagePaths.forEach(async (path) =>
        {
            let img = await preloadImage(path);

            this.imagesToLoad--;
            this.images.push(img);

            console.log(`New image starts loading. ${this.imagesToLoad} images to be load.`)

        });
    }

    private createFaller (fromTop: boolean = false, index: number): Faller
    {
        let randomImageIndex = randomInteger(0, this.images.length - 1);
        let imageWidth = this.images[randomImageIndex].width;
        let imageHeight = this.images[randomImageIndex].height;

        let canvas = this.ctx.canvas;

        let maxX = canvas.width;
        let minX = -imageWidth;
        let maxY = canvas.height - imageHeight - 1;
        let minY = -imageHeight;

        let total1D = Math.floor(Math.sqrt(FALLER_CFG.TotalFallers));
        let x = ( (maxX-minX) / total1D) * (index % total1D + randomFloat(0, 1)) + minX
        let y = ( (maxY-minY) / total1D) * (index / total1D + randomFloat(0, 1)) + minY
        y = fromTop ? minY : y;

        let initialRot = randomInteger(0, Math.PI * 2);

        let faller: Faller = {
            x: x,
            y: y,
            depth: Math.random(),
            imageIndex: randomImageIndex,
            rot: initialRot,
            rotSpeed: randomFloat(FALLER_CFG.MinRotSpeed, FALLER_CFG.MaxRotSpeed),
            width: imageWidth,
            height: imageHeight,
        }

        return faller;
    }

    public loop = () =>
    {
        console.log('loop()');

        // Finish the loop if `this.finished == true`. ADDED: also auto-finishes when canvas is removed from the DOM
        if (this.finished || (this.ctx.canvas.id !== '' && !document.getElementById(this.ctx.canvas.id)))
        {
            return;
        }
        
        this.update();
        
        requestAnimationFrame(this.loop);
    }

    private update ()
    {
        // Spawn fallers when all images are loaded
        if (this.imagesToLoad <= 0 && this.fallers.length === 0)
        {
            this.spawnFallers();
        }

        // console.log('update()');

        let ctx = this.ctx;

        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
        this.fallers.forEach((faller, index) =>
        {
            let speed = unitRangeToRange(faller.depth, FALLER_CFG.FrontSpeed, FALLER_CFG.BackSpeed);
            let scale = unitRangeToRange(faller.depth, FALLER_CFG.FrontScale, FALLER_CFG.BackScale)
                + convertRange(faller.y, { min: 0, max: ctx.canvas.height }, { min: FALLER_CFG.TopDownScaleDiff / 2, max: -FALLER_CFG.TopDownScaleDiff / 2 });

            faller.y += speed;
            if (faller.y > this.ctx.canvas.height)
            {
                this.fallers[index] = this.createFaller(true, index);
                this.fallers[index].depth = faller.depth;
            }

            faller.rot += faller.rotSpeed;

            ctx.save();
            ctx.translate(faller.x + faller.width/2, faller.y + faller.height/2);
            ctx.rotate(faller.rot);
            ctx.scale(scale, scale);
            ctx.drawImage(this.images[faller.imageIndex], -faller.width/2, -faller.height/2);
            ctx.restore();
        });
    }

    public finish ()
    {
        this.finished = true;
    }

}
