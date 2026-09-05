const gameId = new URLSearchParams(window.location.search).get("id")?.trim();

const gameHeroVisual = document.getElementById("gameHeroVisual");
const gameTitle = document.getElementById("gameTitle");
const gameInitial = document.getElementById("gameInitial");
const gameGenres = document.getElementById("gameGenres");
const gameMatch = document.getElementById("gameMatch");
const gameMatchLabel = document.getElementById("gameMatchLabel");
const gameTier = document.getElementById("gameTier");
const gameDescription = document.getElementById("gameDescription");
const gameVerdict = document.getElementById("gameVerdict");
const gameWhy = document.getElementById("gameWhy");
const gameBreakdown = document.getElementById("gameBreakdown");
const gameProfile = document.getElementById("gameProfile");
const gameFriction = document.getElementById("gameFriction");
const frictionSection = document.getElementById("frictionSection");

function applyProfileTheme(profile) {
    const color = profile?.colors?.primary?.hex;

    if (typeof color === "string" && /^#[0-9a-f]{6}$/i.test(color)) {
        document.documentElement.style.setProperty("--result-color", color);
        document.documentElement.style.setProperty("--result-glow", color);
    }
}

function showPageState(title, message, actionHref, actionLabel) {
    document.title = `${title} - Play Your Color`;
    gameTitle.textContent = title;
    gameTier.textContent = "GAME DETAIL";
    gameMatch.textContent = "";
    gameMatchLabel.textContent = "";
    gameGenres.textContent = "";
    gameDescription.textContent = message;
    gameInitial.textContent = "?";
    gameHeroVisual.style.backgroundImage = "";
    gameWhy.innerHTML = "";
    gameBreakdown.innerHTML = "";
    gameProfile.innerHTML = "";
    frictionSection.hidden = true;

    document.querySelectorAll(".game-section").forEach(section => {
        section.hidden = true;
    });

    let state = document.getElementById("gamePageState");
    if (!state) {
        state = document.createElement("div");
        state.id = "gamePageState";
        state.className = "game-page-state";
        document.querySelector(".game-detail").after(state);
    }

    state.innerHTML = actionHref && actionLabel
        ? `<a href="${actionHref}">${actionLabel}</a>`
        : "";
}

function loadPlayerProfile() {
    const stored = localStorage.getItem("playYourColorProfile");
    if (!stored) {
        return null;
    }

    try {
        return JSON.parse(stored);
    }
    catch (error) {
        console.error("Could not parse player profile:", error);
        return null;
    }
}


function getGameMotivationProfile(game){
  if (!game) {
    return null;
  }
  return GAME_PROFILES.find(profile => profile.id === game.id ) || null;
}


function createRecommendationProfile(profile) {
    return {
        traits: profile.traits || {},
        preferences: profile.preferences || {},
        constraints: profile.constraints || {dislikes: {}, mustHave: {}}
    };
}

function createGameDescription(game) {
    const genres = game.metadata?.genres || [];
    const structures = game.world?.structures || [];
    const pace = game.experience?.pace || 0;
    const paceDescription = pace >= 75 ? "fast-paced" : pace <= 30 ? "slow-paced" : "measured";
    return `${genres[0] || "Game"} experience with a ${structures.join(" + ") || "unique world"} structure and a ${paceDescription} rhythm.`;
}

function renderGameHero(game, recommendation) {
    const heroImage = game.media?.hero || game.media?.cover;
    gameHeroVisual.style.backgroundImage = heroImage ? `url("${heroImage}")` : "";
    gameTitle.textContent = game.title;
    gameInitial.textContent = game.title.charAt(0);
    gameMatch.textContent = `${Math.round(recommendation.score)}%`;
    gameTier.textContent = recommendation.tier.label;
    gameMatchLabel.textContent = "GAMING DNA MATCH";
    gameDescription.textContent = createGameDescription(game);
    gameGenres.innerHTML = (game.metadata?.genres || []).map(genre => `<span class="game-genre">${genre}</span>`).join("");
    document.title = `${game.title} - Play Your Color`;
}

function renderWhy(recommendation) {
    const explanation = buildRecommendationExplanation(recommendation);
    gameWhy.innerHTML = `<p>${explanation.personalized || explanation.why}</p>`;
}

