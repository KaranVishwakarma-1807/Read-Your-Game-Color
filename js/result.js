const savedProfile = localStorage.getItem("playYourColorProfile");

if (!savedProfile) {
    window.location.href = "assessment.html";
}

let profile;

try {
    profile = JSON.parse(savedProfile);
}
catch (error) {
    console.error("Could not parse player profile:", error);
    localStorage.removeItem("playYourColorProfile");
    window.location.href = "assessment.html";
}

const recommendationProfile = {
    traits: profile?.traits || {},
    preferences: profile?.preferences || {},
    constraints: profile?.constraints || {dislikes: {}, mustHave: {}}
};

const primary = profile?.colors?.primary;
const secondary = profile?.colors?.secondary;
const colorPresentation = primary ? COLOR_PRESENTATION[primary.colorId] : null;

const resultColorName = document.getElementById("resultColorName");
const resultArchetype = document.getElementById("resultArchetype");
const resultTagline = document.getElementById("resultTagline");
const resultDescription = document.getElementById("resultDescription");
const resultKeywords = document.getElementById("resultKeywords");
const primaryDot = document.getElementById("primaryDot");
const secondaryDot = document.getElementById("secondaryDot");
const primaryName = document.getElementById("primaryName");
const secondaryName = document.getElementById("secondaryName");
const primaryDescription = document.getElementById("primaryDescription");
const secondaryDescription = document.getElementById("secondaryDescription");
const secondaryColorName = document.getElementById("secondaryColorName");
const secondaryColorArchetype = document.getElementById("secondaryColorArchetype");
const secondaryColorOrb = document.getElementById("secondaryColorOrb");
const colorBars = document.getElementById("colorBars");
const traitGrid = document.getElementById("traitGrid");
const restartButton = document.getElementById("restartButton");
const recommendationList = document.getElementById("recommendationList");
const featuredRecommendation = document.getElementById("featuredRecommendation");
const featuredRecommendationLabel = document.getElementById("featuredRecommendationLabel");
const surpriseList = document.getElementById("surpriseList");
const visualDNA = document.getElementById("visualDNA");
const presentationDNA = document.getElementById("presentationDNA");
const worldDNA = document.getElementById("worldDNA");
const gameplayDNA = document.getElementById("gameplayDNA");
const experienceDNA = document.getElementById("experienceDNA");
const playerDNAContainer = document.getElementById("playerDNAGrid");

// `profile` is the saved assessment result.  The assessment page's
// `playerProfile` only exists while the quiz is open.
renderPlayerDNA(playerDNAContainer, profile?.traits || {});

function getGameCover(game) {
    return typeof game.media?.cover === "string" ? game.media.cover : "";
}

function formatTraitName(trait) {
    return trait.replace(/([A-Z])/g, " $1").replace(/^./, character => character.toUpperCase());
}

function renderColorHero() {
    if (!primary || !colorPresentation) {
        return;
    }

    document.body.classList.add(`color-${primary.colorId}`);
    const colorOrb = document.getElementById("colorOrb");
    if (colorOrb) {
        colorOrb.style.background = primary.hex;
        colorOrb.style.boxShadow = `0 0 90px ${primary.hex}`;
    }
    resultColorName.textContent = primary.colorId.toUpperCase();
    resultArchetype.textContent = colorPresentation.archetype;
    resultTagline.textContent = colorPresentation.tagline;
    resultDescription.textContent = colorPresentation.description;
    resultKeywords.innerHTML = colorPresentation.keywords.map(keyword => `<span class="result-keyword">${keyword}</span>`).join("");
    primaryDot.style.background = primary.hex;
    primaryName.textContent = colorPresentation.archetype;
    primaryDescription.textContent = colorPresentation.description;
}

function renderSecondaryColor() {
    if (!secondary) {
        return;
    }

    const presentation = COLOR_PRESENTATION[secondary.colorId];
    const colorMap = {
        red: "#ff5252",
        blue: "#5c7cff",
        green: "#55d68a",
        yellow: "#f3d45a",
        purple: "#a875ff",
        orange: "#ff9b4a"
    };
    const color = colorMap[secondary.colorId] || secondary.hex;

    secondaryColorName.textContent = secondary.colorId.toUpperCase();
    secondaryColorArchetype.textContent = presentation?.archetype || "YOUR SECOND COLOR";
    secondaryName.textContent = presentation?.archetype || secondary.colorId;
    secondaryDescription.textContent = presentation?.description || "A strong secondary influence on how you play.";
    secondaryDot.style.background = secondary.hex;
    secondaryColorOrb.style.setProperty("--secondary-color", color);
    secondaryColorOrb.style.setProperty("--secondary-glow", color);
}

