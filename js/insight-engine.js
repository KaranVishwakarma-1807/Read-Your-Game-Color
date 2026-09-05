    const INSIGHT_DIMENSIONS = [
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


function getStrongMatches(playerTraits, gameProfile, threshold = 80) {

  return INSIGHT_DIMENSIONS.map(dimension => {

      const player = normalizeDNAScore(playerTraits?.[dimension.key]);

      const game = normalizeDNAScore(gameProfile?.[dimension.key]);

      const difference = Math.abs(player - game);

      return {...dimension, player, game, difference, similarity: 100 - difference};

    }).filter(dimension => dimension.similarity >= threshold).sort((a, b) => b.similarity - a.similarity);
}


function getStrongDifferences(playerTraits, gameProfile, threshold = 20) {

  return INSIGHT_DIMENSIONS.map(dimension => {

      const player = normalizeDNAScore(playerTraits?.[dimension.key]);

      const game = normalizeDNAScore(gameProfile?.[dimension.key]);

      const difference = game - player;

      return {...dimension, player, game, difference, absoluteDifference: Math.abs(difference)};

    }).filter(dimension => dimension.absoluteDifference >= threshold).sort((a, b) => b.absoluteDifference - a.absoluteDifference);
}


function createMatchInsight(match) {

  if (match.length === 0) {
    return "";
  }

  const names = match.slice(0, 3).map(item => item.label);

  if (names.length === 1) {
    return `
      Your strongest connection with this
      game is <strong>${names[0]}</strong>.
    `;
  }

  if (names.length === 2) {
    return `
      This game strongly matches your
      <strong>${names[0]}</strong> and
      <strong>${names[1]}</strong> side.
    `;
  }

  return `
    This game strongly matches your
    <strong>${names[0]}</strong>,
    <strong>${names[1]}</strong>, and
    <strong>${names[2]}</strong> side.
  `;
}


function createGrowthInsight(differences) {

  const growth = differences.filter(item => item.difference >= 20);

  if (growth.length === 0) {
    return "";
  }

  const strongest = growth[0];
  return `
    <strong>${strongest.label}</strong>
    is more prominent in this game
    than it usually is for you.
    That could make it an interesting
    stretch beyond your usual comfort zone.
  `;
}


function createFrictionInsight(differences) {

  const friction = differences.filter(item => item.difference <= -20);

  if (friction.length === 0) {
    return "";
  }

  const strongest = friction[0];

  return `
    <strong>${strongest.label}</strong>
    matters less in this game than it
    does in your usual gaming profile.
  `;
}


function buildGameInsights(playerTraits, gameProfile) {

  const matches = getStrongMatches(playerTraits, gameProfile);

  const differences = getStrongDifferences(playerTraits, gameProfile);

  return {
    matches,
    differences,
    matchInsight: createMatchInsight(matches),
    growthInsight: createGrowthInsight(differences),
    frictionInsight: createFrictionInsight(differences)
  };
}


function getTopMatchReasons(playerTraits, gameProfile, limit = 3) {
  return getStrongMatches(playerTraits, gameProfile, 70).slice(0, limit);
}