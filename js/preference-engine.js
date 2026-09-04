// Preference Matching Engine

// Value Similarity - Helper
/*Compares two 0–100 values.
 * 100 = exact match
 * 0   = complete mismatch
 */
function preferenceSimilarity(playerValue, gameValue) {
    const difference = Math.abs(playerValue - gameValue);
    return Math.max(0, 100 - difference);
}

// Average - Helper
function averageScores(scores) {
    if (!scores || scores.length === 0) {
        return 0;
    }

    return (scores.reduce((sum, value) => sum + value, 0) / scores.length);
}

// Visual Style Match - Weighted
function calculateVisualStyleMatch(playerStyles, gameStyles) {
    let weightedScore = 0;
    let totalImportance = 0;

    Object.entries(playerStyles || {}).forEach(([style, playerValue]) => {
            if (playerValue < 20) {
                return;
            }

            const gameValue = gameStyles?.[style] || 0;

            const importance = getPreferenceImportance(playerValue);

            const similarity = preferenceSimilarity(playerValue, gameValue);

            weightedScore += similarity * importance;

            totalImportance += importance;
        }
    );

    if (totalImportance === 0) {
        return 50;
    }

    return Math.round(weightedScore / totalImportance);
}


// Visual Tone Match - Weighted
function calculateVisualToneMatch(playerTones, gameTones) {
    let weightedScore = 0;
    let totalImportance = 0;

    Object.entries(playerTones || {}).forEach(([tone, playerValue]) => {
            if (playerValue < 20) {
                return;
            }

            const gameValue = gameTones?.[tone] || 0;

            const importance = getPreferenceImportance(playerValue);

            const similarity = preferenceSimilarity(playerValue, gameValue);

            weightedScore += similarity * importance;

            totalImportance += importance;
        }
    );

    if (totalImportance === 0) {
        return 50;
    }

    return Math.round(weightedScore / totalImportance);
}


// Dimension Match
function calculateDimensionMatch(playerDimensions, gameDimension) {
    if (!playerDimensions || !gameDimension) {
        return 0;
    }

    const playerPreference = playerDimensions[gameDimension] || 0;

    /* If the player explicitly prefers the game's dimension, it's a strong match.
     * If they barely care about it, we don't let it dominate the result.*/
    if (playerPreference < 10) {
        return 50;
    }

    return Math.round(playerPreference);
}


// Camera Match
function calculateCameraMatch(playerCameras, gameCameras) {
    if (!playerCameras || !gameCameras || gameCameras.length === 0) {
        return 0;
    }

    const preferences = gameCameras.map(camera => playerCameras[camera ] || 0);

    /* A game with multiple camera modes gets the best matching perspective.*/
    const bestMatch = Math.max(...preferences);

    if (bestMatch < 10) {
        return 50;
    }

    return Math.round(bestMatch);
}


// World Structure Match - Weighted */
function calculateWorldStructurePreferenceMatch(playerStructures, gameStructures) {
    let weightedMatch = 0;
    let totalImportance = 0;

    Object.entries(playerStructures || {}).forEach(([structure, playerValue]) => {
            if (playerValue < 10) {
                return;
            }

            const importance = getPreferenceImportance(playerValue);

            const gameHasStructure = gameStructures.includes(structure);

            /* If the structure exists, it's a strong positive match.*/
            const similarity = gameHasStructure ? 100 : 0;

            weightedMatch += similarity * importance;

            totalImportance += importance;
        }
    );

    if (totalImportance === 0) {
        return 50;
    }

    return Math.round(weightedMatch / totalImportance);
}


// Gameplay Match - Weighted
function calculateGameplayPreferenceMatch(playerGameplay, gameGameplay) {
    let weightedScore = 0;
    let totalImportance = 0;

    Object.entries(playerGameplay || {}).forEach(([activity, playerValue]) => {
            if (playerValue < 10) {
                return;
            }

            const gameValue = gameGameplay?.scores?.[activity] || 0;

            const importance = getPreferenceImportance(playerValue);

            const similarity = preferenceSimilarity(playerValue, gameValue);

            weightedScore += similarity * importance;

            totalImportance += importance;
        }
    );

    if (totalImportance === 0) {
        return 50;
    }

    return Math.round(weightedScore / totalImportance);
}


// Experience Match
function calculateExperiencePreferenceMatch(playerExperience, gameExperience) {
    if (!playerExperience || !gameExperience) {
        return 0;
    }

    const scores = [];

    const dimensions = [
        "pace",
        "intensity",
        "difficulty",
        "narrative"
    ];

    dimensions.forEach(dimension => {
            const playerValue = playerExperience[dimension] || 0;
            const gameValue = gameExperience[dimension] || 0;

            /* Experience dimensions are * always meaningful, so we compare all four.*/
            scores.push(preferenceSimilarity(playerValue,gameValue));
        }
    );

    return Math.round(averageScores(scores));
}


