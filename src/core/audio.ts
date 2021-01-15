import { requestTimeout } from './timers';

// Sounds
import popSound from '../sounds/pop.mp3';

import moveSound from '../sounds/move.mp3';
import paperSound from '../sounds/paper.mp3';
import clickSound from '../sounds/click.mp3';
import click2Sound from '../sounds/click2.mp3';
import speachSound from '../sounds/speach.mp3';
import sirenSound from '../sounds/siren.mp3';

 // Pop sound
let popIndex: number = 0;
const pops = [];
for (let i = 0; i < 5; i++) pops.push(new Audio(popSound)); 

/**
 * Pop sound
 */
export function playPopSound(): void {
    const sound = pops[popIndex];

    requestTimeout(() => {
        sound.volume = 0.1;
        sound.play();

        popIndex += 1;
        if (popIndex >= pops.length) popIndex = 0;
    }, 20);
}

/**
 * Click sound
 */
export function playClickSound(): void {
    const audio = new Audio(clickSound);
    audio.volume = 0.1;
    audio.play();
}

/**
 * Click sound
 */
export function playClick2Sound(): void {
    const audio = new Audio(click2Sound);
    audio.volume = 0.1;
    audio.play();
}

/**
 * Speach sound
 */
export function playSpeachSound(): void {
    const audio = new Audio(speachSound);
    audio.volume = 0.05;
    audio.play();
}

/**
 * Move sound
 */
export function playMoveSound(): void {
    const audio = new Audio(moveSound);
    audio.volume = 0.1;
    audio.play();
}

/**
 * Paper sound
 */
export function playPaperSound(): void {
    const audio = new Audio(paperSound);
    audio.volume = 0.5;
    audio.play();
}

/**
 * Paper sound
 */
export function playSirenSound(): void {
    const audio = new Audio(sirenSound);
    audio.volume = 0.1;
    audio.play();
}