// DOM Elements
const loginForm = document.getElementById("login-form");
const emailInput = document.getElementById("login-email");
const passwordInput = document.getElementById("login-password");

// Initialize page
function initializePage() {
  setupEventListeners();
}

// Setup event listeners
function setupEventListeners() {
  loginForm.addEventListener("submit", handleLogin);
}

// Handle login form submission
async function handleLogin(event) {
  event.preventDefault();

  const email = emailInput.value;
  const password = passwordInput.value;

  try {
    // Here you would typically make an API call to authenticate
    const loginData = {
      email,
      password,
    };

    console.log("Attempting login with:", loginData);

    // Simulate API call
    await simulateApiCall();

    // On successful login
    handleLoginSuccess();
  } catch (error) {
    handleLoginError(error);
  }
}

// Handle successful login
function handleLoginSuccess() {
  // Here you would typically:
  // 1. Store the authentication token
  // 2. Update the UI
  // 3. Redirect to the dashboard or home page
  console.log("Login successful");

  // Clear the form
  loginForm.reset();

  // Redirect to home page
  window.location.href = "/";
}

// Handle login error
function handleLoginError(error) {
  console.error("Login failed:", error);
  // Here you would typically show an error message to the user
}

// Simulate API call (remove in production)
function simulateApiCall() {
  return new Promise((resolve) => {
    setTimeout(resolve, 1000);
  });
}

// Initialize the page when DOM is loaded
document.addEventListener("DOMContentLoaded", initializePage);
