
// ===================================
// NEW YORK HIGH SCHOOL TEAMS
// ===================================

const teams = {

    football: {
        "AA": [
            "Baldwin High School",
            "Newburgh Free Academy",
            "Shenendehowa High School",
            "Syracuse CBA"
        ],
        "A": [
            "Maine-Endwell High School",
            "Queensbury High School",
            "Somers High School",
            "Garden City High School"
        ],
        "B": [
            "Rye High School",
            "New Paltz High School",
            "Owego Free Academy",
            "Marlboro High School"
        ],
        "C": [
            "Chenango Forks High School",
            "Schuylerville High School",
            "Glens Falls High School",
            "Cazenovia High School"
        ],
        "D": [
            "Tuckahoe High School",
            "Deposit High School",
            "Pine Plains High School",
            "Chester Academy"
        ]
    },

    soccer: {
        "AAA": [
            "Newburgh Free Academy",
            "Shenendehowa High School",
            "Scarsdale High School",
            "Syosset High School"
        ],
        "AA": [
            "Mamaroneck High School",
            "Ithaca High School",
            "Fayetteville-Manlius High School",
            "Fairport High School"
        ],
        "A": [
            "Somers High School",
            "Garden City High School",
            "Cornwall Central High School",
            "Maine-Endwell High School"
        ],
        "B": [
            "Rye High School",
            "New Paltz High School",
            "Honeoye Falls-Lima High School",
            "Schuylerville High School"
        ],
        "C": [
            "Haldane High School",
            "Tuckahoe High School",
            "Chenango Forks High School",
            "Cazenovia High School"
        ],
        "D": [
            "Deposit High School",
            "Pine Plains High School",
            "Chester Academy",
            "North Salem High School"
        ]
    },

    basketball: {
        "AAA": [
            "Baldwin High School",
            "Newburgh Free Academy",
            "Mount Vernon High School",
            "Syracuse CBA"
        ],
        "AA": [
            "Mamaroneck High School",
            "Ithaca High School",
            "Scarsdale High School",
            "North Rockland High School"
        ],
        "A": [
            "Garden City High School",
            "Somers High School",
            "Cornwall Central High School",
            "Queensbury High School"
        ],
        "B": [
            "Rye High School",
            "New Paltz High School",
            "Marlboro High School",
            "Owego Free Academy"
        ],
        "C": [
            "Tuckahoe High School",
            "Haldane High School",
            "Chenango Forks High School",
            "Schuylerville High School"
        ],
        "D": [
            "Deposit High School",
            "Pine Plains High School",
            "Chester Academy",
            "North Salem High School"
        ]
    },

    baseball: {
        "AAA": [
            "Shenendehowa High School",
            "Baldwin High School",
            "Newburgh Free Academy",
            "Saratoga Springs High School"
        ],
        "AA": [
            "Ithaca High School",
            "Mamaroneck High School",
            "Fairport High School",
            "North Rockland High School"
        ],
        "A": [
            "Maine-Endwell High School",
            "Garden City High School",
            "Somers High School",
            "Cornwall Central High School"
        ],
        "B": [
            "Rye High School",
            "New Paltz High School",
            "Owego Free Academy",
            "Marlboro High School"
        ],
        "C": [
            "Chenango Forks High School",
            "Schuylerville High School",
            "Cazenovia High School",
            "Haldane High School"
        ],
        "D": [
            "Deposit High School",
            "Pine Plains High School",
            "Chester Academy",
            "Tuckahoe High School"
        ]
    }
};


// ===================================
// SPORT NAMES
// ===================================

const sportNames = {
    football: "FOOTBALL",
    soccer: "SOCCER",
    basketball: "BASKETBALL",
    baseball: "BASEBALL"
};


// ===================================
// SELECTED GAME INFORMATION
// ===================================

let selectedSport = "football";
let selectedDivision = "AA";
let selectedTeam = teams.football.AA[0];


// ===================================
// SELECT SPORT
// ===================================

