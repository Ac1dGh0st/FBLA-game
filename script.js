
// ==========================================
// RETRO LEAGUE - GAME ENGINE
// ==========================================

const $ = id => document.getElementById(id);

const teams = {
  football: {
    AA: ["Baldwin", "Newburgh Free Academy", "Shenendehowa", "Syracuse CBA"],
    A: ["Maine-Endwell", "Queensbury", "Somers", "Garden City"],
    B: ["Rye", "New Paltz", "Owego", "Marlboro"],
    C: ["Chenango Forks", "Schuylerville", "Glens Falls", "Cazenovia"],
    D: ["Tuckahoe", "Deposit", "Pine Plains", "Chester Academy"]
  },
  soccer: {
    AAA: ["Newburgh", "Shenendehowa", "Scarsdale", "Syosset"],
    AA: ["Mamaroneck", "Ithaca", "Fairport", "North Rockland"],
    A: ["Somers", "Garden City", "Cornwall", "Maine-Endwell"],
    B: ["Rye", "New Paltz", "Honeoye Falls", "Schuylerville"],
    C: ["Haldane", "Tuckahoe", "Chenango Forks", "Cazenovia"],
    D: ["Deposit", "Pine Plains", "Chester Academy", "North Salem"]
  },
  basketball: {
    AAA: ["Baldwin", "Newburgh", "Mount Vernon", "Syracuse CBA"],
    AA: ["Mamaroneck", "Ithaca", "Scarsdale", "North Rockland"],
    A: ["Garden City", "Somers", "Cornwall", "Queensbury"],
    B: ["Rye", "New Paltz", "Marlboro", "Owego"],
    C: ["Tuckahoe", "Haldane", "Chenango Forks", "Schuylerville"],
    D: ["Deposit", "Pine Plains", "Chester Academy", "North Salem"]
  },
  baseball: {
    AAA: ["Shenendehowa", "Baldwin", "Newburgh", "Saratoga Springs"],
    AA: ["Ithaca", "Mamaroneck", "Fairport", "North Rockland"],
    A: ["Maine-Endwell", "Garden City", "Somers", "Cornwall"],
    B: ["Rye", "New Paltz", "Owego", "Marlboro"],
    C: ["Chenango Forks", "Schuylerville", "Cazenovia", "Haldane"],
    D: ["Deposit", "Pine Plains", "Chester Academy", "Tuckahoe"]
  }
};

const extraTeams = {
  AAA: ["Liverpool", "Binghamton", "Brockport", "Massapequa"],
  AA: ["Victor", "Lancaster", "West Genesee", "Niskayuna"],
  A: ["Pittsford Sutherland", "East Aurora", "Burnt Hills", "Yorktown"],
  B: ["Johnstown", "Schalmont", "Le Roy", "Avon"],
  C: ["Barker", "Waverly", "Onondaga", "Maple Grove"],
  D: ["Franklinville", "Fabius-Pompey", "Notre Dame-Bishop Gibbons", "Andes Central"]
};

Object.values(teams).forEach(sport =>
  Object.entries(sport).forEach(([division, list]) =>
    list.push(...(extraTeams[division] || []))
  )
);

// ==========================================
// PLAYER SELECTION
// ==========================================

let sport = "football";
let division = "AA";
let team = teams.football.AA[0];
let player = "";
let week = 1;
let wins = 0;
let losses = 0;
let schedule = [];
let fanSupport = 75;
let morale = 80;

function selectSport(name, button) {
  if (name !== "football") {
    alert("This sport is coming soon! Football is currently playable.");
    return;
  }

  sport = name;
  division = "AA";
  team = teams[sport][division][0];

  document.querySelectorAll(".sport-card").forEach(b =>
    b.classList.toggle("active", b === button)
  );

  renderSelection();
}

function renderSelection() {
  const divisions = $("divisionGrid");
  const schools = $("teamGrid");

  if (!divisions || !schools) return;

  divisions.innerHTML = "";
  schools.innerHTML = "";

  Object.keys(teams[sport]).forEach(d => {
    const button = document.createElement("button");
    button.className = "division-card" + (d === division ? " active" : "");
    button.textContent = "CLASS " + d;

    button.onclick = () => {
      division = d;
      team = teams[sport][d][0];
      renderSelection();
    };

    divisions.appendChild(button);
  });

  teams[sport][division].forEach(school => {
    const button = document.createElement("button");
    button.className = "team-card" + (school === team ? " active" : "");
    button.textContent = school.toUpperCase();

    button.onclick = () => {
      team = school;
      renderSelection();
    };

    schools.appendChild(button);
  });

  $("previewTeam").textContent = team.toUpperCase();
  $("previewDetails").textContent =
    sport.toUpperCase() + " / NEW YORK / CLASS " + division;
}

