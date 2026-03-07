function generateBracket() {

    const teams = [
        document.getElementById("team1").value.trim(),
        document.getElementById("team2").value.trim(),
        document.getElementById("team3").value.trim(),
        document.getElementById("team4").value.trim(),
        document.getElementById("team5").value.trim(),
        document.getElementById("team6").value.trim(),
        document.getElementById("team7").value.trim(),
        document.getElementById("team8").value.trim()
    ];

    // Check if any team name is missing
    const emptyTeam = teams.some(team => team === "");
    if (emptyTeam) {
        alert("Please enter all 8 team names.");
        return;
    }

    // Quarter Finals
    document.getElementById("q1").innerText = `${teams[0]} vs ${teams[1]}`;
    document.getElementById("q2").innerText = `${teams[2]} vs ${teams[3]}`;
    document.getElementById("q3").innerText = `${teams[4]} vs ${teams[5]}`;
    document.getElementById("q4").innerText = `${teams[6]} vs ${teams[7]}`;
}