// Recommendation Explanation Engine
// Format Label
function formatExplanationLabel(value) {
    const labels = {
        challenge: "Challenge",
        mastery: "Mastery",
        competition: "Competition",
        strategy: "Strategy",
        exploration: "Exploration",
        discovery: "Discovery",
        creativity: "Creativity",
        freedom: "Freedom",
        story: "Story",
        social: "Social",
        progression: "Progression",
        visualStyles: "Visual Style",
        visualTones: "Visual Tone",
        dimensions: "Dimension",
        cameras: "Camera",
        worldStructures: "World Structure",
        gameplay: "Gameplay",
        experience: "Experience",
        pixelArt: "Pixel Art",
        handDrawn: "Hand-Drawn",
        anime: "Anime",
        celShaded: "Cel-Shaded",
        stylized3D: "Stylized 3D",
        realistic: "Realistic",
        lowPoly: "Low Poly",
        minimalist: "Minimalist",
        voxel: "Voxel",
        retro: "Retro",
        colorful: "Colorful",
        dark: "Dark",
        gritty: "Gritty",
        moody: "Moody",
        whimsical: "Whimsical",
        cozy: "Cozy",
        peaceful: "Peaceful",
        surreal: "Surreal",
        atmospheric: "Atmospheric",
        "2d": "2D",
        "2.5d": "2.5D",
        "3d": "3D",
        firstPerson: "First Person",
        thirdPerson: "Third Person",
        topDown: "Top Down",
        isometric: "Isometric",
        sideScroller: "Side Scroller",
        fixedCamera: "Fixed Camera",
        linear: "Linear",
        branching: "Branching",
        hubBased: "Hub Based",
        openWorld: "Open World",
        sandbox: "Sandbox",
        procedural: "Procedural",
        levelBased: "Level Based",
        roguelike: "Roguelike",
        metroidvania: "Metroidvania",
        combat: "Combat",
        shooting: "Shooting",
        melee: "Melee",
        platforming: "Platforming",
        stealth: "Stealth",
        puzzle: "Puzzle",
        strategy: "Strategy",
        simulation: "Simulation",
        management: "Management",
        building: "Building",
        crafting: "Crafting",
        exploration: "Exploration",
        driving: "Driving",
        racing: "Racing",
        farming: "Farming",
        customization: "Customization",
        pace: "Pace",
        intensity: "Intensity",
        difficulty: "Difficulty",
        narrative: "Narrative"
    };


    return (labels[value] || value.replace(/([A-Z])/g, " $1").replace(/^./, char => char.toUpperCase()));
}


// Format List
function formatList(values) {
    if (values.length === 0) {
        return "";
    }

    if (values.length === 1) {
        return values[0];
    }

    if (values.length === 2) {
        return `${values[0]} and ${values[1]}`;
    }

    return (values.slice(0, -1).join(", ") + ", and " + values[values.length - 1]);
}


// Get Strong Motivation Match
function getStrongMotivationMatches(recommendation) {
    return Object.entries(recommendation.motivationBreakdown || {}).filter(([, score]) => score >= 80).sort((a, b) => b[1] - a[1]).slice(0, 4).map(([trait]) =>
        formatExplanationLabel(trait));
}


// Get Stong Preference Match
function getStrongPreferenceMatches(recommendation) {
    return (recommendation.preferenceMatches || []).filter(match =>
            match.playerScore >= 70 && match.gameScore >= 70
    ).sort((a, b) =>
            (b.playerScore + b.gameScore) - (a.playerScore + a.gameScore)).slice(0, 6);
}


// Get Strong Mismatched
function getStrongPreferenceMismatches(recommendation) {
    return (recommendation.preferenceMismatches || []).filter(mismatch => mismatch.playerScore >= 70).slice(0, 4);
}

