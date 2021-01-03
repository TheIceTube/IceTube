import { State, GameState } from './state';

// Get game state
const GAME: GameState = State<GameState>();

// On window resize
window.addEventListener('resize', () => {
	GAME.stage.width = window.innerWidth * window.devicePixelRatio;
    GAME.stage.height = window.innerHeight * window.devicePixelRatio;
    GAME.skyline = GAME.stage.height / 5;
});

// Mouse position calculation
GAME.stage.addEventListener('mousemove', event => {
	const rect: DOMRect = GAME.stage.getBoundingClientRect();
	GAME.mouseX = ((event.clientX - rect.left) / (rect.right - rect.left)) * GAME.stage.width;
	GAME.mouseY = ((event.clientY - rect.top) / (rect.bottom - rect.top)) * GAME.stage.height;
});

// On mouse down
GAME.stage.addEventListener('mousedown', () => {
	GAME.mouseDown = true;
});

// On mouse up
GAME.stage.addEventListener('mouseup', () => {
	GAME.mouseDown = false;
});
