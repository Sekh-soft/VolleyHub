/* ====================================
   VOLLEYHUB LIVE CONTROL SCRIPT
==================================== */

import { database } from "./firebase.js";

/* ===============================
   MATCH STATE
================================ */

let scoreA = 0;
let scoreB = 0;

let setA = 0;
let setB = 0;

let serve = "Team A";

let teamAName = "Team A";
let teamBName = "Team B";

let matchId = null;


/* ===============================
   DOM ELEMENTS
================================ */

const scoreAElement = document.getElementById("scoreA");
const scoreBElement = document.getElementById("scoreB");

const teamAElement = document.getElementById("teamAName");
const teamBElement = document.getElementById("teamBName");


/* ===============================
   START MATCH
================================ */

function startMatch(){

const teamAInput =
document.getElementById("teamAInput")?.value;

const teamBInput =
document.getElementById("teamBInput")?.value;

teamAName = teamAInput || "Team A";
teamBName = teamBInput || "Team B";

matchId = "match_" + Date.now();

scoreA = 0;
scoreB = 0;

updateUI();
saveScore();

}


/* ===============================
   ADD POINT
================================ */

function addPoint(team){

if(team === "A") scoreA++;
if(team === "B") scoreB++;

updateUI();
saveScore();

}


/* ===============================
   REMOVE POINT
================================ */

function removePoint(team){

if(team === "A" && scoreA > 0) scoreA--;
if(team === "B" && scoreB > 0) scoreB--;

updateUI();
saveScore();

}


/* ===============================
   UPDATE UI
================================ */

function updateUI(){

if(scoreAElement) scoreAElement.textContent = scoreA;
if(scoreBElement) scoreBElement.textContent = scoreB;

if(teamAElement) teamAElement.textContent = teamAName;
if(teamBElement) teamBElement.textContent = teamBName;

}


/* ===============================
   SAVE SCORE
================================ */

function saveScore(){

const data = {

teamA: teamAName,
teamB: teamBName,

scoreA: scoreA,
scoreB: scoreB,

setA: setA,
setB: setB,

serve: serve,

timestamp: new Date().toISOString()

};


/* FIREBASE SAVE */

if(matchId && database){

try{

database
.ref("matches/" + matchId)
.set(data);

}catch(e){

console.warn("Firebase save failed");

}

}


/* LOCAL SAVE */

localStorage.setItem(
"volleyLiveScore",
JSON.stringify(data)
);

}


/* ===============================
   LOAD LIVE SCORE
================================ */

function loadLiveScore(){

const data =
JSON.parse(localStorage.getItem("volleyLiveScore"));

if(!data) return;

teamAName = data.teamA;
teamBName = data.teamB;

scoreA = data.scoreA;
scoreB = data.scoreB;

setA = data.setA || 0;
setB = data.setB || 0;

serve = data.serve || "Team A";

updateUI();

}


/* ===============================
   BUTTON EVENTS
================================ */

document
.getElementById("incrementA")
?.addEventListener("click",()=>addPoint("A"));

document
.getElementById("incrementB")
?.addEventListener("click",()=>addPoint("B"));

document
.getElementById("decrementA")
?.addEventListener("click",()=>removePoint("A"));

document
.getElementById("decrementB")
?.addEventListener("click",()=>removePoint("B"));

document
.getElementById("startMatch")
?.addEventListener("click",startMatch);


/* ===============================
   LIVE AUTO REFRESH
================================ */

setInterval(loadLiveScore,1000);


/* ===============================
   INITIAL LOAD
================================ */

loadLiveScore();

let lastScoreA = 0;
let lastScoreB = 0;

function animateScore(id){

const el = document.getElementById(id);

el.classList.add("score-flash");

setTimeout(()=>{
el.classList.remove("score-flash");
},350);

}

function loadLiveScore(){

const data = JSON.parse(localStorage.getItem("volleyLiveScore"));

if(!data) return;

if(data.scoreA !== lastScoreA){
animateScore("scoreA");
}

if(data.scoreB !== lastScoreB){
animateScore("scoreB");
}

lastScoreA = data.scoreA;
lastScoreB = data.scoreB;

}