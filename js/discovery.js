let searchQuery = "";

const DISCOVERY_FILTERS = [
  {
    key: "dimensions",
    label: "Dimension",
    options: [
      "2d",
      "2.5d",
      "3d"
    ]
  },

  {
    key: "cameras",
    label: "Camera",
    options: [
      "firstPerson",
      "thirdPerson",
      "topDown",
      "isometric",
      "sideScroller",
      "fixedCamera"
    ]
  },

  {
    key: "visualStyles",
    label: "Visual Style",
    options: [
      "pixelArt",
      "handDrawn",
      "anime",
      "celShaded",
      "stylized3D",
      "realistic",
      "lowPoly",
      "minimalist",
      "voxel",
      "retro"
    ]
  },

  {
    key: "visualTones",
    label: "Visual Tone",
    options: [
      "colorful",
      "dark",
      "gritty",
      "moody",
      "whimsical",
      "cozy",
      "peaceful",
      "surreal",
      "atmospheric"
    ]
  },

  {
    key: "worldStructures",
    label: "World",
    options: [
      "linear",
      "branching",
      "hubBased",
      "openWorld",
      "sandbox",
      "procedural",
      "levelBased",
      "roguelike",
      "metroidvania"
    ]
  },

  {
    key: "gameplay",
    label: "Gameplay",
    options: [
      "combat",
      "shooting",
      "melee",
      "platforming",
      "stealth",
      "puzzle",
      "strategy",
      "simulation",
      "management",
      "building",
      "crafting",
      "exploration",
      "driving",
      "racing",
      "farming",
      "customization"
    ]
  },

  {
    key: "socialModes",
    label: "Social",
    options: [
      "singlePlayer",
      "localCoop",
      "onlineCoop",
      "competitive",
      "mmo",
      "partyGame"
    ]
  }
];


const activeFilters = {
  dimensions: new Set(),
  cameras: new Set(),
  visualStyles: new Set(),
  visualTones: new Set(),
  worldStructures: new Set(),
  gameplay: new Set(),
  socialModes: new Set()
};

let playerProfile = null;

function loadPlayerProfile() {
  const stored =localStorage.getItem("playYourColorProfile");

  if (!stored) {
    return null;
  }

  try {
    return JSON.parse(stored);
  } catch (error) {
    console.error("Could not load player profile", error);
    return null;
  }
}

function formatFilterLabel(value) {
  return typeof formatPreferenceValue === "function" ? formatPreferenceValue(value) : value;
}


function getDisplayLabel(category, value) {
  return formatFilterLabel(value);
}

function isAvailableFilterOption(category, value) {
  return GAMES.some(game => gameMatchesFilter(game, category, value));
}


function renderFilters() {
  const container = document.getElementById("filterGroups");

  container.innerHTML = DISCOVERY_FILTERS.map(filter => {
      return `
        <div class="filter-group">
          <h3>
            ${filter.label}
          </h3>
          <div class="filter-options">
            ${filter.options.filter(option => isAvailableFilterOption(filter.key, option)).map(option => `
              <label class="filter-option">
                <input type="checkbox" data-category="${filter.key}" value="${option}">
                <span>
                  ${getDisplayLabel(filter.key, option)}
                </span>
              </label>
            `).join("")}
          </div>
        </div>
      `;
    }).join("");
}


function setupFilterEvents() {
  document.getElementById("filterGroups").addEventListener("change", event => {
      const checkbox = event.target;

      if (checkbox.tagName !== "INPUT") {
        return;
      }

      const category = checkbox.dataset.category;

      const value = checkbox.value;

      if (checkbox.checked) {
        activeFilters[category].add(value);
      } else {
        activeFilters[category].delete(value);
      }
      renderDiscoveryGames();
    });
}


function matchesFilters(game) {
  for (const category in activeFilters) {
    const selected = [...activeFilters[category]];

    if (selected.length === 0) {
      continue;
    }

    const matchesCategory = selected.some(value => gameMatchesFilter(game, category, value));

    if (!matchesCategory) {
      return false;
    }
  }
  return true;
}