// Generate Why You'll Like It
function generateWhyYoullLikeIt(recommendation) {
    const motivations = getStrongMotivationMatches(recommendation);

    const preferences = getStrongPreferenceMatches(recommendation);

    const gameTitle = recommendation.game.title;

    const quality = getMatchQuality(recommendation.score);

    let text = `${gameTitle} is an ${quality} match for your Gaming DNA.`;

    if (motivations.length > 0) {
        text += ` Your play style aligns especially well` + ` with ${formatList(motivations)}.`;
    }


    /* Group preference matches by category.*/
    const preferenceLabels = preferences.map(match => formatExplanationLabel(match.value));

    if (preferenceLabels.length > 0) {
        text += ` You also tend to prefer ` + `${formatList(preferenceLabels.slice(0, 4))},` + ` which this game offers.`;
    }

    return text;
}


// Generate Friction
function generatePossibleFriction(recommendation) {
    const mismatches = getStrongPreferenceMismatches(recommendation);

    const dislikeReasons = recommendation.dislikeReasons || [];

    const labels = [];

    mismatches.forEach(mismatch => {
            const label = formatExplanationLabel(mismatch.value);

            if (!labels.includes(label)) {
                labels.push(label);
            }
        }
    );

    dislikeReasons.forEach(reason => {
            const label = formatExplanationLabel(reason.preference);

            if (!labels.includes(label)) {
                labels.push(label);
            }
        }
    );

    return labels.slice(0, 4);
}


// Generate Match Tags
function generateMatchTags(recommendation) {
    const motivationTags = getStrongMotivationMatches(recommendation).slice(0, 3);

    const preferenceTags = getStrongPreferenceMatches(recommendation).slice(0, 4).map(match => formatExplanationLabel(match.value));

    return [
        ...motivationTags,
        ...preferenceTags
    ].filter((value, index, array) => array.indexOf(value) === index).slice(0, 6);
}


// Build Complete Explanation
function buildRecommendationExplanation(recommendation) {
    const matches = generateMatchTags(recommendation);

    const friction = generatePossibleFriction(recommendation);

    const why = generateWhyYoullLikeIt(recommendation);

    const constraintText = generateConstraintExplanation(recommendation);

    return {
        why,
        matches,
        friction,
        constraintText,
        personalized: generatePersonalizedSentence(recommendation)
    };
}



function getMatchQuality(score) {
    if (score >= 95) {
        return "exceptional";
    }

    if (score >= 90) {
        return "excellent";
    }

    if (score >= 80) {
        return "strong";
    }

    if (score >= 70) {
        return "good";
    }

    if (score >= 60) {
        return "moderate";
    }

    return "weak";
}



function generateSurpriseExplanation(recommendation) {
    const friction = generatePossibleFriction(recommendation);

    const motivations = getStrongMotivationMatches(recommendation);

    if (motivations.length === 0) {
        return `
            This game is outside your usual preferences,
            but it may still offer something interesting.
        `;
    }

    if (friction.length === 0) {
        return `
            This isn't your most obvious recommendation,
            but its ${formatList(motivations)}
            strongly match the way you like to play.
        `;
    }

    return `
        This game differs from some of your usual preferences,
        especially around ${formatList(friction.slice(0, 2))},
        but its ${formatList(motivations)}
        strongly match the way you like to play.
    `;

}



function generateConstraintExplanation(recommendation) {
    const reasons = recommendation.dislikeReasons || [];

    if (reasons.length === 0) {
        return "";
    }

    const labels = reasons.slice(0, 2).map(reason => formatExplanationLabel(reason.preference));

    return `
        This match is slightly reduced because
        you indicated that you dislike
        ${formatList(labels)}.
    `;

}


// Personalized Sentence
function generatePersonalizedSentence(recommendation) {
    const traits = Object.entries(recommendation.motivationBreakdown || {}).sort((a, b) => b[1] - a[1]).slice(0, 3).map(([trait]) =>
                formatExplanationLabel(trait)
        );

    if (traits.length === 0) {
        return "";
    }

    return `
        Because you strongly identify with
        ${formatList(traits)}, this game rises
        naturally toward the top of your list.
    `;

}