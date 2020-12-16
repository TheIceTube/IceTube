import Stats from 'stats.js';

import penguinImageLeft from './penguin-left.png';
import penguinImageRight from './penguin-right.png';

import { insertionSort, lerp, loadImage, randomInteger, convertRange } from './utils';

// Canvas setup
const stage = document.getElementById('stage') as HTMLCanvasElement;
const ctx = stage.getContext('2d');
ctx.imageSmoothingEnabled = false;

console.log(stage.clientHeight);

// Setup canvas size
stage.width = stage.clientWidth * window.devicePixelRatio;
stage.height = stage.clientHeight * window.devicePixelRatio;

window.addEventListener('resize', () => {
    stage.width = stage.clientWidth * window.devicePixelRatio;
    stage.height = stage.clientHeight * window.devicePixelRatio;    
});

// Load sprites
const spriteLeft = loadImage(penguinImageLeft);
const spriteRight = loadImage(penguinImageRight);

// Penguin structure
interface Penguin {
    isSpawing:boolean;
    isDying: boolean;
    fixOnMouse: boolean;
    frame: number;
    x: number;
    y: number;
    height: number;
    width: number;
    direction: 'left' | 'right';
}

// Stats setup
const stats = Stats();
stats.showPanel(0);
document.body.appendChild( stats.dom );

let penguins: Penguin[] = [];
let perspective = 400;

// Spawn penguins
for (let i = 0; i < 50; i++) {
    const direction = randomInteger(0, 1) ? 'left' : 'right';
    const x = randomInteger(0, stage.width);
    const y = randomInteger(0, stage.height - 50);
    spawnPenguin(x, y, direction);
}

// Spawn locked to moues penguin
penguins.push({
    isSpawing: false,
    isDying: false,
    x: 500,
    y: 500,
    direction: 'left',
    frame: 0,
    height: 95,
    width: 70,
    fixOnMouse: true,
});

// Main loop
function loop() {
    stats.begin();

    update();
    draw();

    stats.end()
    requestAnimationFrame(loop);
}

// Update game state
// TODO spawning animation 
function update() {
    for (let i = 0; i < penguins.length; i++) {
        const penguin = penguins[i];

        penguin.frame += 1;
        if (penguin.frame > 20) penguin.frame = 0;

        if(!penguin.isDying){
        if (penguin.frame >= 10) {
            penguin.height = lerp(penguin.height, 75, 0.3);
        } else {
            penguin.height = lerp(penguin.height, 95, 0.3);
        }
        }

        insertionSort(penguins, 'y');
        
        if (penguin.fixOnMouse) {
            penguin.frame += 2;
            penguin.x = mouseX;
            penguin.y = convertRange(mouseY, { min: perspective, max: stage.height }, { min: 0 , max: stage.height });
            continue;
        }

        if (penguin.direction === 'left') {
            penguin.x -= convertRange(penguin.y, { min: 0, max: stage.height }, { min: 0.5, max: 1.5 });
        } else {
            penguin.x += convertRange(penguin.y, { min: 0, max: stage.height }, { min: 0.5, max: 1.5 });
        }

        if (penguin.isDying) {

            penguin.height = lerp(penguin.height, 0, 0.1);

            if (penguin.height <= 0.1) {
                console.log("hey");
                
                penguins.splice(i, 1);
            }
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

        const sprite = direction === 'left' ? spriteLeft : spriteRight;
        const size = convertRange(y, { min: 0, max: stage.height }, { min: 0.5, max: 1.5 });
        const posY = convertRange(y, { min: 0, max: stage.height }, { min: perspective , max: stage.height });
        
        if (size < 0) continue;

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
        isSpawing:false,
        isDying: false,
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

// Mouse position
let mouseX = 0;
let mouseY = 0;

// Mouse position calculation
stage.addEventListener('mousemove', (event) => {
    const rect = stage.getBoundingClientRect();
    mouseX = (event.clientX - rect.left) / (rect.right - rect.left) * stage.width;
    mouseY = (event.clientY - rect.top) / (rect.bottom - rect.top) * stage.height;
})



document.getElementById('yesButton').addEventListener('click', () =>{
    // console.log("yes");
    isChanging(false);
});

document.getElementById('noButton').addEventListener('click', () =>{
    // console.log("no");
    isChanging(true);
});


function isChanging(bad:boolean){
    if (bad) {
        document.getElementById('video').innerText = `${randomInteger(0, 1)}`;
        console.log("pressed bad");

        const penguinToRemove = Math.floor((penguins.length/10));

        console.log(penguins.length);
        
        for (let i = 0; i < penguinToRemove; i++){
            console.log('1');
            penguins[i].isDying = true;  
        }

        console.log(penguins.length);


    } else {
        document.getElementById('video').innerText = `${randomInteger(0, 1)}`;

        console.log("pressed gud");

        console.log(penguins.length);

        const penguinToAdd = Math.floor((penguins.length/10));

        for (let i = 0; i < penguinToAdd; i++) {
            const direction = randomInteger(0, 1) ? 'left' : 'right';
            const x = randomInteger(0, stage.width);
            const y = randomInteger(0, stage.height - 50);
            spawnPenguin(x, y, direction);
        }

        console.log(penguins.length);
    }
}