function selectSport(sport, button) {

    if (sport !== "football") {
        alert("Only FOOTBALL is currently playable!");
        return;
    }

    selectedSport = "football";

    selectedDivision = "AA";

    selectedTeam = teams.football.AA[0];

    document.querySelectorAll(".sport-card").forEach(card => {
        card.classList.remove("active");
    });

    button.classList.add("active");

    renderDivisions();
    renderTeams();
    updatePreview();

}


// ===================================
// DISPLAY DIVISIONS
// ===================================

function renderDivisions() {

    const grid = document.getElementById("divisionGrid");

    if (!grid) {
        console.error("Division grid not found in HTML!");
        return;
    }

    grid.innerHTML = "";

    Object.keys(teams[selectedSport]).forEach(division => {

        const button = document.createElement("button");

        button.className = "division-card";

        button.textContent = "CLASS " + division;

        if (division === selectedDivision) {
            button.classList.add("active");
        }

        button.onclick = function() {

            selectedDivision = division;

            selectedTeam = teams[selectedSport][division][0];

            renderDivisions();
            renderTeams();
            updatePreview();

        };

        grid.appendChild(button);

    });

}


// ===================================
// DISPLAY HIGH SCHOOLS
// ===================================

function renderTeams() {

    const grid = document.getElementById("teamGrid");

    if (!grid) {
        console.error("Team grid not found in HTML!");
        return;
    }

    grid.innerHTML = "";

    teams[selectedSport][selectedDivision].forEach(team => {

        const button = document.createElement("button");

        button.className = "team-card";

        button.textContent = team.toUpperCase();

        if (team === selectedTeam) {
            button.classList.add("active");
        }

        button.onclick = function() {

            selectedTeam = team;

            renderTeams();
            updatePreview();

        };

        grid.appendChild(button);

    });

}


// ===================================
// UPDATE PLAYER PREVIEW
// ===================================

function updatePreview() {

    document.getElementById("previewTeam").textContent =
        selectedTeam.toUpperCase();

    document.getElementById("previewDetails").textContent =
        sportNames[selectedSport] +
        " / NEW YORK / CLASS " +
        selectedDivision;

}


// ===================================
// INITIALIZE SELECTION SCREEN
// ===================================

renderDivisions();
renderTeams();
updatePreview();

// ===================================
// RETRO LEAGUE FOOTBALL ENGINE
// ===================================

let canvas = document.getElementById("footballCanvas");
let ctx = canvas ? canvas.getContext("2d") : null;

let qb = { x: 105, y: 225 };

let receivers = [
    { x: 330, y: 100, color: "#ffffff", route: 1 },
    { x: 390, y: 225, color: "#ffffff", route: 2 },
    { x: 330, y: 350, color: "#ffffff", route: 3 }
];

let defenders = [
    { x: 420, y: 130 },
    { x: 470, y: 250 },
    { x: 410, y: 350 },
    { x: 570, y: 180 }
];

let keys = {};
let mouse = { x: 500, y: 225 };

let ball = null;
let score = 0;
let down = 1;
let yardsToGo = 10;
let gameRunning = false;
let animationFrame = null;
let lastTime = 0;

const fieldWidth = 800;
const fieldHeight = 450;

// START GAME

function beginFootballGame() {
    canvas = document.getElementById("footballCanvas");

if (!canvas) {
    console.error("Football canvas not found!");
    return;
}

ctx = canvas.getContext("2d");

if (!ctx) {
    console.error("Could not initialize football canvas!");
    return;
}

    document.getElementById("gameIntro").style.display = "none";
    document.getElementById("playingArea").style.display = "block";

    gameRunning = true;

    resetDrive();

    if (animationFrame) {
        cancelAnimationFrame(animationFrame);
    }

    lastTime = 0;
    animationFrame = requestAnimationFrame(gameLoop);
}

// RESET PLAY

