let startup = true;

window.onload = init;

function init() {
  async function mainLoop() {
    const scInfo = await getInfo();
    getData(scInfo);
  }

  mainLoop();
  setInterval(() => {
    mainLoop();
  }, 500); //update interval
}

async function getData(scInfo) {
  let p1Name = scInfo["p1Name"];
  let p1Team = scInfo["p1Team"];
  let p2Name = scInfo["p2Name"];
  let p2Team = scInfo["p2Team"];
  let p1Score = scInfo["p1Score"];
  let p2Score = scInfo["p2Score"];

  let round = scInfo["round"];
  let tournament = scInfo["tournamentName"];

  let caster1 = scInfo["caster1Name"];
  let caster2 = scInfo["caster2Name"];
  let p1Twitter = scInfo["caster1Twitter"];
  let p2Twitter = scInfo["caster2Twitter"];
  let p1pronoun = scInfo["caster1Twitch"];
  let p2pronoun = scInfo["caster1Twitch"];

  let p1WL = scInfo["p1WL"];
  let p2WL = scInfo["p2WL"];

  // Updating player 1
  if (document.getElementById("p1Name").textContent != p1Name) {updatePlayerName("p1Name", p1Name, p1Team, "pronoun1", p1pronoun);}
  // Updating player 2
  if (document.getElementById("p2Name").textContent != p2Name) {updatePlayerName("p2Name", p2Name, p2Team, "pronoun2", p2pronoun);}
  // Update round count
  if (document.getElementById("round").textContent != round) {roundUpdate(round);}
  // Update tournament name
  if (document.getElementById("tournament").textContent != tournament) {document.getElementById("tournament").textContent = tournament;}
  // Update score values
  if (document.getElementById("p1score").textContent != p1Score) {document.getElementById("p1score").textContent = p1Score;}
  if (document.getElementById("p2score").textContent != p2Score) {document.getElementById("p2score").textContent = p2Score;}

  // Update Twitters
  if (document.getElementById("p1Twitter").textContent != p1Twitter) {updatePlayerTwitter("p1Twitter", p1Twitter);}
  if (document.getElementById("p2Twitter").textContent != p2Twitter) {updatePlayerTwitter("p2Twitter", p2Twitter);}

  // But like Casters this time
  if (document.getElementById("caster1").textContent != caster1) {document.getElementById("caster1").textContent = caster1;}
  if (document.getElementById("caster2").textContent != caster2) {document.getElementById("caster2").textContent = caster2;}

  if (p1WL == "W") {
    var win = document.createElement("img");
    win.setAttribute("src", "Resources/Overlay/Win.png");
    document.getElementById("p1Picture").innerHTML = win.outerHTML;
    var loss = document.createElement("img");
    loss.setAttribute("src", "Resources/Overlay/loss.png");
    document.getElementById("p2Picture").innerHTML = loss.outerHTML;
  } else if (p1WL == "L") {
    var win = document.createElement("img");
    win.setAttribute("src", "Resources/Overlay/loss.png");
    document.getElementById("p2Picture").innerHTML = win.outerHTML;
    var loss = document.createElement("img");
    loss.setAttribute("src", "Resources/Overlay/Win.png");
    document.getElementById("p2Picture").innerHTML = loss.outerHTML;
  } else {
    document.getElementById("p2Picture").innerHTML = "";
    document.getElementById("p1Picture").innerHTML = "";
  }
}

//searches for the main json file
function getInfo() {
  return new Promise(function (resolve) {
    const oReq = new XMLHttpRequest();
    oReq.addEventListener("load", reqListener);
    oReq.open("GET", "Resources/Texts/ScoreboardInfo.json");
    oReq.send();

    //will trigger when file loads
    function reqListener() {
      resolve(JSON.parse(oReq.responseText));
    }
  });
  //i would gladly have used fetch, but OBS local files wont support that :(
}

//player text change
function updatePlayerName(nameID, pName, pTeam, pronounID, pronoun) {
  const nameEL = document.getElementById(nameID);
  var pronounEl;
  if (pTeam != "") {
    if (pronounID == "pronoun1"){
      nameEL.innerHTML = pTeam + "  |  " + pName + " <span id='pronoun1' class = 'pronoun outline'> </span>"; //removed the teamid tag and just made it one thing
      pronounEl = document.getElementById(pronounID);
    } else {
      nameEL.innerHTML = pTeam + "  |  " + pName + " <span id='pronoun2' class = 'pronoun outline'> </span>"; //removed the teamid tag and just made it one thing
      pronounEl = document.getElementById(pronounID);
    }
  }
  if (pronoun != "") {
    pronounEl.textContent = "[" + pronoun + "]";
  } else {
    nameEL.textContent = pName;
  }
}

//socials text change
function updatePlayerTwitter(nameID, tName) {
  const nameEL = document.getElementById(nameID);
  nameEL.textContent = tName;
}

//update the round text
function roundUpdate(round) {
  const roundEL = document.getElementById("round");
  roundEL.textContent = round;
}
