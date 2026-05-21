/* ============================================
   Budget Car Finder - Frontend JavaScript
   Connects to Node.js + MongoDB Atlas backend API
   ============================================ */

// API base URL (same server when using npm start)
const API_BASE = '/api';

// localStorage keys
const STORAGE_TOKEN = 'bcf_token';
const STORAGE_USER = 'bcf_user';
const STORAGE_REMEMBER = 'bcf_remember';

// Cars loaded from database via API
let carsData = [];
let favoriteIds = [];

// Current filter state
let activeBudget = 'all';
let activeFuel = 'all';

/* ============================================
   API HELPERS
   ============================================ */

// Generic fetch wrapper with JSON handling
async function apiRequest(url, options) {
  const opts = options || {};
  const headers = Object.assign({ 'Content-Type': 'application/json' }, opts.headers || {});

  const token = getToken();
  if (token) {
    headers.Authorization = 'Bearer ' + token;
  }

  const response = await fetch(API_BASE + url, {
    method: opts.method || 'GET',
    headers: headers,
    body: opts.body ? JSON.stringify(opts.body) : undefined
  });

  const data = await response.json().catch(function () {
    return { success: false, message: 'Invalid server response.' };
  });

  if (!response.ok) {
    throw new Error(data.message || 'Request failed.');
  }

  return data;
}

function getToken() {
  return localStorage.getItem(STORAGE_TOKEN);
}

function getSession() {
  const data = localStorage.getItem(STORAGE_USER);
  return data ? JSON.parse(data) : null;
}

function setSession(token, user, rememberEmail) {
  localStorage.setItem(STORAGE_TOKEN, token);
  localStorage.setItem(STORAGE_USER, JSON.stringify(user));
  if (rememberEmail) {
    localStorage.setItem(STORAGE_REMEMBER, rememberEmail);
  } else {
    localStorage.removeItem(STORAGE_REMEMBER);
  }
}

function clearSession() {
  localStorage.removeItem(STORAGE_TOKEN);
  localStorage.removeItem(STORAGE_USER);
  favoriteIds = [];
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showAlert(elementId, message, type) {
  const el = document.getElementById(elementId);
  if (!el) return;
  el.textContent = message;
  el.className = 'alert show alert-' + type;
}

/* ============================================
   LOAD DATA FROM DATABASE (API)
   ============================================ */

async function loadCars() {
  const data = await apiRequest('/cars');
  carsData = data.cars || [];
  return carsData;
}

async function loadFavorites() {
  if (!getToken()) {
    favoriteIds = [];
    return [];
  }
  try {
    const data = await apiRequest('/favorites');
    favoriteIds = data.favoriteIds || [];
    return data.cars || [];
  } catch (err) {
    favoriteIds = [];
    return [];
  }
}

function isFavorite(carId) {
  return favoriteIds.includes(String(carId));
}

/* ============================================
   AUTHENTICATION (backend)
   ============================================ */

function initRegister() {
  const form = document.getElementById('registerForm');
  if (!form) return;

  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim().toLowerCase();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (name.length < 2) {
      showAlert('registerAlert', 'Please enter a valid name (at least 2 characters).', 'error');
      return;
    }
    if (!isValidEmail(email)) {
      showAlert('registerAlert', 'Please enter a valid email address.', 'error');
      return;
    }
    if (password.length < 6) {
      showAlert('registerAlert', 'Password must be at least 6 characters.', 'error');
      return;
    }
    if (password !== confirmPassword) {
      showAlert('registerAlert', 'Passwords do not match.', 'error');
      return;
    }

    try {
      await apiRequest('/auth/register', {
        method: 'POST',
        body: { name: name, email: email, password: password }
      });
      showAlert('registerAlert', 'Registration successful! Redirecting to login...', 'success');
      setTimeout(function () {
        window.location.href = 'login.html';
      }, 1500);
    } catch (err) {
      showAlert('registerAlert', err.message, 'error');
    }
  });
}