renderSelection();

// ==========================================
// SEASON SYSTEM
// ==========================================

function startSeason() {
  player = $("username").value.trim();

  if (!player) return alert("ENTER YOUR PLAYER NAME!");

  schedule = teams[sport][division]
    .filter(t => t !== team)
    .slice(0, 7)
    .map(opponent => ({ opponent, played: false }));

  week = 1;
  wins = 0;
  losses = 0;
  fanSupport = 75;
  morale = 80;

  $("selectionScreen").style.display = "none";
  $("seasonScreen").style.display = "block";

  document.querySelector(".header").style.display = "none";
  document.querySelector(".top-bar").style.display = "none";
  document.querySelector(".scoreboard").style.display = "none";
  document.querySelector(".footer").style.display = "none";

  updateDashboard();
}

function updateDashboard() {
  const game = schedule[week - 1];

  $("dashboardPlayer").textContent = "PLAYER: " + player.toUpperCase();
  $("dashboardDivision").textContent = "CLASS " + division;
  $("dashboardWeek").textContent = "WEEK " + String(week).padStart(2, "0");
  $("dashboardRecord").textContent = wins + " - " + losses;
  $("dashboardTeam").textContent = team.toUpperCase();
  $("dashboardSchool").textContent = team.toUpperCase();
  $("dashboardOpponent").textContent = game ? game.opponent.toUpperCase() : "SEASON COMPLETE";
  $("matchupWeek").textContent = String(week).padStart(2, "0");

  $("fanSupport").textContent = fanSupport + "%";
  $("teamMorale").textContent = morale + "%";
  $("teamRating").textContent = Math.round((fanSupport + morale) / 2) + " OVR";

  $("fanBar").style.width = fanSupport + "%";
  $("moraleBar").style.width = morale + "%";

  $("dashboard-start")?.remove();

  const start = document.querySelector(".dashboard-start");
  if (start) {
    start.disabled = !game;
    start.textContent = game ? "▶ NEXT GAME" : "SEASON COMPLETE";
  }

  $("standingsList").innerHTML = `
    <div class="standing-row active">
      <span>1. ${team.toUpperCase()}</span>
      <span>${wins}</span><span>${losses}</span>
    </div>`;

  $("scheduleList").innerHTML = schedule.map((g, i) => `
    <div class="schedule-game">
      <span>WEEK ${String(i + 1).padStart(2, "0")}</span>
      <span>${g.opponent.toUpperCase()}</span>
      <strong>${g.played ? g.result : i + 1 === week ? "NEXT GAME" : "UPCOMING"}</strong>
    </div>
  `).join("");
}

// ==========================================
// GAME ENGINE
// ==========================================

let canvas = $("footballCanvas");
let ctx = canvas?.getContext("2d");

let qb, receivers, defenders, ball;
let keys = {};
let mouse = { x: 500, y: 225 };
let score = 0;
let opponentScore = 0;
let down = 1;
let yards = 10;
let quarter = 1;
let clock = 120;
let running = false;
let lastTime = 0;
let frame;
let driveTimer = null;

const resetPlay = () => {
  qb = { x: 100, y: 225 };

  receivers = [
    { x: 330, y: 100 },
    { x: 390, y: 225 },
    { x: 330, y: 350 }
  ];

  defenders = [
    { x: 420, y: 130 },
    { x: 470, y: 250 },
    { x: 410, y: 350 },
    { x: 570, y: 180 }
  ];

  ball = null;
};

function openGameDay() {
  const game = schedule[week - 1];
  if (!game) return;

  $("seasonScreen").style.display = "none";
  $("gameScreen").style.display = "block";

  $("gameTeam").textContent = team.toUpperCase();
  $("introTeam").textContent = team.toUpperCase();
  $("gameOpponent").textContent = game.opponent.toUpperCase();
  $("scoreTeam").textContent = team.toUpperCase();

  $("gameIntro").style.display = "block";
  $("playingArea").style.display = "none";

  score = 0;
  opponentScore = 0;
  down = 1;
  yards = 10;
  quarter = 1;
  clock = 120;

  updateScoreboard();
}

function beginFootballGame() {
  canvas = $("footballCanvas");
  ctx = canvas.getContext("2d");

  $("gameIntro").style.display = "none";
  $("playingArea").style.display = "block";

  clearTimeout(driveTimer);
  resetPlay();

  running = true;
  lastTime = 0;

  cancelAnimationFrame(frame);
  frame = requestAnimationFrame(gameLoop);
}

