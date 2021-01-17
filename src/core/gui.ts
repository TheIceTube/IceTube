import { State, GameState } from './state';
import { requestInterval } from './timers';
import { numberWithCommas } from './utils';
import { playClickSound, playClick2Sound, playPaperSound, startMusic } from './audio';

// Get state
const GAME: GameState = State();

// Elements
const counter = document.getElementById('counter');
const tutorial = document.getElementById('tutorial');
const selectedNews = document.getElementById('selected');
const blackScreen = document.getElementById('black-screen');
const relevanceBar = document.getElementById('relevance-bar');
const startButton = document.getElementById('start-button');
const startMenu = document.getElementById('start-menu');

const nextButton = document.getElementById('next-button');
const comics = document.getElementById('comics');

// Post modal
const postModal = document.getElementById('post-modal');
const postOverlay = document.getElementById('post-overlay');
const postButton = document.getElementById('post-button') as HTMLButtonElement;

// Buttons
const gamingButton = document.getElementById('gaming');
const educationButton = document.getElementById('education');
const politicsButton = document.getElementById('politics');
const filmsButton = document.getElementById('films');
const musicButton = document.getElementById('music');
const sportButton = document.getElementById('sport');

blackScreen.classList.remove('visible');

startButton.addEventListener('click', () => {
	playClickSound();
	blackScreen.classList.add('visible');

	setTimeout(() => {
		startMusic();
		startMenu.remove();
		blackScreen.classList.remove('visible');
		comics.classList.add('visible');
	}, 1000);
});

nextButton.addEventListener('click', () => {
	playPaperSound();
	playClickSound();
	blackScreen.classList.add('visible');

	setTimeout(() => {
		blackScreen.classList.remove('visible');
		comics.classList.remove('visible');

		GAME.paused = false;
	}, 1000);
});

// Setup 
blackScreen.classList.add();

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

// Hide modals in overlay click
postOverlay.addEventListener('click', () => {
	playClick2Sound();
	hidePostModals();
});

// Pause menu on Escape press
window.addEventListener('keydown', event => {
	if (event.key === 'Escape') {
		if (GAME.paused && GAME.penguins.length > 1) {
			GAME.paused = false;
			tutorial.classList.remove('visible');
			hidePostModals();
		} else {
			GAME.paused = true;
			playPaperSound();
			tutorial.classList.add('visible');
		}
	}
});

//Buttons for the new post thingy
gamingButton.addEventListener('click', () => {
	unpressThemeButtons();
	playClickSound();
	postButton.disabled = false;
	gamingButton.classList.contains('active') ? gamingButton.classList.remove('active') : gamingButton.classList.add('active');
});

educationButton.addEventListener('click', () => {
	unpressThemeButtons();
	playClickSound();
	postButton.disabled = false;
	educationButton.classList.contains('active') ? educationButton.classList.remove('active') : educationButton.classList.add('active');
});

// Film theme selection
filmsButton.addEventListener('click', () => {
	unpressThemeButtons();
	playClickSound();
	postButton.disabled = false;
	filmsButton.classList.contains('active') ? filmsButton.classList.remove('active') : filmsButton.classList.add('active');
});

// Politics theme selection
politicsButton.addEventListener('click', () => {
	unpressThemeButtons();
	playClickSound();
	postButton.disabled = false;
	politicsButton.classList.contains('active') ? politicsButton.classList.remove('active') : politicsButton.classList.add('active');
});

// Music theme selection
musicButton.addEventListener('click', () => {
	unpressThemeButtons();
	playClickSound();
	postButton.disabled = false;
	musicButton.classList.contains('active') ? musicButton.classList.remove('active') : musicButton.classList.add('active');
});

// Sports theme selection
sportButton.addEventListener('click', () => {
	unpressThemeButtons();
	playClickSound();
	postButton.disabled = false;
	sportButton.classList.contains('active') ? sportButton.classList.remove('active') : sportButton.classList.add('active');
});

/**
 * Unpress all theme buttons
 */
function unpressThemeButtons(): void {
	gamingButton.classList.remove('active');
	educationButton.classList.remove('active');
	filmsButton.classList.remove('active');
	politicsButton.classList.remove('active');
	musicButton.classList.remove('active');
	sportButton.classList.remove('active');
}

/**
 * Show post creating modal
 */
export function showPostModal(): void {
	const index = GAME.selectedNewsIndex;
	const current = GAME.news[index];

	// Create post element
	const blockNew = document.createElement('div');
	blockNew.className = 'block';
	const title = document.createElement('h3');
	title.innerText = current.title;
	const content = document.createElement('p');
	content.innerText = current.content;

	blockNew.appendChild(title);
	blockNew.appendChild(content);

	selectedNews.innerHTML = '';
	selectedNews.appendChild(blockNew);

	postButton.disabled = true;
	postModal.classList.add('visible');
	postOverlay.classList.add('visible');
	GAME.paused = true;
}

/**
 * Hide post creating modal
 */
export function hidePostModals(): void {
	GAME.paused = false;

	postButton.disabled = true;
	postModal.classList.remove('visible');
	postOverlay.classList.remove('visible');
	unpressThemeButtons();
}
