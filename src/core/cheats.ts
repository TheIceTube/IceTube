import { State, GameState } from './state';
import { playCaramelldansen } from './audio';

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
 * Junkie penguins mode
 * Type "junkie()" in DevTools console to activate it
 */
globalScope.caramelldensen = () => {
    playCaramelldansen();
    globalScope.caramelldensen = true;
    return 'Full bass mode ON!';
}