import Stats from 'stats.js';
import { State, GameState } from './state';
import { requestInterval } from './timers';
import { randomInteger, insertionSort } from './utils';
import { startMusic } from './audio';

import { levels } from '../coefficents.json';

// Entities
import { Penguin } from './entities/penguin';
import { Player } from './entities/player';

// Stats setup
const stats = new Stats();
stats.showPanel(0);
if (process.env.NODE_ENV === 'development') document.body.appendChild(stats.dom);

// Get state
const GAME: GameState = State();

// Spawn main penguin player
const player = new Player();
GAME.penguins.push(player);

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
	// If game paused
	if (GAME.paused) {
		window.requestAnimationFrame(loop);
		return;
	}

	//Game ends
	if (checkEnd()) {	

		GAME.paused = true;

		document.getElementById('final-fish-count').innerText = `${GAME.fish}`;
		document.getElementById('end-screen').style.transform = 'translate( -50%, -50%)';

		overlay.style.opacity = '1';
		overlay.style.pointerEvents = 'auto';
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

	GAME.relevance -= GAME.coefficents.relevanceDeduction;
	if (GAME.relevance > 1.5) GAME.relevance -= GAME.coefficents.relevanceDeduction;
	
	if (GAME.relevance < 0) GAME.relevance = 0;
	if (GAME.relevance > 2) GAME.relevance = 2;
}, 1000);

// Spawn penguins
requestInterval(() => {
	if (!GAME.started) return;
	const penguinsAmount = GAME.penguins.length - 1;

	// Calculate amount of penguins to spawn
	let toSpawn = Math.ceil(penguinsAmount * GAME.coefficents.penguinsMultiplier);
	if (GAME.relevance > 1.5) toSpawn += 1;

	// Skip spawning if too much penguins
	if (penguinsAmount > GAME.coefficents.maximumPenguins) return;

	// Spawn penguins
	for (let i = 0; i < toSpawn; i++) {
		const x = randomInteger(0, GAME.element.width);
		const y = randomInteger(GAME.element.height / 4, GAME.element.height - 64);
		const penguin = new Penguin(x, y);
		GAME.penguins.push(penguin);		
	}

	// Depth sort
	insertionSort(GAME.penguins, 'y');
}, 1000);

// Update coefficents
requestInterval(() => {
	const score = GAME.score;
	
	for (let i = 0; i < levels.length; i++) {
		const level = levels[i];
	
		if (level.score <= score) {
			GAME.level = level.level;
			GAME.coefficents.relevanceDeduction = level.relevanceDeduction;
			GAME.coefficents.relevanceAddition = level.relevanceAddition;
			GAME.coefficents.maximumPenguins = level.maximumPenguins;
			GAME.coefficents.penguinsMultiplier = level.penguinsMultiplier;
			GAME.coefficents.penguinsInvolvment = level.penguinsInvolvment;
			GAME.coefficents.newsUpadateDelay = level.newsUpadateDelay;
			GAME.coefficents.fishDespawnFrames = level.fishDespawnFrames;
			continue;
		}
		break;
	}

	console.log(GAME.level, GAME.score);

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

function checkEnd(){
	if ((GAME.penguins.length - 1) === 0 || GAME.relevance === 0 ) {
		return true;
	}
 }
