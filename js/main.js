/* =====================================
   VOLLEYHUB MAIN.JS (STABLE VERSION)
===================================== */


/* ===============================
   GAME VARIABLES
================================ */

let scoreA = 0;
let scoreB = 0;

let setA = 0;
let setB = 0;

let serve = "Team A";

let timer = 0;
let running = false;
let interval = null;

let history = [];


/* ===============================
   DOM ELEMENTS
================================ */

const scoreAElement = document.getElementById("scoreA");
const scoreBElement = document.getElementById("scoreB");

const setAElement = document.getElementById("setA");
const setBElement = document.getElementById("setB");

const timerDisplay = document.getElementById("timerDisplay");

const startStopButton = document.getElementById("startStopButton");
const resetButton = document.getElementById("resetButton");


/* ===============================
   TIMER FUNCTIONS
================================ */

function updateTimer(){

const minutes = Math.floor(timer / 60);
const seconds = timer % 60;

timerDisplay.textContent =
String(minutes).padStart(2,'0') + ":" +
String(seconds).padStart(2,'0');

}

if(startStopButton){

startStopButton.addEventListener("click",()=>{

if(!running){

interval = setInterval(()=>{

timer++;
updateTimer();

},1000);

startStopButton.textContent = "Pause";
running = true;

}else{

clearInterval(interval);
startStopButton.textContent = "Start";
running = false;

}

});

}

if(resetButton){

resetButton.addEventListener("click",()=>{

clearInterval(interval);

timer = 0;
running = false;

updateTimer();

startStopButton.textContent="Start";

});

}


/* ===============================
   SCORE UPDATE
================================ */

function updateScoreUI(){

scoreAElement.textContent = scoreA;
scoreBElement.textContent = scoreB;

setAElement.textContent = setA;
setBElement.textContent = setB;

saveLiveScore();

}


/* ===============================
   ADD POINT
================================ */

function addPointA(){

history.push({scoreA,scoreB});

scoreA++;

updateScoreUI();

}

function addPointB(){

history.push({scoreA,scoreB});

scoreB++;

updateScoreUI();

}


/* ===============================
   UNDO POINT
================================ */

function undoPoint(){

if(history.length === 0) return;

const last = history.pop();

scoreA = last.scoreA;
scoreB = last.scoreB;

updateScoreUI();

}


/* ===============================
   SERVE TOGGLE
================================ */

function toggleServe(){

serve = serve === "Team A" ? "Team B" : "Team A";

document.getElementById("serveIndicator").textContent = serve;

saveLiveScore();

}


/* ===============================
   START MATCH
================================ */

function startMatch(){

const teamA =
document.getElementById("teamAInput").value || "Team A";

const teamB =
document.getElementById("teamBInput").value || "Team B";

document.getElementById("teamAName").textContent = teamA;
document.getElementById("teamBName").textContent = teamB;

serve = teamA;

document.getElementById("serveIndicator").textContent = serve;

scoreA = 0;
scoreB = 0;
setA = 0;
setB = 0;

updateScoreUI();

document.getElementById("settingsPanel").style.display="none";

saveLiveScore();

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

timer = 0;

clearInterval(interval);

running=false;

updateTimer();

updateScoreUI();

document.getElementById("serveIndicator").textContent = serve;

document.getElementById("settingsPanel").style.display="block";

}


/* ===============================
   LIVE SCREEN DATA SAVE
================================ */

function saveLiveScore(){

const data = {

teamA: document.getElementById("teamAName").textContent,
teamB: document.getElementById("teamBName").textContent,

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
   OPEN LIVE TV SCREEN
================================ */

function openLive(){

window.open("live.html","_blank");

}


/* ===============================
   INITIAL LOAD
================================ */

updateTimer();
updateScoreUI();