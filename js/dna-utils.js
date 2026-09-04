const DNA_DIMENSIONS = [
  {
    key: "challenge",
    label: "Challenge"
  },
  {
    key: "mastery",
    label: "Mastery"
  },
  {
    key: "competition",
    label: "Competition"
  },
  {
    key: "strategy",
    label: "Strategy"
  },
  {
    key: "exploration",
    label: "Exploration"
  },
  {
    key: "discovery",
    label: "Discovery"
  },
  {
    key: "creativity",
    label: "Creativity"
  },
  {
    key: "freedom",
    label: "Freedom"
  },
  {
    key: "story",
    label: "Story"
  },
  {
    key: "social",
    label: "Social"
  },
  {
    key: "progression",
    label: "Progression"
  }
];


function normalizeDNAScore(value) {
  if (typeof value !== "number") {
    return 0;
  }
  return Math.max(0, Math.min(100, value));
}


function getDNADimensions(profile) {
  return DNA_DIMENSIONS.map(dimension => {
    return {
      key: dimension.key,
      label: dimension.label,
      value: normalizeDNAScore(profile?.[dimension.key] ?? 0)
    };
  });
}


function createDNAComparisonRow(dimension, playerValue, gameValue) {
  const difference = Math.abs(playerValue - gameValue);
  const closeness = Math.max(0, 100 - difference);
  return `
    <div class="dna-row" data-closeness="${closeness}">
      <div class="dna-row-header">
        <span class="dna-label">
          ${dimension.label}
        </span>
        <span class="dna-values">
          ${Math.round(playerValue)}
          /
          ${Math.round(gameValue)}
        </span>
      </div>
      <div class="dna-track">
        <div class="dna-player-track">
          <span style="width: ${playerValue}%;"></span>
        </div>
        <div class="dna-game-track">
          <span style="width: ${gameValue}%;"></span>
        </div>
      </div>
      <div class="dna-row-labels">
        <span>
          YOU
        </span>
        <span>
          GAME
        </span>
      </div>
    </div>
  `;
}



function renderDNAComparison(playerTraits, gameProfile) {
  const container = document.getElementById("dnaComparison");

  if (!container) {
    return;
  }

  const rows = DNA_DIMENSIONS.map(dimension => {
      const playerValue = normalizeDNAScore(playerTraits?.[dimension.key]);

      const gameValue = normalizeDNAScore(gameProfile?.[dimension.key]);

      return {
        dimension,
        playerValue,
        gameValue,
        difference: Math.abs(playerValue - gameValue)
      };

    });

  /*
    Show the dimensions where the
    comparison is most meaningful.
  */

  rows.sort((a, b) => a.difference - b.difference);

  container.innerHTML = rows.slice(0, 7).map(row => createDNAComparisonRow(row.dimension, row.playerValue, row.gameValue)).join("");
}



function calculateDNASimilarity(playerTraits, gameProfile) {
  const dimensions =DNA_DIMENSIONS;
  if (!dimensions.length) {
    return 0;
  }

  let totalDifference = 0;

  dimensions.forEach(dimension => {
      const playerValue = normalizeDNAScore(playerTraits?.[dimension.key]);

      const gameValue = normalizeDNAScore(gameProfile?.[dimension.key]);

      totalDifference += Math.abs(playerValue - gameValue);
    }
  );

  return Math.round(100 - (totalDifference / dimensions.length));
}


function renderDNASimilarity(playerTraits, gameProfile) {
  const container = document.getElementById("dnaSimilarity");
  if (!container) {
    return;
  }

  const similarity = calculateDNASimilarity(playerTraits, gameProfile);

  container.innerHTML = `
    <div class="dna-similarity-score">
      ${similarity}%
    </div>
    <div class="dna-similarity-text">
      Gaming DNA similarity
    </div>
  `;
}



function renderPlayerDNA(container, traits) {

  if (!container) {
    return;
  }

  const dimensions = getDNADimensions(traits);

  container.innerHTML = dimensions.sort((a, b) => b.value - a.value).map(dimension => `
          <div class="player-dna-item">
            <div class="player-dna-header">
              <span>
                ${dimension.label}
              </span>
              <strong>
                ${Math.round(dimension.value)}
              </strong>
            </div>
            <div class="player-dna-bar">
              <span style="width: ${dimension.value}%;"></span>
            </div>
          </div>
        `
      ).join("");
}



function getBiggestDNAGap(playerTraits, gameProfile) {

  let biggest = null;

  DNA_DIMENSIONS.forEach(dimension => {

      const playerValue = normalizeDNAScore(playerTraits?.[dimension.key]);

      const gameValue = normalizeDNAScore(gameProfile?.[dimension.key]);

      const gap = Math.abs(playerValue - gameValue);

      if (!biggest || gap > biggest.gap) {

        biggest = {
          dimension,
          playerValue,
          gameValue,
          gap
        };

      }

    }
  );

  return biggest;
}


function createDNAGapText(playerTraits, gameProfile) {

  const gap = getBiggestDNAGap(playerTraits, gameProfile);

  if (!gap || gap.gap < 15) {
    return "";
  }

  const gameLeads = gap.gameValue > gap.playerValue;

  return `
    <p class="dna-gap-text">
      One notable difference is
      <strong>
        ${gap.dimension.label}
      </strong>
      : this game emphasizes it ${gameLeads ? "more" : "less"} than you typically do.
    </p>
  `;
}
