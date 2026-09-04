// Constaint Engine

// Get Game Preference Value
function getGamePreferenceValue(category, preference, game) {
    // Visual Styles

    if (category === "visualStyles") {
        return (game.visual?.styles?.[preference] || 0);
    }

    // Visual Tones
    if (category === "visualTones") {
        return (game.visual?.tones?.[preference] || 0);
    }

    // Dimensions
    if (category === "dimensions") {
        return (game.presentation?.dimension === preference) ? 100 : 0;
    }


    // Cameras
    if (category === "cameras") {
        return (game.presentation?.camera || []).includes(preference) ? 100 : 0;
    }


    // World Structures
    if (category === "worldStructures") {
        return (game.world?.structures || []).includes(preference) ? 100 : 0;
    }


    // Gameplay
    if (category === "gameplay") {
        return (game.gameplay?.scores?.[preference] || 0);
    }

    // Experience
    if (category === "experience") {
        return (game.experience?.[preference] || 0);
    }

    // Social Modes
    if (category === "socialModes") {
        return (game.social?.modes || []).includes(preference) ? 100 : 0;
    }

    return 0;
}


// Calculate Dislike Penalty
function calculateDislikePenalty(dislikes, game) {
    if (!dislikes) {
        return {
            penalty: 0,
            reasons: []
        };
    }

    let penalty = 0;

    const reasons = [];

    Object.entries(dislikes).forEach(([category, values]) => {
        Object.entries(values).forEach(([preference, strength]) => {
            if (strength <= 0) {
                return;
            }

            const gameValue = getGamePreferenceValue(category, preference, game);

            /* Only penalize when the disliked attribute is actually significant in the game.*/
            if (gameValue < 40) {
                return;
            }

            const normalizedStrength = strength / 100;
            
            const normalizedGameValue = gameValue / 100;

            const currentPenalty = normalizedStrength * normalizedGameValue * 25;

            penalty += currentPenalty;

            reasons.push({
                category,
                preference,
                strength,
                gameValue,
                penalty: Math.round(currentPenalty)
            });
        });

    });

    return {penalty: Math.round(penalty), reasons};
}


// Check Must Haves
function checkMustHaveRequirements(mustHave, game) {
    if (!mustHave) {
        return {
            passed: true,
            failures: []
        };
    }

    const failures = [];

    Object.entries(mustHave).forEach(([category, values]) => {
        Object.entries(values).forEach(([preference, strength]) => {
            if (strength < 70) {
                return;
            }

            const gameValue = getGamePreferenceValue(category, preference, game);

            /* Must-have threshold.*/
            if (gameValue < 50) {
                failures.push({
                    category,
                    preference,
                    required: strength, 
                    actual: gameValue
                });
            }
        });
    });

    return {passed: failures.length === 0, failures};
}


// Apply Constraints
function applyConstraints(playerConstraints, game, baseScore) {
    if (!playerConstraints) {
        return {
            score: baseScore,
            excluded: false,
            penalty: 0,
            dislikeReasons: [],
            mustHaveFailures: []
        };
    }


    // Must Have Checks
    const mustHaveResult = checkMustHaveRequirements(playerConstraints.mustHave, game);

    /* A failed must-have can exclude the game.*/
    if (!mustHaveResult.passed) {
        return {
            score: 0,
            excluded: true,
            penalty: 100,
            dislikeReasons: [],
            mustHaveFailures: mustHaveResult.failures
        };
    }


    // Dislike Penalty
    const dislikeResult = calculateDislikePenalty(playerConstraints.dislikes, game);

    const finalScore = Math.max(0, baseScore - dislikeResult.penalty);

    return {
        score: Math.round(finalScore),
        excluded: false,
        penalty: dislikeResult.penalty,
        dislikeReasons: dislikeResult.reasons,
        mustHaveFailures: []
    };
}