function initLogin() {
  const form = document.getElementById('loginForm');
  if (!form) return;

  const remembered = localStorage.getItem(STORAGE_REMEMBER);
  if (remembered) {
    const emailInput = document.getElementById('email');
    const rememberCheck = document.getElementById('remember');
    if (emailInput) emailInput.value = remembered;
    if (rememberCheck) rememberCheck.checked = true;
  }

  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    const email = document.getElementById('email').value.trim().toLowerCase();
    const password = document.getElementById('password').value;
    const remember = document.getElementById('remember').checked;

    if (!isValidEmail(email)) {
      showAlert('loginAlert', 'Please enter a valid email address.', 'error');
      return;
    }

    try {
      const data = await apiRequest('/auth/login', {
        method: 'POST',
        body: { email: email, password: password }
      });

      setSession(data.token, data.user, remember ? email : null);
      showAlert('loginAlert', 'Login successful! Redirecting...', 'success');
      setTimeout(function () {
        window.location.href = 'index.html';
      }, 1000);
    } catch (err) {
      showAlert('loginAlert', err.message, 'error');
    }
  });

  const forgotLink = document.getElementById('forgotPassword');
  if (forgotLink) {
    forgotLink.addEventListener('click', function (e) {
      e.preventDefault();
      alert('Contact support@budgetcarfinder.com to reset your password.');
    });
  }
}

function updateAuthUI() {
  const session = getSession();
  const navAuth = document.getElementById('navAuth');
  const userBar = document.getElementById('userBar');
  const welcomeText = document.getElementById('welcomeText');

  if (session && userBar && welcomeText) {
    if (navAuth) navAuth.style.display = 'none';
    userBar.classList.add('visible');
    welcomeText.textContent = 'Welcome, ' + session.name;
  } else if (navAuth && userBar) {
    navAuth.style.display = 'flex';
    userBar.classList.remove('visible');
  }
}

function initLogout() {
  const btn = document.getElementById('logoutBtn');
  if (btn) {
    btn.addEventListener('click', function () {
      clearSession();
      window.location.href = 'login.html';
    });
  }
}

/* ============================================
   CARS UI & FILTERING
   ============================================ */

function createCarCard(car) {
  const favClass = isFavorite(car.id) ? 'active' : '';
  const favText = isFavorite(car.id) ? '♥ Saved' : '♡ Add to Favorites';

  return (
    '<article class="car-card" data-id="' + car.id + '" data-fuel="' + car.fuel + '">' +
      '<div class="car-image">' +
        '<img src="' + car.image + '" alt="' + car.name + '" loading="lazy">' +
      '</div>' +
      '<div class="car-body">' +
        '<h3 class="car-name">' + car.name + '</h3>' +
        '<p class="car-price">' + car.priceDisplay + '</p>' +
        '<div class="car-meta">' +
          '<span>⛽ ' + car.fuel + '</span>' +
          '<span>📊 ' + car.mileage + '</span>' +
        '</div>' +
        '<p class="car-desc">' + car.description + '</p>' +
        '<div class="car-actions">' +
          '<button type="button" class="btn btn-outline btn-details" data-id="' + car.id + '">View Details</button>' +
          '<button type="button" class="btn btn-fav ' + favClass + '" data-id="' + car.id + '">' + favText + '</button>' +
        '</div>' +
      '</div>' +
    '</article>'
  );
}

function renderCars(cars) {
  const grid = document.getElementById('carsGrid');
  if (!grid) return;

  if (cars.length === 0) {
    grid.innerHTML = '<p class="no-results">No cars match your filters. Try adjusting budget or fuel type.</p>';
    return;
  }

  grid.innerHTML = cars.map(createCarCard).join('');
  attachCarEventListeners();
}

