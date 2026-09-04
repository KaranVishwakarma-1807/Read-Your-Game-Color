/* 
   PLAY YOUR COLOR
   Recommendation Ranking Engine

   Takes raw recommendation results and turns them into
   polished, diversified recommendations.
 */


/* 
   SCORE CALIBRATION
 */

/**
 * Slightly compresses very high scores so that
 * everything doesn't end up between 85 and 100.
 *
 * This is not changing the underlying compatibility.
 * It changes how the result is presented.
 */

function calibrateRecommendationScore(score) {
    /*
     * Keep the result within 0–100.
     */

    score = Math.max(0, Math.min(100, score));

    /*
     * High scores are compressed slightly.
     */

    if (score >= 90) {
        return Math.round(85 + (score - 90) * 0.65);
    }

    if (score >= 75) {
        return Math.round(70 + (score - 75) * 1);
    }

    return Math.round(score);

}


// Recommendation Ties
function getRecommendationTier(score) {
    if (score >= 90) {
        return {
            id: "best-match",
            label: "Your Best Match"
        };
    }

    if (score >= 85) {
        return {
            id: "very-strong",
            label: "Very Strong Match"
        };
    }

    if (score >= 75) {
        return {
            id: "strong",
            label: "Strong Match"
        };
    }

    if (score >= 65) {
        return {
            id: "explore",
            label: "Worth Exploring"
        };
    }

    return {
        id: "stretch",
        label: "Outside Your Comfort Zone"
    };
}


// Enrich Recommendation
function enrichRecommendation(recommendation) {
    const calibratedScore = calibrateRecommendationScore(recommendation.score);

    const tier = getRecommendationTier(calibratedScore);

    return {
        ...recommendation,
        rawScore: recommendation.score,
        score: calibratedScore,
        tier
    };
}


// Game Fingerprint
function getGameFingerprint(game) {
    return {
        dimension: game.presentation?.dimension,
        cameras: game.presentation?.camera || [],
        worlds: game.world?.structures || [],
        genres: game.metadata?.genres || [],
        activities: game.gameplay?.activities || []
    };
}


// Fingerprint Similarity
function calculateGameSimilarity(gameA, gameB) {
    const a = getGameFingerprint(gameA);

    const b = getGameFingerprint(gameB);

    let matches = 0;

    let total = 0;

    /*
     * Dimension
     */

    total++;

    if (a.dimension === b.dimension) {
        matches++;
    }

    /*
     * Camera
     */

    total++;

    if (a.cameras.some(camera => b.cameras.includes(camera))) {
        matches++;
    }

    /*
     * World structure
     */

    total++;

    if (a.worlds.some(world => b.worlds.includes(world))) {
        matches++;
    }

    /*
     * Genre
     */

    total++;

    if (a.genres.some(genre => b.genres.includes(genre))) {
        matches++;
    }

    /*
     * Gameplay activity
     */

    total++;

    if (a.activities.some(activity => b.activities.includes(activity))) {
        matches++;
    }

    return (matches / total);
}


// Diversify Recommendation
function diversifyRecommendations(recommendations, limit = 5) {
    if (recommendations.length <= limit) {
        return recommendations;
    }

    const selected = [];

    /*
     * Always keep the strongest match.
     */

    selected.push(recommendations[0]);

    /*
     * Evaluate remaining games.
     */

    const remaining = recommendations.slice(1);

    while (selected.length < limit && remaining.length > 0) {
        let bestCandidate = null;

        let bestUtility = -Infinity;

        remaining.forEach(candidate => {
                /*
                 * Candidate quality.
                 */

                const scoreValue = candidate.score;

                /*
                 * Calculate similarity to games
                 * already selected.
                 */

                const similarities = selected.map(existing => calculateGameSimilarity(candidate.game, existing.game));

                const maxSimilarity = similarities.length > 0 ? Math.max(...similarities) : 0;

                /*
                 * Diversity bonus.
                 *
                 * Lower similarity = higher bonus.
                 */

                const diversityBonus = (1 - maxSimilarity) * 15;

                const utility = scoreValue + diversityBonus;

                if (utility > bestUtility) {
                    bestUtility = utility;
                    bestCandidate = candidate;
                }
            }
        );

        if (!bestCandidate) {
            break;
        }

        selected.push(bestCandidate);

        const index = remaining.indexOf(bestCandidate);

        if (index !== -1) {
            remaining.splice(index, 1);
        }
    }
    return selected;
}



// Rank Recommendations
function rankRecommendations(recommendations, limit = 5) {
    /*
     * First enrich all recommendations.
     */
    const enriched = recommendations.map(enrichRecommendation);

    /*
     * Highest score first.
     */
    enriched.sort((a, b) => b.score - a.score);

    /*
     * Add diversity.
     */
    return diversifyRecommendations(enriched, limit);

}