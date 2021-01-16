import { State } from './core/state';
import { shuffle, insertionSort } from './core/utils';

// Array of news
import { real_news, fake_news } from './content.json';
import { moods, levels } from './coefficents.json';

// Setup canvas element
const stage = document.getElementById('stage') as HTMLCanvasElement;
stage.width = window.innerWidth * window.devicePixelRatio;
stage.height = window.innerHeight * window.devicePixelRatio;

// Setup canvas context
const ctx = stage.getContext('2d');

// Sort levels by their score
insertionSort(levels, 'score');

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
	score: 0,
	level: 0,

	moods: moods,

	coefficents: {
		relevanceDeduction: levels[0].relevanceDeduction,
		relevanceAddition: levels[0].relevanceAddition,
		maximumPenguins: levels[0].maximumPenguins,
		penguinsMultiplier: levels[0].penguinsMultiplier,
		penguinsInvolvment: levels[0].penguinsInvolvment,
		newsUpadateDelay: levels[0].newsUpadateDelay,
		fishDespawnFrames: levels[0].fishDespawnFrames
	},

	news: shuffle([...real_news]),
	newsIndex: 0,
	selectedNewsIndex: 0,
});

// Input module
import './core/input';

// Game UI
import './core/gui';

// Main game code
import './core/main';

// TO BE MOVED SOMEWHERE
import StartMenuCanvas from './core/startMenuCanvas';

let startMenuCanvas = new StartMenuCanvas(document.getElementById('start-menu-canvas') as HTMLCanvasElement);