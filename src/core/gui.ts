import { State, GameState } from './state';
import { Penguin } from './entities/penguin';
import { Characters } from './entities/characters';
import { requestInterval, requestTimeout } from './timers';
import { numberWithCommas, randomInteger, insertionSort } from './utils';
import { playClickSound, playClick2Sound, playMoveSound, playPaperSound, playSirenSound } from './audio';

// Get state
const GAME: GameState = State();

// Elements
const news = document.getElementById('news');
const overlay = document.getElementById('overlay');
const counter = document.getElementById('counter');
const pauseMenu = document.getElementById('pause-menu');
const postModal = document.getElementById('post-modal');
const selectedNews = document.getElementById('selected');
const relevanceBar = document.getElementById('relevance-bar');

// Buttons
const gamingButton = document.getElementById('gaming');
const educationalButton = document.getElementById('educational');
const politicsButton = document.getElementById('politics');
const filmsButton = document.getElementById('films');
const musicButton = document.getElementById('music');
const sportButton = document.getElementById('sport');
const postButton = document.getElementById('post') as HTMLButtonElement;

// Update GUI elements
requestInterval(() => {
	// Fish counter
	counter.innerText = numberWithCommas(GAME.fish);

	// Bar width update
	let percent: number = Math.floor(GAME.relevance * 50);
	if (percent > 100) percent = 100;
	relevanceBar.style.width = `${percent}%`;

	// Bar color
	if (GAME.relevance < 0.5) {
		relevanceBar.style.backgroundColor = '#f35858';
	} else if (GAME.relevance > 1.5) {
		relevanceBar.style.backgroundColor = '#5ef358';
	} else {
		relevanceBar.style.backgroundColor = '#5893f3';
	}
}, 100);

// Increase tempo
requestInterval(() => {
	if (GAME.started === false) return;
	GAME.tempo += 0.2;
}, 1000);

// Request news block
const newsInterval = requestInterval(() => {
	playMoveSound();
	nextNewsBlock();

	// Update interval
	const nextDelay = Math.floor(5000 - (100 * GAME.tempo));
	newsInterval(nextDelay > 500 ? nextDelay : 500)
}, 7500);

// New post creating
postButton.addEventListener('click', () => {
	playClickSound();
	createPost();
	hideModals();
});

// Hide modals in overlay click
overlay.addEventListener('click', () => {
	playClick2Sound();
	hideModals();
});

// Pause menu on Escape press
window.addEventListener('keydown', event => {
	if (event.key === 'Escape') {
		if (GAME.paused) {
			GAME.paused = false;
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
	playClickSound();
	postButton.disabled = false;
	gamingButton.classList.contains('active') ? gamingButton.classList.remove('active') : gamingButton.classList.add('active');
});

educationalButton.addEventListener('click', () => {
	unpressButtons();
	playClickSound();
	postButton.disabled = false;
	educationalButton.classList.contains('active') ? educationalButton.classList.remove('active') : educationalButton.classList.add('active');
});

// Film theme selection
filmsButton.addEventListener('click', () => {
	unpressButtons();
	playClickSound();
	postButton.disabled = false;
	filmsButton.classList.contains('active') ? filmsButton.classList.remove('active') : filmsButton.classList.add('active');
});

// Politics theme selection
politicsButton.addEventListener('click', () => {
	unpressButtons();
	playClickSound();
	postButton.disabled = false;
	politicsButton.classList.contains('active') ? politicsButton.classList.remove('active') : politicsButton.classList.add('active');
});

// Music theme selection
musicButton.addEventListener('click', () => {
	unpressButtons();
	playClickSound();
	postButton.disabled = false;
	musicButton.classList.contains('active') ? musicButton.classList.remove('active') : musicButton.classList.add('active');
});

// Sports theme selection
sportButton.addEventListener('click', () => {
	unpressButtons();
	playClickSound();
	postButton.disabled = false;
	sportButton.classList.contains('active') ? sportButton.classList.remove('active') : sportButton.classList.add('active');
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
	const penguinsAmount = GAME.penguins.length - 1;

	// Unpress last active button
	let selectedTheme = document.querySelector('button.active');
	if (selectedTheme === null) return;

	// Mark news as posted
	const selectedNewsBlock = news.querySelector(`[news-index="${index}"]`);
	if (selectedNewsBlock) selectedNewsBlock.classList.add('posted');

	// Penguin Animation
	const characters = GAME.penguins.find(entity => entity.type === 'characters') as Characters;
	characters.state = 'speaking';
	characters.speakFrame = 0;

	// If fake post
	if (current.fake) {
		playSirenSound();

		GAME.penguins.forEach(penguin => {
			if (penguin.type !== 'penguin') return;
			if (penguin.state !== 'walking') return;

			penguin.setMood('angry');
		});

		GAME.relevance -= 0.5;
		if (GAME.relevance < 0) GAME.relevance = 0;
		return;
	}

	// If wrong theme
	if (current.theme !== selectedTheme.id) {
		GAME.penguins.forEach(penguin => {
			if (penguin.type !== 'penguin') return;
			if (penguin.state !== 'walking') return;

			penguin.setMood('bored');
		});

		GAME.relevance -= 0.25;
		if (GAME.relevance < 0) GAME.relevance = 0;
		return;
	}

	// Calculate amount of penguins to spawn
	let toSpawn = Math.ceil(penguinsAmount * 0.5);
	if (GAME.relevance > 1.5) toSpawn += 1;
	if (penguinsAmount < 25) toSpawn += 1;

	// Skip spawning if too much penguins
	if (penguinsAmount > 1000) return;

	// Spawn penguins
	for (let i = 0; i < toSpawn; i++) {
		const x = randomInteger(0, GAME.element.width);
		const y = randomInteger(GAME.element.height / 3, GAME.element.height - 64);
		const penguin = new Penguin(x, y);
		GAME.penguins.push(penguin);	
	}

	// Sort penguins
	insertionSort(GAME.penguins, 'y');

	// Update maximum penguins value
	const newPenguinsAmount = GAME.penguins.length - 1
	GAME.maximumPenguins = newPenguinsAmount;
	if (newPenguinsAmount < GAME.maximumPenguins) GAME.maximumPenguins = newPenguinsAmount;

	GAME.relevance += 0.5;
	if (GAME.relevance > 2) GAME.relevance = 2;
	if (GAME.relevance <= 0.75) GAME.relevance = 1;
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
	window.requestAnimationFrame(() => {
		blockNew.className = 'block three';
		blockNew.onclick = () => {
			GAME.selectedNewsIndex = index;
			showPostModal();
			playClickSound();
		};
	});

	GAME.newsIndex += 1;
	if (GAME.newsIndex >= GAME.news.length) GAME.newsIndex = 0;
}

/**
 * Show post creating modal
 */
function showPostModal(): void {
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
	postModal.style.top = '10vh';
	overlay.style.opacity = '1';
	overlay.style.pointerEvents = 'auto';
	GAME.paused = true;
}

/**
 * Hide post creating modal
 */
function hideModals(): void {
	postButton.disabled = true;
	postModal.style.top = '100%';
	overlay.style.opacity = '0';
	pauseMenu.style.display = 'none';
	overlay.style.pointerEvents = 'none';
	GAME.paused = false;
	unpressButtons();
}
