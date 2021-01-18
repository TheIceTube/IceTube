import { State, GameState } from './state';

// Address
const SERVER_ADDRESS = 'http://45.32.186.38';

// Get state
const GAME: GameState = State();

// Elements
const endMenu = document.getElementById('end-menu');
const leaderboardTable = document.getElementById('leaderboard-table');
const leaderboardScoreUploading = document.getElementById('score-uploading');
const restartButton = document.getElementById('restart-button') as HTMLButtonElement;
const leaderboardUsername = document.getElementById('leaderboard-username') as HTMLInputElement;
const leaderboardSubmitButton = document.getElementById('leaderboard-submit-button') as HTMLButtonElement;

// Leaderboard record structure
interface LeaderboardEntry {
	username: string;
	score: number;
}

/**
 * Check server availability
 */
async function pingServer(): Promise<void> {
	try {
		const response = await fetch(`${SERVER_ADDRESS}/ping`);
        const data = await response.text();
        if (data === 'pong') GAME.serverAvailable = true;
	} catch (error) {
		console.error(error);
	}
}

/**
 * Show leaderboard
 */
export async function showLeaderboard(): Promise<void> {
	if (GAME.serverAvailable) {
		try {
            const response = await fetch(`${SERVER_ADDRESS}/leaderboard`);
            let data = (await response.json()) as LeaderboardEntry[];
            
            // Prepare array
            data.sort((a, b) => a.score - b.score).reverse();
            if (data.length > 5) data = data.slice(0, 5);
        
            // Fill array with empty scores
            if (data.length < 5) {
                for (let i = 0; i < 5; i++) {
                    const record = data[i];
                    data[i] = record ? record : { username: '-', score: 0 };
                }
            }

            leaderboardTable.innerHTML = '';

            // Show upload if score more than
            const lastRecord =  data[data.length - 1];
            if (GAME.fish > lastRecord.score) {
                leaderboardScoreUploading.classList.add('visible');
            } else {
                leaderboardScoreUploading.classList.remove('visible');
            }
        
            for (let i = 0; i < 5; i++) {
                const record = data[i] ? data[i] : { username: '-', score: 0 };

                const row = document.createElement('div');
                row.className = 'row';
        
                const rank = document.createElement('div');
                rank.innerText = (i + 1) + '.';
        
                const name = document.createElement('div');
                name.innerText = record.username;
        
                const score = document.createElement('div');
                score.innerText = record.score + '';
        
                row.appendChild(rank);
                row.appendChild(name);
                row.appendChild(score);
                leaderboardTable.appendChild(row);
            }
        
            endMenu.classList.add('show-leaderboard');
		} catch (error) {
            // Nothing
            console.error(error);
		}
	}
}

// On leaderboard change
leaderboardUsername.addEventListener('input', () => {
	const value = leaderboardUsername.value;
	leaderboardSubmitButton.disabled = value.length <= 1 || value.length > 12;
});

// Leaderboard submit
leaderboardSubmitButton.addEventListener('click', () => {
	const username = leaderboardUsername.value;
	const score = GAME.fish;
    const body = JSON.stringify({ username, score });
    
    leaderboardSubmitButton.disabled = true;

	fetch(`${SERVER_ADDRESS}/leaderboard`, {
		method: 'POST',
        body: body,
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
    });

    restartButton.click();
});

// Check server
pingServer();