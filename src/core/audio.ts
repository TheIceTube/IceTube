import { requestInterval, requestTimeout } from './timers';

// Sounds

/// @ts-ignore
import musicSound from '../sounds/music.mp3';
/// @ts-ignore
import popSound from '../sounds/pop.mp3';
/// @ts-ignore
import moveSound from '../sounds/move.mp3';
/// @ts-ignore
import paperSound from '../sounds/paper.mp3';
/// @ts-ignore
import clickSound from '../sounds/click.mp3';
/// @ts-ignore
import click2Sound from '../sounds/click2.mp3';
/// @ts-ignore
import speachSound from '../sounds/speach.mp3';
/// @ts-ignore
import sirenSound from '../sounds/siren.mp3';
/// @ts-ignore
import sadSound from '../sounds/sad.mp3';
/// @ts-ignore
import caramelldensenSound from '../sounds/caramelldensen.mp3';

// Music
let music = new Audio(musicSound);

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
    audio.volume = 0.1;
    audio.play();
}

/**
 * Move sound
 */
export function playMoveSound(): void {
    const audio = new Audio(moveSound);
    audio.volume = 0.6;
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
    audio.volume = 0.3;
    audio.play();
}

/**
 * Sad sound
 */
export function playSadSound(): void {
    const audio = new Audio(sadSound);
    audio.volume = 0.4;
    audio.play();
}

/**
 * Paper sound
 */
export function startMusic(): void {
    music.volume = 0.5;
    music.loop = true;
    music.play();
}

/**
 * Paper sound
 */
export function stopMusic(): void {
    music.pause();
    music.currentTime = 0;
}

/**
 * Paper sound
 */
export function restartMusic(): void {
    music.pause();
    music.currentTime = 0;
    music.play();
}

/**
 * Caramelldansen mode
 */
export function playCaramelldansen(): void {
    stopMusic();
    const audio = new Audio(caramelldensenSound);
    audio.volume = 1;
    audio.loop = true;
    audio.play();
}
