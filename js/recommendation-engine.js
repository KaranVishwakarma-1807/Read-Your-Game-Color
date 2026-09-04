
// Recommendation Weights
const RECOMMENDATION_WEIGHTS = {
    motivation: 0.40,
    gameplay: 0.20,
    world: 0.15,
    experience: 0.10,
    visual: 0.10,
    presentation: 0.05
};


// Helper: Clamp
function clampScore(value) {
    return Math.max(0, Math.min(100, value));
}


// Trait Similarity
function calculateValueSimilarity(playerValue, gameValue) {
    const difference = Math.abs(playerValue - gameValue);

    return (100 - difference);
}


// Weighted Motivation Match
/* Strong player preferences have more influence than weak preferences.*/
function calculateMotivationMatch(playerTraits, gameMotivation) {
    let weightedScore = 0;
    let totalImportance = 0;

    const breakdown = {};

    GAME_TRAITS.forEach(trait => {
        const playerValue = playerTraits[trait] || 0;

        const gameValue = gameMotivation[trait] || 0;

        const similarity = calculateValueSimilarity(playerValue, gameValue);

        /* Convert player's trait score into an importance weight.
         * 0   = doesn't matter much
         * 100 = very important
         */
        const importance = Math.max(playerValue,10);

        weightedScore += similarity * importance;

        totalImportance += importance;

        breakdown[trait] = Math.round(similarity);
    });

    if (totalImportance === 0) {
        return {
            score: 0,
            breakdown
        };
    }

    return {
        score: Math.round(weightedScore / totalImportance),
        breakdown
    };
}


// Gameplay Match
function calculateWorldStructureMatch(playerWorld, gameWorld) {
    if (!playerWorld || !gameWorld) {
        return 0;
    }

    const playerStructurePreferences = {
        linear: playerWorld.linear || 0,

        branching: playerWorld.branching || 0,

        hubBased: playerWorld.hubBased || 0,

        openWorld: playerWorld.openWorld || 0,

        sandbox: playerWorld.sandbox || 0,

        procedural: playerWorld.procedural || 0,

        levelBased: playerWorld.levelBased || 0,

        roguelike: playerWorld.roguelike || 0,

        metroidvania: playerWorld.metroidvania || 0
    };

    const structures = gameWorld.structures || [];

    let weightedMatch = 0;

    let totalPreference = 0;

    Object.entries(playerStructurePreferences).forEach(([structure, preference]) => {
            if (preference <= 0) {
                return;
            }

            totalPreference += preference;

            const gameHasStructure = structures.includes(structure);

            /*
             * If player strongly prefers a structure
             * and the game has it, that's a strong match.
             */
            if (gameHasStructure) {
                weightedMatch += preference;
            }
        }
    );

    if (totalPreference === 0) {
        return 50;
    }

    return Math.round((weightedMatch / totalPreference) * 100);
}


// World Match
function calculateWorldMatch(playerWorld, gameWorld) {

    const structureScore = calculateWorldStructureMatch(playerWorld, gameWorld);

    const freedomScore = calculateValueSimilarity(playerWorld?.freedom || 0, gameWorld?.freedom || 0);

    const explorationScore = calculateValueSimilarity(playerWorld?.exploration || 0, gameWorld?.exploration || 0);

    /*
     * Structure gets slightly more weight because it determines the fundamental world format.
     */
    return Math.round(structureScore * 0.40 + freedomScore * 0.30 + explorationScore * 0.30);
}


// Visual Match
function calculateVisualMatch(playerVisual, gameVisual) {
    if (!playerVisual || !gameVisual) {
        return 0;
    }

    const scores = [];

    /* Visual styles */
    if (playerVisual.styles && gameVisual.styles) {
        Object.keys(playerVisual.styles).forEach(style => {
            const playerValue = playerVisual.styles[style] || 0;

            const gameValue = gameVisual.styles[style] || 0;

            scores.push(calculateValueSimilarity(playerValue, gameValue));
        });
    }


    /* Visual tones */
    if (playerVisual.tones && gameVisual.tones) {
        Object.keys(playerVisual.tones).forEach(tone => {
            const playerValue = playerVisual.tones[tone] || 0;

            const gameValue = gameVisual.tones[tone] || 0;

            scores.push(calculateValueSimilarity(playerValue, gameValue));
        });
    }

    if (scores.length === 0) {
        return 0;
    }

    return Math.round(scores.reduce((sum, value) => sum + value, 0) / scores.length);
}



