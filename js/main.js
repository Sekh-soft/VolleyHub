/* =====================================
   VOLLEYHUB MAIN.JS (GLOBAL VERSION)
===================================== */


/* ===============================
   SAFE DOM GET
================================ */

function el(id){
return document.getElementById(id)
}


/* ===============================
   PARTICLE BACKGROUND (HOMEPAGE)
================================ */

const canvas = el("particles")

if(canvas){

const ctx = canvas.getContext("2d")

canvas.width = window.innerWidth
canvas.height = window.innerHeight

let particles = []

for(let i=0;i<80;i++){

particles.push({
x:Math.random()*canvas.width,
y:Math.random()*canvas.height,
size:Math.random()*2+1,
speedX:(Math.random()-0.5)*0.6,
speedY:(Math.random()-0.5)*0.6
})

}

function animateParticles(){

ctx.clearRect(0,0,canvas.width,canvas.height)

ctx.fillStyle="rgba(0,212,255,0.7)"

particles.forEach(p=>{

p.x+=p.speedX
p.y+=p.speedY

if(p.x<0||p.x>canvas.width)p.speedX*=-1
if(p.y<0||p.y>canvas.height)p.speedY*=-1

ctx.beginPath()
ctx.arc(p.x,p.y,p.size,0,Math.PI*2)
ctx.fill()

})

requestAnimationFrame(animateParticles)

}

animateParticles()

window.addEventListener("resize",()=>{
canvas.width=window.innerWidth
canvas.height=window.innerHeight
})

}


/* ===============================
   SCOREBOARD STATE
================================ */

let scoreA = 0
let scoreB = 0

let setA = 0
let setB = 0

let serve = "Team A"

let timer = 0
let running = false
let interval = null

let history = []


/* ===============================
   DOM ELEMENTS
================================ */

const scoreAElement = el("scoreA")
const scoreBElement = el("scoreB")

const setAElement = el("setA")
const setBElement = el("setB")

const timerDisplay = el("timerDisplay")

const startStopButton = el("startStopButton")
const resetButton = el("resetButton")

const serveIndicator = el("serveIndicator")

const teamABlock = el("teamABlock")
const teamBBlock = el("teamBBlock")


/* ===============================
   TIMER
================================ */

function updateTimer(){

if(!timerDisplay) return

const minutes = Math.floor(timer / 60)
const seconds = timer % 60

timerDisplay.textContent =
String(minutes).padStart(2,"0")+":"+
String(seconds).padStart(2,"0")

}


if(startStopButton){

startStopButton.addEventListener("click",()=>{

if(!running){

interval=setInterval(()=>{

timer++
updateTimer()

},1000)

running=true
startStopButton.textContent="Pause"

}else{

clearInterval(interval)
running=false
startStopButton.textContent="Start"

}

})

}


if(resetButton){

resetButton.addEventListener("click",()=>{

clearInterval(interval)

timer=0
running=false

updateTimer()

startStopButton.textContent="Start"

})

}


/* ===============================
   UPDATE UI
================================ */

function updateScoreUI(){

if(scoreAElement) scoreAElement.textContent=scoreA
if(scoreBElement) scoreBElement.textContent=scoreB

if(setAElement) setAElement.textContent=setA
if(setBElement) setBElement.textContent=setB

updateServeHighlight()

saveLiveScore()

}


/* ===============================
   ADD POINT
================================ */

function addPointA(){

history.push({scoreA,scoreB,setA,setB})

scoreA++

checkSetWinner()

updateScoreUI()

}

function addPointB(){

history.push({scoreA,scoreB,setA,setB})

scoreB++

checkSetWinner()

updateScoreUI()

}


/* ===============================
   UNDO
================================ */

function undoPoint(){

if(history.length===0) return

const last=history.pop()

scoreA=last.scoreA
scoreB=last.scoreB

setA=last.setA
setB=last.setB

updateScoreUI()

}


/* ===============================
   SET WINNER
================================ */