function resetDrive() {

    qb = { x: 105, y: 225 };

    receivers = [
        { x: 330, y: 100, color: "white", route: 1 },
        { x: 390, y: 225, color: "white", route: 2 },
        { x: 330, y: 350, color: "white", route: 3 }
    ];

    defenders = [
        { x: 420, y: 130 },
        { x: 470, y: 250 },
        { x: 410, y: 350 },
        { x: 570, y: 180 }
    ];

    ball = null;

    document.getElementById("gameMessage").textContent =
        "FIND AN OPEN RECEIVER AND THROW!";
}

// KEYBOARD CONTROLS

window.addEventListener("keydown", function(e) {

    if (
        ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", " "]
        .includes(e.key)
    ) {
        e.preventDefault();
    }

    keys[e.key.toLowerCase()] = true;

    if (
        e.code === "Space" &&
        gameRunning &&
        document.getElementById("playingArea").style.display !== "none"
    ) {
        throwBall();
    }

});

window.addEventListener("keyup", function(e) {
    keys[e.key.toLowerCase()] = false;
});

// MOUSE AIMING

canvas.addEventListener("pointermove", function(e) {

    const rect = canvas.getBoundingClientRect();

    mouse.x = (e.clientX - rect.left) * fieldWidth / rect.width;
    mouse.y = (e.clientY - rect.top) * fieldHeight / rect.height;

});

canvas.addEventListener("pointerdown", function(e) {

    if (e.button === 0) {
        throwBall();
    }

});

// THROW FOOTBALL

function throwBall() {

    if (!gameRunning || ball !== null) return;

    const dx = mouse.x - qb.x;
    const dy = mouse.y - qb.y;

    const length = Math.sqrt(dx * dx + dy * dy);

    if (length < 10) return;

    ball = {
        x: qb.x,
        y: qb.y,
        vx: dx / length * 11,
        vy: dy / length * 11,
        life: 0,
        completed: false
    };

    document.getElementById("gameMessage").textContent =
        "PASS IN THE AIR!";
}

// UPDATE GAME

function updateGame(dt) {

    if (!gameRunning) return;

    const speed = 190 * dt;

    // QB movement
    if (keys["w"] || keys["arrowup"]) qb.y -= speed;
    if (keys["s"] || keys["arrowdown"]) qb.y += speed;
    if (keys["a"] || keys["arrowleft"]) qb.x -= speed;
    if (keys["d"] || keys["arrowright"]) qb.x += speed;

    qb.x = Math.max(35, Math.min(760, qb.x));
    qb.y = Math.max(65, Math.min(385, qb.y));

    // Receiver movement
    receivers.forEach((r, i) => {
        r.x += (i === 1 ? 85 : 65) * dt;
        r.y += Math.sin(performance.now() / 400 + i * 2) * 35 * dt;

        r.x = Math.min(r.x, 750);
        r.y = Math.max(45, Math.min(405, r.y));
    });

    // Defender movement
    for (const d of defenders) {

        const target = ball || qb;

        const dx = target.x - d.x;
        const dy = target.y - d.y;
        const distance = Math.hypot(dx, dy);

        if (distance > 1) {
            const defenderSpeed = 65;

            d.x += (dx / distance) * defenderSpeed * dt;
            d.y += (dy / distance) * defenderSpeed * dt;
        }

        // Tackle QB only once
        if (!ball && distance < 19) {

            qb.x = 105;
            qb.y = 225;

            down++;

            if (down > 4) {
                down = 1;
                yardsToGo = 10;

                document.getElementById("gameMessage").textContent =
                    "TURNOVER ON DOWNS!";
            } else {
                document.getElementById("gameMessage").textContent =
                    "TACKLED! TRY AGAIN!";
            }

            updateScoreboard();
            return;
        }
    }

    // Football in flight
    if (ball) {

        ball.x += ball.vx * dt * 60;
        ball.y += ball.vy * dt * 60;
        ball.life += dt;

        // Receiver catches ball
        for (const r of receivers) {

            const distance = Math.hypot(
                ball.x - r.x,
                ball.y - r.y
            );

            if (distance < 24) {
                completePass(r);
                return;
            }
        }

        // Defender interception
        for (const d of defenders) {

            const distance = Math.hypot(
                ball.x - d.x,
                ball.y - d.y
            );

            if (distance < 16) {

                ball = null;

                document.getElementById("gameMessage").textContent =
                    "INTERCEPTED! DEFENSE GOT THE BALL!";

                down = 1;
                yardsToGo = 10;

                updateScoreboard();
                return;
            }
        }

        // Incomplete pass
        if (
            ball.x < 0 ||
            ball.x > fieldWidth ||
            ball.y < 0 ||
            ball.y > fieldHeight ||
            ball.life > 2.5
        ) {

            ball = null;
            down++;

            if (down > 4) {
                down = 1;
                yardsToGo = 10;

                document.getElementById("gameMessage").textContent =
                    "TURNOVER ON DOWNS!";
            } else {
                document.getElementById("gameMessage").textContent =
                    "INCOMPLETE PASS!";
            }

            updateScoreboard();
        }
    }
}

