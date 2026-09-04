// Game Database Loader

let GAMES = [];

let GAME_PROFILES = [];

// Database Status
let gamesLoaded = false;


// Load Game Database
async function loadGameDatabase() {
    if (gamesLoaded && GAMES.length > 0) {
        return GAMES;
    }

    try {
        const response = await fetch("data/games.json");

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();

        if (!Array.isArray(data)) {
            throw new Error("games.json must contain an array.");
        }

        GAMES = data;

        GAME_PROFILES = buildGameProfiles(GAMES);

        gamesLoaded = true;

        console.log(`Loaded ${GAMES.length} games`);

        return GAMES;

    }
    catch (error) {
        console.error("Game database failed:", error);

        GAMES = [];

        GAME_PROFILES = [];

        gamesLoaded = false;

        return [];
    }
}