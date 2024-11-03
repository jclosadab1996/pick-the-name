// DOM Elements
const loginForm = document.getElementById("login-form");
const emailInput = document.getElementById("login-email");
const passwordInput = document.getElementById("login-password");
const loginError = document.getElementById("login-error");

// Demo user credentials
const DEMO_USER = {
  email: "demo@example.com",
  password: "Demo123",
  id: "demo123",
  name: "Usuario Demo",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=demo",
  savedNames: [],
  preferences: {
    theme: "light",
    notifications: true,
  },
  activities: [],
  blogPosts: [],
};

// Initialize page
function initializePage() {
  setupEventListeners();
  checkLoginStatus();
}

// Setup event listeners
function setupEventListeners() {
  loginForm.addEventListener("submit", handleLogin);
}

// Check if user is already logged in
function checkLoginStatus() {
  const user = localStorage.getItem("user");
  if (user) {
    window.location.href = "../pages/profile.html";
  }
}

// Handle login form submission
async function handleLogin(event) {
  event.preventDefault();
  loginError.textContent = "";

  const email = emailInput.value;
  const password = passwordInput.value;

  try {
    // Check if credentials match demo user
    if (email === DEMO_USER.email && password === DEMO_USER.password) {
      // Store user data in localStorage
      localStorage.setItem(
        "user",
        JSON.stringify({
          ...DEMO_USER,
          lastLogin: new Date().toISOString(),
        })
      );

      // Redirect to profile page
      window.location.href = "../pages/profile.html";
    } else {
      throw new Error("Credenciales inválidas");
    }
  } catch (error) {
    loginError.textContent = error.message;
    passwordInput.value = "";
  }
}

// Initialize the page when DOM is loaded
document.addEventListener("DOMContentLoaded", initializePage);
