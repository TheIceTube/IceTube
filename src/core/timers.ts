import { Penguin } from './entities/penguin';
import { State, GameState } from './state';
import { randomInteger, requestInterval, randomFromArray } from './utils';

// Get state
const GAME: GameState = State<GameState>();

const news = document.getElementById('news');

/**
 * Init news blocks
 */
function initNewsBlocks() {
	const elements = ['one', 'two', 'last'];

	GAME.lastNewsBlock = 3;
	news.innerHTML = '';
	
	for (let i = 0; i < elements.length; i++) {
		const block = GAME.newsBlocks[i];

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
	const index = GAME.lastNewsBlock;
	const block = GAME.newsBlocks[index];

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

	// Update interests
	GAME.interest.gaming = Math.floor((GAME.interest.gaming + block.gaming) / 2);
	GAME.interest.films = Math.floor((GAME.interest.films + block.films) / 2);
	GAME.interest.music = Math.floor((GAME.interest.music + block.music) / 2);
	GAME.interest.sport = Math.floor((GAME.interest.sport + block.sport) / 2);
	GAME.interest.politics = Math.floor((GAME.interest.politics + block.politics) / 2);
	GAME.interest.educational = Math.floor((GAME.interest.educational + block.educational) / 2);

    // Clamp down
    if (GAME.interest.gaming < 0) GAME.interest.gaming = 0;
    if (GAME.interest.films < 0) GAME.interest.films = 0;
    if (GAME.interest.music < 0) GAME.interest.music = 0;
    if (GAME.interest.sport < 0) GAME.interest.sport = 0;
    if (GAME.interest.politics < 0) GAME.interest.politics = 0;
    if (GAME.interest.educational < 0) GAME.interest.educational = 0;

    // Clamp up
    if (GAME.interest.gaming > 10) GAME.interest.gaming = 10;
    if (GAME.interest.films > 10) GAME.interest.films = 10;
    if (GAME.interest.music > 10) GAME.interest.music = 10;
    if (GAME.interest.sport > 10) GAME.interest.sport = 10;
    if (GAME.interest.politics > 10) GAME.interest.politics = 10;
    if (GAME.interest.educational > 10) GAME.interest.educational = 10;

	GAME.lastNewsBlock += 1;
	if (GAME.lastNewsBlock >= GAME.newsBlocks.length) GAME.lastNewsBlock = 0;
}

// New news
requestInterval(() => {
	if (GAME.paused) return;
    nextNewsBlock();
    console.log(GAME.interest);
}, 5000);

// Relevance update
requestInterval(() => {
	if (GAME.paused) return;
    
    GAME.relevance -= 0.1;
    if (GAME.relevance < 0) GAME.relevance = 0;
    if (GAME.relevance > 2) GAME.relevance = 2;
}, 1000);

// Remove penguin from array each seccond
requestInterval(() => {
	if (GAME.paused) return;

    const chance = randomInteger(0, 2);

    if (chance >= GAME.relevance) {
        removePenguin();
    } else {
        addPenguin();
    }
 }, 100);

initNewsBlocks();


function removePenguin() {
    const index = randomFromArray(GAME.entities);
    const entity = GAME.entities[index];
    if (entity.type === 'penguin') entity.state = 'leaving';    

    if (GAME.entities.length === 1) {
        GAME.paused = true;
    }
}

function addPenguin() {
    const x = randomInteger(0, GAME.element.width);
    const y = randomInteger(GAME.element.height / 3, GAME.element.height - 64);
    const penguin = new Penguin(x, y);
    GAME.entities.push(penguin); 
}