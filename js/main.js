/* =====================================
   VOLLEYWOLLEY GOD MODE MAIN.JS
===================================== */

/* ===============================
   MOUSE GLOW EFFECT
================================ */

const glow = document.querySelector(".mouse-glow");

// Prevent errors if element missing
if (glow) {
  document.addEventListener("mousemove", (e) => {
    glow.style.left = e.clientX + "px";
    glow.style.top = e.clientY + "px";
  });
}


/* ===============================
   MAGNETIC BUTTON EFFECT
   (INSANE PREMIUM FEEL)
================================ */

const buttons = document.querySelectorAll(".btn-primary, .btn-secondary, .btn-nav");

buttons.forEach(btn => {
  btn.addEventListener("mousemove", (e) => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
  });

  btn.addEventListener("mouseleave", () => {
    btn.style.transform = "translate(0,0)";
  });
});


/* ===============================
   NAVBAR SCROLL GLOW EFFECT
================================ */

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
  if (window.scrollY > 20) {
    navbar.style.boxShadow = "0 0 30px rgba(0,212,255,0.3)";
  } else {
    navbar.style.boxShadow = "none";
  }
});


// Import the Firebase database from app.js
import { database } from './app.js';

// Variables to store scores and set data
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

// Start Timer Function
function startTimer() {
  isRunning = true;
  interval = setInterval(() => {
    matchTimer++;
    const minutes = Math.floor(matchTimer / 60);
    const seconds = matchTimer % 60;
    timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }, 1000);
}

// Stop Timer Function
function stopTimer() {
  clearInterval(interval);
  isRunning = false;
}

// Reset Timer
function resetTimer() {
  clearInterval(interval);
  matchTimer = 0;
  timerDisplay.textContent = '00:00';
  isRunning = false;
}

// Update Scores
function updateScores() {
  scoreAElement.textContent = scoreA;
  scoreBElement.textContent = scoreB;
  checkSetEnd();
}

// Check Set End and Update Database
function checkSetEnd() {
  if (scoreA >= 15 || scoreB >= 15) {
    if (scoreA > scoreB) setA++;
    else setB++;
    updateSets();
    resetScore();
  }
}

// Update Sets Progress
function updateSets() {
  document.getElementById('setsProgress').textContent = `Set ${currentSet}: Team A ${setA} - Team B ${setB}`;
  currentSet++;
  if (currentSet > totalSets) {
    endMatch();
  }
}

// Reset Score
function resetScore() {
  scoreA = 0;
  scoreB = 0;
  updateScores();
}

// Save Score to Firebase
function saveScore() {
  const matchData = {
    teamA: "Team A",
    teamB: "Team B",
    scoreA: scoreA,
    scoreB: scoreB,
    timestamp: new Date().toISOString()
  };

  const matchId = `match_${Date.now()}`; // Unique ID for each match

  // Save match data to Firebase
  database.ref('matches/' + matchId).set(matchData, function (error) {
    if (error) {
      console.log("Data could not be saved: " + error);
    } else {
      console.log("Data saved successfully.");
    }
  });
}

// Event Listeners for Buttons
incrementA.addEventListener('click', () => { scoreA++; updateScores(); saveScore(); });
decrementA.addEventListener('click', () => { scoreA = Math.max(0, scoreA - 1); updateScores(); saveScore(); });
incrementB.addEventListener('click', () => { scoreB++; updateScores(); saveScore(); });
decrementB.addEventListener('click', () => { scoreB = Math.max(0, scoreB - 1); updateScores(); saveScore(); });

// Next Set Button
nextSetButton.addEventListener('click', () => {
  resetScore();
  currentSet++;
  if (currentSet > totalSets) {
    endMatch();
  }
});

// Save Button
saveScoreButton.addEventListener('click', saveScore);

// Timer Start/Stop
startStopButton.addEventListener('click', () => {
  if (isRunning) {
    stopTimer();
    startStopButton.textContent = 'Start Timer';
  } else {
    startTimer();
    startStopButton.textContent = 'Stop Timer';
  }
});

// Reset Timer Button
resetButton.addEventListener('click', resetTimer);

// End Match
function endMatch() {
  stopTimer();
  alert(`Match Ended. Final Score: Team A ${setA} - Team B ${setB}`);
}

// Settings Inputs
const setsInput = document.getElementById('sets');
const playerANameInput = document.getElementById('playerA');
const playerBNameInput = document.getElementById('playerB');
const momInput = document.getElementById('mom');
const startMatchButton = document.getElementById('startMatch');

// Start Match Button
startMatchButton.addEventListener('click', () => {
  totalSets = parseInt(setsInput.value);
  document.getElementById('teamAName').textContent = playerANameInput.value || 'Team A';
  document.getElementById('teamBName').textContent = playerBNameInput.value || 'Team B';
  document.getElementById('mom').textContent = momInput.value || 'Player of the Match';
  resetMatch();
  document.querySelector('.settings').style.display = 'none'; // Hide settings
  document.querySelector('.scoreboard').style.display = 'block'; // Show scoreboard
});

// Timer Functions
function startTimer() {
  isRunning = true;
  interval = setInterval(() => {
    matchTimer++;
    const minutes = Math.floor(matchTimer / 60);
    const seconds = matchTimer % 60;
    timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }, 1000);
}

function stopTimer() {
  clearInterval(interval);
  isRunning = false;
}

function resetTimer() {
  clearInterval(interval);
  matchTimer = 0;
  timerDisplay.textContent = '00:00';
  isRunning = false;
}

// Score Functions
incrementA.addEventListener('click', () => { scoreA++; updateScores(); });
decrementA.addEventListener('click', () => { scoreA = Math.max(0, scoreA - 1); updateScores(); });
incrementB.addEventListener('click', () => { scoreB++; updateScores(); });
decrementB.addEventListener('click', () => { scoreB = Math.max(0, scoreB - 1); updateScores(); });

function updateScores() {
  scoreAElement.textContent = scoreA;
  scoreBElement.textContent = scoreB;
  checkSetEnd();
}

function checkSetEnd() {
  // Example for set score to 15 (you can change it based on your needs)
  if (scoreA >= 15 || scoreB >= 15) {
    if (scoreA > scoreB) setA++;
    else setB++;
    updateSets();
    resetScore();
  }
}

function updateSets() {
  setsProgress.textContent = `Set ${currentSet}: Team A ${setA} - Team B ${setB}`;
  currentSet++;
  if (currentSet > totalSets) {
    endMatch();
  }
}

function resetScore() {
  scoreA = 0;
  scoreB = 0;
  updateScores();
}

// Next Set Button
nextSetButton.addEventListener('click', () => {
  resetScore();
  currentSet++;
  if (currentSet > totalSets) {
    endMatch();
  }
});

// Reset Button
resetButton.addEventListener('click', () => {
  resetScore();
  resetTimer();
});

// Save Score Button
saveScoreButton.addEventListener('click', () => {
  alert('Score saved!');
});

// End Match
function endMatch() {
  stopTimer();
  alert(`Match Ended. Final Score: Team A ${setA} - Team B ${setB}`);
}