function gameMatchesFilter(game, category, value) {
  switch (category) {
    case "dimensions": return (game.presentation?.dimension === value);

    case "cameras": return (game.presentation?.camera?.includes(value));

    case "visualStyles": return (game.visual?.styles?.[value] >= 50);

    case "visualTones": return (game.visual?.tones?.[value] >= 50);

    case "worldStructures": return (game.world?.structures?.includes(value));

    case "gameplay": return (game.gameplay?.activities?.includes(value));

    case "socialModes": return (game.social?.modes?.includes(value));

    default: return false;
  }
}

function getDiscoveryRecommendations() {
  return recommendGames(playerProfile, GAMES);
}


function renderDiscoveryGames() {
  const grid = document.getElementById("discoveryGrid");

  let games = GAMES.filter(matchesSearch).filter(matchesFilters);

  let recommendations = [];

  if (playerProfile) {
    /*
     * Discovery is a catalogue: filters should decide which games are shown.
     * `recommendGames` intentionally removes games that miss a quiz must-have,
     * which made a perfectly valid filter selection look like it found no
     * games. Keep every filtered game here and use its match score for sorting.
     */
    recommendations = games.map(game => {
      try {
        const match = calculateGameMatch(playerProfile, game);
        return { game, ...match };
      } catch (error) {
        // A bad or old saved profile must not hide catalogue results.
        console.warn(`Could not score ${game.title}; showing it without a match score.`, error);
        return { game, score: 0, excluded: false };
      }
    });
  } else {
    recommendations = games.map(game => ({game, score: 0}));
  }

  recommendations = sortDiscoveryGames(recommendations);

  renderActiveFilters();

  document.getElementById("resultCount").textContent =
    `${recommendations.length} ${recommendations.length === 1 ? "game" : "games"}`;

  if (recommendations.length === 0) {
    grid.innerHTML = `
        <div class="empty-state">
        <div class="empty-state-icon">
            ?
        </div>
        <h2>
            No games found.
        </h2>
        <p>
            Try removing a filter or searching
            for something else.
        </p>
        <button id="emptyClearFilters" class="empty-clear">
            CLEAR FILTERS
        </button>
        </div>
    `;
    setupEmptyState();
    updateURL();
    return;
    }

    updateURL();

  grid.innerHTML = recommendations.map(recommendation => createDiscoveryCard(recommendation)).join("");
}

function setupEmptyState() {
  const button = document.getElementById("emptyClearFilters");
  if (!button) {
    return;
  }
  button.addEventListener("click", clearAllFilters);
}


function clearAllFilters() {
    Object.values(activeFilters).forEach(set => set.clear());
    document.querySelectorAll("#filterGroups input").forEach(input => {input.checked = false;});
    const search = document.getElementById("gameSearch");
    if (search) {
      search.value = "";
    }
    searchQuery = "";
    renderDiscoveryGames();
}

function createDiscoveryCard(recommendation) {
  const game = recommendation.game;

  const score = Math.round(recommendation.score || 0);

  const cover = game.media?.cover || "";

  return `
    <a
      class="discovery-card"
      href="game.html?id=${encodeURIComponent(game.id)}"
      aria-label="View ${game.title}"
    >

      <div class="discovery-card-media">
        ${cover
            ? `
              <img src="${cover}" alt="${game.title}" loading="lazy">
            `

            : `
              <div class="discovery-placeholder">
                ${game.title.charAt(0)}
              </div>
            `
        }

        ${playerProfile
            ? `
              <div class="discovery-score">
                ${score}%
              </div>
            `

            : ""
        }

      </div>

      <div class="discovery-card-content">
        <span class="discovery-year">
          ${game.metadata?.releaseYear || ""}
        </span>

        <h3>
          ${game.title}
        </h3>

        <div class="discovery-genres">
          ${game.metadata?.genres?.slice(0, 3).map(genre => `<span>${genre}</span>`).join("") || ""}
        </div>

        <div class="discovery-card-footer">
          <span>
            VIEW GAME
          </span>

          <span>
            →
          </span>

        </div>

      </div>

    </a>
  `;
}


function setupSearch() {
  const search = document.getElementById("gameSearch");

  search.addEventListener("input", event => {
    searchQuery = event.target.value.trim().toLowerCase();
    renderDiscoveryGames();

  });
}


