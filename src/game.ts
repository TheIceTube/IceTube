import Stats from 'stats.js';
import { State, GameState } from './state';
import { insertionSort, randomInteger, shuffle } from './utils';

// Entities
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

	// Fixed penguin
	if (i === 0) penguin.state = 'fixed';

	GAME.entities.push(penguin);
}

// Spawn billboard
const billboard = new Billboard();
GAME.entities.push(billboard);

// Main loop
function loop() {
	stats.begin();

	// Sort entities for 3d effect
	insertionSort(GAME.entities, 'y');

	// Update entities
	for (let i = 0; i < GAME.entities.length; i++) {
		GAME.entities[i].update();
	}

	// Clean screen
	GAME.ctx.clearRect(0, 0, GAME.stage.width, GAME.stage.height);

	// Draw entities
	for (let i = 0; i < GAME.entities.length; i++) {
		GAME.entities[i].draw();
	}

	// Remove entities that height 
	GAME.entities = GAME.entities.filter(entity => {
		if (entity.type === 'penguin') return entity.height > 0;
		return true;
	});

	stats.end();
	requestAnimationFrame(loop);
}

// Start game
loop();
