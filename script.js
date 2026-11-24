// ==================================================
// 1. HELPER FUNCTIONS
// ==================================================

/* This function finds an HTML element using its ID.

   Example:
   $("username") finds the element with id="username".

   This saves us from repeatedly writing:
   document.getElementById("username"). */

const $ = id => document.getElementById(id);


// ==================================================
// 2. TEAM DATABASE
// ==================================================

/* Stores all the schools available in Retro League.

   The information is organized by:
   SPORT -> DIVISION -> SCHOOLS

   The | symbol separates individual school names.

   To add a school, add its name between two | symbols.
   To add a division, add another division below. */

const teams = {
    football: {
        AA: "Baldwin|Newburgh Free Academy|Shenendehowa|Syracuse CBA|Victor|Lancaster|West Genesee|Niskayuna",
        A: "Maine-Endwell|Queensbury|Somers|Garden City|Pittsford Sutherland|East Aurora|Burnt Hills|Yorktown",
        B: "Rye|New Paltz|Owego|Marlboro|Johnstown|Schalmont|Le Roy|Avon",
        C: "Chenango Forks|Schuylerville|Glens Falls|Cazenovia|Barker|Waverly|Onondaga|Maple Grove",
        D: "Tuckahoe|Deposit|Pine Plains|Chester Academy|Franklinville|Fabius-Pompey|Notre Dame-Bishop Gibbons|Andes Central"
    },

    soccer: {
        AAA: "Newburgh|Shenendehowa|Scarsdale|Syosset|Liverpool|Binghamton|Brockport|Massapequa",
        AA: "Mamaroneck|Ithaca|Fairport|North Rockland|Victor|Lancaster|West Genesee|Niskayuna",
        A: "Somers|Garden City|Cornwall|Maine-Endwell|Pittsford Sutherland|East Aurora|Burnt Hills|Yorktown",
        B: "Rye|New Paltz|Honeoye Falls|Schuylerville|Johnstown|Schalmont|Le Roy|Avon",
        C: "Haldane|Tuckahoe|Chenango Forks|Cazenovia|Barker|Waverly|Onondaga|Maple Grove",
        D: "Deposit|Pine Plains|Chester Academy|North Salem|Franklinville|Fabius-Pompey|Notre Dame-Bishop Gibbons|Andes Central"
    },

    basketball: {
        AAA: "Baldwin|Newburgh|Mount Vernon|Syracuse CBA|Liverpool|Binghamton|Brockport|Massapequa",
        AA: "Mamaroneck|Ithaca|Scarsdale|North Rockland|Victor|Lancaster|West Genesee|Niskayuna",
        A: "Garden City|Somers|Cornwall|Queensbury|Pittsford Sutherland|East Aurora|Burnt Hills|Yorktown",
        B: "Rye|New Paltz|Marlboro|Owego|Johnstown|Schalmont|Le Roy|Avon",
        C: "Tuckahoe|Haldane|Chenango Forks|Schuylerville|Barker|Waverly|Onondaga|Maple Grove",
        D: "Deposit|Pine Plains|Chester Academy|North Salem|Franklinville|Fabius-Pompey|Notre Dame-Bishop Gibbons|Andes Central"
    },

    baseball: {
        AAA: "Shenendehowa|Baldwin|Newburgh|Saratoga Springs|Liverpool|Binghamton|Brockport|Massapequa",
        AA: "Ithaca|Mamaroneck|Fairport|North Rockland|Victor|Lancaster|West Genesee|Niskayuna",
        A: "Maine-Endwell|Garden City|Somers|Cornwall|Pittsford Sutherland|East Aurora|Burnt Hills|Yorktown",
        B: "Rye|New Paltz|Owego|Marlboro|Johnstown|Schalmont|Le Roy|Avon",
        C: "Chenango Forks|Schuylerville|Cazenovia|Haldane|Barker|Waverly|Onondaga|Maple Grove",
        D: "Deposit|Pine Plains|Chester Academy|Tuckahoe|Franklinville|Fabius-Pompey|Notre Dame-Bishop Gibbons|Andes Central"
    }
};

