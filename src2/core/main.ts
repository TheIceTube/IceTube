// Game logic
import './logic';

// Dependencies
import Stats from 'stats.js';
import { startMusic } from './audio';
import { State, GameState } from './state';
import { requestInterval } from './timers';
import { randomInteger, insertionSort, randomFromArray } from './utils';

// Entities
import { Penguin } from './entities/penguin';
import { Characters } from './entities/characters';

// Stats setup
const stats = new Stats();
stats.showPanel(0);
if (process.env.NODE_ENV === 'development') document.body.appendChild(stats.dom);

// Get state
const GAME: GameState = State();

// Spawn main penguin player
const characters = new Characters();
GAME.penguins.push(characters);

// Spawn penguins
for (let i = 0; i < 10; i++) {
	const x = randomInteger(0, GAME.element.width);
	const y = randomInteger(GAME.element.height / 3, GAME.element.height - 64);
	const penguin = new Penguin(x, y);
	GAME.penguins.push(penguin);
}

// Sort penguins
insertionSort(GAME.penguins, 'y');

// Main loop
function loop() {
	stats.begin();

	// If game paused
	if (GAME.paused) {
		window.requestAnimationFrame(loop);
		return;
	}

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

	GAME.relevance -= 0.001 * GAME.tempo;
	if (GAME.relevance < 0) GAME.relevance = 0;
}, 100);

// Despawn penguins
requestInterval(() => {
	if (GAME.relevance < 0.5) {
		const penguinsAmount = GAME.penguins.length - 1;

		let toDespawn = Math.ceil(GAME.maximumPenguins * 0.05);
		if (GAME.relevance < 0.2) toDespawn = Math.ceil(GAME.maximumPenguins * 0.2);
		
		if (toDespawn > penguinsAmount) toDespawn = penguinsAmount;

		for (let i = 0; i < toDespawn; i++) {
			const index = randomFromArray(GAME.penguins);
			const penguin = GAME.penguins[index];

			// Skip invalid penguin
			if (penguin.type === 'characters' || penguin.state !== 'walking') {
				i -= 1;
				continue;
			}	

			penguin.despawn();
		}
	}
}, 1000);

// Game Over Check
requestInterval(() => {
	if ((GAME.penguins.length - 1) <= 0) {
		document.getElementById('final-fish-count').innerText = `${GAME.fish}`;
		document.getElementById('end-screen').style.transform = 'translate( -50%, -50%)';
	
		overlay.style.opacity = '1';
		overlay.style.pointerEvents = 'auto';
		GAME.paused = true;
	}
}, 1000);

const overlay = document.getElementById('overlay');
overlay.style.opacity = '1';

//starts the game
document.getElementById('start-button').onclick = () => {
	loop();
	startMusic();
	GAME.paused = false;
	overlay.style.opacity = '0';
	document.getElementById('start-menu').remove();
};

//reload button on screen
document.getElementById('end-button').onclick = () => {
	location.reload();
};
