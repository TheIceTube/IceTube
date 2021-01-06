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
 * World interests
 */
interface Interests {
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
    optimize: boolean;

	mouseX: number;
	mouseY: number;
	mouseDown: boolean;

    entities: Array<Penguin | Billboard>;

	views: number;
	relevance: number;
	interests: Interests;
    
	news: NewsBlock[];
	newsIndex: number;
}

/**
 * Global state manager
 * @param initial Initial state. Will be used if state initialized for the first time.
 */
export function State(initial?: GameState): GameState {
	const global: any = window;

	if (typeof global.__GameState__ !== 'object') {
		global.__GameState__ = initial ? initial : {};
	}

	return global.__GameState__;
}