/* Converts a division's school list into a JavaScript array.

   Example:
   "Baldwin|Victor|Niskayuna"

   becomes:
   ["Baldwin", "Victor", "Niskayuna"] */

function getSchools(sportName, divisionName) {
    return teams[sportName][divisionName].split("|");
}


// ==================================================
// 3. PLAYER AND SEASON INFORMATION
// ==================================================

/* These variables remember the player's choices
   and progress throughout the season. */

let sport = "football";
let division = "AA";
let team = "Baldwin";
let player = "";

let week = 1;
let wins = 0;
let losses = 0;

let schedule = [];

let fanSupport = 75;
let morale = 80;


// ==================================================
// 4. SPORT SELECTION
// ==================================================

/* Runs when the player clicks a sport button.

   Changes the selected sport, chooses its first division
   and school, and refreshes the selection screen. */

function selectSport(name, button) {

    sport = name;

    // Select the first division available for this sport.
    division = Object.keys(teams[sport])[0];

    // Automatically select the first school in that division.
    team = getSchools(sport, division)[0];

    // Highlights the selected sport button.
    document.querySelectorAll(".sport-card").forEach(card => {
        card.classList.toggle("active", card === button);
    });

    renderSelection();
}


// ==================================================
// 5. DIVISION AND SCHOOL SELECTION
// ==================================================

/* Creates the division and school buttons.

   JavaScript creates these buttons automatically.
   You do not need to manually create every school button
   in your HTML file. */

function renderSelection() {

    const divisionGrid = $("divisionGrid");
    const teamGrid = $("teamGrid");

    // Stop if the required HTML elements cannot be found.
    if (!divisionGrid || !teamGrid) return;

    // Clear the old buttons before creating new ones.
    divisionGrid.innerHTML = "";
    teamGrid.innerHTML = "";

    // CREATE DIVISION BUTTONS.
    Object.keys(teams[sport]).forEach(name => {

        const button = document.createElement("button");

        button.className = "division-card";
        button.textContent = "CLASS " + name;

        // Highlight the currently selected division.
        if (name === division) {
            button.classList.add("active");
        }

        // Change division when the player clicks the button.
        button.onclick = () => {
            division = name;
            team = getSchools(sport, division)[0];
            renderSelection();
        };

        divisionGrid.appendChild(button);
    });


    // CREATE SCHOOL BUTTONS.
    getSchools(sport, division).forEach(school => {

        const button = document.createElement("button");

        button.className = "team-card";
        button.textContent = school.toUpperCase();

        // Highlight the currently selected school.
        if (school === team) {
            button.classList.add("active");
        }

        // Change school when the player clicks the button.
        button.onclick = () => {
            team = school;
            renderSelection();
        };

        teamGrid.appendChild(button);
    });


    // UPDATE THE PLAYER PREVIEW.
    $("previewTeam").textContent = team.toUpperCase();

    $("previewDetails").textContent =
        sport.toUpperCase() + " / NEW YORK / CLASS " + division;
}

// Creates the initial division and school buttons.
renderSelection();


// ==================================================
// 6. STARTING A SEASON
// ==================================================

/* Runs when the player clicks START SEASON.

   Checks the player's name, creates the schedule,
   resets the season statistics, and opens the dashboard. */