// Complete Preference Match
/* Calculates the player's complete preference match against one game.*/
function calculatePreferenceMatch(playerPreferences,game) {
    if (!playerPreferences) {
        return {
            score: 0,
            breakdown: {}
        };
    }

    // Visual Styles
    const visualStyles = calculateVisualStyleMatch(playerPreferences.visualStyles, game.visual?.styles);

    // Visual Tones
    const visualTones = calculateVisualToneMatch(playerPreferences.visualTones, game.visual?.tones);

    // Dimensions
    const dimensions = calculateDimensionMatch(playerPreferences.dimensions, game.presentation?.dimension);

    // Camera
    const cameras = calculateCameraMatch(playerPreferences.cameras, game.presentation?.camera);

    // World
    const worldStructures = calculateWorldStructurePreferenceMatch(playerPreferences.worldStructures, game.world?.structures);

    // Gameplay
    const gameplay = calculateGameplayPreferenceMatch(playerPreferences.gameplay, game.gameplay);

    // Experience
    const experience = calculateExperiencePreferenceMatch(playerPreferences.experience, game.experience);

    // Combine
    const score =
        visualStyles * 0.15 +
        visualTones * 0.10 +
        dimensions * 0.10 +
        cameras * 0.10 +
        worldStructures * 0.15 +
        gameplay * 0.25 +
        experience * 0.15;

    const mismatches = findPreferenceMismatches(playerPreferences, game);

    const matches = findPreferenceMatches(playerPreferences, game);

    return {
        score: Math.round(Math.max(0, Math.min(100, score))),
        breakdown: {
            visualStyles,
            visualTones,
            dimensions,
            cameras,
            worldStructures,
            gameplay,
            experience
        },
        matches,
        mismatches
    };
}



// Find Strong Preference Matches
function findPreferenceMismatches(playerPreferences, game) {
    const mismatches = [];

    /* Visual styles*/
    Object.entries(playerPreferences.visualStyles || {}).forEach(([style, playerValue]) => {
            if (playerValue < 70) {
                return;
            }

            const gameValue = game.visual?.styles?.[style] || 0;

            if (gameValue < 40) {
                mismatches.push({
                    category: "Visual Style",
                    value: style,
                    playerScore: playerValue,
                    gameScore: gameValue
                });
            }
        }
    );

    /* Gameplay*/
    Object.entries(playerPreferences.gameplay || {}).forEach(([activity, playerValue]) => {
            if (playerValue < 70) {
                return;
            }

            const gameValue = game.gameplay?.scores?.[activity] || 0;

            if (gameValue < 40) {
                mismatches.push({
                    category: "Gameplay",
                    value: activity,
                    playerScore: playerValue,
                    gameScore: gameValue
                });
            }
        }
    );

    /* World structures*/
    Object.entries(playerPreferences.worldStructures || {}).forEach(([structure, playerValue]) => {
            if (playerValue < 70) {
                return;
            }

            const gameHasStructure = (game.world?.structures || []).includes(structure);

            if (!gameHasStructure) {
                mismatches.push({
                    category: "World",
                    value: structure,
                    playerScore: playerValue,
                    gameScore: 0
                });
            }
        }
    );
    return mismatches;
}


// Find Strong Preference Matches
function findPreferenceMatches(playerPreferences, game) {
    const matches = [];

    /* Visual styles*/
    Object.entries(playerPreferences.visualStyles || {}).forEach(([style, playerValue]) => {
            if (playerValue < 70) {
                return;
            }

            const gameValue =game.visual?.styles?.[style] || 0;

            if (gameValue >= 70) {
                matches.push({
                    category:
                        "Visual Style",
                    value: style,
                    playerScore: playerValue,
                    gameScore: gameValue
                });
            }
        }
    );

    /* Gameplay*/
    Object.entries(playerPreferences.gameplay || {}).forEach(([activity, playerValue]) => {
            if (playerValue < 70) {
                return;
            }

            const gameValue = game.gameplay?.scores?.[activity] || 0;

            if (gameValue >= 70) {
                matches.push({
                    category: "Gameplay",
                    value: activity,
                    playerScore: playerValue,
                    gameScore: gameValue
                });
            }
        }
    );

    /* World*/
    Object.entries(playerPreferences.worldStructures || {}).forEach(([structure, playerValue]) => {
            if (playerValue < 70) {
                return;
            }

            const gameHasStructure = (game.world?.structures || [] ).includes(structure);

            if (gameHasStructure) {
                matches.push({
                    category: "World",
                    value: structure,
                    playerScore: playerValue,
                    gameScore: 100
                });
            }
        }
    );
    return matches;
}