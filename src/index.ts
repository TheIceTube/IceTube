import Stats from 'stats.js';
import { State, GameState } from './state';

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
	entities: []
});

// Input module
import './input';

// Main game code
import './game';