function startSeason() {

    player = $("username").value.trim();

    // A player must enter a name before starting.
    if (!player) {
        alert("ENTER YOUR PLAYER NAME!");
        return;
    }

    // Create a schedule using the other schools in the division.
    schedule = getSchools(sport, division)
        .filter(school => school !== team)
        .map(opponent => ({
            opponent: opponent,
            played: false
        }));

    // Reset all season statistics.
    week = 1;
    wins = 0;
    losses = 0;
    fanSupport = 75;
    morale = 80;

    // Hide the selection screen.
    $("selectionScreen").style.display = "none";

    // Show the season dashboard.
    $("seasonScreen").style.display = "block";

    // Hide the website header while playing career mode.
    document.querySelector(".header").style.display = "none";
    document.querySelector(".top-bar").style.display = "none";
    document.querySelector(".scoreboard").style.display = "none";
    document.querySelector(".footer").style.display = "none";

    updateDashboard();
}


// ==================================================
// 7. UPDATING THE SEASON DASHBOARD
// ==================================================

/* Updates the information displayed on the dashboard.

   This includes:
   - Player name
   - School and division
   - Current week
   - Wins and losses
   - Next opponent
   - Fan support and morale
   - Schedule and standings */

function updateDashboard() {

    const game = schedule[week - 1];

    // UPDATE PLAYER INFORMATION.
    $("dashboardPlayer").textContent = "PLAYER: " + player.toUpperCase();
    $("dashboardDivision").textContent = "CLASS " + division;
    $("dashboardWeek").textContent = "WEEK " + String(week).padStart(2, "0");
    $("dashboardRecord").textContent = wins + " - " + losses;

    $("dashboardTeam").textContent = team.toUpperCase();
    $("dashboardSchool").textContent = team.toUpperCase();

    // Display the next opponent or show that the season is over.
    $("dashboardOpponent").textContent =
        game ? game.opponent.toUpperCase() : "SEASON COMPLETE";

    $("matchupWeek").textContent = String(week).padStart(2, "0");


    // UPDATE TEAM STATUS.
    $("fanSupport").textContent = fanSupport + "%";
    $("teamMorale").textContent = morale + "%";

    $("teamRating").textContent =
        Math.round((fanSupport + morale) / 2) + " OVR";

    // Change the widths of the status bars.
    $("fanBar").style.width = fanSupport + "%";
    $("moraleBar").style.width = morale + "%";


    // UPDATE THE NEXT GAME BUTTON.
    const startButton = document.querySelector(".dashboard-start");

    startButton.disabled = !game;

    startButton.textContent =
        game ? "▶ NEXT GAME" : "SEASON COMPLETE";


    // UPDATE THE STANDINGS.
    $("standingsList").innerHTML = `
        <div class="standing-row active">
            <span>1. ${team.toUpperCase()}</span>
            <span>${wins}</span>
            <span>${losses}</span>
        </div>
    `;


    // UPDATE THE SEASON SCHEDULE.
    $("scheduleList").innerHTML = schedule.map((game, index) => `

        <div class="schedule-game">

            <span>WEEK ${String(index + 1).padStart(2, "0")}</span>

            <span>${game.opponent.toUpperCase()}</span>

            <strong>
                ${game.played
                    ? game.result
                    : index + 1 === week
                        ? "NEXT GAME"
                        : "UPCOMING"}
            </strong>

        </div>

    `).join("");
}


// ==================================================
// 8. FOOTBALL GAME VARIABLES
// ==================================================

/* These variables store everything happening
   during the football game. */

const canvas = $("footballCanvas");
const ctx = canvas.getContext("2d");

// Players on the field.
let qb;
let receivers = [];
let defenders = [];

// The football being thrown.
let ball = null;

// Keyboard and mouse information.
let keys = {};
let mouse = { x: 500, y: 225 };

// Scoreboard information.
let score = 0;
let opponentScore = 0;

let down = 1;
let yards = 10;
let quarter = 1;
let clock = 120;

// Controls the game loop.
let running = false;
let lastTime = 0;
let frame;

// Controls the delay between plays.
let driveTimer;


// ==================================================
// 9. RESETTING A FOOTBALL PLAY
// ==================================================

/* Resets the positions of the quarterback,
   receivers, defenders, and football.

   This is used when a new play begins. */

