const baseUrl = 'http://localhost:3000';

function getCookie(name) {
  const cookies = document.cookie.split('; ');
  for (let i = 0; i < cookies.length; i++) {
    const [key, value] = cookies[i].split('=');
    if (key === name) return value;
  }
  return null;
}

function checkLoginStatus() {
  const token = getCookie('authToken');
  const authSection = document.getElementById('auth-section');

  if (token) {
    // User is logged in, display profile icon
    authSection.innerHTML = `
      <a href="profile.html" class="profile-box">
        <i data-feather="user"></i>
      </a>
    `;
    feather.replace(); // Refresh Feather Icons
  } else {
    // User is not logged in, display login button
    authSection.innerHTML = `
      <a href="login.html" class="login-box">Login</a>
    `;
  }
}

// Run the function on page load
document.addEventListener('DOMContentLoaded', checkLoginStatus);

// Run the function on page load
document.addEventListener('DOMContentLoaded', checkLoginStatus);

// Toggle class active untuk hamburger menu
const navbarNav = document.querySelector('.navbar-nav');
// ketika hamburger menu di klik
document.querySelector('#hamburger-menu').onclick = () => {
  navbarNav.classList.toggle('active');
};

// Toggle class active untuk search form
const searchForm = document.querySelector('.search-form');
const searchBox = document.querySelector('#search-box');

document.querySelector('#search-button').onclick = (e) => {
  searchForm.classList.toggle('active');
  searchBox.focus();
  e.preventDefault();
};

// Toggle class active untuk shopping cart
const shoppingCart = document.querySelector('.shopping-cart');
document.querySelector('#shopping-cart-button').onclick = (e) => {
  shoppingCart.classList.toggle('active');
  e.preventDefault();
};

// Klik di luar elemen
const hm = document.querySelector('#hamburger-menu');
const sb = document.querySelector('#search-button');
const sc = document.querySelector('#shopping-cart-button');

document.addEventListener('click', function (e) {
  if (!hm.contains(e.target) && !navbarNav.contains(e.target)) {
    navbarNav.classList.remove('active');
  }

  if (!sb.contains(e.target) && !searchForm.contains(e.target)) {
    searchForm.classList.remove('active');
  }

  if (!sc.contains(e.target) && !shoppingCart.contains(e.target)) {
    shoppingCart.classList.remove('active');
  }
});

// Modal Box
const itemDetailModal = document.querySelector('#item-detail-modal');
const itemDetailButtons = document.querySelectorAll('.item-detail-button');

itemDetailButtons.forEach((btn) => {
  btn.onclick = (e) => {
    itemDetailModal.style.display = 'flex';
    e.preventDefault();
  };
});

// klik tombol close modal
document.querySelector('.modal .close-icon').onclick = (e) => {
  itemDetailModal.style.display = 'none';
  e.preventDefault();
};

// klik di luar modal
window.onclick = (e) => {
  if (e.target === itemDetailModal) {
    itemDetailModal.style.display = 'none';
  }
};

