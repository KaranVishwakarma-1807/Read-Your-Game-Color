
const GAME_TRAITS = [

    "challenge",
    "mastery",
    "competition",
    "strategy",
    "exploration",
    "discovery",
    "creativity",
    "freedom",
    "story",
    "social",
    "progression"

];



/**
 * Keeps a number between 0 and 100.
 *
 * @param {number} value
 * @returns {number}
 */

function clamp(value) {

    return Math.max(
        0,
        Math.min(100, value)
    );

}


/**
 * Safely gets a gameplay score.
 *
 * @param {Object} game
 * @param {string} key
 * @returns {number}
 */

function getGameplayScore(
    game,
    key
) {

    return (
        game.gameplay &&
        game.gameplay.scores &&
        typeof game.gameplay.scores[key] === "number"
    )
        ? game.gameplay.scores[key]
        : 0;

}


// Challenge
function calculateGameChallenge(game) {
    const difficulty = game.experience?.difficulty || 0;

    const combat = getGameplayScore(game, "combat");

    const platforming = getGameplayScore(game, "platforming");

    const puzzle = getGameplayScore(game, "puzzle");

    const strategy = getGameplayScore(game, "strategy");

    /* Difficulty is the strongest signal.*/
    const mechanicalDemand = 
        (
            combat * 0.45 +
            platforming * 0.20 +
            puzzle * 0.15 +
            strategy * 0.20
        );


    return Math.round(clamp(difficulty * 0.60 + mechanicalDemand * 0.40));
}



// Mastery
function calculateGameMastery(game) {
    const difficulty = game.experience?.difficulty || 0;

    const combat = getGameplayScore(game, "combat");

    const strategy = getGameplayScore(game, "strategy");

    const puzzle = getGameplayScore(game, "puzzle");

    const customization = getGameplayScore(game, "customization");

    const platforming = getGameplayScore(game, "platforming");

    const technicalDepth =
        (
            combat * 0.30 +
            strategy * 0.25 +
            puzzle * 0.15 +
            customization * 0.15 +
            platforming * 0.15
        );

    return Math.round(clamp(difficulty * 0.20 + technicalDepth * 0.80));

}



// Competition
function calculateGameCompetition(game) {
    const modes = game.social?.modes || [];

    const socialImportance = game.social?.importance || 0;

    let score = 0;

    if (modes.includes("competitive")) {
        score += 65;
    }

    if (modes.includes("mmo")) {
        score += 15;
    }


    /* Competition can exist even without multiplayer if the game strongly emphasizes performance and mastery.*/

    const difficulty = game.experience?.difficulty || 0;

    const mastery = calculateGameMastery(game);

    score += difficulty * 0.05;

    score += mastery * 0.05;

    score += socialImportance * 0.20;

    return Math.round(clamp(score));

}



// Strategy
function calculateGameStrategy(game) {
    const strategy = getGameplayScore(game, "strategy");

    const puzzle = getGameplayScore(game, "puzzle");

    const management = getGameplayScore(game, "management");

    const simulation = getGameplayScore(game, "simulation");

    const customization = getGameplayScore(game, "customization");

    return Math.round(clamp(
            strategy * 0.45 +
            puzzle * 0.15 +
            management * 0.20 +
            simulation * 0.15 +
            customization * 0.05
        )
    );
}



// Exploration
function calculateGameExploration(game) {
    const worldExploration = game.world?.exploration || 0;

    const gameplayExploration = getGameplayScore(game, "exploration");

    const freedom = game.world?.freedom || 0;

    const structures = game.world?.structures || [];

    let structureBonus = 0;

    if (structures.includes("openWorld")) {
        structureBonus += 8;
    }

    if (structures.includes("metroidvania")) {
        structureBonus += 10;
    }

    if (structures.includes("sandbox")) {
        structureBonus += 8;
    }

    if (structures.includes("procedural")) {
        structureBonus += 5;
    }

    const score =
        worldExploration * 0.40 +
        gameplayExploration * 0.35 +
        freedom * 0.20 +
        structureBonus * 0.05;

    return Math.round(clamp(score));

}



// Discovery
function calculateGameDiscovery(game) {
    const exploration = game.world?.exploration || 0;

    const narrative = game.experience?.narrative || 0;

    const structures = game.world?.structures || [];

    const atmosphere = game.experience?.atmosphere || [];

    let score = exploration * 0.40 + narrative * 0.20;

    /* Hidden or nonlinear structure.*/
    if (structures.includes("branching")) {
        score += 10;
    }

    if (structures.includes("procedural")) {
        score += 8;
    }

    if (structures.includes("openWorld")) {
        score += 5;
    }

    if (structures.includes("metroidvania")) {
        score += 8;
    }

    /*Curiosity-oriented atmosphere.*/
    const discoveryAtmospheres = [
        "mysterious",
        "surreal",
        "atmospheric"
    ];

    const atmosphereMatches = atmosphere.filter(tag => discoveryAtmospheres.includes(tag)).length;

    score += atmosphereMatches * 5;

    return Math.round(clamp(score));

}



