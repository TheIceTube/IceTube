import Stats from 'stats.js';
import { State, GameState } from './state';
import { insertionSort, lerp, loadImage, randomInteger, convertRange } from './utils';

import { Penguin } from './entities/penguin';
import { Billboard } from './entities/billboard';

// Stats setup
const stats = new Stats();
stats.showPanel(0);
document.body.appendChild(stats.dom);

// Get state
const GAME: GameState = State<GameState>();

// Spawn penguins
for (let i = 0; i < 50; i++) {
	const x = randomInteger(0, GAME.stage.width);
	const y = randomInteger(GAME.stage.height / 3, GAME.stage.height - 64);
	const penguin = new Penguin(x, y);

	GAME.entities.push(penguin);
}

const x = GAME.stage.width / 2;
const y = GAME.stage.height / 2 + (GAME.stage.height / 10);

const billboard = new Billboard(x, y);
GAME.entities.push(billboard);

// Main loop
function loop() {
	stats.begin();

	update();
	draw();

	stats.end();
	requestAnimationFrame(loop);
}

// Update game state
function update() {
	// Sort entities for 3d effect
	insertionSort(GAME.entities, 'y');

	for (let i = 0; i < GAME.entities.length; i++) {
		const entity = GAME.entities[i];
		entity.update();
	}
}

// Render game state
function draw() {
	GAME.ctx.clearRect(0, 0, GAME.stage.width, GAME.stage.height);

	for (let i = 0; i < GAME.entities.length; i++) {
		const entity = GAME.entities[i];
		entity.draw();
	}
}

// Start game
loop();

const newPost = document.getElementById('newPost');
const overlay = document.getElementById('overlay');

const modal = document.getElementById('modal');
const menu = document.getElementById(`menu`);

const pause = document.getElementById(`pauseMenu`);

// UI
newPost.addEventListener('click', () => {
	modal.style.top = '45%';
	overlay.style.opacity = '1';
	overlay.style.pointerEvents = 'auto';
	GAME.stage.style.transform = 'scale(2) translateY(64px)';
});

overlay.addEventListener('click', () => {
	menu.style.left = '-150%';

	modal.style.top = '150%';
	overlay.style.opacity = '0';
	overlay.style.pointerEvents = 'none';
	GAME.stage.style.transform = 'scale(1)';
});

pause.addEventListener('click', () => {
	menu.style.left = '50%';
	overlay.style.opacity = '1';
	overlay.style.pointerEvents = 'auto';
});