// Fungsi untuk mengambil data cafe dan menampilkan modal saat diklik
async function fetchCafes() {
  try {
    const response = await fetch(`${baseUrl}/api/cafes`);
    const cafes = await response.json();

    const cafeList = document.getElementById("cafe-list");
    cafeList.innerHTML = ""; // Kosongkan kontainer

    // Render data cafe ke dalam HTML
    cafes.forEach((cafe) => {
      const cafeCard = `
        <div class="cafe-card" data-id="${cafe.id}">
          <div class="cafe-icons">
            <a href="#" onclick="addToFavorites(${cafe.id})">
              <i data-feather="heart"></i></a>
            <a href="#" class="item-detail-button" data-cafe-id="${cafe.id}">
              <i data-feather="eye"></i>
            </a>
          </div>
          <div class="cafe-image">
            <img src="${cafe.image}" alt="${cafe.name}">
          </div>
          <div class="cafe-content">
            <h3>${cafe.name}</h3>
            <div class="cafe-stars">
              ${Array(Math.round(cafe.rating))
                .fill('<i data-feather="star" class="star-full"></i>')
                .join("")}
            </div>
          </div>
        </div>
      `;
      cafeList.innerHTML += cafeCard;
    });

    feather.replace();

    // Fungsi untuk menambahkan kafe ke favorit
function addToFavorites(cafeId) {
  const heartIcon = document.querySelector(`.cafe-card[data-id="${cafeId}"] i[data-feather="heart"]`);

  fetch(`${baseUrl}/api/favorites`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ cafeId }),
  })
    .then((response) => {
      if (!response.ok) throw new Error('Gagal menambahkan ke favorit');
      heartIcon.classList.add('favorited'); // Tambahkan class "favorited" ke ikon heart
      alert('Cafe berhasil ditambahkan ke favorit!');
    })
    .catch((error) => {
      console.error('Error adding favorite:', error);
      alert('Terjadi kesalahan saat menambahkan ke favorit.');
    });
}

    // Menangani klik pada ikon mata untuk menampilkan modal
    const detailButtons = document.querySelectorAll('.item-detail-button');
    detailButtons.forEach(button => {
      button.addEventListener('click', (event) => {
        event.preventDefault();
        
        const cafeId = event.target.closest('a').getAttribute('data-cafe-id');
        const selectedCafe = cafes.find(cafe => cafe.id === parseInt(cafeId));

        if (selectedCafe) {
          // Update modal dengan data cafe yang dipilih
          document.getElementById('modal-cafe-image').src = selectedCafe.image;
          document.getElementById('modal-cafe-name').textContent = selectedCafe.name;
          document.getElementById('modal-cafe-description').textContent = selectedCafe.description;

          // Mengisi rating cafe di modal
          const ratingStars = Array(Math.round(selectedCafe.rating))
            .fill('<i data-feather="star" class="star-full"></i>')
            .join("");
          document.getElementById('modal-cafe-rating').innerHTML = ratingStars;

          // Menampilkan modal
          document.getElementById('item-detail-modal').style.display = 'block';
        }
      });
    });

    // Menangani penutupan modal
    document.getElementById('close-modal').addEventListener('click', () => {
      document.getElementById('item-detail-modal').style.display = 'none';
    });
  } catch (error) {
    console.error("Gagal mengambil data cafe:", error);
  }
}

// Panggil fungsi saat halaman dimuat
document.addEventListener("DOMContentLoaded", fetchCafes);

document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");
  if (form) {
    form.addEventListener("submit", async function (e) {
      e.preventDefault();

      const name = document.querySelector('input[name="name"]').value;
      const email = document.querySelector('input[name="email"]').value;
      const phone = document.querySelector('input[name="phone"]').value;
      const message = document.querySelector('input[name="message"]').value;

      try {
        const response = await fetch(`${baseUrl}/api/send-message`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, phone, message }),
        });

        const result = await response.json();
        alert(result.message);
        form.reset();
      } catch (error) {
        console.error("Gagal mengirim pesan:", error);
        alert("Terjadi kesalahan saat mengirim pesan.");
      }
    });
  } else {
    console.error("Elemen form tidak ditemukan di DOM.");
  }
});

//MULAI DISINI
// Menambahkan event listener ke ikon "heart" setelah data cafe dimuat
// Menampilkan pop-up notifikasi
function showNotification(message, isError = false) {
  const notification = document.getElementById('notification');
  const messageElement = document.getElementById('notification-message');
  
  // Set pesan dan gaya (error atau sukses)
  messageElement.textContent = message;
  if (isError) {
    notification.classList.add('error');
  } else {
    notification.classList.remove('error');
  }
  
  // Menampilkan notifikasi dengan animasi
  notification.classList.add('show');

  // Sembunyikan notifikasi setelah 3 detik
  setTimeout(() => {
    notification.classList.remove('show');
  }, 3000);
}

