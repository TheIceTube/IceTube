import { State, GameState } from './state';
import { shuffle } from './utils';

// Array of news
import { news } from './content.json';

// Setup canvas element
const stage = document.getElementById('stage') as HTMLCanvasElement;
stage.width = window.innerWidth * window.devicePixelRatio;
stage.height = window.innerHeight * window.devicePixelRatio;

// Setup canvas context
const ctx = stage.getContext('2d');
ctx.imageSmoothingEnabled = false;

// State initialization
const GAME: GameState = State<GameState>({
	stage: stage,
	ctx: ctx,
	mouseX: 0,
	mouseY: 0,
	mouseDown: false,
    skyline: stage.height / 5,
	allNews: shuffle(news),
	entities: [],
	crowdControll: 1,
	worldState: {
		gaming: 0,
		films: 0,
		music: 0,
		news: 0,
		sport: 0,
		educational: 0
	}
});

// Input module
import './input';

// Game UI
import './ui';

// Main game code
import './game';

// Timings
import './timer';