/* ============================================
   Budget Car Finder - Main JavaScript
   Handles auth, filtering, favorites & UI
   ============================================ */

// --- Storage keys for localStorage ---
const STORAGE_USERS = 'bcf_users';
const STORAGE_SESSION = 'bcf_session';
const STORAGE_FAVORITES = 'bcf_favorites';
const STORAGE_REMEMBER = 'bcf_remember';

// --- Car database: 20+ realistic Indian cars ---
const carsData = [
  {
    id: 1,
    name: 'Maruti Swift',
    price: 6.49,
    priceDisplay: '₹6.49 Lakh onwards',
    fuel: 'Petrol',
    mileage: '24.8 km/l',
    budget: '5-10',
    description: 'India\'s favorite hatchback with sporty design, great mileage and reliable Maruti service network.',
    image: 'https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=600&q=80',
    popular: true
  },
  {
    id: 2,
    name: 'Maruti Baleno',
    price: 6.66,
    priceDisplay: '₹6.66 Lakh onwards',
    fuel: 'Petrol',
    mileage: '22.9 km/l',
    budget: '5-10',
    description: 'Premium hatchback with spacious cabin, smart hybrid option and feature-rich infotainment.',
    image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=600&q=80',
    popular: true
  },
  {
    id: 3,
    name: 'Maruti Fronx',
    price: 7.47,
    priceDisplay: '₹7.47 Lakh onwards',
    fuel: 'Petrol',
    mileage: '21.5 km/l',
    budget: '5-10',
    description: 'Crossover SUV with coupe styling, turbo engine option and 360-degree camera on top variants.',
    image: 'https://images.unsplash.com/photo-1494976388531-d1058498cdd8?w=600&q=80',
    popular: true
  },
  {
    id: 4,
    name: 'Hyundai i20',
    price: 7.04,
    priceDisplay: '₹7.04 Lakh onwards',
    fuel: 'Petrol',
    mileage: '20.4 km/l',
    budget: '5-10',
    description: 'Stylish premium hatchback with connected car tech, sunroof and refined cabin quality.',
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=600&q=80',
    popular: true
  },
  {
    id: 5,
    name: 'Hyundai Creta',
    price: 11.00,
    priceDisplay: '₹11.00 Lakh onwards',
    fuel: 'Petrol',
    mileage: '17.4 km/l',
    budget: '10-20',
    description: 'Best-selling mid-size SUV with panoramic sunroof, ADAS and powerful turbo petrol engine.',
    image: 'https://images.unsplash.com/photo-1519641471654-76ce85d17840?w=600&q=80',
    popular: true
  },
  {
    id: 6,
    name: 'Hyundai Verna',
    price: 10.89,
    priceDisplay: '₹10.89 Lakh onwards',
    fuel: 'Petrol',
    mileage: '18.6 km/l',
    budget: '10-20',
    description: 'Sedan with striking design, ventilated seats, Bose audio and smooth turbo performance.',
    image: 'https://images.unsplash.com/photo-1583121274602-3b283f773f71?w=600&q=80',
    popular: false
  },
  {
    id: 7,
    name: 'Honda City',
    price: 12.62,
    priceDisplay: '₹12.62 Lakh onwards',
    fuel: 'Petrol',
    mileage: '17.8 km/l',
    budget: '10-20',
    description: 'Legendary sedan known for rear seat comfort, refined i-VTEC engine and strong resale value.',
    image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=600&q=80',
    popular: true
  },
  {
    id: 8,
    name: 'Tata Punch',
    price: 6.13,
    priceDisplay: '₹6.13 Lakh onwards',
    fuel: 'Petrol',
    mileage: '20.1 km/l',
    budget: '5-10',
    description: 'Micro SUV with 5-star safety rating, high ground clearance and youthful street presence.',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&q=80',
    popular: true
  },
  {
    id: 9,
    name: 'Tata Nexon',
    price: 8.15,
    priceDisplay: '₹8.15 Lakh onwards',
    fuel: 'Petrol',
    mileage: '17.4 km/l',
    budget: '5-10',
    description: 'Compact SUV with 5-star Global NCAP rating, turbo engines and premium Harman sound system.',
    image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=600&q=80',
    popular: true
  },
  {
    id: 10,
    name: 'Tata Nexon EV',
    price: 14.99,
    priceDisplay: '₹14.99 Lakh onwards',
    fuel: 'Electric',
    mileage: '465 km range',
    budget: '10-20',
    description: 'India\'s popular electric SUV with fast charging, connected features and zero emissions driving.',
    image: 'https://images.unsplash.com/photo-1593941707879-2c55c07f2ed1?w=600&q=80',
    popular: true
  },
  {
    id: 11,
    name: 'Mahindra Thar',
    price: 11.25,
    priceDisplay: '₹11.25 Lakh onwards',
    fuel: 'Diesel',
    mileage: '15.2 km/l',
    budget: '10-20',
    description: 'Iconic off-roader with removable hard top, 4x4 capability and adventure-ready character.',
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1eb58e?w=600&q=80',
    popular: true
  },
  {
    id: 12,
    name: 'Mahindra Scorpio N',
    price: 13.60,
    priceDisplay: '₹13.60 Lakh onwards',
    fuel: 'Diesel',
    mileage: '14.4 km/l',
    budget: '10-20',
    description: 'Bold SUV with Adrenox tech, twin screens, powerful diesel and commanding road presence.',
    image: 'https://images.unsplash.com/photo-1511919888226-fd3cad34687c?w=600&q=80',
    popular: false
  },
  {
    id: 13,
    name: 'Mahindra XUV700',
    price: 14.49,
    priceDisplay: '₹14.49 Lakh onwards',
    fuel: 'Diesel',
    mileage: '17.0 km/l',
    budget: '10-20',
    description: 'Feature-packed SUV with ADAS, Sony 3D audio, twin screens and powerful petrol/diesel options.',
    image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=600&q=80',
    popular: true
  },
  {
    id: 14,
    name: 'Toyota Fortuner',
    price: 33.43,
    priceDisplay: '₹33.43 Lakh onwards',
    fuel: 'Diesel',
    mileage: '14.2 km/l',
    budget: '20-50',
    description: 'Full-size SUV legend with bulletproof reliability, 4x4 and premium captain seats.',
    image: 'https://images.unsplash.com/photo-1517940316312-395675bb6b8b?w=600&q=80',
    popular: true
  },
  {
    id: 15,
    name: 'Toyota Innova Hycross',
    price: 25.30,
    priceDisplay: '₹25.30 Lakh onwards',
    fuel: 'Hybrid',
    mileage: '21.1 km/l',
    budget: '20-50',
    description: 'Premium MPV with strong hybrid powertrain, lounge seats and Toyota quality assurance.',
    image: 'https://images.unsplash.com/photo-1549399542-7e3f64b19358?w=600&q=80',
    popular: true
  },
  {
    id: 16,
    name: 'Kia Seltos',
    price: 10.90,
    priceDisplay: '₹10.90 Lakh onwards',
    fuel: 'Petrol',
    mileage: '18.0 km/l',
    budget: '10-20',
    description: 'Feature-loaded SUV with ventilated seats, Bose audio, turbo petrol and diesel choices.',
    image: 'https://images.unsplash.com/photo-1603386329225-868f9b1ee6c9?w=600&q=80',
    popular: true
  },
  {
    id: 17,
    name: 'MG Hector',
    price: 14.99,
    priceDisplay: '₹14.99 Lakh onwards',
    fuel: 'Petrol',
    mileage: '15.0 km/l',
    budget: '10-20',
    description: 'Connected SUV with large panoramic sunroof, internet car features and spacious 6/7 seater layout.',
    image: 'https://images.unsplash.com/photo-1619767886555-efef538153a3?w=600&q=80',
    popular: false
  },
  {
    id: 18,
    name: 'BMW X1',
    price: 49.50,
    priceDisplay: '₹49.50 Lakh onwards',
    fuel: 'Petrol',
    mileage: '18.2 km/l',
    budget: 'above-50',
    description: 'Luxury compact SUV with BMW driving dynamics, premium interiors and latest iDrive system.',
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=600&q=80',
    popular: false
  },
  {
    id: 19,
    name: 'Audi Q3',
    price: 44.99,
    priceDisplay: '₹44.99 Lakh onwards',
    fuel: 'Petrol',
    mileage: '16.9 km/l',
    budget: '20-50',
    description: 'Premium compact SUV with quattro AWD option, virtual cockpit and refined German engineering.',
    image: 'https://images.unsplash.com/photo-1606150834435-9a3e9e5c5f1e?w=600&q=80',
    popular: false
  },
  {
    id: 20,
    name: 'Mercedes-Benz GLA',
    price: 45.50,
    priceDisplay: '₹45.50 Lakh onwards',
    fuel: 'Petrol',
    mileage: '17.5 km/l',
    budget: '20-50',
    description: 'Entry-level Mercedes SUV with MBUX hyperscreen, ambient lighting and signature luxury feel.',
    image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=600&q=80',
    popular: false
  }
];

