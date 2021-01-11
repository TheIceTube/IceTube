import { State, GameState } from './state';
import { requestInterval } from './utils';

// Get state
const GAME: GameState = State();

// Elements
const newPost = document.getElementById('newPost') as HTMLButtonElement;
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

// UI
newPost.addEventListener('click', () => {
	modal.style.top = '45%';
	overlay.style.opacity = '1';
	overlay.style.pointerEvents = 'auto';
	GAME.element.style.transform = 'scale(2) translateY(-32px)';
	GAME.paused = true;
});

postBut.addEventListener('click', () => {
	modal.style.top = '150%';
	overlay.style.opacity = '0';
	overlay.style.pointerEvents = 'none';
	GAME.element.style.transform = 'scale(1)';
	GAME.paused = false;

	createPost();
	unpressButtons();
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
	let topTheme = 'gaming';
	let highestInterest = 0;

	GAME.started = true;

	for(const key in GAME.interests) {
		const interest = GAME.interests[key];
		
		if (interest >= highestInterest) {
			topTheme = key;
			highestInterest = interest;
		}
	}

	let selectedTheme = document.querySelector('button.active');
	if (selectedTheme === null) return;

	console.log(selectedTheme.id, topTheme);
	
	// TODO: Build this value from multiple factors
	if (GAME.relevance < 0.5) GAME.relevance = 0.5
	if (selectedTheme.id === topTheme) GAME.relevance += 0.5;

	newPost.disabled = true;
}
