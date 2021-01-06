import { State } from './core/state';
import { shuffle } from './core/utils';

// Array of news
import { all_news } from './content.json';

// Setup canvas element
const stage = document.getElementById('stage') as HTMLCanvasElement;
stage.width = window.innerWidth * window.devicePixelRatio;
stage.height = window.innerHeight * window.devicePixelRatio;

// Setup canvas context
const ctx = stage.getContext('2d');
ctx.imageSmoothingEnabled = false;

// State initialization
State({
	paused: false,
	element: stage,
	ctx: ctx,
	optimize: false,

	mouseX: 0,
	mouseY: 0,
	mouseDown: false,

	entities: [],
	
	views: 0,
	relevance: 1,
	interests: {
		gaming: 5,
		films: 5,
		music: 5,
		sport: 5,
		politics: 5,
		educational: 5,
	},

	news: shuffle(all_news),
	newsIndex: 0,
});

// Input module
import './core/input';

// Game UI
import './core/gui';

// Main game code
import './core/main';

// Game logic timers
import './core/timers';
