let startup = true;

window.onload = getData();
var scoreboardInfo;

function getData() {
  fetch("Resources/Texts/ScoreboardInfo.json")
    .then((response) => response.json())
    .then((data) => {
      scoreboardInfo = data;
      sortData();
    })
    .catch((error) => console.log(error));
}

function sortData() {
  let p1Name = scoreboardInfo.p1Name;
  let p1Team = scoreboardInfo.p1Team;
  let p2Name = scoreboardInfo.p2Name;
  let p2Team = scoreboardInfo.p2Team;
  let p1Score = scoreboardInfo.p1Score;
  let p2Score = scoreboardInfo.p2Score;

  let round = scoreboardInfo.round;
  let tournament = scoreboardInfo.tournamentName;

  // Updating player 1
  if (
    document.getElementById("p1Name").textContent != p1Name
  ) {
    updatePlayerName("p1Name", p1Name, p1Team);
  }
  // Updating player 2
  if (
    document.getElementById("p2Name").textContent != p2Name
  ) {
    updatePlayerName("p2Name", p2Name, p2Team);
  }
  if (
    document.getElementById("round").textContent != round
  ) {
    roundUpdate(round)
  }
  if(document.getElementById("tournament").textContent !=tournament){
    document.getElementById("tournament").textContent = tournament
  }
  if(document.getElementById("p1score").textContent !=p1Score){
    document.getElementById("p1score").textContent = p1Score
  }
  if(document.getElementById("p2score").textContent !=p2Score){
    document.getElementById("p2score").textContent = p2Score
  }
}

async function getata(scInfo) {
  let p1Score = scInfo["p1Score"];
  let p1Color = scInfo["p1Color"];
  let p1Character = scInfo["p1Character"];
  let p1Skin = scInfo["p1Skin"];
  let p1WL = scInfo["p1WL"];

  let p2Name = scInfo["p2Name"];
  let p2Team = scInfo["p2Team"];
  let p2Score = scInfo["p2Score"];
  let p2Color = scInfo["p2Color"];
  let p2Character = scInfo["p2Character"];
  let p2Skin = scInfo["p2Skin"];
  let p2WL = scInfo["p2WL"];

  let round = scInfo["round"];
  let bestOf = scInfo["bestOf"];

  let caster1 = scInfo["caster1Name"];
  twitter1 = scInfo["caster1Twitter"];
  twitch1 = scInfo["caster1Twitch"];
  let caster2 = scInfo["caster2Name"];
  twitter2 = scInfo["caster2Twitter"];
  twitch2 = scInfo["caster2Twitch"];
}

//player text change
function updatePlayerName(nameID, pName, pTeam) {
  const nameEL = document.getElementById(nameID);
  if (pTeam != ""){
    nameEL.textContent = pTeam + "  |  " + pName; //removed the teamid tag and just made it one thing
  } else {
    nameEL.textContent = pName;
  }
}

//update the round text
function roundUpdate(round){
 const roundEL = document.getElementById('round');
 roundEL.textContent = round;
 }
