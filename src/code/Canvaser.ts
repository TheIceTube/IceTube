import { HighlightSpanKind } from "typescript";

export default class Canvaser
{ 
    private canvas: HTMLCanvasElement;
    private _ctx: CanvasRenderingContext2D;

    constructor(id: string, width: number, height: number)
    {
        // Create canvas element
        this.canvas = document.createElement('canvas');
        // Set canvas properties
        this.canvas.id = id;
        this.canvas.width = width;
        this.canvas.height = height;
        // Append canvas to body
        document.body.appendChild(this.canvas);
        // Get CTX
        this._ctx = this.canvas.getContext('2d');
    }

    public get ctx (): CanvasRenderingContext2D
    {
        return this._ctx;
    }

    public drawImage (image: HTMLImageElement, x: number, y: number)
    {
        this.ctx.drawImage(image, x, y);
    }

    public clear ()
    {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    public static loadHTMLImage (src: string): HTMLImageElement
    {
        let img = new Image();
        img.src = src;
        return img;
    }


}