function resetPlay() {

    // Place the quarterback near the left side of the field.
    qb = { x: 100, y: 225 };

    // Create three receivers.
    receivers = [
        { x: 330, y: 100 },
        { x: 390, y: 225 },
        { x: 330, y: 350 }
    ];

    // Create four defenders.
    defenders = [
        { x: 420, y: 130 },
        { x: 470, y: 250 },
        { x: 410, y: 350 },
        { x: 570, y: 180 }
    ];

    // Remove any football currently in the air.
    ball = null;
}


// ==================================================
// 10. OPENING GAME DAY
// ==================================================

/* Runs when the player clicks NEXT GAME.

   Hides the dashboard, opens the football game,
   displays the teams, and resets the scoreboard. */

function openGameDay() {

    const game = schedule[week - 1];

    if (!game) return;

    $("seasonScreen").style.display = "none";
    $("gameScreen").style.display = "block";

    // Display the two teams.
    $("gameTeam").textContent = team.toUpperCase();
    $("introTeam").textContent = team.toUpperCase();
    $("gameOpponent").textContent = game.opponent.toUpperCase();
    $("scoreTeam").textContent = team.toUpperCase();

    // Show the introduction before gameplay begins.
    $("gameIntro").style.display = "block";
    $("playingArea").style.display = "none";

    // Reset the football game.
    score = 0;
    opponentScore = 0;
    down = 1;
    yards = 10;
    quarter = 1;
    clock = 120;

    updateScoreboard();
}


// ==================================================
// 11. STARTING FOOTBALL GAMEPLAY
// ==================================================

/* Runs when the player clicks START GAME.

   Hides the introduction, shows the football field,
   resets the players, and starts the game animation. */

function beginFootballGame() {

    $("gameIntro").style.display = "none";
    $("playingArea").style.display = "block";

    clearTimeout(driveTimer);

    resetPlay();

    running = true;
    lastTime = 0;

    cancelAnimationFrame(frame);

    // Starts repeatedly updating and drawing the game.
    frame = requestAnimationFrame(gameLoop);
}


// ==================================================
// 12. UPDATING THE FOOTBALL SCOREBOARD
// ==================================================

/* Updates the numbers shown above the football field.

   The game calls this function whenever the score,
   down, yards, quarter, or clock changes. */

function updateScoreboard() {

    $("score").textContent = score;
    $("opponentScore").textContent = opponentScore;

    $("down").textContent = down;
    $("yards").textContent = yards;
    $("quarter").textContent = quarter;

    // Converts the clock from seconds into minutes:seconds.
    $("gameClock").textContent =
        Math.floor(clock / 60) + ":" +
        String(Math.floor(clock % 60)).padStart(2, "0");
}


// ==================================================
// 13. THROWING THE FOOTBALL
// ==================================================

/* Throws the football toward the mouse position.

   The distance calculation determines the direction
   of the pass. The velocity controls how quickly
   the football moves. */

function throwBall() {

    // Do not throw if the game is stopped or a ball is flying.
    if (!running || ball) return;

    const dx = mouse.x - qb.x;
    const dy = mouse.y - qb.y;

    const distance = Math.hypot(dx, dy);

    // Do not throw if the mouse is too close to the quarterback.
    if (distance < 10) return;

    // Create the football and give it movement speed.
    ball = {
        x: qb.x,
        y: qb.y,

        vx: dx / distance * 500,
        vy: dy / distance * 500,

        life: 0
    };

    $("gameMessage").textContent = "PASS IN THE AIR!";
}


// ==================================================
// 14. UPDATING FOOTBALL GAMEPLAY
// ==================================================

/* This is the main gameplay logic.

   It updates:
   - The game clock
   - Quarterback movement
   - Receiver movement
   - Defender movement
   - Football movement
   - Tackles and interceptions */

