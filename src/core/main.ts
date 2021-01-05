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
const GAME: GameState = State<GameState>();

// Spawn penguins
for (let i = 0; i < 50; i++) {
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

	stats.begin();

	// Sort entities for 3d effect
	insertionSort(GAME.entities, 'y');

	// Update entities
	for (let i = 0; i < GAME.entities.length; i++) {
		GAME.entities[i].update();
	}

	// Clean screen
	GAME.ctx.clearRect(0, 0, GAME.element.width, GAME.element.height);

	// Draw entities
	for (let i = 0; i < GAME.entities.length; i++) {
		GAME.entities[i].draw();
	}

	// Remove all deleted entities
	GAME.entities = GAME.entities.filter(entity => {
		return entity.exists;
	});

	stats.end();
	window.requestAnimationFrame(loop);
}

// Remove penguin from array each seccond
requestInterval(() => {
	if (GAME.paused) return;

	const index = randomFromArray(GAME.entities);
	const entity = GAME.entities[index];

	if (entity.type === 'penguin') entity.state = 'leaving';
}, 1000);

// Start game
loop();
