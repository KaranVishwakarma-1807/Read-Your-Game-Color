// Preference Importance
/* Converts a 0–100 preference score into an importance value.
 * Strong preferences matter more when matching.*/

function getPreferenceImportance(value) {
    if (value >= 80) {
        return 1.00;
    }

    if (value >= 60) {
        return 0.75;
    }

    if (value >= 40) {
        return 0.50;
    }

    if (value >= 20) {
        return 0.25;
    }
    return 0.10;
}


// Preference Direction
/*Converts a preference score into a direction.
 * 50 = neutral
 * >50 = preference
 * <50 = dislike */
function getPreferenceDirection(value) {
    if (value > 50) {
        return "like";
    }

    if (value < 50) {
        return "dislike";
    }
    
    return "neutral";
}