function updateScoreboard() {
  $("score").textContent = score;
  $("opponentScore").textContent = opponentScore;
  $("down").textContent = down;
  $("yards").textContent = yards;
  $("quarter").textContent = quarter;
  $("gameClock").textContent =
    Math.floor(clock / 60) + ":" + String(Math.floor(clock % 60)).padStart(2, "0");
}

function throwBall() {
  if (!running || ball) return;

  const dx = mouse.x - qb.x;
  const dy = mouse.y - qb.y;
  const length = Math.hypot(dx, dy);

  if (length < 10) return;

  ball = {
    x: qb.x,
    y: qb.y,
    vx: dx / length * 500,
    vy: dy / length * 500,
    life: 0
  };

  $("gameMessage").textContent = "PASS IN THE AIR!";
}

function updateGame(dt) {
  if (!running) return;

  clock -= dt;

  if (clock <= 0) {
    clock = 0;
    finishGame();
    return;
  }

  const speed = 190 * dt;

  if (keys.w || keys.arrowup) qb.y -= speed;
  if (keys.s || keys.arrowdown) qb.y += speed;
  if (keys.a || keys.arrowleft) qb.x -= speed;
  if (keys.d || keys.arrowright) qb.x += speed;

  qb.x = Math.max(25, Math.min(760, qb.x));
  qb.y = Math.max(40, Math.min(410, qb.y));

  receivers.forEach((r, i) => {
    r.x = Math.min(750, r.x + 65 * dt);
    r.y += Math.sin(performance.now() / 400 + i * 2) * 35 * dt;
  });

  defenders.forEach(d => {
    const target = ball || qb;
    const dx = target.x - d.x;
    const dy = target.y - d.y;
    const distance = Math.hypot(dx, dy);

    if (distance > 1) {
      d.x += dx / distance * 65 * dt;
      d.y += dy / distance * 65 * dt;
    }

    if (!ball && distance < 19) {
      down++;
      resetPlay();

      $("gameMessage").textContent =
        down > 4 ? "TURNOVER ON DOWNS!" : "TACKLED! TRY AGAIN!";

      if (down > 4) {
        down = 1;
        yards = 10;
      }

      updateScoreboard();
    }
  });

  if (!ball) return;

  ball.x += ball.vx * dt;
  ball.y += ball.vy * dt;
  ball.life += dt;

  const catchTarget = receivers.find(r =>
    Math.hypot(ball.x - r.x, ball.y - r.y) < 24
  );

  if (catchTarget) {
    completePass(catchTarget);
    return;
  }

  if (defenders.some(d =>
    Math.hypot(ball.x - d.x, ball.y - d.y) < 16
  )) {
    ball = null;
    down = 1;
    yards = 10;
    $("gameMessage").textContent = "INTERCEPTED!";
  }

  if (ball && (ball.x < 0 || ball.x > 800 || ball.y < 0 || ball.y > 450 || ball.life > 2.5)) {
    ball = null;
    down++;
    $("gameMessage").textContent = "INCOMPLETE PASS!";

    if (down > 4) {
      down = 1;
      yards = 10;
      $("gameMessage").textContent = "TURNOVER ON DOWNS!";
    }
  }

  updateScoreboard();
}

function completePass(receiver) {
  const gain = Math.max(1, Math.round((receiver.x - qb.x) / 10));
  ball = null;

  if (receiver.x >= 735) {
    score += 7;
    down = 1;
    yards = 10;
    $("gameMessage").textContent = "TOUCHDOWN! +7 POINTS!";
  } else {
    yards -= gain;

    if (yards <= 0) {
      down = 1;
      yards = 10;
      $("gameMessage").textContent = "FIRST DOWN!";
    } else {
      down++;
      $("gameMessage").textContent = `COMPLETE PASS! +${gain} YARDS!`;

      if (down > 4) {
        down = 1;
        yards = 10;
        $("gameMessage").textContent = "TURNOVER ON DOWNS!";
      }
    }
  }

  updateScoreboard();

  clearTimeout(driveTimer);
  driveTimer = setTimeout(() => {
    if (running) resetPlay();
  }, 1300);
}

// ==========================================
// FIELD GRAPHICS
// ==========================================

