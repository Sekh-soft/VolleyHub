let scoreA = 0;
let scoreB = 0;
let setA = 0;
let setB = 0;
let currentSet = 1;
let totalSets = 3;
let matchTimer = 0;
let isRunning = false;
let interval;

// DOM Elements
const scoreAElement = document.getElementById('scoreA');
const scoreBElement = document.getElementById('scoreB');
const timerDisplay = document.getElementById('timerDisplay');
const startStopButton = document.getElementById('startStopButton');
const resetButton = document.getElementById('resetButton');
const incrementA = document.getElementById('incrementA');
const decrementA = document.getElementById('decrementA');
const incrementB = document.getElementById('incrementB');
const decrementB = document.getElementById('decrementB');
const nextSetButton = document.getElementById('nextSetButton');
const saveScoreButton = document.getElementById('saveScoreButton');
const setsProgress = document.getElementById('setsProgress');

const settingsButton = document.getElementById('settingsButton');
const settingsModal = document.getElementById('settingsModal');
const closeSettingsModal = document.getElementById('closeSettingsModal');
const startMatchButton = document.getElementById('startMatch');

// Open Settings Modal
settingsButton.addEventListener('click', () => {
    settingsModal.style.display = 'flex';
});

// Close Settings Modal
closeSettingsModal.addEventListener('click', () => {
    settingsModal.style.display = 'none';
});

// Start Match with custom settings
startMatchButton.addEventListener('click', () => {
    const teamAName = document.getElementById('teamANameInput').value || 'Team A';
    const teamBName = document.getElementById('teamBNameInput').value || 'Team B';

    // Set team names
    document.getElementById('teamAName').textContent = teamAName;
    document.getElementById('teamBName').textContent = teamBName;

    // Set total sets from input
    totalSets = parseInt(document.getElementById('sets').value);

    // Hide settings modal and show scoreboard
    settingsModal.style.display = 'none';
    document.querySelector('.scoreboard').style.display = 'block';
});
