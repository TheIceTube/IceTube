import Stats from 'stats.js';
import { State, GameState } from './state';
import { requestInterval } from './timers';
import { randomInteger, randomFromArray, convertRange, insertionSort } from './utils';

// Entities
import { Penguin } from './entities/penguin';
import { Player } from './entities/player';

// Stats setup
const stats = new Stats();
stats.showPanel(0);
if (process.env.NODE_ENV === 'development') document.body.appendChild(stats.dom);

// Get state
const GAME: GameState = State();

// Spawn penguins
for (let i = 0; i < 20; i++) {
	const x = randomInteger(0, GAME.element.width);
	const y = randomInteger(GAME.element.height / 3, GAME.element.height - 64);
	const penguin = new Penguin(x, y);
	GAME.penguins.push(penguin);
}

// Spawn main penguin player
const player = new Player();
GAME.penguins.push(player);

// Sort entities
insertionSort(GAME.penguins, 'y');

// Main loop
function loop() {
	// If game paused
	if (GAME.paused) {
		window.requestAnimationFrame(loop);
		return;
	}

	stats.begin();

	// Update entities
	for (let i = 0; i < GAME.penguins.length; i++) GAME.penguins[i].update();
	for (let i = 0; i < GAME.entities.length; i++) GAME.entities[i].update();

	// Remove all deleted entities
	GAME.penguins = GAME.penguins.filter(entity => entity.exists);
	GAME.entities = GAME.entities.filter(entity => entity.exists);

	// Clean screen
	GAME.ctx.clearRect(0, 0, GAME.element.width, GAME.element.height);

	// Draw entities
	for (let i = 0; i < GAME.penguins.length; i++) GAME.penguins[i].draw();
	for (let i = 0; i < GAME.entities.length; i++) GAME.entities[i].draw();


	stats.end();
	window.requestAnimationFrame(loop);
}

// Relevance update
requestInterval(() => {
	if (!GAME.started) return;

	GAME.relevance -= 0.03;
	if (GAME.relevance > 1.2) GAME.relevance -= 0.02;
	
	if (GAME.relevance < 0) GAME.relevance = 0;
	if (GAME.relevance > 2) GAME.relevance = 2;
}, 1000);

// Spawn penguins
requestInterval(() => {
	if (!GAME.started) return;

	const penguinMultiplier = GAME.entities.length / 5;

	// Calculate amount of penguins to spawn
	let toSpawn = Math.floor(penguinMultiplier * GAME.relevance) - penguinMultiplier;
	if (GAME.relevance > 1.5) toSpawn += 1;

	// Spawn penguins
	for (let i = 0; i < toSpawn; i++) {
		const x = randomInteger(0, GAME.element.width);
		const y = randomInteger(GAME.element.height / 3, GAME.element.height - 64);
		const penguin = new Penguin(x, y);
		GAME.penguins.push(penguin);		
	}

	// Depth sort
	insertionSort(GAME.penguins, 'y');
}, 1000);

const overlay = document.getElementById('overlay');
overlay.style.opacity = '1';

document.getElementById('start-button').onclick = () => {
	loop();
	GAME.paused = false;
	overlay.style.opacity = '0';
	document.getElementById('start-menu').remove();
};