function drawField() {
  ctx.fillStyle = "#168b37";
  ctx.fillRect(0, 0, 800, 450);

  for (let x = 0; x < 800; x += 80) {
    ctx.fillStyle = x % 160 ? "#168b37" : "#20a34a";
    ctx.fillRect(x, 0, 40, 450);
  }

  ctx.strokeStyle = "white";
  ctx.lineWidth = 2;

  for (let x = 80; x < 800; x += 80) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, 450);
    ctx.stroke();
  }

  ctx.strokeRect(5, 5, 790, 440);

  ctx.fillStyle = "#1434a4";
  ctx.fillRect(745, 7, 48, 436);

  ctx.fillStyle = "white";
  ctx.font = "bold 13px monospace";
  ctx.save();
  ctx.translate(775, 225);
  ctx.rotate(-Math.PI / 2);
  ctx.textAlign = "center";
  ctx.fillText("TOUCHDOWN", 0, 0);
  ctx.restore();
}

function drawPlayers() {
  receivers.forEach((r, i) => {
    ctx.fillStyle = "white";
    ctx.fillRect(r.x - 10, r.y - 10, 20, 20);
    ctx.fillStyle = "#1434a4";
    ctx.font = "bold 11px monospace";
    ctx.textAlign = "center";
    ctx.fillText("WR" + (i + 1), r.x, r.y - 17);
  });

  defenders.forEach(d => {
    ctx.fillStyle = "#ed3434";
    ctx.fillRect(d.x - 11, d.y - 11, 22, 22);
    ctx.fillStyle = "white";
    ctx.fillText("X", d.x, d.y + 4);
  });

  ctx.fillStyle = "#f0e600";
  ctx.fillRect(qb.x - 13, qb.y - 13, 26, 26);
  ctx.fillStyle = "#071641";
  ctx.fillText("QB", qb.x, qb.y + 4);

  if (ball) {
    ctx.fillStyle = "#7b3514";
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, 9, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "white";
    ctx.stroke();
  }
}

function gameLoop(timestamp) {
  if (!running) return;

  const dt = lastTime ? Math.min((timestamp - lastTime) / 1000, 0.04) : 0;
  lastTime = timestamp;

  updateGame(dt);
  drawField();
  drawPlayers();
  updateScoreboard();

  if (running) frame = requestAnimationFrame(gameLoop);
}

// ==========================================
// FINISH GAME & CAREER
// ==========================================

function finishGame() {
  running = false;
  cancelAnimationFrame(frame);
  clearTimeout(driveTimer);

  const opponent = score === opponentScore
    ? opponentScore + 3
    : opponentScore;

  opponentScore = opponent;

  const won = score > opponentScore;
  const game = schedule[week - 1];

  if (game && !game.played) {
    game.played = true;
    game.result = won ? "WIN" : "LOSS";

    if (won) {
      wins++;
      fanSupport = Math.min(100, fanSupport + 5);
      morale = Math.min(100, morale + 8);
    } else {
      losses++;
      fanSupport = Math.max(10, fanSupport - 5);
      morale = Math.max(10, morale - 8);
    }

    week++;
  }

  $("gameMessage").textContent =
    won ? "VICTORY! YOU WON!" : "FINAL WHISTLE! GAME OVER!";

  $("gameMessage").textContent += ` FINAL SCORE: ${score} - ${opponentScore}`;

  updateScoreboard();
  updateDashboard();

  $("gameIntro").style.display = "block";
  $("playingArea").style.display = "none";

  $("gameIntro").querySelector("h2").textContent =
    won ? "YOU WON!" : "GAME OVER!";
}

function returnToSeason() {
  running = false;
  cancelAnimationFrame(frame);
  clearTimeout(driveTimer);

  $("gameScreen").style.display = "none";
  $("seasonScreen").style.display = "block";

  updateDashboard();
}

function backToCareer() {
  running = false;
  cancelAnimationFrame(frame);
  clearTimeout(driveTimer);

  $("gameScreen").style.display = "none";
  $("seasonScreen").style.display = "none";
  $("selectionScreen").style.display = "block";

  document.querySelector(".header").style.display = "";
  document.querySelector(".top-bar").style.display = "";
  document.querySelector(".scoreboard").style.display = "";
  document.querySelector(".footer").style.display = "";
}

// ==========================================
// CONTROLS
// ==========================================

window.addEventListener("keydown", e => {
  const key = e.key.toLowerCase();

  if (["arrowup", "arrowdown", "arrowleft", "arrowright", " "].includes(key)) {
    e.preventDefault();
  }

  keys[key] = true;

  if (e.code === "Space") throwBall();
});

window.addEventListener("keyup", e => {
  keys[e.key.toLowerCase()] = false;
});

if (canvas) {
  canvas.addEventListener("pointermove", e => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = (e.clientX - rect.left) * 800 / rect.width;
    mouse.y = (e.clientY - rect.top) * 450 / rect.height;
  });

  canvas.addEventListener("pointerdown", throwBall);
}

resetPlay();
