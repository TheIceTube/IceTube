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
	finished: true,
	paused: true,
	element: stage,
	ctx: ctx,

	mouseX: 0,
	mouseY: 0,
	mouseDown: false,

	entities: [],
	penguins: [],

	fish: 0,
	tempo: 1,
	relevance: 1.25,
	maximumPenguins: 10,

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