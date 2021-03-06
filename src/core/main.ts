// Game logic
import { spawnPenguins } from './logic';

// Dependencies
import Stats from 'stats.js';
import { State, GameState } from './state';

// Entities
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
spawnPenguins(10);

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
	if ((window as any).rave !== true) GAME.ctx.clearRect(0, 0, GAME.element.width, GAME.element.height);

	// Draw entities
	for (let i = 0; i < GAME.penguins.length; i++) GAME.penguins[i].draw();
	for (let i = 0; i < GAME.entities.length; i++) GAME.entities[i].draw();

	stats.end();
	window.requestAnimationFrame(loop);
}

// Start loop
loop();
