import { State, GameState } from './state';
import { shuffle, requestInterval, requestTimeout } from './utils';

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
	GAME.lastNewsBlock = 2;
	news.innerHTML = '';

	for (let i = 0; i < 4; i++) {
		const block = GAME.newsBlocks[i];
		const blockType = i === 3 ? 'next' : i + 1;

		// Create next post
		const newsPostNext = document.createElement('div');
		newsPostNext.className = `news-post post-${blockType}`;

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

	// Remove old post
	const postOld = news.querySelector('.post-old');
	if (postOld) postOld.remove();

	// Move all posts
	const post1 = news.querySelector('.post-1');
	if (post1) post1.className = 'news-post post-old';

	const post2 = news.querySelector('.post-2');
	if (post2) post2.className = 'news-post post-1';

	const post3 = news.querySelector('.post-3');
	if (post3) post3.className = 'news-post post-2';

	const postNext = news.querySelector('.post-next');
	if (postNext) postNext.className = 'news-post post-3';

	// Create next post
	const newsPostNext = document.createElement('div');
	newsPostNext.className = 'news-post post-next';

	// Title
	const title = document.createElement('h3');
	title.innerText = block.title;

	// Content
	const content = document.createElement('p');
	content.innerText = block.content;

	newsPostNext.appendChild(title);
	newsPostNext.appendChild(content);
	news.appendChild(newsPostNext);

	// Update interests
	GAME.interest.gaming = Math.floor((GAME.interest.gaming + block.gaming) / 2);
	GAME.interest.films = Math.floor((GAME.interest.films + block.films) / 2);
	GAME.interest.music = Math.floor((GAME.interest.music + block.music) / 2);
	GAME.interest.news = Math.floor((GAME.interest.news + block.news) / 2);
	GAME.interest.sport = Math.floor((GAME.interest.sport + block.sport) / 2);
	GAME.interest.educational = Math.floor((GAME.interest.educational + block.educational) / 2);

	GAME.lastNewsBlock += 1;
	if (GAME.lastNewsBlock >= GAME.newsBlocks.length) GAME.lastNewsBlock = 0;
}

requestInterval(() => {
	if (GAME.paused) return;
	nextNewsBlock();
}, 5000);

initNewsBlocks();
