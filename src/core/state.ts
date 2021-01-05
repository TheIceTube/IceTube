import { Penguin } from './entities/penguin';
import { Billboard } from './entities/billboard';

/**
 * Sctructure of the news post
 */
interface NewsBlock {
    title: string;
    content: string;
    gaming: number;
    music: number;
    films: number;
    sport: number;
    politics: number;
    educational: number;
}

/**
 * World state
 */
interface Interest {
    gaming: number;
    music: number;
    films: number;
    sport: number;
    politics: number;
    educational: number;
}

/**
 * State of the game
 */
export interface GameState {
    paused: boolean;
	element: HTMLCanvasElement;
	ctx: CanvasRenderingContext2D;
	mouseX: number;
	mouseY: number;
    mouseDown: boolean;
    interest: Interest;
    maximumPenguins: number;
    entities: Array<Penguin | Billboard>;
    relevance: number;
    newsBlocks: NewsBlock[];
    lastNewsBlock: number;
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
