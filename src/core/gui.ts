import { State, GameState } from './state';
import { requestInterval } from './utils';

// Get state
const GAME: GameState = State<GameState>();

// Elements
const news = document.getElementById('news');
const newPost = document.getElementById('newPost');
const overlay = document.getElementById('overlay');
const modal = document.getElementById('modal');
const menu = document.getElementById(`menu`);

const pause = document.getElementById(`pauseMenu`);

// UI
newPost.addEventListener('click', () => {
	modal.style.top = '45%';
	overlay.style.opacity = '1';
	overlay.style.pointerEvents = 'auto';
	GAME.element.style.transform = 'scale(2) translateY(-32px)';
});

overlay.addEventListener('click', () => {
	menu.style.left = '-150%';
	modal.style.top = '150%';
	overlay.style.opacity = '0';
	overlay.style.pointerEvents = 'none';
	GAME.element.style.transform = 'scale(1)';
	GAME.paused = false;
});

pause.addEventListener('click', () => {
	GAME.paused = true;
	menu.style.left = '50%';
	overlay.style.opacity = '1';
	overlay.style.pointerEvents = 'auto';
});


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
	GAME.interest.news = Math.floor((GAME.interest.news + block.news) / 2);
	GAME.interest.sport = Math.floor((GAME.interest.sport + block.sport) / 2);
	GAME.interest.educational = Math.floor((GAME.interest.educational + block.educational) / 2);

	console.log(GAME.interest);

	GAME.lastNewsBlock += 1;
	if (GAME.lastNewsBlock >= GAME.newsBlocks.length) GAME.lastNewsBlock = 0;
}

requestInterval(() => {
	if (GAME.paused) return;
	nextNewsBlock();
}, 5000);

requestInterval(() => {
	if (GAME.paused) return;
	nextNewsBlock();
}, 2000);

initNewsBlocks();