function updateGame(dt) {

    if (!running) return;


    // UPDATE THE GAME CLOCK.
    clock -= dt;

    if (clock <= 0) {
        clock = 0;
        finishGame();
        return;
    }


    // MOVE THE QUARTERBACK.
    const speed = 190 * dt;

    if (keys.w || keys.arrowup) qb.y -= speed;
    if (keys.s || keys.arrowdown) qb.y += speed;
    if (keys.a || keys.arrowleft) qb.x -= speed;
    if (keys.d || keys.arrowright) qb.x += speed;

    // Prevent the quarterback from leaving the field.
    qb.x = Math.max(25, Math.min(760, qb.x));
    qb.y = Math.max(40, Math.min(410, qb.y));


    // MOVE THE RECEIVERS.
    receivers.forEach((receiver, index) => {

        receiver.x = Math.min(750, receiver.x + 65 * dt);

        // Makes receivers move slightly up and down.
        receiver.y += Math.sin(performance.now() / 400 + index * 2) * 35 * dt;

    });


    // MOVE THE DEFENDERS TOWARD THE BALL OR QUARTERBACK.
    defenders.forEach(defender => {

        const target = ball || qb;

        const dx = target.x - defender.x;
        const dy = target.y - defender.y;

        const distance = Math.hypot(dx, dy);

        if (distance > 1) {
            defender.x += dx / distance * 65 * dt;
            defender.y += dy / distance * 65 * dt;
        }

        // TACKLE THE QUARTERBACK.
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


    // Stop here if the football has not been thrown.
    if (!ball) return;


    // MOVE THE FOOTBALL.
    ball.x += ball.vx * dt;
    ball.y += ball.vy * dt;

    ball.life += dt;


    // CHECK IF A RECEIVER CATCHES THE FOOTBALL.
    const receiver = receivers.find(player =>
        Math.hypot(ball.x - player.x, ball.y - player.y) < 24
    );

    if (receiver) {
        completePass(receiver);
        return;
    }


    // CHECK IF A DEFENDER INTERCEPTS THE FOOTBALL.
    const intercepted = defenders.some(defender =>
        Math.hypot(ball.x - defender.x, ball.y - defender.y) < 16
    );

    if (intercepted) {

        ball = null;

        down = 1;
        yards = 10;

        $("gameMessage").textContent = "INTERCEPTED!";
    }


    // CHECK IF THE FOOTBALL GOES OUT OF BOUNDS.
    if (ball && (
        ball.x < 0 ||
        ball.x > 800 ||
        ball.y < 0 ||
        ball.y > 450 ||
        ball.life > 2.5
    )) {

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


// ==================================================
// 15. COMPLETING A PASS
// ==================================================

/* Runs when a receiver catches the football.

   Calculates the yards gained, checks for a touchdown,
   and updates the down and yards-to-go information. */

function completePass(receiver) {

    const gain = Math.max(1, Math.round((receiver.x - qb.x) / 10));

    // Remove the football after the catch.
    ball = null;


    // CHECK FOR A TOUCHDOWN.
    if (receiver.x >= 735) {

        score += 7;

        down = 1;
        yards = 10;

        $("gameMessage").textContent = "TOUCHDOWN! +7 POINTS!";

    } else {

        // Calculate how many yards were gained.
        yards -= gain;

        if (yards <= 0) {

            down = 1;
            yards = 10;

            $("gameMessage").textContent = "FIRST DOWN!";

        } else {

            down++;

            $("gameMessage").textContent =
                `COMPLETE PASS! +${gain} YARDS!`;

            // Four unsuccessful downs cause a turnover.
            if (down > 4) {

                down = 1;
                yards = 10;

                $("gameMessage").textContent = "TURNOVER ON DOWNS!";
            }
        }
    }

    updateScoreboard();

    // Wait before resetting the players for another play.
    clearTimeout(driveTimer);

    driveTimer = setTimeout(() => {

        if (running) resetPlay();

    }, 1300);
}


// ==================================================
// 16. DRAWING THE FOOTBALL FIELD
// ==================================================

/* Draws the football field on the HTML canvas.

   Canvas is a drawing area that JavaScript controls.
   The coordinates determine where everything appears. */

function drawField() {

    // Draw the green field background.
    ctx.fillStyle = "#168b37";
    ctx.fillRect(0, 0, 800, 450);


    // Create alternating green sections.
    for (let x = 0; x < 800; x += 80) {

        ctx.fillStyle = x % 160 ? "#168b37" : "#20a34a";

        ctx.fillRect(x, 0, 40, 450);
    }


    // Draw the white field lines.
    ctx.strokeStyle = "white";
    ctx.lineWidth = 2;

    for (let x = 80; x < 800; x += 80) {

        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, 450);
        ctx.stroke();
    }


    // Draw the outer field border.
    ctx.strokeRect(5, 5, 790, 440);


    // Draw the blue touchdown zone.
    ctx.fillStyle = "#1434a4";
    ctx.fillRect(745, 7, 48, 436);


    // Write TOUCHDOWN inside the end zone.
    ctx.fillStyle = "white";
    ctx.font = "bold 13px monospace";

    ctx.save();

    ctx.translate(775, 225);
    ctx.rotate(-Math.PI / 2);

    ctx.textAlign = "center";
    ctx.fillText("TOUCHDOWN", 0, 0);

    ctx.restore();
}


// ==================================================
// 17. DRAWING THE PLAYERS AND FOOTBALL
// ==================================================

/* Draws the quarterback, receivers, defenders,
   and football on the field. */

function drawPlayers() {

    // DRAW THE RECEIVERS.
    receivers.forEach((receiver, index) => {

        ctx.fillStyle = "white";

        ctx.fillRect(
            receiver.x - 10,
            receiver.y - 10,
            20,
            20
        );

        ctx.fillStyle = "#1434a4";
        ctx.font = "bold 11px monospace";
        ctx.textAlign = "center";

        ctx.fillText("WR" + (index + 1), receiver.x, receiver.y - 17);
    });


    // DRAW THE DEFENDERS.
    defenders.forEach(defender => {

        ctx.fillStyle = "#ed3434";

        ctx.fillRect(
            defender.x - 11,
            defender.y - 11,
            22,
            22
        );

        ctx.fillStyle = "white";

        ctx.fillText("X", defender.x, defender.y + 4);
    });


    // DRAW THE QUARTERBACK.
    ctx.fillStyle = "#f0e600";

    ctx.fillRect(
        qb.x - 13,
        qb.y - 13,
        26,
        26
    );

    ctx.fillStyle = "#071641";

    ctx.fillText("QB", qb.x, qb.y + 4);


    // DRAW THE FOOTBALL IF IT IS IN THE AIR.
    if (ball) {

        ctx.fillStyle = "#7b3514";

        ctx.beginPath();

        ctx.arc(ball.x, ball.y, 9, 0, Math.PI * 2);

        ctx.fill();

        ctx.strokeStyle = "white";
        ctx.stroke();
    }
}


// ==================================================
// 18. MAIN GAME LOOP
// ==================================================

/* Repeats continuously while the football game is running.

   Each loop:
   1. Calculates the time since the previous frame.
   2. Updates player and football movement.
   3. Draws the field.
   4. Draws the players.
   5. Updates the scoreboard. */

function gameLoop(timestamp) {

    if (!running) return;

    // Calculate the time between frames in seconds.
    const dt = lastTime
        ? Math.min((timestamp - lastTime) / 1000, 0.04)
        : 0;

    lastTime = timestamp;

    // Update the game and redraw everything.
    updateGame(dt);
    drawField();
    drawPlayers();
    updateScoreboard();

    // Request another frame while the game is running.
    if (running) {
        frame = requestAnimationFrame(gameLoop);
    }
}


// ==================================================
// 19. ENDING A GAME
// ==================================================

/* Runs when the game clock reaches zero.

   Determines the winner, updates the season record,
   changes fan support and morale, and displays the result. */

function finishGame() {

    running = false;

    cancelAnimationFrame(frame);
    clearTimeout(driveTimer);


    // If the scores are tied, give the opponent 3 points.
    if (score === opponentScore) {
        opponentScore += 3;
    }

    const won = score > opponentScore;
    const game = schedule[week - 1];


    // UPDATE THE SEASON RECORD.
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


    // DISPLAY THE FINAL SCORE.
    $("gameMessage").textContent =
        (won ? "VICTORY! YOU WON! " : "FINAL WHISTLE! GAME OVER! ") +
        `FINAL SCORE: ${score} - ${opponentScore}`;

    updateScoreboard();
    updateDashboard();


    // Show the game introduction area with the final result.
    $("gameIntro").style.display = "block";
    $("playingArea").style.display = "none";

    $("gameIntro").querySelector("h2").textContent =
        won ? "YOU WON!" : "GAME OVER!";
}


// ==================================================
// 20. RETURNING TO THE SEASON DASHBOARD
// ==================================================

/* Stops the football game and returns to the season
   dashboard without changing the player's selected team. */

function returnToSeason() {

    running = false;

    cancelAnimationFrame(frame);
    clearTimeout(driveTimer);

    $("gameScreen").style.display = "none";
    $("seasonScreen").style.display = "block";

    updateDashboard();
}


// ==================================================
// 21. RETURNING TO PLAYER SELECTION
// ==================================================

/* Allows the player to leave the dashboard or game
   and return to the original player selection screen. */

function backToCareer() {

    // Stop all active game animations and timers.
    running = false;

    cancelAnimationFrame(frame);
    clearTimeout(driveTimer);

    // Hide the other screens.
    $("gameScreen").style.display = "none";
    $("seasonScreen").style.display = "none";

    // Show the player selection screen again.
    $("selectionScreen").style.display = "block";

    // Restore the website header.
    document.querySelector(".header").style.display = "";
    document.querySelector(".top-bar").style.display = "";
    document.querySelector(".scoreboard").style.display = "";
    document.querySelector(".footer").style.display = "";
}


// ==================================================
// 22. KEYBOARD CONTROLS
// ==================================================

/* Detects when the player presses a keyboard key.

   W, A, S, D and the arrow keys move the quarterback.
   SPACE throws the football. */

window.addEventListener("keydown", event => {

    const key = event.key.toLowerCase();

    // Prevent arrow keys and space from scrolling the page.
    if ([
        "arrowup",
        "arrowdown",
        "arrowleft",
        "arrowright",
        " "
    ].includes(key)) {

        event.preventDefault();
    }

    // Remember which key is currently being pressed.
    keys[key] = true;

    // Throw the football when SPACE is pressed.
    if (event.code === "Space") {
        throwBall();
    }
});


/* Detects when the player releases a keyboard key.

   This stops the quarterback from continuing to move
   after the player releases the key. */

window.addEventListener("keyup", event => {

    keys[event.key.toLowerCase()] = false;

});


// ==================================================
// 23. MOUSE AND TOUCH CONTROLS
// ==================================================

/* Allows the player to aim and throw using a mouse
   or touchscreen.

   The pointer position is converted into the canvas's
   original 800 by 450 coordinate system. */

canvas.addEventListener("pointermove", event => {

    const rect = canvas.getBoundingClientRect();

    mouse.x = (event.clientX - rect.left) * 800 / rect.width;
    mouse.y = (event.clientY - rect.top) * 450 / rect.height;

});


/* Throws the football when the player clicks or taps
   the football field. */

canvas.addEventListener("pointerdown", throwBall);


// ==================================================
// 24. INITIALIZE THE GAME
// ==================================================

/* Runs once when the JavaScript file loads.

   Sets the initial positions of the quarterback,
   receivers, and defenders before the game begins. */

resetPlay();