function checkSetWinner(){

const pointsToWin =
parseInt(document.getElementById("pointsInput")?.value) || 25

const totalSets =
parseInt(document.getElementById("setsInput")?.value) || 3

const setsNeeded = Math.ceil(totalSets / 2)

/* TEAM A WINS SET */

if(scoreA >= pointsToWin && scoreA - scoreB >= 2){

setA++

alert("Set won by " + document.getElementById("teamAName").textContent)

scoreA = 0
scoreB = 0

}

/* TEAM B WINS SET */

if(scoreB >= pointsToWin && scoreB - scoreA >= 2){

setB++

alert("Set won by " + document.getElementById("teamBName").textContent)

scoreA = 0
scoreB = 0

}

/* CHECK MATCH WINNER */

if(setA >= setsNeeded){

alert("🏆 Match Won by " + document.getElementById("teamAName").textContent)

resetMatch()

}

if(setB >= setsNeeded){

alert("🏆 Match Won by " + document.getElementById("teamBName").textContent)

resetMatch()

}

}


/* ===============================
   SERVE TOGGLE
================================ */

function toggleServe(){

const teamAName=el("teamAName").textContent
const teamBName=el("teamBName").textContent

serve = serve===teamAName ? teamBName : teamAName

if(serveIndicator) serveIndicator.textContent=serve

updateServeHighlight()

saveLiveScore()

}


/* ===============================
   SERVE HIGHLIGHT
================================ */

function updateServeHighlight(){

if(!teamABlock||!teamBBlock) return

teamABlock.classList.remove("serving")
teamBBlock.classList.remove("serving")

const teamAName=el("teamAName").textContent

if(serve===teamAName){

teamABlock.classList.add("serving")

}else{

teamBBlock.classList.add("serving")

}

}


/* ===============================
   SETTINGS PANEL
================================ */

function toggleSettings(){

const panel = document.getElementById("settingsPanel")

if(!panel) return

panel.classList.toggle("collapsed")

}


/* ===============================
   START MATCH
================================ */

function startMatch(){

const teamA=el("teamAInput").value || "Team A"
const teamB=el("teamBInput").value || "Team B"

el("teamAName").textContent=teamA
el("teamBName").textContent=teamB

serve=teamA

if(serveIndicator) serveIndicator.textContent=serve

scoreA=0
scoreB=0
setA=0
setB=0
timer=0

updateTimer()
updateScoreUI()

const panel=el("settingsPanel")

if(panel) panel.classList.add("collapsed")

saveLiveScore()

}


/* ===============================
   RESET MATCH
================================ */

function resetMatch(){

scoreA = 0
scoreB = 0

setA = 0
setB = 0

timer = 0

clearInterval(interval)

running = false

/* reset serve */

serve = "Team A"

if(serveIndicator){
serveIndicator.textContent = "Serve → Team A"
}

/* reset team names */

const teamAName = document.getElementById("teamAName")
const teamBName = document.getElementById("teamBName")

if(teamAName) teamAName.textContent = "Team A"
if(teamBName) teamBName.textContent = "Team B"

/* reset timer */

updateTimer()

/* reset UI */

updateScoreUI()

/* OPEN settings panel again */

const panel = document.getElementById("settingsPanel")

if(panel){

panel.classList.remove("collapsed")

}

/* scroll panel into view */

panel?.scrollIntoView({behavior:"smooth"})

}


/* ===============================
   LIVE SCREEN DATA
================================ */

function saveLiveScore(){

if(!el("teamAName")) return

const data={

teamA:el("teamAName").textContent,
teamB:el("teamBName").textContent,

scoreA,
scoreB,

setA,
setB,

serve

}

localStorage.setItem("volleyLiveScore",JSON.stringify(data))

}


/* ===============================
   OPEN LIVE SCREEN
================================ */

function openLive(){

window.open("live.html","_blank")

}


/* ===============================
   INITIAL LOAD
================================ */

updateTimer()
updateScoreUI()
updateServeHighlight()