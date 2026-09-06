let savedGames = [];
let comparisonIds = [];

async function initMyGames() {
  await loadGameDatabase();
  const favoriteIds = getFavorites();
  savedGames = favoriteIds.map(id => GAMES.find(game => game.id === id)).filter(Boolean);
  renderMyGames();
  setupCompare();
}


function renderMyGames() {
  const grid = document.getElementById("myGamesGrid");
  const summary = document.getElementById("collectionSummary");
  summary.textContent = savedGames.length === 0 ? "You haven't saved any games yet." : `${savedGames.length} ${
          savedGames.length === 1 ? "game" : "games" } saved.`;
  if (savedGames.length === 0) {
    grid.innerHTML = `
      <div class="collection-empty">
        <div class="collection-empty-icon">
          ☆
        </div>
        <h2>
          Your shelf is empty.
        </h2>
        <p>
          Save games while exploring
          and they'll appear here.
        </p>
        <a href="discovery.html" class="collection-button">
          DISCOVER GAMES →
        </a>
      </div>
    `;
    return;
  }

  grid.innerHTML = savedGames.map(game => createSavedGameCard(game)).join("");
}


function createSavedGameCard(game) {
  const cover = game.media?.cover || "";
  return `
    <article class="saved-game-card">
      <a href="game.html?id=${encodeURIComponent(game.id)}" class="saved-game-link">
        <div class="saved-game-media">
          ${cover ? `
                <img src="${cover}" alt="${game.title}" loading="lazy">
              `
              : `
                <div class="saved-game-placeholder">
                  ${game.title.charAt(0)}
                </div>
              `
          }

        </div>
        <div class="saved-game-content">
          <span>
            ${game.metadata?.releaseYear || ""}
          </span>
          <h3>
            ${game.title}
          </h3>
        </div>
      </a>

      <div class="saved-game-actions">
        <button class="remove-game" data-game-id="${game.id}">
          REMOVE
        </button>

        <button class="compare-game" data-game-id="${game.id}">
          COMPARE
        </button>
      </div>
    </article>
  `;
}


document.getElementById("myGamesGrid").addEventListener("click", event => {
      const button = event.target.closest(".remove-game");
      if (!button) {
        return;
      }

      const gameId = button.dataset.gameId;

      removeFavorite(gameId);

      savedGames = savedGames.filter(game => game.id !== gameId);

      renderMyGames();

      setupCompare();
    }
  );




// Comparision
function setupCompare() {
  const buttons = document.querySelectorAll(".compare-game");

  buttons.forEach(button => {
    button.addEventListener("click",
      () => {
        const gameId = button.dataset.gameId;
        toggleComparison(gameId);
      }
    );
  });
  renderCompareControls();
}

// Comparision Toggle
function toggleComparison(gameId) {
  if (comparisonIds.includes(gameId)) {
    comparisonIds = comparisonIds.filter(id => id !== gameId);
  } else {
    if (comparisonIds.length >= 2) {
      comparisonIds.shift();
    }
    comparisonIds.push(gameId);
  }
  renderCompareControls();
  renderComparison();
}

// Camparision Controls
function renderCompareControls() {
  const container = document.getElementById("compareControls");
  if (!container) {
    return;
  }
  container.innerHTML = savedGames.map(game => {
        const selected = comparisonIds.includes(game.id);
        return `
          <button class="compare-select ${selected? "selected" : ""}" data-game-id="${game.id}">
            ${game.title}
            ${selected ? " ✓" : "" }
          </button>
        `;
      }).join("");

  container.querySelectorAll(".compare-select").forEach(button => {
      button.addEventListener("click", () => {
          toggleComparison(button.dataset.gameId);
        }
      );
    });
}

// Creating comparision itself
function renderComparison() {
  const section = document.getElementById("compareSection");
  const result = document.getElementById("compareResult");
  if (comparisonIds.length !== 2) {
    section.hidden = true;
    result.innerHTML = "";
    return;
  }

  section.hidden = false;
  const gameA = savedGames.find(game => game.id === comparisonIds[0]);
  const gameB = savedGames.find(game => game.id === comparisonIds[1]);
  if (!gameA || !gameB) {
    return;
  }
  renderGameComparison(gameA, gameB);
}

// Compating the DNA
function renderGameComparison(gameA, gameB) {
  const profileA = GAME_PROFILES.find(profile => profile.id === gameA.id); 
  const profileB = GAME_PROFILES.find(profile => profile.id === gameB.id);

  if (!profileA || !profileB) {
    return;
  }

  const result = document.getElementById("compareResult");

  result.innerHTML = `
    <div class="comparison-header">
      <div>
        <span>GAME A</span>
        <h3>${gameA.title}</h3>
      </div>
      <div class="comparison-vs">
        VS
      </div>
      <div>
        <span>GAME B</span>
        <h3>${gameB.title}</h3>
      </div>
    </div>
    <div class="comparison-rows">
      ${DNA_DIMENSIONS.map(dimension => {
            const a = normalizeDNAScore(profileA.motivation?.[dimension.key]);
            const b = normalizeDNAScore(profileB.motivation?.[dimension.key]);
            return `
              <div class="comparison-row">
                <div class="comparison-score">
                  ${Math.round(a)}
                </div>
                <div class="comparison-name">
                  ${dimension.label}
                </div>
                <div class="comparison-score">
                  ${Math.round(b)}
                </div>
              </div>
            `;
          }).join("")
      }
    </div>
  `;
}

document.addEventListener("DOMContentLoaded", initMyGames);