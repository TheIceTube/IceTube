import { Penguin } from './entities/penguin';
import { Fish } from './entities/fish';
import { Player } from './entities/player';

/**
 * Possible post themes
 */
type Theme = 'politics' | 'gaming' | 'music' | 'films' | 'educational' | 'sports';

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

	mouseX: number;
	mouseY: number;
	mouseDown: boolean;

	penguins: Array<Penguin | Player>;
	entities: Array<Fish>;
	started: boolean;

	fish: number;
	relevance: number;
	score: number;
	level: number;

	moods: {
		music: number;
		sport: number;
		gaming: number;
		films: number;
		politics: number;
		educational: number;
	};
	
	coefficents: {
		relevanceDeduction: number;
		relevanceAddition: number;
		maximumPenguins: number;
		penguinsMultiplier: number;
		penguinsInvolvment: number;
		newsUpadateDelay: number;
		fishDespawnFrames: number;
	};

	// tutorials: {
	// 	fakeTutorial: boolean;
	// 	postTutorial: boolean;
	// };

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
