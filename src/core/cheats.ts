import { State, GameState } from './state';

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
 * Junkie penguins mode
 * Type "junkie()" in DevTools console to activate it
 */
globalScope.setTempo = (tempo: number) => {
    GAME.tempo = tempo;
    return 'Tempo set to ' + tempo;
}