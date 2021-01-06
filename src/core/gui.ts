import { State, GameState } from './state';
import { requestInterval } from './utils';

// Get state
const GAME: GameState = State();

// Elements
const newPost = document.getElementById('newPost');

const overlay = document.getElementById('overlay');

const modal = document.getElementById('modal');

const menu = document.getElementById(`menu`);

const postBut = document.getElementById('post')

const pause = document.getElementById(`pauseMenu`);

const gameButt = document.getElementById('game');
let gameButtPress = false;

const bookButt = document.getElementById('book');
let bookButtPress = false;


const poliButt = document.getElementById('politics');
let poliButtPress = false;

const filmButt = document.getElementById('movie');
let filmButtPress = false;


const musicButt = document.getElementById('music');
let musicButtPress = false;

const sportsButt = document.getElementById('book');
let sportsButtPress = false;




// UI
newPost.addEventListener('click', () => {
	GAME.relevance += 1;
	modal.style.top = '45%';
	overlay.style.opacity = '1';
	overlay.style.pointerEvents = 'auto';
	// GAME.element.style.transform = 'scale(2) translateY(-32px)';
});

postBut.addEventListener ('click', () => {
	modal.style.top = '150%';
	overlay.style.opacity = '0';
	overlay.style.pointerEvents = 'none';
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

//Buttons for the new post thingy
gameButt.addEventListener('click', () => {
	if (!gameButtPress) {
		gameButt.style.backgroundColor = "grey";
		gameButtPress = true;
	} else {
		gameButt.style.backgroundColor = "white";	
		gameButtPress = false;
	}

});

bookButt.addEventListener('click', () => {
	if (!bookButtPress) {
		bookButt.style.backgroundColor = "grey";
		bookButtPress = true;
	} else {
		bookButt.style.backgroundColor = "white";	
		bookButtPress = false;
	}
});

//Buttons for the new post thingy
filmButt.addEventListener('click', () => {
	if (!filmButtPress) {
		filmButt.style.backgroundColor = "grey";
		filmButtPress = true;
	} else {
		filmButt.style.backgroundColor = "white";	
		filmButtPress = false;
	}

});

poliButt.addEventListener('click', () => {
	if (!poliButtPress) {
		poliButt.style.backgroundColor = "grey";
		poliButtPress = true;
	} else {
		poliButt.style.backgroundColor = "white";	
		poliButtPress = false;
	}
});

//Buttons for the new post thingy
musicButt.addEventListener('click', () => {
	if (!musicButtPress) {
		musicButt.style.backgroundColor = "grey";
		musicButtPress = true;
	} else {
		musicButt.style.backgroundColor = "white";	
		musicButtPress = false;
	}

});

sportsButt.addEventListener('click', () => {
	if (!sportsButtPress) {
		sportsButt.style.backgroundColor = "grey";
		sportsButtPress = true;
	} else {
		sportsButt.style.backgroundColor = "white";	
		sportsButtPress = false;
	}
});


