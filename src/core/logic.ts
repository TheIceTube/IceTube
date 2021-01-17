import { State, GameState } from './state';
import { Penguin } from './entities/penguin';
import { Characters } from './entities/characters';
import { requestInterval } from './timers';
import { randomInteger, insertionSort, randomFromArray } from './utils';
import { playClickSound, playMoveSound, playPaperSound, playSadSound, playSirenSound } from './audio';
import { hidePostModals, showPostModal } from './gui';

// Get state
const GAME: GameState = State();

// Elements
const news = document.getElementById('news');
const postButton = document.getElementById('post-button') as HTMLButtonElement;

// Check if user played this game
const played: boolean = localStorage.getItem('played') === 'true' ? true : false;
localStorage.setItem('played', 'true');

////////////////////////////////////////////////////////////////////////////////////

// Increase tempo
requestInterval(() => {
	GAME.tempo += 0.2;
}, 1000);

// Relevance update
requestInterval(() => {
	GAME.relevance -= 0.001 * GAME.tempo;
	if (GAME.relevance < 0) GAME.relevance = 0;
}, 100);

// Despawn penguins
requestInterval(() => {
	if (GAME.relevance < 0.5) {
		const penguinsAmount = GAME.penguins.length - 1;

		let toDespawn = Math.ceil(GAME.maximumPenguins * 0.05);
		if (GAME.relevance < 0.2) toDespawn = Math.ceil(GAME.maximumPenguins * 0.1);
		
		if (toDespawn > penguinsAmount) toDespawn = penguinsAmount;

		for (let i = 0; i < toDespawn; i++) {
			const index = randomFromArray(GAME.penguins);
			const penguin = GAME.penguins[index];

			// Skip invalid penguin
			if (penguin.type === 'characters' || penguin.state !== 'walking') {
				i -= 1;
				continue;
			}	

			penguin.despawn();
		}
	}
}, 1000);

// Game Over Check
requestInterval(() => {
	if ((GAME.penguins.length - 1) <= 0) {
		// document.getElementById('final-fish-count').innerText = `${GAME.fish}`;
		// document.getElementById('end-screen').style.transform = 'translate( -50%, -50%)';
	
		// overlay.style.opacity = '1';
		// overlay.style.pointerEvents = 'auto';
		GAME.paused = true;
	}
}, 1000);

////////////////////////////////////////////////////////////////////////////////////

// Request news block
const newsInterval = requestInterval(() => {
	const index = GAME.newsIndex;
	const current = GAME.news[index];

    // Move sound
    playMoveSound();

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
    
	// Update interval
	const nextDelay = Math.floor(5000 - (100 * GAME.tempo));
	newsInterval(nextDelay > 500 ? nextDelay : 500)
}, played ? 2500 : 7500);

////////////////////////////////////////////////////////////////////////////////////

// Post creating
postButton.addEventListener('click', () => {
	const index = GAME.selectedNewsIndex;
	const current = GAME.news[index];
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

    // Click sound
	playClickSound();
	playPaperSound();
    
    // Close modal
    hidePostModals();

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
        playSadSound();

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

    // Affect relevance
	GAME.relevance += 0.5;
	if (GAME.relevance > 2) GAME.relevance = 2;
    if (GAME.relevance <= 0.75) GAME.relevance = 1;
});

////////////////////////////////////////////////////////////////////////////////////

export function gameRestart() {
    
}