function renderColorBreakdown() {
    (profile.colors.allColors || []).forEach(color => {
        const row = document.createElement("div");
        row.className = "color-bar-row";
        row.innerHTML = `<div class="color-bar-name">${color.shortName}</div><div class="color-bar-track"><div class="color-bar-fill" style="background: ${color.hex}; width: ${color.score}%"></div></div><div class="color-bar-value">${Math.round(color.score)}</div>`;
        colorBars.appendChild(row);
    });
}

function renderTraits() {
    Object.entries(profile.traits || {}).sort(([, first], [, second]) => second - first).forEach(([trait, value]) => {
        const item = document.createElement("div");
        item.className = "trait-item";
        item.innerHTML = `<div class="trait-header"><span class="trait-name">${formatTraitName(trait)}</span><span class="trait-value">${value}</span></div><div class="trait-track"><div class="trait-fill" style="width: ${value}%"></div></div>`;
        traitGrid.appendChild(item);
    });
}

function displayPreferenceGroup(container, title, values, limit = 6) {
    if (!container || !values || typeof values !== "object") {
        return;
    }

    const group = document.createElement("div");
    group.className = "preference-group";
    group.innerHTML = `<p class="eyebrow">${title}</p><div class="preference-group-items"></div>`;
    const items = group.querySelector(".preference-group-items");

    Object.entries(values).sort(([, first], [, second]) => second - first).slice(0, limit).forEach(([key, value]) => {
        const card = document.createElement("div");
        card.className = `preference-card${value >= 70 ? " strong" : ""}`;
        card.innerHTML = `<div class="preference-card-header"><span class="preference-label">${formatPreferenceValue(key)}</span><span class="preference-value">${value}</span></div><div class="preference-track"><div class="preference-fill" style="width: ${value}%"></div></div>`;
        items.appendChild(card);
    });

    container.appendChild(group);
}

function createRecommendationCard(recommendation) {
    const game = recommendation.game;
    const tier = recommendation.tier || getRecommendationTier(recommendation.score);
    const explanation = buildRecommendationExplanation(recommendation);
    const card = document.createElement("a");
    const reasons = getTopMatchReasons(playerProfile.traits, GAME_PROFILES.find(profile => profile.id === recommendation.game.id));
    card.className = "game-card recommendation-card-clickable";
    card.href = `game.html?id=${encodeURIComponent(game.id)}`;
    card.setAttribute("aria-label", `View ${game.title}`);
    card.innerHTML = `<div class="game-card-media">${getGameCover(game) ? `<img src="${getGameCover(game)}" alt="${game.title}" class="game-card-image" loading="lazy">` : `<div class="game-card-placeholder"><span>${game.title.charAt(0)}</span></div>`}<div class="game-card-overlay"></div><div class="game-card-match">${Math.round(recommendation.score)}%</div></div><div class="game-card-content"><div class="game-card-tier">${tier.label}</div><h3 class="game-card-title">${game.title}</h3><div class="game-card-genres">${(game.metadata?.genres || []).slice(0, 3).map(genre => `<span>${genre}</span>`).join("")}</div><p class="recommendation-reason">${explanation.why}</p></div>`;
    const reasonsHTML = reasons.map(reason =>
        `<span class="match-tag">
          ${reason.label}
        </span>`
    ).join("");
    return card;
}

function displayRecommendations(recommendations) {
    recommendationList.innerHTML = "";
    recommendations.forEach(recommendation => recommendationList.appendChild(createRecommendationCard(recommendation)));
    if (recommendations[0]) {
        const explanation = buildRecommendationExplanation(recommendations[0]);
        featuredRecommendationLabel.textContent = recommendations[0].tier.label;
        featuredRecommendation.innerHTML = `<a class="featured-recommendation-link" href="game.html?id=${encodeURIComponent(recommendations[0].game.id)}"><h3 class="recommendation-title">${recommendations[0].game.title}</h3><p class="recommendation-reason">${explanation.why}</p></a>`;
    } else {
        featuredRecommendation.innerHTML = "<p>No games match the current set of requirements yet.</p>";
    }
}