// COMPLETE PASS

function completePass(receiver) {

    const gain = Math.max(
        1,
        Math.round((receiver.x - qb.x) / 10)
    );

    ball = null;

    if (receiver.x >= 735) {

        score += 7;
        down = 1;
        yardsToGo = 10;

        document.getElementById("gameMessage").textContent =
            "TOUCHDOWN! +7 POINTS!";

    } else {

        yardsToGo = Math.max(0, yardsToGo - gain);

        if (yardsToGo === 0) {

            down = 1;
            yardsToGo = 10;

            document.getElementById("gameMessage").textContent =
                "FIRST DOWN! GREAT PASS!";

        } else {

            down++;

            document.getElementById("gameMessage").textContent =
                "COMPLETE PASS! +" + gain + " YARDS!";

            if (down > 4) {

                down = 1;
                yardsToGo = 10;

                document.getElementById("gameMessage").textContent =
                    "TURNOVER ON DOWNS!";

            }

        }

    }

    updateScoreboard();

    setTimeout(() => {

        if (gameRunning) {
            resetDrive();
        }

    }, 1800);

}

// SCOREBOARD

function updateScoreboard() {

    document.getElementById("score").textContent = score;

    document.getElementById("down").textContent = down;

    document.getElementById("yards").textContent = yardsToGo;

}

// DRAW FOOTBALL FIELD

function drawField() {

    // Grass

    ctx.fillStyle = "#168b37";
    ctx.fillRect(0, 0, 800, 450);

    // Field stripes

    for (let x = 0; x < 800; x += 80) {

        ctx.fillStyle = "#20a34a";
        ctx.fillRect(x, 0, 40, 450);

    }

    // Yard lines

    ctx.strokeStyle = "rgba(255,255,255,0.7)";
    ctx.lineWidth = 2;

    for (let x = 80; x < 800; x += 80) {

        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, 450);
        ctx.stroke();

    }

    // Sidelines

    ctx.strokeStyle = "white";
    ctx.lineWidth = 5;

    ctx.strokeRect(5, 5, 790, 440);

    // End zone

    ctx.fillStyle = "#1434a4";
    ctx.fillRect(745, 7, 48, 436);

    ctx.save();

    ctx.translate(775, 225);
    ctx.rotate(-Math.PI / 2);

    ctx.fillStyle = "white";
    ctx.font = "bold 13px monospace";
    ctx.textAlign = "center";
    ctx.fillText("TOUCHDOWN", 0, 0);

    ctx.restore();

    // Yard numbers

    ctx.fillStyle = "white";
    ctx.font = "13px monospace";
    ctx.textAlign = "center";

    for (let x = 80; x < 720; x += 160) {

        ctx.fillText(String(Math.round(x / 8)), x, 35);
        ctx.fillText(String(Math.round(x / 8)), x, 425);

    }

}

