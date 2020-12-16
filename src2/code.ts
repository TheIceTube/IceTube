import penguinImageLeft from './penguin-left.png';
import penguinImageRight from './penguin-right.png';

import { insertionSort, lerp, loadImage, randomInteger, convertRange } from './utils';

// Canvas setup
const stage = document.getElementById('stage') as HTMLCanvasElement;
const ctx = stage.getContext('2d');
ctx.imageSmoothingEnabled = false;

// Setup canvas size
stage.width = window.innerWidth * window.devicePixelRatio;
stage.height = window.innerHeight * window.devicePixelRatio;

// Load sprites
const spriteLeft = loadImage(penguinImageLeft);
const spriteRight = loadImage(penguinImageRight);

// Penguin structure
interface Penguin {
    fixOnMouse: boolean;
    frame: number;
    x: number;
    y: number;
    height: number;
    width: number;
    direction: 'left' | 'right';
}

let penguins: Penguin[] = [];
let perspective = 600;

// Spawn penguins
for (let i = 0; i < 100; i++) {
    const direction = randomInteger(0, 1) ? 'left' : 'right';
    const x = randomInteger(0, stage.width);
    const y = randomInteger(0, stage.height - 50);
    spawnPenguin(x, y, direction);
}

// Spawn locked to moues penguin
penguins.push({
    x: 500,
    y: 500,
    direction: 'left',
    frame: 0,
    height: 95,
    width: 70,
    fixOnMouse: true,
});

// Spawn penguins army! 
for (let j = 0; j < 10; j++) {
    for (let i = 0; i < 20; i++) {
        const x = 300 + (i * 10) + (j * 40);
        const y = stage.height / 2 + (i * 4) - (j * 8);
        spawnPenguin(x, y, 'right', (i % 4) + i);
    }
}

// Main loop
function loop() {
    update();
    draw();
    requestAnimationFrame(loop);
}

// Update game state
function update() {
    for (let i = 0; i < penguins.length; i++) {
        const penguin = penguins[i];
        
        if (penguin.fixOnMouse) {
            penguin.x = mouseX;
            penguin.y = convertRange(mouseY, { min: perspective, max: stage.height }, { min: 0 , max: stage.height });
            continue;
        }

        penguin.frame += 1;
        if (penguin.frame > 20) penguin.frame = 0;

        if (penguin.frame >= 10) {
            penguin.height = lerp(penguin.height, 75, 0.3);
        } else {
            penguin.height = lerp(penguin.height, 95, 0.3);
        }

        insertionSort(penguins, 'y');
        
        if (penguin.direction === 'left') {
            penguin.x -= convertRange(penguin.y, { min: 0, max: stage.height }, { min: 0.1, max: 3 });
        } else {
            penguin.x += convertRange(penguin.y, { min: 0, max: stage.height }, { min: 0.1, max: 3 });
        }

        if (penguin.x >= (stage.width + 100)) penguin.x = 0;
        if (penguin.x <= -100) penguin.x = stage.width;
    }
}

// Render game state
function draw() {
    ctx.clearRect(0, 0, stage.width, stage.height);

    for (let i = 0; i < penguins.length; i++) {
        const { x, y, width, height, direction } = penguins[i];

        // if (y < 0) continue;

        const sprite = direction === 'left' ? spriteLeft : spriteRight;
        const size = convertRange(y, { min: 0, max: stage.height }, { min: 0.5, max: 1.5 });
        const posY = convertRange(y, { min: 0, max: stage.height }, { min: perspective , max: stage.height });
        
        ctx.save(); 
        ctx.translate(x, posY);
        ctx.scale(size, size);

        ctx.drawImage(sprite, -(width / 2), -height + 16, width, height);
        ctx.restore();
    }
}

// Spawn new penguin
function spawnPenguin(x: number, y: number, direction: 'left' | 'right', frame: number = randomInteger(0, 20)) {
    penguins.push({
        x: x,
        y: y,
        direction: direction,
        frame: frame,
        height: 95,
        width: 70,
        fixOnMouse: false,
    });
}

// Start game
loop();

// TODO
let visible = false;
document.getElementById('newVideo').addEventListener('click', () => {
    visible = !visible;

    if (visible) {
        document.getElementById('overlay').className = '';
    } else {
        document.getElementById('overlay').className = 'hidden';
    }
});


let mouseX = 0;
let mouseY = 0;

stage.addEventListener('mousemove', (event) => {
    const rect = stage.getBoundingClientRect();
    mouseX = (event.clientX - rect.left) / (rect.right - rect.left) * stage.width;
    mouseY = (event.clientY - rect.top) / (rect.bottom - rect.top) * stage.height;
})