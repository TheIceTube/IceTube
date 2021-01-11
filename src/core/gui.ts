import { State, GameState } from './state';
import { requestInterval } from './utils';

// Get state
const GAME: GameState = State();

// Elements
const news = document.getElementById('news');
const overlay = document.getElementById('overlay');
const modal = document.getElementById('modal');
const menu = document.getElementById(`menu`);
const postBut = document.getElementById('post');
const pause = document.getElementById(`pauseMenu`);

const gameButt = document.getElementById('gaming');
const bookButt = document.getElementById('educational');
const poliButt = document.getElementById('politics');
const filmButt = document.getElementById('films');
const musicButt = document.getElementById('music');
const sportsButt = document.getElementById('sport');

requestInterval(() => {
	if (GAME.paused) return;
	nextNewsBlock();
}, 1000);



postBut.addEventListener('click', () => {
	createPost();
	unpressButtons();
	hideModal();
});

overlay.addEventListener('click', () => {
	menu.style.left = '-150%';
	modal.style.top = '200%';
	overlay.style.opacity = '0';
	overlay.style.pointerEvents = 'none';
	GAME.element.style.transform = 'scale(1)';
	GAME.paused = false;
	unpressButtons();
});

pause.addEventListener('click', () => {
	GAME.paused = true;
	menu.style.left = '50%';
	overlay.style.opacity = '1';
	overlay.style.pointerEvents = 'auto';
});

//Buttons for the new post thingy
gameButt.addEventListener('click', () => {
	if (!gameButt.classList.contains('active')) {
		unpressButtons();
		gameButt.classList.add('active');
	} else {
		gameButt.classList.remove('active');
	}
});

bookButt.addEventListener('click', () => {
	if (!bookButt.classList.contains('active')) {
		unpressButtons();
		bookButt.classList.add('active');
	} else {
		bookButt.classList.remove('active');
	}
});

//Buttons for the new post thingy
filmButt.addEventListener('click', () => {
	if (!filmButt.classList.contains('active')) {
		unpressButtons();
		filmButt.classList.add('active');
	} else {
		filmButt.classList.remove('active');
	}
});

poliButt.addEventListener('click', () => {
	if (!poliButt.classList.contains('active')) {
		unpressButtons();
		poliButt.classList.add('active');
	} else {
		poliButt.classList.remove('active');
	}
});

//Buttons for the new post thingy
musicButt.addEventListener('click', () => {
	if (!musicButt.classList.contains('active')) {
		unpressButtons();
		musicButt.classList.add('active');
	} else {
		musicButt.classList.remove('active');
	}
});

sportsButt.addEventListener('click', () => {
	if (!sportsButt.classList.contains('active')) {
		unpressButtons();
		sportsButt.classList.add('active');
	} else {
		sportsButt.classList.remove('active');
	}
});

function unpressButtons(): void {
	gameButt.classList.remove('active');
	bookButt.classList.remove('active');
	filmButt.classList.remove('active');
	poliButt.classList.remove('active');
	musicButt.classList.remove('active');
	sportsButt.classList.remove('active');
}

function createPost() {
	const index = GAME.selectedNewsIndex;
	const current = GAME.news[index];

	GAME.started = true;

	let selectedTheme = document.querySelector('button.active');
	if (selectedTheme === null) return;

	const selectedNewsBlock = news.querySelector(`[news-index="${index}"]`);
	if (selectedNewsBlock) selectedNewsBlock.classList.add('posted');

	// TODO: Fake news check
	// TODO: Build this value from multiple factors
	// TODO: Lower relevance if you choosen incorect theme
	if (current.theme === selectedTheme.id) GAME.relevance += 0.5;
}

/**
 * Next news block
 */
function nextNewsBlock() {
	const index = GAME.newsIndex;
	const current = GAME.news[index];

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
	blockNew.setAttribute('news-index', `${index}`);

	// Title
	const title = document.createElement('h3');
	title.innerText = current.title;

	// Content
	const content = document.createElement('p');
	content.innerText = current.content;

	// Build element
	blockNew.appendChild(title);
	blockNew.appendChild(content);
	news.appendChild(blockNew);

	// Make new block
	setTimeout(() => {
		blockNew.className = 'block three';

		blockNew.onclick = () => {
			GAME.selectedNewsIndex = index;
			showModal();
		};
	});

	GAME.newsIndex += 1;
	if (GAME.newsIndex >= GAME.news.length) GAME.newsIndex = 0;
}

function showModal() {
	const index = GAME.selectedNewsIndex;
	const current = GAME.news[index];

	// Create next post
	const blockNew = document.createElement('div');
	blockNew.className = 'block new';

	// Title
	const title = document.createElement('h3');
	title.innerText = current.title;

	// Content
	const content = document.createElement('p');
	content.innerText = current.content;

	blockNew.appendChild(title);
	blockNew.appendChild(content);

	document.getElementById('selected').innerHTML = '';
	document.getElementById('selected').appendChild(blockNew);

	modal.style.top = '32px';
	overlay.style.opacity = '1';
	overlay.style.pointerEvents = 'auto';
	GAME.element.style.transform = 'scale(2) translateY(-32px)';
	GAME.paused = true;
}

function hideModal() {
	modal.style.top = '100%';
	overlay.style.opacity = '0';
	overlay.style.pointerEvents = 'none';
	GAME.element.style.transform = 'scale(1)';
	GAME.paused = false;
	unpressButtons();
}