function createBreakdownCard(label, value) {
    return `<div class="match-breakdown-card"><div class="match-breakdown-top"><span class="match-breakdown-name">${label}</span><span class="match-breakdown-score">${Math.round(value)}</span></div><div class="match-bar"><div class="match-bar-fill" style="width: ${Math.round(value)}%"></div></div></div>`;
}

function renderBreakdown(recommendation) {
    const breakdown = recommendation.motivationBreakdown || {};
    const dimensions = [
        ["Challenge", breakdown.challenge],
        ["Mastery", breakdown.mastery],
        ["Competition", breakdown.competition],
        ["Strategy", breakdown.strategy],
        ["Exploration", breakdown.exploration],
        ["Discovery", breakdown.discovery],
        ["Creativity", breakdown.creativity],
        ["Freedom", breakdown.freedom],
        ["Story", breakdown.story],
        ["Social", breakdown.social],
        ["Progression", breakdown.progression]
    ];

    const cards = dimensions
        .filter(([, value]) => typeof value === "number")
        .sort(([, first], [, second]) => second - first)
        .slice(0, 6)
        .map(([label, value]) => createBreakdownCard(label, value));

    gameBreakdown.innerHTML = cards.length > 0
        ? cards.join("")
        : `<p class="game-section-empty">Your detailed match breakdown will appear after you complete or retake the assessment.</p>`;
}

function createProfileCard(label, value) {
    return `<div class="game-profile-card"><div class="game-profile-label">${label}</div><div class="game-profile-value">${value}</div></div>`;
}

function formatTags(values) {
    return values?.length ? values.map(value => formatPreferenceValue(value)).join(" , ") : "None";
}

function renderGameProfile(game) {
    gameProfile.innerHTML = [
        createProfileCard("Dimension", formatPreferenceValue(game.presentation?.dimension || "Unknown")),
        createProfileCard("Camera", formatTags(game.presentation?.camera)),
        createProfileCard("World", formatTags(game.world?.structures)),
        createProfileCard("Gameplay", formatTags(game.gameplay?.activities?.slice(0, 5))),
        createProfileCard("Social", formatTags(game.social?.modes)),
        createProfileCard("Difficulty", `${game.experience?.difficulty ?? "-"}/100`)
    ].join("");
}

function renderFriction(recommendation) {
    const friction = recommendation.dislikeReasons || [];
    if (friction.length === 0) {
        frictionSection.style.display = "none";
        return;
    }

    frictionSection.style.display = "";
    gameFriction.innerHTML = `<p>This game differs from some of your stronger preferences.</p><div class="recommendation-strengths">${friction.map(item => `<span class="mismatch-tag">${formatPreferenceValue(item.preference)}</span>`).join("")}</div>`;
}


function createInsightCard(type, title, text) {

  if (!text) {
    return "";
  }

  return `
    <article class="insight-card insight-${type}">
      <span class="insight-label">
        ${title}
      </span>
      <p>
        ${text}
      </p>
    </article>
  `;
}


function renderGameInsights(insights) {
  const container = document.getElementById("gameInsights");

  if (!container) {
    return;
  }

  container.innerHTML = `
    ${createInsightCard("match", "STRONG MATCHES", insights.matchInsight)}

    ${createInsightCard("growth", "OUTSIDE YOUR USUAL ZONE", insights.growthInsight)}

    ${createInsightCard("friction", "POSSIBLE FRICTION", insights.frictionInsight)}

  `;
}


function getStrongestDNAOverlap(playerTraits, gameProfile) {
  let strongest = null;

  DNA_DIMENSIONS.forEach(dimension => {
      const playerValue = normalizeDNAScore(playerTraits?.[dimension.key]);

      const gameValue = normalizeDNAScore(gameProfile?.[dimension.key]);

      const similarity = 100 - Math.abs(playerValue - gameValue);

      if (!strongest || similarity > strongest.similarity) {
        strongest = {
          dimension,
          playerValue,
          gameValue,
          similarity
        };
      }
    }
  );

  return strongest;
}


function createDNAHighlight(playerTraits, gameProfile) {
  const strongest = getStrongestDNAOverlap(playerTraits, gameProfile);

  if (!strongest) {
    return "";
  }

  return `
    <div class="dna-highlight">
      <span class="dna-highlight-label">
        STRONGEST CONNECTION
      </span>

      <strong>
        ${strongest.dimension.label}
      </strong>

      <p>
        Your preference for
        ${strongest.dimension.label.toLowerCase()}
        closely matches what
        this game emphasizes.
      </p>

    </div>
  `;
}


