import { Penguin } from './entities/penguin';
import { State, GameState } from './state';
import { randomInteger, requestInterval, depthSort, average, requestTimeout } from './utils';

// Get state
const GAME: GameState = State();


// // Speedup timer
// let newsUpdateTime = 10000;
// requestInterval(() => {
// 	if (newsUpdateTime <= 5000) return;

// 	newsUpdateTime -= 500;
// 	newsInterval(newsUpdateTime);
// }, 20000);

// Relevance update
requestInterval(() => {
	if (GAME.paused) return;
	if (!GAME.started) return;

	GAME.relevance -= 0.03;
	if (GAME.relevance > 1.2) GAME.relevance -= 0.02;
	

	if (GAME.relevance < 0) GAME.relevance = 0;
	if (GAME.relevance > 2) GAME.relevance = 2;
}, 1000);

// TODO: Optimize Penguins view, increase penguins number without creating more entities

// Spawn penguins
requestInterval(() => {
	if (GAME.paused) return;
	if (!GAME.started) return;

	const spawnCoefficent = 5;
	const penguinMultiplier = GAME.entities.length / spawnCoefficent;

	let toSpawn = Math.floor(penguinMultiplier * GAME.relevance) - penguinMultiplier;
	if (GAME.relevance > 1) toSpawn += 1;

	for (let i = 0; i < toSpawn; i++) {
		const x = randomInteger(0, GAME.element.width);
		const y = randomInteger(GAME.element.height / 3, GAME.element.height - 64);
		const penguin = new Penguin(x, y);
		GAME.entities.push(penguin);
	}

	depthSort(GAME.entities);

}, 1000);
