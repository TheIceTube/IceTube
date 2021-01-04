import { State, GameState } from './state';

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
	GAME.stage.style.transform = 'scale(2) translateY(-32px)';
});

overlay.addEventListener('click', () => {
	menu.style.left = '-150%';
	modal.style.top = '150%';
	overlay.style.opacity = '0';
	overlay.style.pointerEvents = 'none';
	GAME.stage.style.transform = 'scale(1)';
});

pause.addEventListener('click', () => {
	menu.style.left = '50%';
	overlay.style.opacity = '1';
	overlay.style.pointerEvents = 'auto';
});

setInterval(() => {
	news.classList.add('updating');

	setTimeout(() => {
		news.classList.remove('updating');
	}, 1500);
}, 20000)
