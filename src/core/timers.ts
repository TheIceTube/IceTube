import { Penguin } from './entities/penguin';
import { State, GameState } from './state';
import { randomInteger, requestInterval, randomFromArray } from './utils';

// Get state
const GAME: GameState = State();

// Elements
const news = document.getElementById('news');

// Show news blocks
requestInterval(() => {
	if (GAME.paused) return;
	nextNewsBlock();
	console.log(GAME.interests);
}, 5000);

// Relevance update
requestInterval(() => {
	if (GAME.paused) return;

	GAME.relevance -= 0.1;
	if (GAME.relevance < 0) GAME.relevance = 0;
	if (GAME.relevance > 2) GAME.relevance = 2;
}, 1000);

//
// TODO: Optimize Penguins view, increase penguins number without creating more entities
//

// Spawn penguins
requestInterval(() => {
	if (GAME.paused) return;
	const toSpawn = Math.floor((GAME.entities.length / 2) * GAME.relevance) - GAME.entities.length / 2;
	
	for (let i = 0; i < toSpawn; i++) {
		const x = randomInteger(0, GAME.element.width);
		const y = randomInteger(GAME.element.height / 3, GAME.element.height - 64);
		const penguin = new Penguin(x, y);
		GAME.entities.push(penguin);
	}
}, 1000);

/**
 * Init news blocks
 */
function initNewsBlocks() {
	const elements = ['one', 'two', 'last'];

	GAME.newsIndex = 3;
	news.innerHTML = '';

	for (let i = 0; i < elements.length; i++) {
		const block = GAME.news[i];

		// Create next post
		const newsPostNext = document.createElement('div');
		newsPostNext.className = `news-block ${elements[i]}`;

		// Title
		const title = document.createElement('h3');
		title.innerText = block.title;

		// Content
		const content = document.createElement('p');
		content.innerText = block.content;

		newsPostNext.appendChild(title);
		newsPostNext.appendChild(content);
		news.appendChild(newsPostNext);
	}
}

/**
 * Next news block
 */
function nextNewsBlock() {
	const index = GAME.newsIndex;
	const block = GAME.news[index];

	// Remove old news block
	const oldBlock = news.querySelector('.old');
	if (oldBlock) oldBlock.remove();

	// Create next post
	const nextBlock = document.createElement('div');
	nextBlock.className = 'news-block next';

	// Title
	const title = document.createElement('h3');
	title.innerText = block.title;

	// Content
	const content = document.createElement('p');
	content.innerText = block.content;

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

	const interests = GAME.interests;
	// Update interests
	interests.gaming = Math.floor((interests.gaming + block.gaming) / 2);
	interests.films = Math.floor((interests.films + block.films) / 2);
	interests.music = Math.floor((interests.music + block.music) / 2);
	interests.sport = Math.floor((interests.sport + block.sport) / 2);
	interests.politics = Math.floor((interests.politics + block.politics) / 2);
	interests.educational = Math.floor((interests.educational + block.educational) / 2);

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

	GAME.newsIndex += 1;
	if (GAME.newsIndex >= GAME.news.length) GAME.newsIndex = 0;
}

// Initialize news
initNewsBlocks();
		