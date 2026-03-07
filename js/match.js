/* ====================================
   VOLLEYHUB MATCH CONTROL SCRIPT
==================================== */


/* ===============================
   MATCH STATE
================================ */

let scoreA = 0;
let scoreB = 0;

let setA = 0;
let setB = 0;

let serve = "Team A";

let history = [];


/* ===============================
   DOM ELEMENTS
================================ */

const scoreAElement = document.getElementById("scoreA");
const scoreBElement = document.getElementById("scoreB");

const setAElement = document.getElementById("setA");
const setBElement = document.getElementById("setB");

const serveIndicator =
document.getElementById("serveIndicator");


/* ===============================
   UPDATE DISPLAY
================================ */

function updateDisplay(){

if(scoreAElement) scoreAElement.textContent = scoreA;
if(scoreBElement) scoreBElement.textContent = scoreB;

if(setAElement) setAElement.textContent = setA;
if(setBElement) setBElement.textContent = setB;

if(serveIndicator)
serveIndicator.textContent = "Serve → " + serve;

saveLiveData();

}


/* ===============================
   ADD POINT
================================ */

function addPointA(){

history.push({scoreA,scoreB,setA,setB});

scoreA++;

checkSetWinner();

updateDisplay();

}

function addPointB(){

history.push({scoreA,scoreB,setA,setB});

scoreB++;

checkSetWinner();

updateDisplay();

}


/* ===============================
   UNDO POINT
================================ */

function undoPoint(){

if(history.length === 0) return;

const last = history.pop();

scoreA = last.scoreA;
scoreB = last.scoreB;

setA = last.setA;
setB = last.setB;

updateDisplay();

}


/* ===============================
   SET WINNER LOGIC
================================ */

function checkSetWinner(){

const pointsToWin = 25;

if(scoreA >= pointsToWin && scoreA - scoreB >= 2){

setA++;

alert("Set won by " +
document.getElementById("teamAName").textContent);

scoreA = 0;
scoreB = 0;

}

if(scoreB >= pointsToWin && scoreB - scoreA >= 2){

setB++;

alert("Set won by " +
document.getElementById("teamBName").textContent);

scoreA = 0;
scoreB = 0;

}

}


/* ===============================
   SERVE TOGGLE
================================ */

function toggleServe(){

serve = serve === "Team A"
? "Team B"
: "Team A";

updateDisplay();

}


/* ===============================
   RESET MATCH
================================ */

function resetMatch(){

scoreA = 0;
scoreB = 0;

setA = 0;
setB = 0;

serve = "Team A";

history = [];

updateDisplay();

}


/* ===============================
   START MATCH
================================ */

function startMatch(){

const teamA =
document.getElementById("teamAInput")?.value
|| "Team A";

const teamB =
document.getElementById("teamBInput")?.value
|| "Team B";

const teamAElement =
document.getElementById("teamAName");

const teamBElement =
document.getElementById("teamBName");

if(teamAElement) teamAElement.textContent = teamA;
if(teamBElement) teamBElement.textContent = teamB;

serve = teamA;

updateDisplay();

}


/* ===============================
   SAVE DATA FOR LIVE TV
================================ */

function saveLiveData(){

const data = {

teamA:
document.getElementById("teamAName")?.textContent
|| "Team A",

teamB:
document.getElementById("teamBName")?.textContent
|| "Team B",

scoreA: scoreA,
scoreB: scoreB,

setA: setA,
setB: setB,

serve: serve

};

localStorage.setItem(
"volleyLiveScore",
JSON.stringify(data)
);

}


/* ===============================
   OPEN LIVE SCREEN
================================ */

function openLive(){

window.open("live.html","_blank");

}


/* ===============================
   INITIAL LOAD
================================ */

updateDisplay();