// DRAW PLAYERS

function drawPlayers() {

    // Receivers

    receivers.forEach((r, i) => {

        ctx.fillStyle = "#ffffff";
        ctx.fillRect(r.x - 10, r.y - 10, 20, 20);

        ctx.fillStyle = "#1434a4";
        ctx.font = "bold 11px monospace";
        ctx.textAlign = "center";

        ctx.fillText("WR" + (i + 1), r.x, r.y - 17);

    });

    // Defenders

    defenders.forEach(d => {

        ctx.fillStyle = "#ed3434";
        ctx.fillRect(d.x - 11, d.y - 11, 22, 22);

        ctx.fillStyle = "white";
        ctx.font = "bold 12px monospace";
        ctx.textAlign = "center";

        ctx.fillText("X", d.x, d.y + 4);

    });

    // Quarterback

    ctx.fillStyle = "#f0e600";
    ctx.fillRect(qb.x - 13, qb.y - 13, 26, 26);

    ctx.fillStyle = "#071641";
    ctx.font = "bold 12px monospace";
    ctx.textAlign = "center";

    ctx.fillText("QB", qb.x, qb.y + 4);

    // Aiming line

    if (!ball) {

        ctx.strokeStyle = "rgba(255,255,0,0.6)";
        ctx.setLineDash([5, 5]);

        ctx.beginPath();
        ctx.moveTo(qb.x, qb.y);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.stroke();

        ctx.setLineDash([]);

    }

    // Football

    if (ball) {

        ctx.fillStyle = "#7b3514";

        ctx.beginPath();
        ctx.arc(ball.x, ball.y, 9, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = "white";
        ctx.lineWidth = 2;
        ctx.stroke();

    }

}

// MAIN GAME LOOP

function gameLoop(timestamp) {

    if (!gameRunning) return;

    const dt = lastTime
        ? Math.min((timestamp - lastTime) / 1000, 0.04)
        : 0;

    lastTime = timestamp;

    updateGame(dt);

    drawField();

    drawPlayers();

    animationFrame = requestAnimationFrame(gameLoop);

}

// ===================================
// START SEASON
// ===================================

function startSeason() {

    // Make sure the player entered a username
    const username = document.getElementById("username").value.trim();

    if (!username) {
        alert("PLEASE ENTER YOUR PLAYER NAME!");
        return;
    }

    // Only football is playable right now
    if (selectedSport !== "football") {
        alert("PLEASE SELECT FOOTBALL TO PLAY!");
        return;
    }

    // Update game screen information
    document.getElementById("gameTeam").textContent =
        selectedTeam.toUpperCase();

    document.getElementById("scoreTeam").textContent =
        username.toUpperCase();

    document.getElementById("introTeam").textContent =
        selectedTeam.toUpperCase();

    // Hide player selection screen
    document.getElementById("selectionScreen").style.display = "none";

    // Hide the header and footer
    document.querySelector(".header").style.display = "none";
    document.querySelector(".top-bar").style.display = "none";
    document.querySelector(".scoreboard").style.display = "none";
    document.querySelector(".footer").style.display = "none";

    // Show the actual game screen
    document.getElementById("gameScreen").style.display = "block";

    // Show the pre-game introduction
    document.getElementById("gameIntro").style.display = "block";
    document.getElementById("playingArea").style.display = "none";

}

function backToCareer() {

    // Stop the football game
    gameRunning = false;

    if (animationFrame) {
        cancelAnimationFrame(animationFrame);
        animationFrame = null;
    }

    // Hide game screen
    document.getElementById("gameScreen").style.display = "none";

    // Show career screen
    document.getElementById("selectionScreen").style.display = "block";

    document.querySelector(".header").style.display = "block";
    document.querySelector(".top-bar").style.display = "flex";
    document.querySelector(".scoreboard").style.display = "flex";
    document.querySelector(".footer").style.display = "block";

}
