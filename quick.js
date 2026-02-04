const matchId = "liveMatch";

function startMatch() {
  const teamA = document.getElementById("teamAName").value || "Team A";
  const teamB = document.getElementById("teamBName").value || "Team B";

  db.ref("quickMatches/" + matchId).set({
    teamA,
    teamB,
    scoreA: 0,
    scoreB: 0
  });
}

function addPoint(team) {
  const ref = db.ref("quickMatches/" + matchId);
  ref.transaction(data => {
    if (!data) return data;
    if (team === "A") data.scoreA++;
    if (team === "B") data.scoreB++;
    return data;
  });
}

db.ref("quickMatches/" + matchId).on("value", snapshot => {
  const data = snapshot.val();
  if (!data) return;
  document.getElementById("teamA").innerText = data.scoreA;
  document.getElementById("teamB").innerText = data.scoreB;
});
