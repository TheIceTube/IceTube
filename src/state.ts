import { Penguin } from './entities/penguin';
import { Billboard } from './entities/billboard';

/**
 * State of the game
 */
export interface GameState {
	stage: HTMLCanvasElement;
	ctx: CanvasRenderingContext2D;
	mouseX: number;
	mouseY: number;
	mouseDown: boolean;
    skyline: number;
	entities: Array<Penguin | Billboard>;
}

/**
 * Global state manager 
 * @param initial Initial state. Will be used if state initialized for the first time.
 */
export function State<T extends {}>(initial?: T): T {
    const global: any = window;

    if (typeof global.__GameState__ !== 'object') {
        global.__GameState__ = initial ? initial : {};
    }

    return global.__GameState__;
}
