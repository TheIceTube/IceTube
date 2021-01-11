import { Penguin } from './entities/penguin';
import { State, GameState } from './state';
import { randomInteger, requestInterval, insertionSort, average, requestTimeout } from './utils';

// Get state
const GAME: GameState = State();

// Elements
const news = document.getElementById('news');

// Show news blocks
const newsInterval = requestInterval(() => {
	if (GAME.paused) return;
	nextNewsBlock();
}, 1000);

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

	insertionSort(GAME.entities, 'y');
}, 1000);

/**
 * Next news block
 */
function nextNewsBlock() {
	const index = GAME.newsIndex;
	const latest = GAME.news[index];

	// Remove old news block
	const blockOld = news.querySelector('.old');
	if (blockOld) blockOld.remove();

	// Move all blocks
	const blockOne = news.querySelector('.block.one');
	if (blockOne) {
		blockOne.classList.remove('one');
		blockOne.classList.add('old');
	}

	const blockTwo = news.querySelector('.block.two');
	if (blockTwo) {
		blockTwo.classList.add('one');
		blockTwo.classList.remove('two');
	}

	const blockThree = news.querySelector('.block.three');
	if (blockThree) {
		blockThree.classList.add('two');
		blockThree.classList.remove('three');
	}
	
	// Create next post
	const blockNew = document.createElement('div');
	blockNew.className = 'block new';

	// Title
	const title = document.createElement('h3');
	title.innerText = latest.title;

	// Content
	const content = document.createElement('p');
	content.innerText = latest.content;

	// Build element
	blockNew.appendChild(title);
	blockNew.appendChild(content);
	news.appendChild(blockNew);

	// Make new block 
	setTimeout(() => {
		blockNew.className = 'block three';
	});

	// (document.getElementById('newPost') as HTMLButtonElement).disabled = false;

	GAME.newsIndex += 1;
	if (GAME.newsIndex >= GAME.news.length) GAME.newsIndex = 0;
}
