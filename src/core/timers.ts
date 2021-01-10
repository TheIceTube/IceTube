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
}, 10000);

// Speedup timer
let newsUpdateTime = 10000;
requestInterval(() => {
	if (newsUpdateTime <= 5000) return;

	newsUpdateTime -= 500;
	newsInterval(newsUpdateTime);
}, 20000);

// TODO: Remove
let weShouldStopThisGame = false;

// Relevance update
requestInterval(() => {
	if (GAME.paused) return;
	if (!GAME.started) return;

	// TODO: Tricky pricky trick, REMOVE IT
	if (GAME.entities.length > 3000) weShouldStopThisGame = true;
	if (weShouldStopThisGame && GAME.relevance > 0.9) GAME.relevance -= 0.1;

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
	const interests = GAME.interests;

	const latest = GAME.news[index];
	const seccond = GAME.news[index - 1]
	const first = GAME.news[index - 2]
	
	// Remove old news block
	const oldBlock = news.querySelector('.old');
	if (oldBlock) oldBlock.remove();

	// Create next post
	const nextBlock = document.createElement('div');
	nextBlock.className = 'news-block next';

	// Title
	const title = document.createElement('h3');
	title.innerText = latest.title;

	// Content
	const content = document.createElement('p');
	content.innerText = latest.content;

	// Build element
	nextBlock.appendChild(title);
	nextBlock.appendChild(content);
	news.appendChild(nextBlock);

	// Move all blocks
	const blockOne = news.querySelector('.news-block.one');
	if (blockOne) blockOne.className = 'news-block old';

	const blockTwo = news.querySelector('.news-block.two');
	if (blockTwo) blockTwo.className = 'news-block one';

	const blockLast = news.querySelector('.news-block.last');
	if (blockLast) blockLast.className = 'news-block two';

	setTimeout(() => {
		const lastBlock = news.querySelector('.next');
		if (lastBlock) lastBlock.className = 'news-block last';
	});

	interests.gaming = average([
		latest.gaming, 
		seccond ? seccond.gaming : latest.gaming, 
		first ? first.gaming : latest.gaming, 
	]);

	interests.films = average([
		latest.films, 
		seccond ? seccond.films : latest.films, 
		first ? first.films : latest.films, 
	]);

	interests.music = average([
		latest.music, 
		seccond ? seccond.music : latest.music, 
		first ? first.music : latest.music, 
	]);

	interests.sport = average([
		latest.sport, 
		seccond ? seccond.sport : latest.sport, 
		first ? first.sport : latest.sport, 
	]);

	interests.politics = average([
		latest.politics, 
		seccond ? seccond.politics : latest.politics, 
		first ? first.politics : latest.politics, 
	]);

	interests.educational = average([
		latest.educational, 
		seccond ? seccond.educational : latest.educational, 
		first ? first.educational : latest.educational, 
	]);

	// Clamp down
	if (interests.gaming < 0) interests.gaming = 0;
	if (interests.films < 0) interests.films = 0;
	if (interests.music < 0) interests.music = 0;
	if (interests.sport < 0) interests.sport = 0;
	if (interests.politics < 0) interests.politics = 0;
	if (interests.educational < 0) interests.educational = 0;

	// Clamp up
	if (interests.gaming > 10) interests.gaming = 10;
	if (interests.films > 10) interests.films = 10;
	if (interests.music > 10) interests.music = 10;
	if (interests.sport > 10) interests.sport = 10;
	if (interests.politics > 10) interests.politics = 10;
	if (interests.educational > 10) interests.educational = 10;

	console.log(interests);
	(document.getElementById('newPost') as HTMLButtonElement).disabled = false;

	GAME.newsIndex += 1;
	if (GAME.newsIndex >= GAME.news.length) GAME.newsIndex = 0;
}
