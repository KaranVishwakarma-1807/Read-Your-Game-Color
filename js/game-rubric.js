// Valid Values
const GAME_RUBRIC = {

    // Visual Styles
    visualStyles: [
        "pixelArt",
        "handDrawn",
        "anime",
        "celShaded",
        "stylized3D",
        "realistic",
        "lowPoly",
        "minimalist",
        "voxel",
        "retro"
    ],


    // Visual Tones
    visualTones: [
        "colorful",
        "dark",
        "gritty",
        "moody",
        "whimsical",
        "cozy",
        "peaceful",
        "surreal",
        "atmospheric"
    ],


    // Dimensions
    dimensions: [
        "2d",
        "2.5d",
        "3d"
    ],


    // Cameras
    cameras: [
        "firstPerson",
        "thirdPerson",
        "topDown",
        "isometric",
        "sideScroller",
        "fixedCamera"
    ],


    // World Structure
    worldStructures: [
        "linear",
        "branching",
        "hubBased",
        "openWorld",
        "sandbox",
        "procedural",
        "levelBased",
        "roguelike",
        "metroidvania"
    ],


    // Gameplay Activities
    gameplayActivities: [
        "combat",
        "shooting",
        "melee",
        "platforming",
        "stealth",
        "puzzle",
        "strategy",
        "simulation",
        "management",
        "building",
        "crafting",
        "exploration",
        "driving",
        "racing",
        "farming",
        "customization"
    ],


    // Progression Systems
    progressionSystems: [
        "levels",
        "skills",
        "equipment",
        "builds",
        "loot",
        "upgrades",
        "metaProgression",
        "unlockingAreas",
        "knowledge",
        "discovery",
        "crafting",
        "relationships",
        "collections",
        "technology",
        "territory",
        "weapons",
        "abilities",
        "choices",
        "dialogue",
        "building",
        "farming"
    ],


    // Atmosphere
    atmosphere: [
        "cozy",
        "peaceful",
        "whimsical",
        "mysterious",
        "dark",
        "horror",
        "tense",
        "epic",
        "emotional",
        "surreal",
        "atmospheric",
        "colorful",
        "adventurous",
        "funny",
        "strategic"
    ],


    // Social Modes
    socialModes: [
        "singlePlayer",
        "localCoop",
        "onlineCoop",
        "competitive",
        "mmo",
        "asynchronous",
        "partyGame"
    ],


    // Genres
    genres: [
        "Action",
        "Adventure",
        "Action RPG",
        "RPG",
        "Soulslike",
        "Open World",
        "Roguelike",
        "FPS",
        "Shooter",
        "Sandbox",
        "Survival",
        "Building",
        "Puzzle",
        "Strategy",
        "Simulation",
        "4X",
        "Farming",
        "Co-op",
        "Platformer",
        "Metroidvania",
        "Narrative",
        "Exploration",
        "Management"
    ]
};


// Score Fields
const GAME_SCORE_FIELDS = {
    visualStyles: GAME_RUBRIC.visualStyles,
    visualTones: GAME_RUBRIC.visualTones,
    gameplay: GAME_RUBRIC.gameplayActivities
};


// Social Importance
const SOCIAL_IMPORTANCE_RANGE = {min: 0, max: 100};


// Validate Numbers
function validateScore(value, field, errors) {
    if (typeof value !== "number") {
        errors.push(`${field} must be a number.`);
        return false;
    }
    if (Number.isNaN(value)) {
        errors.push(`${field} cannot be NaN.`);
        return false;
    }
    if (value < 0 || value > 100) {
        errors.push(`${field} must be between 0 and 100.`);
        return false;
    }
    return true;
}


// Validate Score Object
function validateScoreObject(object, allowedKeys, fieldName, errors) {
    if (!object || typeof object !== "object" || Array.isArray(object)) {
        errors.push(`${fieldName} must be an object.`);
        return;
    }

    Object.entries(object).forEach(([key, value]) => {
            if (!allowedKeys.includes(key)) {
                errors.push(`${fieldName}.${key} is not a valid key.`);
                return;
            }

            validateScore(value, `${fieldName}.${key}`, errors);
        }
    );
}


// Valid Tag Array
function validateTagArray(array, allowedValues, fieldName, errors) {
    if (!Array.isArray(array)) {
        errors.push(`${fieldName} must be an array.`);
        return;
    }

    array.forEach(value => {
        if (!allowedValues.includes(value)) {
            errors.push(`${fieldName} contains unknown value "${value}".`);
        }
    });
}


