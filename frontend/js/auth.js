// ========================
// Authentication Utility
// ========================

const API_URL = "http://localhost:5000/api";

// Get token from localStorage
function getToken() {
  return localStorage.getItem("token");
}

// Get user from localStorage
function getUser() {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
}

// Set user and token
function setAuth(token, user) {
  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user));
}

// Clear auth
function clearAuth() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
}

// Check if user is logged in
function isLoggedIn() {
  return !!getToken();
}

// Check if user is admin
function isAdmin() {
  const user = getUser();
  return user && user.role === "admin";
}

// Register user
async function register(name, email, password) {
  try {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, email, password, role: "user" })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Registration failed");
    }

    setAuth(data.token, data.user);
    return data;
  } catch (err) {
    console.error("❌ Registration error:", err.message);
    throw err;
  }
}

// Login user
async function login(email, password) {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Login failed");
    }

    setAuth(data.token, data.user);
    return data;
  } catch (err) {
    console.error("❌ Login error:", err.message);
    throw err;
  }
}

// Logout user
function logout() {
  clearAuth();
  window.location.href = "/index.html";
}

// Update navbar based on auth status
function updateNavbar() {
  const navbar = document.querySelector(".navbar-nav");
  if (!navbar) return;

  if (isLoggedIn()) {
    const user = getUser();
    const navItems = Array.from(navbar.querySelectorAll("li"));
    
    // Remove existing auth links
    navItems.forEach(item => {
      if (item.querySelector('a[href*="login"]') || item.querySelector('a[href*="register"]')) {
        item.remove();
      }
    });

    // Add user menu items
    if (!navbar.querySelector(".user-menu")) {
      const userMenu = document.createElement("li");
      userMenu.className = "nav-item user-menu";
      userMenu.innerHTML = `
        <div class="dropdown">
          <button class="btn btn-outline-light dropdown-toggle" type="button" data-bs-toggle="dropdown">
            👤 ${user.name}
          </button>
          <ul class="dropdown-menu">
            ${isAdmin() ? '<li><a class="dropdown-item" href="admin.html">📊 Admin Dashboard</a></li>' : ''}
            <li><a class="dropdown-item" href="cart.html">🛒 Cart</a></li>
            <li><a class="dropdown-item" href="orders.html">📋 My Orders</a></li>
            <li><a class="dropdown-item" href="javascript:logout();">🚪 Logout</a></li>
          </ul>
        </div>
      `;
      navbar.appendChild(userMenu);
    }
  } else {
    // Remove existing auth links
    const authItems = navbar.querySelectorAll(".user-menu");
    authItems.forEach(item => item.remove());

    // Add login/register links
    if (!navbar.querySelector(".login-menu")) {
      const authMenu = document.createElement("li");
      authMenu.className = "nav-item login-menu";
      authMenu.innerHTML = `
  <a class="nav-link" href="login.html">🔐 Login</a>
`;
navbar.appendChild(authMenu);

// ADD REGISTER BUTTON
if (!navbar.querySelector(".register-menu")) {
  const registerMenu = document.createElement("li");
  registerMenu.className = "nav-item register-menu";
  registerMenu.innerHTML = `
    <a class="nav-link" href="register.html">📝 Register</a>
  `;
  navbar.appendChild(registerMenu);
}

// ADD ADMIN LOGIN BUTTON
if (!navbar.querySelector(".admin-menu")) {
  const adminMenu = document.createElement("li");
  adminMenu.className = "nav-item admin-menu";
  adminMenu.innerHTML = `
      <a class="nav-link text-warning" href="login.html">👨‍💼 Admin</a>
    `;
    navbar.appendChild(adminMenu);
  }
      navbar.appendChild(authMenu);
    }
  }
}

// Initialize auth on page load
document.addEventListener("DOMContentLoaded", updateNavbar);
