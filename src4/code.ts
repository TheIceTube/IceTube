import Stats from 'stats.js';

import billboardImage from './sprites/billboard.png';
import penguinImageLeft from './sprites/penguin-left.png';
import penguinImageRight from './sprites/penguin-right.png';

import { insertionSort, lerp, loadImage, randomInteger, convertRange } from './utils';

// Canvas setup
const stage = document.getElementById('stage') as HTMLCanvasElement;
const ctx = stage.getContext('2d');
ctx.imageSmoothingEnabled = false;

// Setup canvas size
stage.width = window.innerWidth * window.devicePixelRatio;
stage.height = window.innerHeight * window.devicePixelRatio;
window.addEventListener('resize', () => {
	stage.width = window.innerWidth * window.devicePixelRatio;
	stage.height = window.innerHeight * window.devicePixelRatio;
	skyline = stage.height / 5;
});

// Mouse position
let mouseX = 0;
let mouseY = 0;
let mouseDown = false;

// Mouse position calculation
stage.addEventListener('mousemove', event => {
	const rect = stage.getBoundingClientRect();
	mouseX = ((event.clientX - rect.left) / (rect.right - rect.left)) * stage.width;
	mouseY = ((event.clientY - rect.top) / (rect.bottom - rect.top)) * stage.height;
});

stage.addEventListener('mousedown', () => {
	mouseDown = true;
});

stage.addEventListener('mouseup', () => {
	mouseDown = false;
});

// Game state
let entities: (Penguin | Billboard)[] = [];
let skyline = stage.height / 5;

// Load sprites
const billboard = loadImage(billboardImage);
const spriteLeft = loadImage(penguinImageLeft);
const spriteRight = loadImage(penguinImageRight);

// Penguin structure
interface Penguin {
	type: 'penguin';
	state: 'spawning' | 'walking' | 'leaving' | 'fixed';
	frame: number;
	x: number;
	y: number;
	height: number;
	width: number;
	direction: 'left' | 'right';
}

// Penguin structure
interface Billboard {
	type: 'billboard';
	x: number;
	y: number;
	height: number;
	width: number;
}

// Stats setup
const stats = new Stats();
stats.showPanel(0);
document.body.appendChild(stats.dom);

// Spawn penguins
for (let i = 0; i < 50; i++) {
	const direction = randomInteger(0, 1) ? 'left' : 'right';
	const x = randomInteger(0, stage.width);
	const y = randomInteger(stage.height / 5, stage.height - 50);
	spawnPenguin(x, y, direction);
}

// Spawn locked to moues penguin
entities.push({
	type: 'penguin',
	state: 'fixed',
	x: 500,
	y: 500,
	direction: 'left',
	frame: 0,
	height: 95,
	width: 70,
});

// Spawn billboard
entities.push({
	type: 'billboard',
	x: stage.width / 2,
	y: (stage.height / 2) + (stage.height / 10),
	height: 400,
	width: 400,
});

// Main loop
function loop() {
	stats.begin();

	update();
	draw();

	stats.end();
	requestAnimationFrame(loop);
}

// Update game state
function update() {
	for (let i = 0; i < entities.length; i++) {
		const entity = entities[i];

		// Sort entities for 3d effect
		insertionSort(entities, 'y');
		
		// Penguin
		if (entity.type === 'penguin') {
			entity.frame += 1;
			if (entity.frame > 20) entity.frame = 0;
	
			if (entity.state === 'fixed') {
				entity.x = mouseX;
				entity.y = convertRange(mouseY, { min: skyline, max: stage.height }, { min: 0, max: stage.height });
				continue;
			}
	
			if (entity.state === 'walking') {
				entity.height = (entity.frame >= 10) 
					? lerp(entity.height, 75, 0.3)
					: lerp(entity.height, 95, 0.3);
	
				if (entity.direction === 'left') {
					entity.x -= convertRange(entity.y, { min: 0, max: stage.height }, { min: 0, max: 2 });
					if (entity.x <= -entity.width) entity.x = stage.width + entity.width;
				} else {
					entity.x += convertRange(entity.y, { min: 0, max: stage.height }, { min: 0, max: 2 });
					if (entity.x >= stage.width + entity.width) entity.x = -entity.width;
				}
	
				if (entity.x <= -100) entity.x = stage.width;
			}
	
			if (entity.state === 'spawning') {
				entity.height = lerp(entity.height, 95, 0.1);
				if (entity.height >= 94) entity.state = 'walking';
			}
	
			if (entity.state === 'leaving') {
				entity.height = lerp(entity.height, 0, 0.1);
				if (entity.height <= 0.1) entities.splice(i, 1);
			}
		}

		// Billboard
		if (entity.type === 'billboard') {
			// Nothing for now
		}
	}
}

// Render game state
function draw() {
	ctx.clearRect(0, 0, stage.width, stage.height);

	for (let i = 0; i < entities.length; i++) {
		const entity = entities[i];

		// Drawing penguin
		if (entity.type === 'penguin') {
			const { x, y, width, height, direction } = entity;
	
			const sprite = direction === 'left' ? spriteLeft : spriteRight;
			const size = convertRange(y, { min: 0, max: stage.height }, { min: 0, max: 2 });
			const posY = convertRange(y, { min: 0, max: stage.height }, { min: skyline, max: stage.height });
	
			if (size < 0) continue;
	
			ctx.save();
			ctx.translate(x, posY);
			ctx.scale(size, size);
	
			ctx.drawImage(sprite, -(width / 2), -height + 16, width, height);
			ctx.restore();
		}

		// Drawing billboard
		if (entity.type === 'billboard') {
			const { x, y, width, height } = entity;
				const size = convertRange(y, { min: 0, max: stage.height }, { min: 0, max: 2 });
			const posY = convertRange(y, { min: 0, max: stage.height }, { min: skyline, max: stage.height });
	
			ctx.save();
			ctx.translate(x, posY);
			ctx.scale(size, size);
	
			ctx.drawImage(billboard, -(width / 2), -height + 32, width, height);
			ctx.restore();
		}
	}
}

// Spawn new penguin
function spawnPenguin(x: number, y: number, direction: 'left' | 'right', frame: number = randomInteger(0, 20)) {
	entities.push({
		type: 'penguin',
		state: 'spawning',
		x: x,
		y: y,
		direction: direction,
		frame: frame,
		height: 0,
		width: 70,
	});
}

// Start game
loop();

const newPost = document.getElementById('newPost');
const overlay = document.getElementById('overlay');
const modal = document.getElementById('modal');

// UI
newPost.addEventListener('click', () => {
	modal.style.top = '45%';
	overlay.style.opacity = '1';
	overlay.style.pointerEvents = 'auto';
});	

overlay.addEventListener('click', () => {
	modal.style.top = '150%';
	overlay.style.opacity = '0';
	overlay.style.pointerEvents = 'none';
});	