// Add a perdict
function getMatchVerdict(score) {

  if (score >= 90) {

    return {
      title: "Natural Fit",
      text:
        "This game lines up extremely well with the way you like to play."
    };

  }

  if (score >= 80) {

    return {
      title: "Strong Fit",
      text:
        "A lot of this game's design aligns naturally with your gaming profile."
    };

  }

  if (score >= 70) {

    return {
      title: "Good Fit",
      text:
        "This game fits several important parts of your gaming personality."
    };

  }

  if (score >= 60) {

    return {
      title: "Interesting Match",
      text:
        "There are some strong connections, although this game may push you outside your usual preferences."
    };

  }

  return {
    title: "Wild Card",
    text:
      "This game sits outside your usual comfort zone, but that may be exactly what makes it interesting."
  };
}

function renderGameVerdict(score) {

  if (!gameVerdict) {
    return;
  }

  const verdict = getMatchVerdict(score);

  gameVerdict.innerHTML = `
    <strong>
      ${verdict.title}
    </strong>
    <p>
      ${verdict.text}
    </p>
  `;
}


async function initializeGamePage() {
    if (!gameId) {
        showPageState(
            "Choose a game",
            "Open a game from your results or the Explore Games catalogue to see its details.",
            "discovery.html",
            "Explore games"
        );
        return;
    }

    const profile = loadPlayerProfile();
    if (!profile) {
        showPageState(
            "Discover your Gaming DNA first",
            "Complete the assessment to see this game's personalized match and comparison.",
            "assessment.html",
            "Start the assessment"
        );
        return;
    }

    applyProfileTheme(profile);

    const games = await loadGameDatabase();
    if (games.length === 0) {
        showPageState(
            "Games are unavailable right now",
            "The game catalogue could not be loaded. Please try again in a moment.",
            "discovery.html",
            "Back to Explore Games"
        );
        return;
    }

    const game = games.find(item => item.id === gameId);
    if (!game) {
        showPageState(
            "Game not found",
            "This game may have been removed or the link may be incomplete.",
            "discovery.html",
            "Explore games"
        );
        return;
    }

    const recommendationProfile = createRecommendationProfile(profile);
    const gameMotivationProfile = getGameMotivationProfile(game);

    if (gameMotivationProfile) {
      renderDNASimilarity(profile.traits, gameMotivationProfile);

      renderDNAComparison(profile.traits, gameMotivationProfile);

      const insights = buildGameInsights(profile.traits, gameMotivationProfile);

        renderGameInsights(insights);
    }


    let match;

    try {
        match = calculateGameMatch(recommendationProfile, game);
    } catch (error) {
        // Older saved profiles can be incomplete. The selected game's detail
        // page should still render rather than leaving the HTML placeholder
        // (which previously made every page look like Elden Ring).
        console.error(`Could not calculate a match for ${game.title}:`, error);
        match = {
            score: 0,
            excluded: false,
            breakdown: {},
            motivationBreakdown: {},
            preferenceMatches: [],
            preferenceMismatches: [],
            dislikeReasons: []
        };
    }

    const recommendation = {
        ...match,
        game,
        tier: getRecommendationTier(match.score)
    };

    try {
        renderGameHero(game, recommendation);
        renderGameVerdict(recommendation.score);
        renderWhy(recommendation);
        renderBreakdown(recommendation);
        renderGameProfile(game);
        renderFriction(recommendation);

        if (gameMotivationProfile) {
            const dnaHighlight = document.getElementById("dnaHighlight");
            if (dnaHighlight) {
                dnaHighlight.innerHTML = createDNAHighlight(profile.traits, gameMotivationProfile);
            }
            renderDNASimilarity(profile.traits, gameMotivationProfile);
            renderDNAComparison(profile.traits, gameMotivationProfile);
        }
    } catch (error) {
        console.error(`Could not render ${game.title}:`, error);
        showPageState(
            "We could not display this game",
            "The game was found, but some of its details could not be displayed.",
            "discovery.html",
            "Explore games"
        );
    }
}

document.addEventListener("DOMContentLoaded", initializeGamePage);
