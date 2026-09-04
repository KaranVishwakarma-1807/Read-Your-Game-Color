// Calcualte Color Score
/**
 * Calculates how strongly a player's trait profile
 * matches a particular color.
 *
 * @param {Object} playerTraits
 * @param {Object} colorTraits
 * @returns {number} score from 0 to 100
 */
function calculateColorScore(playerTraits, colorTraits) {

    let weightedScore = 0;
    let maximumPossibleScore = 0;

    /* Go through every trait defined by the color. */
    Object.entries(colorTraits).forEach(
        ([trait, weight]) => {
            const playerValue = playerTraits[trait] || 0;

            /* Add the player's trait strength multiplied by the color's importance. */
            weightedScore += playerValue * weight;


            /* Calculate the maximum possible score for this color. Player trait maximum = 100. */
            maximumPossibleScore += 100 * weight;

        }
    );

    /* Convert to percentage. */
    const score = (weightedScore / maximumPossibleScore) * 100;

    /* Round to two decimal places. */
    return Number(score.toFixed(2));

}



// To calculate all colors
/**
 * Calculates the player's score for every color.
 *
 * @param {Object} playerTraits
 * @returns {Array}
 */
function calculateAllColorScores(playerTraits) {

    const results = [];

    Object.values(COLORS).forEach(
        color => {
            const score = calculateColorScore( playerTraits, color.traits);

            results.push({
                colorId: color.id,

                name: color.name,

                shortName: color.shortName,

                hex: color.hex,

                description:
                    color.description,

                motivation:
                    color.motivation,

                score

            });

        }
    );


    /* Sort from highest score to lowest score. */
    results.sort( (a, b) => b.score - a.score);

    return results;
}


// Get PLayer's Color Profile
/**
 * To determines the player's primary and secondary colors.
 *
 * @param {Object} playerTraits
 * @returns {Object}
 */
function generateColorProfile(playerTraits) {

    const colorScores = calculateAllColorScores(playerTraits);

    const primary = colorScores[0];

    const secondary = colorScores[1];

    return {
        primary,
        secondary,
        allColors:colorScores
    };

}