// Current filter state
let activeBudget = 'all';
let activeFuel = 'all';

/* ============================================
   AUTHENTICATION FUNCTIONS
   ============================================ */

// Get all registered users from localStorage
function getUsers() {
  const data = localStorage.getItem(STORAGE_USERS);
  return data ? JSON.parse(data) : [];
}

// Save users array to localStorage
function saveUsers(users) {
  localStorage.setItem(STORAGE_USERS, JSON.stringify(users));
}

// Get current logged-in session
function getSession() {
  const data = localStorage.getItem(STORAGE_SESSION);
  return data ? JSON.parse(data) : null;
}

// Set session after successful login
function setSession(user, remember) {
  const session = { name: user.name, email: user.email };
  localStorage.setItem(STORAGE_SESSION, JSON.stringify(session));
  if (remember) {
    localStorage.setItem(STORAGE_REMEMBER, user.email);
  } else {
    localStorage.removeItem(STORAGE_REMEMBER);
  }
}

// Clear session on logout
function clearSession() {
  localStorage.removeItem(STORAGE_SESSION);
}

// Validate email format
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Show alert message on auth pages
function showAlert(elementId, message, type) {
  const el = document.getElementById(elementId);
  if (!el) return;
  el.textContent = message;
  el.className = 'alert show alert-' + type;
}