function matchesBudget(car) {
  if (activeBudget === 'all') return true;
  const p = car.price;
  switch (activeBudget) {
    case 'under-5': return p < 5;
    case '5-10': return p >= 5 && p < 10;
    case '10-20': return p >= 10 && p < 20;
    case '20-50': return p >= 20 && p < 50;
    case 'above-50': return p >= 50;
    default: return true;
  }
}

function filterCars() {
  return carsData.filter(function (car) {
    return matchesBudget(car) && (activeFuel === 'all' || car.fuel === activeFuel);
  });
}

function applyFilters() {
  renderCars(filterCars());
}

function initFilters() {
  const budgetChips = document.querySelectorAll('[data-filter="budget"]');
  const fuelChips = document.querySelectorAll('[data-filter="fuel"]');
  const resetBtn = document.getElementById('resetFilters');

  budgetChips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      budgetChips.forEach(function (c) { c.classList.remove('active'); });
      chip.classList.add('active');
      activeBudget = chip.dataset.value;
      applyFilters();
    });
  });

  fuelChips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      fuelChips.forEach(function (c) { c.classList.remove('active'); });
      chip.classList.add('active');
      activeFuel = chip.dataset.value;
      applyFilters();
    });
  });

  if (resetBtn) {
    resetBtn.addEventListener('click', function () {
      activeBudget = 'all';
      activeFuel = 'all';
      budgetChips.forEach(function (c) {
        c.classList.toggle('active', c.dataset.value === 'all');
      });
      fuelChips.forEach(function (c) {
        c.classList.toggle('active', c.dataset.value === 'all');
      });
      applyFilters();
    });
  }
}

async function toggleFavorite(carId) {
  carId = String(carId);

  if (!getToken()) {
    alert('Please log in to save favorites.');
    window.location.href = 'login.html';
    return;
  }

  const isFav = isFavorite(carId);

  try {
    if (isFav) {
      await apiRequest('/favorites/' + carId, { method: 'DELETE' });
      favoriteIds = favoriteIds.filter(function (id) { return id !== carId; });
    } else {
      await apiRequest('/favorites/' + carId, { method: 'POST' });
      favoriteIds.push(carId);
    }
  } catch (err) {
    alert(err.message);
  }
}

function attachCarEventListeners() {
  document.querySelectorAll('.btn-details').forEach(function (btn) {
    btn.addEventListener('click', function () {
      const id = btn.dataset.id;
      const car = carsData.find(function (c) { return String(c.id) === id; });
      if (car) showCarModal(car);
    });
  });

  document.querySelectorAll('.btn-fav').forEach(function (btn) {
    btn.addEventListener('click', async function () {
      const id = parseInt(btn.dataset.id, 10);
      await toggleFavorite(id);
      const saved = isFavorite(id);
      btn.classList.toggle('active', saved);
      btn.textContent = saved ? '♥ Saved' : '♡ Add to Favorites';
      renderFavorites();
    });
  });
}

function showCarModal(car) {
  const overlay = document.getElementById('carModal');
  if (!overlay) return;

  document.getElementById('modalTitle').textContent = car.name;
  document.getElementById('modalImage').src = car.image;
  document.getElementById('modalImage').alt = car.name;
  document.getElementById('modalPrice').textContent = car.priceDisplay;
  document.getElementById('modalFuel').textContent = car.fuel;
  document.getElementById('modalMileage').textContent = car.mileage;
  document.getElementById('modalDesc').textContent = car.description;
  overlay.classList.add('show');
}

function closeCarModal() {
  const overlay = document.getElementById('carModal');
  if (overlay) overlay.classList.remove('show');
}

