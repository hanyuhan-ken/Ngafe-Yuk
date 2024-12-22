const baseUrl = 'http://localhost:3000';

// Tampilkan nama user
const user = JSON.parse(localStorage.getItem('user'));
if (!user) {
  alert("Please login first.");
  window.location.href = "login.html";
} else {
  document.getElementById('user-name').textContent = user.name;
}

// Ambil dan tampilkan daftar favorit
async function loadFavorites() {
  try {
    const response = await fetch(`${baseUrl}/api/favorites`, {
      method: 'GET',
      credentials: 'include',
    });

    if (!response.ok) throw new Error("Failed to load favorites");

    const favorites = await response.json();
    const favoritesList = document.getElementById('favorites-list');

    if (favorites.length === 0) {
      favoritesList.innerHTML = "<p>You don't have any favorites yet.</p>";
    } else {
      favoritesList.innerHTML = favorites.map(cafe => `
        <div class="favorite-item">
          <h3>${cafe.name}</h3>
          <p>${cafe.description}</p>
          <button onclick="removeFavorite(${cafe.id})">Remove</button>
        </div>
      `).join('');
    }
  } catch (error) {
    console.error("Error loading favorites:", error);
  }
}

// Hapus kafe dari favorit
async function removeFavorite(cafeId) {
  try {
    const response = await fetch(`${baseUrl}/api/favorites/${cafeId}`, {
      method: 'DELETE',
      credentials: 'include',
    });

    if (!response.ok) throw new Error("Failed to remove favorite");

    alert("Cafe removed from favorites");
    loadFavorites(); // Refresh daftar favorit
  } catch (error) {
    console.error("Error removing favorite:", error);
  }
}

// Logout
document.getElementById('logout').addEventListener('click', (e) => {
  e.preventDefault();
  fetch(`${baseUrl}/api/logout`, { method: 'POST', credentials: 'include' })
    .then(() => {
      localStorage.removeItem('user');
      window.location.href = "login.html";
    })
    .catch(err => console.error("Logout error:", err));
});

// Load favorites saat halaman dimuat
loadFavorites();