// Handle registration form
function initRegister() {
  const form = document.getElementById('registerForm');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim().toLowerCase();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    // Validation
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

    const users = getUsers();
    if (users.find(function (u) { return u.email === email; })) {
      showAlert('registerAlert', 'An account with this email already exists.', 'error');
      return;
    }

    // Save new user
    users.push({ name: name, email: email, password: password });
    saveUsers(users);

    showAlert('registerAlert', 'Registration successful! Redirecting to login...', 'success');
    setTimeout(function () {
      window.location.href = 'login.html';
    }, 1500);
  });
}

// Handle login form
function initLogin() {
  const form = document.getElementById('loginForm');
  if (!form) return;

  // Pre-fill email if "remember me" was checked before
  const remembered = localStorage.getItem(STORAGE_REMEMBER);
  if (remembered) {
    const emailInput = document.getElementById('email');
    const rememberCheck = document.getElementById('remember');
    if (emailInput) emailInput.value = remembered;
    if (rememberCheck) rememberCheck.checked = true;
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const email = document.getElementById('email').value.trim().toLowerCase();
    const password = document.getElementById('password').value;
    const remember = document.getElementById('remember').checked;

    if (!isValidEmail(email)) {
      showAlert('loginAlert', 'Please enter a valid email address.', 'error');
      return;
    }

    const users = getUsers();
    const user = users.find(function (u) {
      return u.email === email && u.password === password;
    });

    if (!user) {
      showAlert('loginAlert', 'Invalid email or password. Please try again.', 'error');
      return;
    }

    setSession(user, remember);
    showAlert('loginAlert', 'Login successful! Redirecting...', 'success');
    setTimeout(function () {
      window.location.href = 'index.html';
    }, 1000);
  });

  // Forgot password - simple demo message
  const forgotLink = document.getElementById('forgotPassword');
  if (forgotLink) {
    forgotLink.addEventListener('click', function (e) {
      e.preventDefault();
      alert('Demo: Contact support@budgetcarfinder.com to reset your password.');
    });
  }
}

