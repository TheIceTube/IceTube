import { Player } from './entities/player';
import { State, GameState } from './state';
import { requestInterval, numberWithCommas } from './utils';

// Get state
const GAME: GameState = State();

// Elements
const news = document.getElementById('news');
const modal = document.getElementById('modal');
const overlay = document.getElementById('overlay');
const pauseMenu = document.getElementById('pause-menu');
const counter = document.getElementById('counter');
const selectedNews = document.getElementById('selected');

// Buttons
const gamingButton = document.getElementById('gaming');
const educationalButton = document.getElementById('educational');
const politicsButton = document.getElementById('politics');
const filmsButton = document.getElementById('films');
const musicButton = document.getElementById('music');
const sportButton = document.getElementById('sport');
const postButton = document.getElementById('post') as HTMLButtonElement;
const relevanceBar = document.getElementById('relevance-bar');

// Update fish counter
requestInterval(() => {
	counter.innerText = numberWithCommas(GAME.fish);
}, 100);

// Request news block
requestInterval(() => {
	if (GAME.paused) return;
	nextNewsBlock();
}, 2000);


//Update revelence bar
requestInterval(() => {
	const revelance = Math.floor(GAME.relevance * 50);
	relevanceBar.style.width = `${revelance}%`;

	if (revelance < 30) {
		relevanceBar.style.backgroundColor = '#f35858'
	} else if (revelance > 70) {
		relevanceBar.style.backgroundColor = '#5ef358'
	} else {
		relevanceBar.style.backgroundColor = '#5893f3'
	}
}, 100);

// New post creating
postButton.addEventListener('click', () => {
	GAME.posted = false;
	createPost();
	hideModals();
});

// Hide modals in overlay click
overlay.addEventListener('click', () => {
	hideModals();
});

// Pause menu on Escape press
window.addEventListener('keydown', event => {
	if (event.key === 'Escape') {
		if (GAME.paused) {
			GAME.paused = false
			hideModals();
		} else {
			GAME.paused = true;
			pauseMenu.style.display = 'block';
			overlay.style.opacity = '1';
			overlay.style.pointerEvents = 'auto';
		}
	}
});

//Buttons for the new post thingy
gamingButton.addEventListener('click', () => {
	unpressButtons();
	postButton.disabled = false;
	gamingButton.classList.contains('active')
		? gamingButton.classList.remove('active')
		: gamingButton.classList.add('active');
});

educationalButton.addEventListener('click', () => {
	unpressButtons();
	postButton.disabled = false;
	educationalButton.classList.contains('active')
		? educationalButton.classList.remove('active')
		: educationalButton.classList.add('active');
});

// Film theme selection
filmsButton.addEventListener('click', () => {
	unpressButtons();
	postButton.disabled = false;
	filmsButton.classList.contains('active')
		? filmsButton.classList.remove('active')
		: filmsButton.classList.add('active');
});

// Politics theme selection
politicsButton.addEventListener('click', () => {
	unpressButtons();
	postButton.disabled = false;
	politicsButton.classList.contains('active')
		? politicsButton.classList.remove('active')
		: politicsButton.classList.add('active');
});

// Music theme selection
musicButton.addEventListener('click', () => {
	unpressButtons();
	postButton.disabled = false;
	musicButton.classList.contains('active')
		? musicButton.classList.remove('active')
		: musicButton.classList.add('active');
});

// Sports theme selection
sportButton.addEventListener('click', () => {
	unpressButtons();
	postButton.disabled = false;
	sportButton.classList.contains('active')
		? sportButton.classList.remove('active')
		: sportButton.classList.add('active');
});

/**
 * Unpress all theme buttons 
 */
function unpressButtons(): void {
	gamingButton.classList.remove('active');
	educationalButton.classList.remove('active');
	filmsButton.classList.remove('active');
	politicsButton.classList.remove('active');
	musicButton.classList.remove('active');
	sportButton.classList.remove('active');
}

/**
 * Create new post
 */
function createPost(): void {
	const index = GAME.selectedNewsIndex;
	const current = GAME.news[index];

	GAME.started = true;

	let selectedTheme = document.querySelector('button.active');
	if (selectedTheme === null) return;

	const selectedNewsBlock = news.querySelector(`[news-index="${index}"]`);
	if (selectedNewsBlock) selectedNewsBlock.classList.add('posted');

	// Penguin Animation
	const player = GAME.entities.find(entity => entity.type === 'player') as Player;
	player.state = 'speaking';
	player.speakFrame = 0;

	// TODO: Fake news check
	// TODO: Build this value from multiple factors
	// TODO: Lower relevance if you choosen incorect theme
	if (current.theme === selectedTheme.id) GAME.relevance += 0.5;
	GAME.posted = true;
}

/**
 * Next news block
 */
function nextNewsBlock() {
	const index = GAME.newsIndex;
	const current = GAME.news[index];

	const blockOld = news.querySelector('.old');
	if (blockOld) blockOld.remove();

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
	const title = document.createElement('h3');
	title.innerText = current.title;
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
			showCreatePostModal();
		};
	});

	GAME.newsIndex += 1;
	if (GAME.newsIndex >= GAME.news.length) GAME.newsIndex = 0;
}

/**
 * Show post creating modal
 */
function showCreatePostModal(): void {
	const index = GAME.selectedNewsIndex;
	const current = GAME.news[index];

	// Create post element
	const blockNew = document.createElement('div');
	blockNew.className = 'block new';
	const title = document.createElement('h3');
	title.innerText = current.title;
	const content = document.createElement('p');
	content.innerText = current.content;

	blockNew.appendChild(title);
	blockNew.appendChild(content);

	selectedNews.innerHTML = '';
	selectedNews.appendChild(blockNew);

	postButton.disabled = true;
	modal.style.top = '32px';
	overlay.style.opacity = '1';
	overlay.style.pointerEvents = 'auto';
	GAME.element.style.transform = 'scale(2) translateY(-32px)';
	GAME.paused = true;
}

/**
 * Hide post creating modal
 */
function hideModals(): void {
	postButton.disabled = true;
	modal.style.top = '100%';
	overlay.style.opacity = '0';
	pauseMenu.style.display = 'none';
	overlay.style.pointerEvents = 'none';
	GAME.element.style.transform = 'scale(1)';
	GAME.paused = false;
	unpressButtons();
}
