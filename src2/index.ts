import { State } from './core/state';
import { shuffle } from './core/utils';

// Array of news
import { real_news, fake_news } from './content.json';

// Setup canvas element
const stage = document.getElementById('stage') as HTMLCanvasElement;
stage.width = window.innerWidth * window.devicePixelRatio;
stage.height = window.innerHeight * window.devicePixelRatio;

// Setup canvas context
const ctx = stage.getContext('2d');

// State initialization
State({
	paused: true,
	element: stage,
	ctx: ctx,

	mouseX: 0,
	mouseY: 0,
	mouseDown: false,

	entities: [],
	penguins: [],
	started: false,

	fish: 0,
	tempo: 1,
	relevance: 1.25,
	maximumPenguins: 0,

	news: shuffle([...real_news, ...fake_news]),
	selectedNewsIndex: 0,
	newsIndex: 0,
});

// Input module
import './core/input';

// Game UI
import './core/gui';

// Main game code
import './core/main';

// Cheat codes
import './core/cheats';

// Start the fallers rain animation (in the start menu)
import FallersRain from './core/StartMenu/FallersRain';
new FallersRain(document.getElementById('start-menu-canvas') as HTMLCanvasElement);

// let canvas = document.getElementById('start-menu-canvas') as HTMLCanvasElement;
// document.getElementById('start-menu-penguins').remove();
// canvas.width = window.innerWidth * window.devicePixelRatio;
// canvas.height = window.innerHeight * window.devicePixelRatio;
// let ctx = canvas.getContext('2d');
// canvas.style.opacity = "1";

// import { lerp } from './core/utils';
// ctx.transform(1, 0, 0, -1, 0, canvas.height)
// let min = 50;
// let max = 100;
// let curr = 250;
// let frame = 0;
// ctx.moveTo(0, 0);

// for (let i = 100; i < 1000; i++)
// {
// 	frame = (frame + 1) % 100;
// 	curr = frame < 50 ? lerp(curr, max, 0.1) : lerp(curr, min, 0.1);
// 	ctx.lineTo(i, curr);
// }
// ctx.stroke();
// ctx.fillStyle = 'black';
// ctx.fillRect(-5000, -500, 500, 500);