// Creativity
function calculateGameCreativity(game) {
    const building = getGameplayScore(game, "building");

    const crafting = getGameplayScore(game, "crafting");

    const customization = getGameplayScore(game, "customization");

    const freedom = game.world?.freedom || 0;

    const simulation = getGameplayScore(game, "simulation");

    const structures = game.world?.structures || [];

    let score =
        building * 0.25 +
        crafting * 0.15 +
        customization * 0.20 +
        freedom * 0.25 +
        simulation * 0.15;

    if (structures.includes("sandbox")) {
        score += 15;
    }

    return Math.round(clamp(score));

}


// Freedom
function calculateGameFreedom(game) {
    const worldFreedom = game.world?.freedom || 0;

    const structures = game.world?.structures || [];

    let score = worldFreedom * 0.60;

    /* Player agency signals.*/
    if (structures.includes("openWorld")) {
        score += 10;
    }

    if (structures.includes("sandbox")) {
        score += 25;
    }

    if (structures.includes("branching")) {
        score += 15;
    }

    /*Multiple systems and customization can increase player agency.*/
    const customization = getGameplayScore(game, "customization");

    const strategy = getGameplayScore(game, "strategy");

    score += customization * 0.10;

    score += strategy * 0.05;

    return Math.round(clamp(score));

}


// Story
function calculateGameStory(game) {
    const narrative = game.experience?.narrative || 0;

    const atmosphere = game.experience?.atmosphere || [];

    const structures = game.world?.structures || [];

    const storyScore = narrative * 0.75;

    let bonus = 0;

    if (structures.includes("branching")) {
        bonus += 12;
    }

    if (atmosphere.includes("emotional")) {
        bonus += 8;
    }

    return Math.round(clamp(storyScore + bonus));

}


// Social
function calculateGameSocial(game) {
    const importance = game.social?.importance || 0;

    const modes = game.social?.modes || [];

    const playerCount = game.social?.playerCount || {};

    let modeBonus = 0;

    /* Different multiplayer structures contribute differently.*/
    if (modes.includes("localCoop")) {
        modeBonus += 15;
    }

    if (modes.includes("onlineCoop")) {
        modeBonus += 15;
    }


    if (modes.includes("competitive")) {
        modeBonus += 20;
    }


    if (modes.includes("mmo")) {
        modeBonus += 25;
    }


    if (modes.includes("partyGame")) {
        modeBonus += 30;
    }


    /* Player count adds some evidence, but shouldn't dominate the calculation.*/
    let playerCountBonus = 0;

    if (playerCount.max >= 4) {
        playerCountBonus += 5;
    }

    if (playerCount.max >= 8) {
        playerCountBonus += 5;
    }

    const score = importance + modeBonus + playerCountBonus;

    return Math.round(clamp(score));

}


// Progression
function calculateGameProgression(game) {
    const intensity = game.progression?.intensity || 0;

    const systems = game.progression?.systems || [];

    const progressionSystems = [
        "levels",
        "skills",
        "equipment",
        "builds",
        "loot",
        "upgrades",
        "metaProgression",
        "unlockingAreas",
        "technology",
        "abilities",
        "collections",
        "relationships",
        "choices"
    ];

    const systemCount = systems.filter(system => progressionSystems.includes(system)).length;

    const systemStrength = Math.min(systemCount * 7, 35);

    return Math.round(clamp(intensity * 0.75 + systemStrength));

}



/**
 * Converts a game into the same 11-dimensional
 * profile used by players.
 *
 * @param {Object} game
 * @returns {Object}
 */

function getGameMotivationProfile(game) {

    return {
        challenge: calculateGameChallenge(game),

        mastery: calculateGameMastery(game),

        competition: calculateGameCompetition(game),

        strategy: calculateGameStrategy(game),

        exploration: calculateGameExploration(game),

        discovery: calculateGameDiscovery(game),

        creativity: calculateGameCreativity(game),

        freedom: calculateGameFreedom(game),

        story: calculateGameStory(game),

        social: calculateGameSocial(game),

        progression: calculateGameProgression(game)
    };
}



function buildGameProfiles(games) {
    return games.map(game => {
        return {...game, motivation: getGameMotivationProfile(game)};
    });
}



// Explain Game Profile
function explainGameProfile(game) {
    const motivation = getGameMotivationProfile(game);

    console.log("==========================================");

    console.log(`GAME: ${game.title}`);

    console.log("==========================================");

    console.table(motivation);

    return motivation;

}