// Validate Game Structure
function validateGame(game) {
    const errors = [];

    // Basic Fields
    if (!game || typeof game !== "object") {
        errors.push("Game must be an object.");
        return {
            valid: false,
            errors
        };
    }
    if (!game.id || typeof game.id !== "string") {
        errors.push("Missing or invalid game.id.");
    }
    if (!game.title || typeof game.title !== "string") {
        errors.push("Missing or invalid game.title.");
    }

    // Visual
    if (!game.visual) {
        errors.push("Missing visual section.");
    }
    else {
        validateScoreObject(game.visual.styles, GAME_RUBRIC.visualStyles, "visual.styles", errors);
        validateScoreObject(game.visual.tones, GAME_RUBRIC.visualTones, "visual.tones", errors);
    }


    // Presentation
    if (!game.presentation) {
        errors.push("Missing presentation section.");
    }
    else {
        if (!GAME_RUBRIC.dimensions.includes(game.presentation.dimension)) {
            errors.push(`Invalid dimension "${game.presentation.dimension}".`);
        }

        validateTagArray(game.presentation.camera, GAME_RUBRIC.cameras, "presentation.camera", errors);
        validateScore(game.presentation.cameraFreedom, "presentation.cameraFreedom", errors);
    }


    // World
    if (!game.world) {
        errors.push("Missing world section.");
    }
    else {
        validateTagArray(game.world.structures, GAME_RUBRIC.worldStructures, "world.structures", errors);
        validateScore(game.world.freedom, "world.freedom", errors);
        validateScore(game.world.exploration, "world.exploration", errors);
    }


    // Gameplay
    if (!game.gameplay) {
        errors.push("Missing gameplay section.");
    }
    else {
        validateTagArray(game.gameplay.activities, GAME_RUBRIC.gameplayActivities, "gameplay.activities", errors);
        validateScoreObject(game.gameplay.scores, GAME_RUBRIC.gameplayActivities, "gameplay.scores", errors);
    }


    // Progression
    if (!game.progression) {
        errors.push("Missing progression section.");
    }
    else {
        validateScore(game.progression.intensity, "progression.intensity", errors);
        validateTagArray(game.progression.systems, GAME_RUBRIC.progressionSystems, "progression.systems", errors);
    }


    // Experience
    if (!game.experience) {
        errors.push("Missing experience section.");
    }
    else {
        validateScore(game.experience.pace, "experience.pace", errors);
        validateScore(game.experience.intensity, "experience.intensity", errors);
        validateScore(game.experience.difficulty, "experience.difficulty", errors);
        validateScore(game.experience.narrative, "experience.narrative", errors);
        validateTagArray(game.experience.atmosphere, GAME_RUBRIC.atmosphere, "experience.atmosphere", errors);
    }


    // Social
    if (!game.social) {
        errors.push("Missing social section.");
    }
    else {
        validateTagArray(game.social.modes, GAME_RUBRIC.socialModes, "social.modes", errors);

        if (game.social.playerCount) {
            if (typeof game.social.playerCount.min !== "number") {
                errors.push("social.playerCount.min must be a number.");
            }

            if (typeof game.social.playerCount.max !== "number") {
                errors.push("social.playerCount.max must be a number.");
            }
        }

        if (game.social.importance !== undefined) {
            validateScore(game.social.importance, "social.importance", errors);
        }
        else {
            errors.push("Missing social.importance.");
        }
    }

    // MetaData
    if (!game.metadata) {
        errors.push("Missing metadata section.");
    }
    else {
        if (game.metadata.releaseYear !== undefined) {
            if (typeof game.metadata.releaseYear !== "number") {
                errors.push("metadata.releaseYear must be a number.");
            }
        }

        if (game.metadata.platforms !== undefined && !Array.isArray(game.metadata.platforms)) {
            errors.push("metadata.platforms must be an array.");
        }

        if (game.metadata.genres !== undefined) {
            validateTagArray(game.metadata.genres, GAME_RUBRIC.genres, "metadata.genres", errors);
        }
    }

    return {
        valid: errors.length === 0,
        errors
    };
}


// Validate Database
function validateGameDatabase(games) {
    console.clear();
    console.log("PLAY YOUR COLOR — GAME DATABASE VALIDATION");
    console.log("==========================================");

    if (!Array.isArray(games)) {
        console.error("Game database must be an array.");
        return false;
    }

    let validGames = 0;

    let invalidGames = 0;

    const seenIds = new Set();

    const seenTitles = new Set();

    games.forEach(game => {
        
        if (seenIds.has(game.id)) {
            console.error(`Duplicate game ID: ${game.id}`);
            invalidGames++;
            return;
        }

        seenIds.add(game.id);

        const normalizedTitle = game.title.trim().toLowerCase();

        if (seenTitles.has(normalizedTitle)) {
            console.warn(`Possible duplicate title: ${game.title}`);
        }
        else {
            seenTitles.add(normalizedTitle);
        }

        const result = validateGame(game);

        if (result.valid) {
            validGames++;
            console.log(`${game.title}`);
        }
        else {
            invalidGames++;
            console.error(`${game.title || "Unknown Game"}`);
            result.errors.forEach(error => {console.error(`    ${error}`);
                }
            );
        }

        if (game.id && !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(game.id)) {
            console.error(`Invalid ID format "${game.id}". Use lowercase kebab-case.`);
            invalidGames++;
        }
    });
    console.log("\n==========================================");

    console.log(`${validGames}/${games.length} games valid`);

    console.log(`${invalidGames} games with errors`);

    console.log("==========================================");

    return invalidGames === 0;
}


// Database Summary
function showGameDatabaseSummary(games) {
    console.log("==========================================");
    console.log("GAME DATABASE SUMMARY");
    console.log("==========================================");

    const summary = {
        totalGames: games.length,
        dimensions: {},
        worldStructures: {},
        socialModes: {},
        genres: {}
    };

    games.forEach(game => {
        const dimension = game.presentation?.dimension;
        if (dimension) {
            summary.dimensions[dimension] = (summary.dimensions[dimension] || 0) + 1;
        }

        (game.world?.structures || []).forEach(structure => {
                summary.worldStructures[structure] = (summary.worldStructures[structure] || 0) + 1;
            }
        );

        (game.social?.modes || [] ).forEach(mode => {
                summary.socialModes[mode] = (summary.socialModes[mode] || 0 ) + 1;
            }
        );

        (game.metadata?.genres || [] ).forEach(genre => {
                summary.genres[genre] = (summary.genres[genre] || 0) + 1;
            }
        );
    });


    console.log("Dimensions:");

    console.table(summary.dimensions);

    console.log("World Structures:");

    console.table(summary.worldStructures);

    console.log("Social Modes:");

    console.table(summary.socialModes);

    console.log("Genres:");

    console.table(summary.genres);

    return summary;
}