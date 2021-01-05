import { State, GameState } from './state';

// Get game state
const GAME: GameState = State<GameState>();

// On window resize
window.addEventListener('resize', () => {
	GAME.element.width = window.innerWidth * window.devicePixelRatio;
    GAME.element.height = window.innerHeight * window.devicePixelRatio;
});

// Mouse position calculation
GAME.element.addEventListener('mousemove', event => {
	const rect: DOMRect = GAME.element.getBoundingClientRect();
	GAME.mouseX = ((event.clientX - rect.left) / (rect.right - rect.left)) * GAME.element.width;
	GAME.mouseY = ((event.clientY - rect.top) / (rect.bottom - rect.top)) * GAME.element.height;
});

// On mouse down
GAME.element.addEventListener('mousedown', () => {
	GAME.mouseDown = true;
});

// On mouse up
GAME.element.addEventListener('mouseup', () => {
	GAME.mouseDown = false;
});
