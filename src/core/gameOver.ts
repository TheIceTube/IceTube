import { State, GameState } from './state';

// Get state
const GAME: GameState = State();

// Get end-screen element
const elEndScreen = document.getElementById('end-screen');
const elLeaderboardTable = document.getElementById('leaderboard-table');
const elMyScoreRow = document.getElementById('score-yours');

const SERVER_PING = 'http://45.32.186.38/ping';
const SERVER_LEADERBOARD = 'http://45.32.186.38/leaderboard';

interface LeaderboardEntry 
{
    username: string,
    score: number,
}

const leaderboardDefaultEntry: LeaderboardEntry = {
    username: '-',
    score: 0,
}

export async function gameOver ()
{
    GAME.paused = true;
    makeVisibleGameOver();

    const response = await fetch(SERVER_PING);
    const data = await response.text();

    if (data === 'pong')
    {
        showLeaderboard();
    }
    else
    {
        showEndPicture();
    }

}

function makeVisibleGameOver ()
{
    document.getElementById('end-screen').classList.add('visible');
}

async function showLeaderboard ()
{
    const response = await fetch(SERVER_LEADERBOARD);
    const leaderboardJSON = await response.json() as LeaderboardEntry[];

    leaderboardJSON.sort((e1, e2) => e2.score - e1.score);

    const myScore = GAME.fish;

    let myRank = 1;
    for (let i = 1; i <= leaderboardJSON.length; i++)
    {
        // тутутутуtotoTODO
        let currentEntry = leaderboardJSON[i - 1];

        if (myScore <= currentEntry.score)
        {
            myRank = i;
            break;
        }
    }

    

    for (let i = 1; i <= 5; i++)
    {
        let currentEntry = leaderboardJSON[i - 1] ? leaderboardJSON[i - 1] : leaderboardDefaultEntry;

        let newRow = document.createElement('div');
        let entryClass = (i == 1 ? 'score-first' : i == 2 ? 'score-second' : i == 3 ? 'score-third' : '');
        newRow.className = 'score-entry ' + entryClass;

        let rank = document.createElement('div')
        rank.innerText = i.toString();
        rank.classList.add('score-rank');

        let name = document.createElement('div');
        name.innerText = currentEntry.username;
        name.classList.add('score-name');

        let score = document.createElement('div');
        score.innerText = currentEntry.score.toString();
        score.classList.add('score-score');

        newRow.append(rank);
        newRow.append(name);
        newRow.append(score);

        elLeaderboardTable.append(newRow);
    }

    let elMyRank = elMyScoreRow.getElementsByClassName('score-rank')[0] as HTMLDivElement;
    let elMyScore = elMyScoreRow.getElementsByClassName('score-score')[0] as HTMLDivElement;

    console.log(elMyScore)
    elMyRank.innerText = myRank.toString();
    elMyScore.innerText = myScore.toString();
}

function showEndPicture ()
{
    console.log('show picture');
}