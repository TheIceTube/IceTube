import { Penguin } from './entities/penguin';
import { Fish } from './entities/fish';
import { Characters } from './entities/characters';

/**
 * Possible post themes
 */
type Theme = 'politics' | 'gaming' | 'music' | 'films' | 'education' | 'sports';

/**
 * Sctructure of the news post
 */
interface NewsBlock {
	title: string;
	content: string;
	theme: Theme;
	fake: boolean;
}

/**
 * State of the game
 */
export interface GameState {
	paused: boolean;
	element: HTMLCanvasElement;
	ctx: CanvasRenderingContext2D;
	finished: boolean;
	
	mouseX: number;
	mouseY: number;
	mouseDown: boolean;

	penguins: Array<Penguin | Characters>;
	entities: Array<Fish>;

	fish: number;
	tempo: number;
	relevance: number;
	maximumPenguins: number;

	news: NewsBlock[];
	newsIndex: number;
	selectedNewsIndex: number;
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
