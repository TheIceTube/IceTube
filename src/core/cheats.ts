import { State, GameState } from './state';
import { playCaramelldansen } from './audio';
import { FishingRod } from './entities/fishingRod';

// Get state
const GAME: GameState = State();

// Global scope
const globalScope: any = window as any;

/** 
 * Junkie penguins mode
 * Type "junkie()" in DevTools console to activate it
 */
globalScope.junkie = () => {
    globalScope.junkie = true;
    return 'Junkie mode activated!';
}

/** 
 * Tempo update
 * Update tempo manually
 */
globalScope.setTempo = (tempo: number) => {
    GAME.tempo = tempo;
    return 'Tempo set to ' + tempo;
}

/** 
 * Rave mode
 * Type "rave()" in DevTools console to activate it
 */
globalScope.rave = () => {
    playCaramelldansen();
    document.getElementById('stage').style.animation = 'party 0.32s infinite ease-in-out';
    document.getElementById('score-uploading').remove();
    globalScope.rave = true;
    GAME.tempo = 5;

    return 'Rave mode ON!';
}

/**
 * Fishing mode
 * Type "fishing()" in DevTools console to activate it
 */
globalScope.fishing = () =>
{
    GAME.entities.push(new FishingRod());
}