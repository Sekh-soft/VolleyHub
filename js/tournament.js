function generateBracket(){

const teams = [

document.getElementById("team1").value,
document.getElementById("team2").value,
document.getElementById("team3").value,
document.getElementById("team4").value,
document.getElementById("team5").value,
document.getElementById("team6").value,
document.getElementById("team7").value,
document.getElementById("team8").value

]

document.getElementById("q1").innerText = teams[0] + " vs " + teams[1]
document.getElementById("q2").innerText = teams[2] + " vs " + teams[3]
document.getElementById("q3").innerText = teams[4] + " vs " + teams[5]
document.getElementById("q4").innerText = teams[6] + " vs " + teams[7]

}