function renderPopularCars() {
  const grid = document.getElementById('popularGrid');
  if (!grid) return;

  const popular = carsData.filter(function (c) { return c.popular; }).slice(0, 8);
  const icons = ['🚗', '🚙', '🏎️', '🛻', '🚐', '🚘', '🚕', '🏁'];

  grid.innerHTML = popular.map(function (car, i) {
    return (
      '<div class="popular-card" data-car-id="' + car.id + '">' +
        '<div class="icon">' + icons[i % icons.length] + '</div>' +
        '<h4>' + car.name + '</h4>' +
        '<p style="color:var(--accent);font-weight:600;margin-top:0.5rem;">' + car.priceDisplay + '</p>' +
      '</div>'
    );
  }).join('');

  grid.querySelectorAll('.popular-card').forEach(function (card) {
    card.addEventListener('click', function () {
      const id = card.dataset.carId;
      const car = carsData.find(function (c) { return String(c.id) === id; });
      if (car) {
        document.getElementById('find-cars').scrollIntoView({ behavior: 'smooth' });
        showCarModal(car);
      }
    });
  });
}

function renderFavorites() {
  const grid = document.getElementById('favoritesGrid');
  const emptyMsg = document.getElementById('favoritesEmpty');
  if (!grid) return;

  if (!getToken()) {
    grid.innerHTML = '';
    if (emptyMsg) {
      emptyMsg.textContent = 'Please log in to view and save your favorite cars.';
      emptyMsg.style.display = 'block';
    }
    return;
  }

  const favCars = carsData.filter(function (c) { return favoriteIds.includes(String(c.id)); });

  if (favCars.length === 0) {
    grid.innerHTML = '';
    if (emptyMsg) {
      emptyMsg.textContent = 'No favorites yet. Browse cars and click "Add to Favorites".';
      emptyMsg.style.display = 'block';
    }
    return;
  }

  if (emptyMsg) emptyMsg.style.display = 'none';
  grid.innerHTML = favCars.map(createCarCard).join('');
  attachCarEventListeners();
}

function initMobileNav() {
  const toggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');

  if (toggle && navLinks) {
    toggle.addEventListener('click', function () {
      navLinks.classList.toggle('open');
    });
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('open');
      });
    });
  }
}

function initHeaderScroll() {
  const header = document.querySelector('.header');
  if (!header) return;
  window.addEventListener('scroll', function () {
    header.classList.toggle('scrolled', window.scrollY > 50);
  });
}

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    const name = document.getElementById('contactName').value.trim();
    const email = document.getElementById('contactEmail').value.trim();
    const subject = document.getElementById('contactSubject').value.trim();
    const message = document.getElementById('contactMessage').value.trim();

    try {
      const data = await apiRequest('/contact', {
        method: 'POST',
        body: { name: name, email: email, subject: subject, message: message }
      });
      alert(data.message);
      form.reset();
    } catch (err) {
      alert(err.message || 'Could not send message. Is the server running?');
    }
  });
}

function initModal() {
  const overlay = document.getElementById('carModal');
  const closeBtn = document.getElementById('modalClose');
  if (closeBtn) closeBtn.addEventListener('click', closeCarModal);
  if (overlay) {
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) closeCarModal();
    });
  }
}

// Show error if backend is not reachable
function showLoadError() {
  const grid = document.getElementById('carsGrid');
  if (grid) {
    grid.innerHTML =
      '<p class="no-results">Could not connect to server. Run <strong>npm install</strong> then <strong>npm start</strong> and open <strong>http://localhost:3000</strong></p>';
  }
}

/* ============================================
   PAGE INITIALIZATION
   ============================================ */

document.addEventListener('DOMContentLoaded', async function () {
  const page = document.body ? document.body.dataset.page : '';

  if (page === 'register') {
    initRegister();
    return;
  }

  if (page === 'login') {
    initLogin();
    return;
  }

  if (page === 'home') {
    updateAuthUI();
    initLogout();
    initFilters();
    initMobileNav();
    initHeaderScroll();
    initSmoothScroll();
    initContactForm();
    initModal();

    try {
      await loadCars();
      await loadFavorites();
      applyFilters();
      renderPopularCars();
      renderFavorites();
    } catch (err) {
      console.error(err);
      showLoadError();
    }
  }
});