// Fungsi untuk mengambil data cafe dan menampilkan modal saat diklik
async function fetchCafes() {
  try {
    const response = await fetch(`${baseUrl}/api/cafes`);
    const cafes = await response.json();

    const cafeList = document.getElementById("cafe-list");
    cafeList.innerHTML = ""; // Kosongkan kontainer

    // Render data cafe ke dalam HTML
    cafes.forEach((cafe) => {
      const cafeCard = `
        <div class="cafe-card" data-id="${cafe.id}">
          <div class="cafe-icons">
            <a href="#"><i data-feather="heart"></i></a>
            <a href="#" class="item-detail-button" data-cafe-id="${cafe.id}">
              <i data-feather="eye"></i>
            </a>
          </div>
          <div class="cafe-image">
            <img src="${cafe.image}" alt="${cafe.name}">
          </div>
          <div class="cafe-content">
            <h3>${cafe.name}</h3>
            <div class="cafe-stars">
              ${Array(Math.round(cafe.rating))
                .fill('<i data-feather="star" class="star-full"></i>')
                .join("")}
            </div>
          </div>
        </div>
      `;
      cafeList.innerHTML += cafeCard;
    });

    feather.replace();

    // Tambahkan event listener ke ikon heart
    addHeartListeners(cafes);

    // Menangani klik pada ikon mata untuk menampilkan modal
    const detailButtons = document.querySelectorAll('.item-detail-button');
    detailButtons.forEach(button => {
      button.addEventListener('click', (event) => {
        event.preventDefault();
        
        const cafeId = event.target.closest('a').getAttribute('data-cafe-id');
        const selectedCafe = cafes.find(cafe => cafe.id === parseInt(cafeId));

        if (selectedCafe) {
          // Update modal dengan data cafe yang dipilih
          document.getElementById('modal-cafe-image').src = selectedCafe.image;
          document.getElementById('modal-cafe-name').textContent = selectedCafe.name;
          document.getElementById('modal-cafe-description').textContent = selectedCafe.description;

          // Mengisi rating cafe di modal
          const ratingStars = Array(Math.round(selectedCafe.rating))
            .fill('<i data-feather="star" class="star-full"></i>')
            .join("");
          document.getElementById('modal-cafe-rating').innerHTML = ratingStars;

          // Menampilkan modal
          document.getElementById('item-detail-modal').style.display = 'block';
        }
      });
    });

    // Menangani penutupan modal
    document.getElementById('close-modal').addEventListener('click', () => {
      document.getElementById('item-detail-modal').style.display = 'none';
    });
  } catch (error) {
    console.error("Gagal mengambil data cafe:", error);
    showNotification("Gagal mengambil data cafe.", true); // Tampilkan error
  }
}

// Menambahkan event listener ke ikon "heart" setelah data cafe dimuat
function addHeartListeners(cafes) {
  const heartIcons = document.querySelectorAll('.cafe-icons a:first-child'); // Pilih ikon heart
  const shoppingCart = document.querySelector('.shopping-cart');

  heartIcons.forEach((heart, index) => {
    heart.addEventListener('click', (event) => {
      event.preventDefault();
      const selectedCafe = cafes[index];

      // Cek jika cafe sudah ada di keranjang
      const existingItems = Array.from(shoppingCart.querySelectorAll('.cart-item h3'));
      if (existingItems.some(item => item.textContent === selectedCafe.name)) {
        showNotification(`${selectedCafe.name} sudah ada di keranjang!`, true); // Tampilkan error
        return;
      }

      // Tambahkan cafe ke keranjang
      const cartItem = document.createElement('div');
      cartItem.classList.add('cart-item');
      cartItem.innerHTML = `
        <img src="${selectedCafe.image}" alt="${selectedCafe.name}">
        <div class="item-detail">
          <h3>${selectedCafe.name}</h3>
        </div>
        <i data-feather="trash-2" class="remove-item"></i>
      `;

      // Masukkan ke dalam keranjang
      shoppingCart.appendChild(cartItem);
      feather.replace(); // Perbarui Feather Icons

      // Tambahkan fungsi untuk menghapus item
      cartItem.querySelector('.remove-item').addEventListener('click', () => {
        cartItem.remove();
        showNotification(`${selectedCafe.name} telah dihapus dari keranjang.`, true); // Menampilkan notifikasi penghapusan
      });

      // Tampilkan notifikasi (sukses)
      showNotification(`${selectedCafe.name} telah ditambahkan ke keranjang!`);
    });
  });
}

// Panggil fungsi saat halaman dimuat
document.addEventListener("DOMContentLoaded", fetchCafes);

// Menangani pengiriman formulir (untuk pesan)
document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");
  if (form) {
    form.addEventListener("submit", async function (e) {
      e.preventDefault();

      const name = document.querySelector('input[name="name"]').value;
      const email = document.querySelector('input[name="email"]').value;
      const phone = document.querySelector('input[name="phone"]').value;
      const message = document.querySelector('input[name="message"]').value;

      try {
        const response = await fetch(`${baseUrl}/api/send-message`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, phone, message }),
        });

        const result = await response.json();
        showNotification(result.message); // Menampilkan pesan dari server
        form.reset();
      } catch (error) {
        console.error("Gagal mengirim pesan:", error);
        showNotification("Terjadi kesalahan saat mengirim pesan.", true); // Tampilkan error
      }
    });
  } else {
    console.error("Elemen form tidak ditemukan di DOM.");
  }
});


