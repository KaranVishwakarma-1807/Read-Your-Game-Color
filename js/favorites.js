const FAVORITES_STORAGE_KEY = "playYourColorFavorites";


function getFavorites() {

  const stored = localStorage.getItem(FAVORITES_STORAGE_KEY);

  if (!stored) {
    return [];
  }

  try {

    const favorites = JSON.parse(stored);

    return Array.isArray(favorites) ? favorites : [];

  } catch (error) {

    console.error("Could not load favorites:", error);

    return [];
  }
}


function saveFavorites(favorites) {
  localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
}


function isFavorite(gameId) {
  return getFavorites().includes(gameId);
}


function addFavorite(gameId) {

  const favorites = getFavorites();

  if (!favorites.includes(gameId)) {
    favorites.push(gameId);
    saveFavorites(favorites);
  }
}


function removeFavorite(gameId) {
  const favorites = getFavorites().filter(id => id !== gameId);
  saveFavorites(favorites);
}


function toggleFavorite(gameId) {

  if (isFavorite(gameId)) {
    removeFavorite(gameId);
    return false;
  }

  addFavorite(gameId);
  return true;
}