function matchesSearch(game) {
  if (!searchQuery) {
    return true;
  }

  const searchableText = [
    game.title,
    ...(game.metadata?.genres || []),
    ...(game.gameplay?.activities || []),
    ...(game.world?.structures || []),
    ...(game.presentation?.camera || []),
    game.presentation?.dimension || ""
  ].join(" ").toLowerCase();

  return searchableText.includes(
    searchQuery
  );
}



function renderActiveFilters() {
  const container = document.getElementById("activeFilters");

  const chips = [];

  for (const filter of DISCOVERY_FILTERS) {
    for (const value of activeFilters[filter.key]) {
      chips.push(`
        <button class="active-filter-chip" data-category="${filter.key}" data-value="${value}">
          ${getDisplayLabel(filter.key, value)}
          <span>x</span>
        </button>
      `);

    }
  }
  container.innerHTML = chips.join("");
}



function setupActiveFilterEvents() {
  document.getElementById("activeFilters").addEventListener("click",event => {
        const chip = event.target.closest?.(".active-filter-chip");
        if (!chip) {
          return;
        }

        const category = chip.dataset.category;

        const value = chip.dataset.value;

        activeFilters[category].delete(value);

        const checkbox = document.querySelector(`input[data-category="${category}"][value="${value}"]`);

        if (checkbox) {
          checkbox.checked = false;
        }

        renderDiscoveryGames();

      }
    );
}

function sortDiscoveryGames(recommendations) {
  const sort = document.getElementById("sortGames").value;

  return [...recommendations].sort((a, b) => {
      switch (sort) {
        case "name": return a.game.title.localeCompare(b.game.title);

        case "difficulty": return (b.game.experience.difficulty - a.game.experience.difficulty);

        case "year": return (b.game.metadata.releaseYear - a.game.metadata.releaseYear);

        case "match": default: return (b.score - a.score);
      }

    }
  );
}



function loadFiltersFromURL() {
  const params = new URLSearchParams(window.location.search);

  const mappings = {
    dimension: "dimensions",
    camera: "cameras",
    style: "visualStyles",
    tone: "visualTones",
    world: "worldStructures",
    gameplay: "gameplay",
    social: "socialModes"
  };

  for (const parameter in mappings) {
    const raw = params.get(parameter);
    if (!raw) {
      continue;
    }

    const category = mappings[parameter];

    raw.split(",").map(value => value.trim()).filter(Boolean).forEach(value => {
        if (DISCOVERY_FILTERS.find(group => group.key === category)?.options.includes(value) && isAvailableFilterOption(category, value)) {
          activeFilters[category].add(value);
        }
      });
  }
}


function syncCheckboxes() {
  document.querySelectorAll("#filterGroups input").forEach(input => {
      const category = input.dataset.category;
      const value = input.value;
      input.checked = activeFilters[category]?.has(value) || false;
    });
}

function updateURL() {
  const params = new URLSearchParams();

  for (const filter of DISCOVERY_FILTERS) {
    const selected = [...activeFilters[filter.key]];

    if (selected.length === 0) {
      continue;
    }

    const parameter = getURLParameter(filter.key);

    if (parameter) {
      params.set(parameter, selected.join(","));
    }
  }

  const query = params.toString();

  const newURL = query ? `${window.location.pathname}?${query}` : window.location.pathname;

  window.history.replaceState({}, "", newURL);
}



function getURLParameter(category) {
  const mapping = {
    dimensions: "dimension",
    cameras: "camera",
    visualStyles: "style",
    visualTones: "tone",
    worldStructures: "world",
    gameplay: "gameplay",
    socialModes: "social"
  };
  return mapping[category] || null;
}



async function initDiscovery() {

  await loadGameDatabase();

  playerProfile = loadPlayerProfile();

  renderFilters();

  loadFiltersFromURL();

  syncCheckboxes();

  setupFilterEvents();

  setupActiveFilterEvents();

  setupSearch();

  document.getElementById("sortGames").addEventListener("change", renderDiscoveryGames);
  document.getElementById("clearFilters").addEventListener("click", clearAllFilters);

  renderDiscoveryGames();
}

document.addEventListener("DOMContentLoaded", initDiscovery);