function getExperiencePreferences() {
    const defaults = { pace: 50, intensity: 50, difficulty: 50, narrative: 50 };
    const saved = profile.preferences?.experience;

    if (!saved || typeof saved !== "object") {
        return defaults;
    }

    return Object.fromEntries(
        Object.entries(defaults).map(([key, fallback]) => [
            key,
            typeof saved[key] === "number" ? saved[key] : fallback
        ])
    );
}

function displaySurpriseRecommendations(fallbackRecommendations = []) {
    surpriseList.innerHTML = "";
    let surprises = [];
    try {
        surprises = recommendSurpriseGames(recommendationProfile, GAMES);
    } catch (error) {
        console.error("Could not create comfort-zone recommendations:", error);
    }
    if (surprises.length === 0) {
        // A small catalogue may not contain a mathematically "surprising"
        // match. Show strong alternatives instead of leaving the section blank.
        surprises = fallbackRecommendations.slice(1, 4);
    }
    surprises.forEach(recommendation => surpriseList.appendChild(createRecommendationCard(recommendation)));

    if (surprises.length === 0) {
        surpriseList.innerHTML = "<p class=\"recommendation-empty\">More games are being added to this collection.</p>";
    }
}

restartButton.addEventListener("click", () => {
    localStorage.removeItem("playYourColorProfile");
    localStorage.removeItem("playYourColorAssessmentState");
    window.location.href = "assessment.html";
});

async function initializeResultPage() {
    const games = await loadGameDatabase();
    if (games.length === 0) {
        console.error("No games available.");
        return;
    }

    if (!validateGameDatabase(games)) {
        console.warn("Game database contains errors.");
    }

    renderColorHero();
    renderSecondaryColor();
    renderColorBreakdown();
    renderTraits();
    displayPreferenceGroup(visualDNA, "VISUAL STYLE", profile.preferences?.visualStyles, 6);
    displayPreferenceGroup(visualDNA, "VISUAL TONE", profile.preferences?.visualTones, 5);
    displayPreferenceGroup(presentationDNA, "DIMENSION", profile.preferences?.dimensions, 3);
    displayPreferenceGroup(presentationDNA, "CAMERA", profile.preferences?.cameras, 6);
    displayPreferenceGroup(worldDNA, "WORLD STRUCTURE", profile.preferences?.worldStructures, 6);
    displayPreferenceGroup(gameplayDNA, "GAMEPLAY", profile.preferences?.gameplay, 8);
    // Profiles saved before Experience DNA was introduced do not contain this
    // group. Neutral defaults keep the section useful until the assessment is
    // retaken, without changing the saved profile.
    displayPreferenceGroup(
        experienceDNA,
        "EXPERIENCE",
        getExperiencePreferences(),
        4
    );

    let recommendations = [];
    try {
        recommendations = recommendGames(recommendationProfile, games);
    } catch (error) {
        console.error("Could not create recommendations:", error);
        recommendations = games.map(game => ({
            game,
            score: 0,
            tier: getRecommendationTier(0),
            motivationBreakdown: {},
            preferenceMatches: [],
            preferenceMismatches: [],
            dislikeReasons: []
        }));
    }

    /* Never leave the results page empty. If hard constraints rule out every
       game in the current catalogue, provide the closest matches and make the
       fallback explicit in the featured area. */
    let usingRelaxedConstraints = false;
    if (recommendations.length === 0) {
        usingRelaxedConstraints = true;
        try {
            recommendations = recommendGames({
                ...recommendationProfile,
                constraints: { dislikes: {}, mustHave: {} }
            }, games);
        } catch (error) {
            console.error("Could not create relaxed recommendations:", error);
        }
    }

    recommendations = rankRecommendations(recommendations, 5);
    displayRecommendations(recommendations);
    if (usingRelaxedConstraints && featuredRecommendationLabel) {
        featuredRecommendationLabel.textContent = "CLOSEST AVAILABLE MATCH";
    }
    displaySurpriseRecommendations(recommendations);
}

initializeResultPage();
