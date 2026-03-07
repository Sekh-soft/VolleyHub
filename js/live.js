import { database } from './firebase.js';

let scoreA = 0;
let scoreB = 0;
let teamAName = "";
let teamBName = "";
let matchId = null;

// Start Match
function startMatch() {

  teamAName = document.getElementById('teamAName').value || "Team A";
  teamBName = document.getElementById('teamBName').value || "Team B";

  matchId = "match_" + Date.now();

  updateUI();
  saveScore();
}

// Add Point
function addPoint(team){

  if(team === "A") scoreA++;
  if(team === "B") scoreB++;

  updateUI();
  saveScore();
}

// Decrease Point
function removePoint(team){

  if(team === "A" && scoreA > 0) scoreA--;
  if(team === "B" && scoreB > 0) scoreB--;

  updateUI();
  saveScore();
}

// Update HTML
function updateUI(){

  document.getElementById("scoreA").textContent = scoreA;
  document.getElementById("scoreB").textContent = scoreB;

  document.getElementById("teamAName").textContent = teamAName;
  document.getElementById("teamBName").textContent = teamBName;

}

// Save to Firebase
function saveScore(){

  const data = {
    teamA: teamAName,
    teamB: teamBName,
    scoreA: scoreA,
    scoreB: scoreB,
    timestamp: new Date().toISOString()
  };

  if(matchId){
    database.ref("matches/" + matchId).set(data);
  }

  // Save locally
  localStorage.setItem("volleyLiveScore", JSON.stringify(data));
}

// Load Live Score
function loadLiveScore(){

  const data = JSON.parse(localStorage.getItem("volleyLiveScore"));

  if(!data) return;

  document.getElementById("teamAName").textContent = data.teamA;
  document.getElementById("teamBName").textContent = data.teamB;

  document.getElementById("scoreA").textContent = data.scoreA;
  document.getElementById("scoreB").textContent = data.scoreB;

}

// Button Events
document.getElementById("incrementA").addEventListener("click", ()=>addPoint("A"));
document.getElementById("incrementB").addEventListener("click", ()=>addPoint("B"));

document.getElementById("decrementA").addEventListener("click", ()=>removePoint("A"));
document.getElementById("decrementB").addEventListener("click", ()=>removePoint("B"));

document.getElementById("startMatch").addEventListener("click", startMatch);

// Auto refresh
setInterval(loadLiveScore, 500);