// Presentation Match
function calculatePresentationMatch(playerPresentation, gamePresentation) {
    if (!playerPresentation || !gamePresentation) {
        return 0;
    }

    const dimensionPreferences = playerPresentation.dimension || {};

    const cameraPreferences = playerPresentation.camera || {};

    let dimensionScore = 0;

    let cameraScore = 0;

    /* Dimension */
    const gameDimension = gamePresentation.dimension;

    if (typeof dimensionPreferences[gameDimension] === "number") {
        dimensionScore = dimensionPreferences[gameDimension];
    }


    /* Camera */
    const gameCameras = gamePresentation.camera || [];

    const matchingCameraScores = gameCameras.map(camera => cameraPreferences[camera] || 0 ).filter(score => score > 0);

    if (matchingCameraScores.length > 0) {
        cameraScore = Math.max(...matchingCameraScores);
    }

    /* Give camera a little more weight. */
    if (dimensionScore === 0 && cameraScore === 0) {
        return 0;
    }

    return Math.round(dimensionScore * 0.40 + cameraScore * 0.60);
}



// Experience Match
function calculateExperienceMatch(playerExperience, gameExperience){
    if (!playerExperience || !gameExperience) {
        return 0;
    }

    const scores = [
        calculateValueSimilarity(playerExperience.pace || 0, gameExperience.pace || 0),

        calculateValueSimilarity(playerExperience.intensity || 0, gameExperience.intensity || 0),

        calculateValueSimilarity(playerExperience.difficulty || 0, gameExperience.difficulty || 0),

        calculateValueSimilarity(playerExperience.narrative || 0, gameExperience.narrative || 0)
    ];


    return Math.round(scores.reduce((sum, value) => sum + value, 0) / scores.length);
}



// Calculate Game Match
/* Calculates the total compatibility between one player and one game.*/
function calculateGameMatch(player, game) {
    // Motivation
    const gameMotivation = game.motivation || getGameMotivationProfile(game);

    const motivation = calculateMotivationMatch(player.traits, gameMotivation);

    // Preferences
    const preferences = calculatePreferenceMatch(player.preferences, game);

    const baseScore = preferences.score * 0.65 + motivation.score * 0.35;

    // Final Score
    const constrained = applyConstraints(player.constraints, game, baseScore);

    return {
        score: constrained.score,
        excluded: constrained.excluded,
        breakdown: {
            motivation: motivation.score,
            preferences: preferences.score
        },

        motivationBreakdown: motivation.breakdown,
        preferenceBreakdown: preferences.breakdown,
        preferenceMatches: preferences.matches,
        preferenceMismatches: preferences.mismatches,
        dislikeReasons: constrained.dislikeReasons,
        mustHaveFailures: constrained.mustHaveFailures,
        penalty: constrained.penalty

};
}




// Recommend Games
/* Calculates matches for every game and sorts from highest match to lowest match.*/
function recommendGames(player, games) {

    const results = games.map(game => {
        const match = calculateGameMatch(player, game);
        return {
            game,
            score: match.score,
            excluded: match.excluded,
            breakdown: match.breakdown,
            motivationBreakdown: match.motivationBreakdown,
            preferenceBreakdown: match.preferenceBreakdown,
            preferenceMatches: match.preferenceMatches,
            preferenceMismatches: match.preferenceMismatches,
            dislikeReasons: match.dislikeReasons,
            mustHaveFailures: match.mustHaveFailures,
            penalty: match.penalty
            };

        }).filter(result => !result.excluded);

    /* Highest match first.*/
    results.sort((a, b) => b.score - a.score);
    return results;
}


// Surprise Recommendation
/* Finds games that aren't the highest normal match, but still have interesting compatibility.*/
function recommendSurpriseGames(player, games) {
    const recommendations = recommendGames(player, games);

    /* A surprise recommendation should still be a reasonable match.*/
    const candidates = recommendations.filter(result => result.score >= 65);

    /*
     * Score based on:
     *
     * 1. Reasonable overall compatibility
     * 2. Some friction
     * 3. Strong motivation match
     *
     * The idea is:
     *
     * "Different from your normal picks,
     *  but still aligned with how you play."
     */
    candidates.forEach(result => {
            const frictionCount = (result.preferenceMismatches?.length || 0);

            const motivationScore = result.breakdown.motivation;

            const frictionBonus = Math.min(frictionCount * 4, 12);

            result.surpriseScore = result.score * 0.70 + motivationScore * 0.20 + frictionBonus;
        }
    );

    candidates.sort((a, b) => b.surpriseScore - a.surpriseScore);

    return candidates.slice(0, 3);
}


// Surprise Value
function calculateSurpriseValue(recommendation) {
    const friction = (recommendation.preferenceMismatches?.length || 0);

    const motivation = recommendation.breakdown.motivation;

    const score = recommendation.score;

    return (score * 0.55 + motivation * 0.25 + Math.min(friction * 8, 20));
}