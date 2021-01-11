import Stats from 'stats.js';
import { State, GameState } from './state';
import { insertionSort, randomInteger, randomFromArray, requestInterval, convertRange } from './utils';

// Entities
import { Penguin } from './entities/penguin';
import { Billboard } from './entities/billboard';

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
	GAME.entities.push(penguin);
}

// Spawn billboard
const billboard = new Billboard();
GAME.entities.push(billboard);

// Main loop
function loop() {
	// If game paused
	if (GAME.paused) {
		window.requestAnimationFrame(loop);
		return;
	}

	// Enable optimizations for many entities
	if (GAME.entities.length > 1000) {
		GAME.optimize = true;
	} else {
		GAME.optimize = false;
	}

	stats.begin();

	// Update entities
	for (let i = 0; i < GAME.entities.length; i++) {
		GAME.entities[i].update();
	}

	// Remove all deleted entities
	GAME.entities = GAME.entities.filter(entity => {
		return entity.exists;
	});

	// Clean screen
	GAME.ctx.clearRect(0, 0, GAME.element.width, GAME.element.height);

	// Draw entities
	for (let i = 0; i < GAME.entities.length; i++) {
		GAME.entities[i].draw();
	}

	stats.end();
	window.requestAnimationFrame(loop);
}

const overlay = document.getElementById('overlay');
overlay.style.opacity = '1';

document.getElementById('start-button').onclick = () => {
	loop();
	GAME.paused = false;
	overlay.style.opacity = '0';
	document.getElementById('start-menu').remove();

}

GAME.paused = true;

