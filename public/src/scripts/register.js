// DOM Elements
const registerForm = document.getElementById("register-form");
const nameInput = document.getElementById("register-name");
const emailInput = document.getElementById("register-email");
const passwordInput = document.getElementById("register-password");
const confirmPasswordInput = document.getElementById(
  "register-confirm-password"
);

// Initialize page
function initializePage() {
  setupEventListeners();
}

// Setup event listeners
function setupEventListeners() {
  registerForm.addEventListener("submit", handleRegister);
}

// Validate password
function validatePassword() {
  const password = passwordInput.value;
  const confirmPassword = confirmPasswordInput.value;
  return password === confirmPassword;
}

// Handle registration form submission
async function handleRegister(event) {
  event.preventDefault();

  if (!validatePassword()) {
    alert("Las contraseñas no coinciden");
    return;
  }

  const userData = {
    name: nameInput.value,
    email: emailInput.value,
    password: passwordInput.value,
  };

  try {
    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Error registering user");
    }

    // Store token and user data
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    // Redirect to profile page
    window.location.href = "../pages/profile.html";
  } catch (error) {
    alert(error.message);
  }
}

// Initialize the page when DOM is loaded
document.addEventListener("DOMContentLoaded", initializePage);
