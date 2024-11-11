// DOM Elements
const loginForm = document.getElementById("login-form");
const emailInput = document.getElementById("login-email");
const passwordInput = document.getElementById("login-password");
const loginError = document.getElementById("login-error");

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
  const token = localStorage.getItem("token");
  if (token) {
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
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Error logging in");
    }

    // Store token and user data
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    // Redirect to profile page
    window.location.href = "../pages/profile.html";
  } catch (error) {
    loginError.textContent = error.message;
    passwordInput.value = "";
  }
}

// Initialize the page when DOM is loaded
document.addEventListener("DOMContentLoaded", initializePage);
