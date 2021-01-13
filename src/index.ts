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
	relevance: 1,
	
	news: shuffle([...real_news, ...fake_news]),
	newsIndex: 0,
	selectedNewsIndex: 0,
});

// Input module
import './core/input';

// Game UI
import './core/gui';

// Main game code
import './core/main';

// Game logic timers
import './core/timers';
