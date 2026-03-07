let scoreA = 0;
let scoreB = 0;
let setA = 0;
let setB = 0;
let serve = "Team A";

function updateDisplay(){
document.getElementById("scoreA").textContent = scoreA;
document.getElementById("scoreB").textContent = scoreB;

document.getElementById("setA").textContent = setA;
document.getElementById("setB").textContent = setB;

document.getElementById("serveIndicator").textContent = serve;

saveLiveData();
}

function addPointA(){
scoreA++;
updateDisplay();
}

function addPointB(){
scoreB++;
updateDisplay();
}

function toggleServe(){

serve = serve === "Team A" ? "Team B" : "Team A";

updateDisplay();
}

function resetMatch(){

scoreA = 0;
scoreB = 0;

setA = 0;
setB = 0;

serve = "Team A";

updateDisplay();
}

function undoPoint(){

if(scoreA>0){
scoreA--;
}
else if(scoreB>0){
scoreB--;
}

updateDisplay();
}

function startMatch(){

const teamA = document.getElementById("teamAInput").value || "Team A";
const teamB = document.getElementById("teamBInput").value || "Team B";

document.getElementById("teamAName").textContent = teamA;
document.getElementById("teamBName").textContent = teamB;

saveLiveData();
}

/* SAVE DATA FOR LIVE TV */

function saveLiveData(){

const data = {

teamA: document.getElementById("teamAName").textContent,
teamB: document.getElementById("teamBName").textContent,

scoreA: scoreA,
scoreB: scoreB,

setA: setA,
setB: setB,

serve: serve

};

localStorage.setItem("volleyLiveScore", JSON.stringify(data));

}

/* OPEN LIVE SCREEN */

function openLive(){

window.open("live.html","_blank");

}