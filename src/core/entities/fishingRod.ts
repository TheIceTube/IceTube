// {#include_iostream, using namespase
//     ;
//     std{}
// by PITSA

import { State, GameState } from '../state';
import { requestTimeout } from '../timers';
import { convertRange, loadImage, lerp } from '../utils';

// Sprites
/// @ts-ignore
import imgpathRod from '../../sprites/rod.png';

// Preload images
const imgRod = loadImage(imgpathRod);

// Global game state
const GAME: GameState = State();

export class FishingRod {
	public readonly type = 'fishing-rod';
	public readonly spriteHeight = 92;
	public readonly spriteWidth = 92;

	public exists: boolean;
	public frame: number;

	private x;
	private y;

	constructor() {
		this.x = GAME.element.width / 2;
		this.y = GAME.element.height - 500;
		this.exists = true;
	}

	update() {
		console.log('rod update');
	}

	draw() {
		let ctx = GAME.ctx;

		let x1 = GAME.element.width / 2;
		let y1 = GAME.element.height;

		let x2 = GAME.mouseX;
		let y2 = GAME.mouseY;

		drawLine(ctx, x2, y2, x2, y2 + 120, 'white');

		ctx.save();
		ctx.translate(x1, y1);
		let mouseAng = Math.atan((y2 - y1) / (x2 - x1)) + (x2 < x1 ? Math.PI : 0);
		let rodAng = 0.607;
		let rodWidth = 1400.9;
		let mouseWidth = Math.sqrt((y2 - y1) ** 2 + (x2 - x1) ** 2);
		ctx.rotate(mouseAng + rodAng);
		let scale = mouseWidth / rodWidth;
		ctx.scale(scale, scale);
		GAME.ctx.drawImage(imgRod, 0, -imgRod.height + 50);
		ctx.restore();
	}
}

function drawLine(ctx: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number, color: string) {
	ctx.save();
	ctx.beginPath();
	ctx.moveTo(x1, y1);
	ctx.lineTo(x2, y2);
	ctx.strokeStyle = color;
	ctx.stroke();
	ctx.restore();
}