/* ============================================
   DASHBOARD / INDEX PAGE FUNCTIONS
   ============================================ */

// Update navigation based on login state
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

// Logout handler
function initLogout() {
  const btn = document.getElementById('logoutBtn');
  if (btn) {
    btn.addEventListener('click', function () {
      clearSession();
      window.location.href = 'login.html';
    });
  }
}

// Get favorites from localStorage
function getFavorites() {
  const data = localStorage.getItem(STORAGE_FAVORITES);
  return data ? JSON.parse(data) : [];
}

// Save favorites
function saveFavorites(favs) {
  localStorage.setItem(STORAGE_FAVORITES, JSON.stringify(favs));
}

// Toggle favorite for a car
function toggleFavorite(carId) {
  let favs = getFavorites();
  const index = favs.indexOf(carId);
  if (index > -1) {
    favs.splice(index, 1);
  } else {
    favs.push(carId);
  }
  saveFavorites(favs);
  return favs;
}

// Check if car is in favorites
function isFavorite(carId) {
  return getFavorites().includes(carId);
}

// Render a single car card HTML
function createCarCard(car) {
  const favClass = isFavorite(car.id) ? 'active' : '';
  const favText = isFavorite(car.id) ? '♥ Saved' : '♡ Add to Favorites';

  return (
    '<article class="car-card" data-id="' + car.id + '" data-budget="' + car.budget + '" data-fuel="' + car.fuel + '">' +
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

// Render all cars into the grid
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

// Check if car price falls in selected budget range
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
    const budgetMatch = matchesBudget(car);
    const fuelMatch = activeFuel === 'all' || car.fuel === activeFuel;
    return budgetMatch && fuelMatch;
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

function attachCarEventListeners() {
  document.querySelectorAll('.btn-details').forEach(function (btn) {
    btn.addEventListener('click', function () {
      const id = parseInt(btn.dataset.id, 10);
      const car = carsData.find(function (c) { return c.id === id; });
      if (car) showCarModal(car);
    });
  });

  document.querySelectorAll('.btn-fav').forEach(function (btn) {
    btn.addEventListener('click', function () {
      const id = parseInt(btn.dataset.id, 10);
      toggleFavorite(id);
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
      const id = parseInt(card.dataset.carId, 10);
      const car = carsData.find(function (c) { return c.id === id; });
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

  const favIds = getFavorites();
  const favCars = carsData.filter(function (c) { return favIds.includes(c.id); });

  if (favCars.length === 0) {
    grid.innerHTML = '';
    if (emptyMsg) emptyMsg.style.display = 'block';
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
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    alert('Thank you! Your message has been received. We will contact you soon.');
    form.reset();
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

document.addEventListener('DOMContentLoaded', function () {
  const page = document.body ? document.body.dataset.page : '';

  if (page === 'register') {
    initRegister();
  } else if (page === 'login') {
    initLogin();
  } else if (page === 'home') {
    updateAuthUI();
    initLogout();
    renderCars(carsData);
    renderPopularCars();
    renderFavorites();
    initFilters();
    initMobileNav();
    initHeaderScroll();
    initSmoothScroll();
    initContactForm();
    initModal();
  }
});