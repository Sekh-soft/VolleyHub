// Import Firebase database from firebase.js
import { database } from './firebase.js';

// Variables to store scores and set data
let scoreA = 0;
let scoreB = 0;
let teamAName = "";
let teamBName = "";

// Start the match by saving team names and initializing scores
function startMatch() {
  teamAName = document.getElementById('teamAName').value || 'Team A';
  teamBName = document.getElementById('teamBName').value || 'Team B';
  
  // Save initial match data to Firebase
  saveScoreToFirebase();
  
  // Display team names in the HTML
  document.getElementById('teamA').textContent = `${teamAName}: ${scoreA}`;
  document.getElementById('teamB').textContent = `${teamBName}: ${scoreB}`;
}

// Increment or decrement scores based on the team
function addPoint(team) {
  if (team === 'A') {
    scoreA++;
  } else if (team === 'B') {
    scoreB++;
  }
  // Update UI
  document.getElementById('teamA').textContent = `${teamAName}: ${scoreA}`;
  document.getElementById('teamB').textContent = `${teamBName}: ${scoreB}`;
  
  // Save score to Firebase
  saveScoreToFirebase();
}

// Save match data to Firebase
function saveScoreToFirebase() {
  const matchData = {
    teamA: teamAName,
    teamB: teamBName,
    scoreA: scoreA,
    scoreB: scoreB,
    timestamp: new Date().toISOString() // Store the time when the score was saved
  };

  // Save the match data under a unique match ID
  const matchId = `match_${Date.now()}`;
  
  // Write to Firebase
  database.ref('matches/' + matchId).set(matchData, function(error) {
    if (error) {
      console.log("Error saving data:", error);
    } else {
      console.log("Data saved successfully.");
    }
  });
}

// Event listeners for increment/decrement buttons
document.getElementById('incrementA').addEventListener('click', () => addPoint('A'));
document.getElementById('decrementA').addEventListener('click', () => addPoint('A'));
document.getElementById('incrementB').addEventListener('click', () => addPoint('B'));
document.getElementById('decrementB').addEventListener('click', () => addPoint('B'));

// Start the match when the button is clicked
document.getElementById('startMatch').addEventListener('click', startMatch);
