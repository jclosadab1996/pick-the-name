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
  passwordInput.addEventListener("input", validatePassword);
  confirmPasswordInput.addEventListener("input", validatePassword);
}

// Validate password
function validatePassword() {
  const password = passwordInput.value;
  const confirmPassword = confirmPasswordInput.value;

  if (password !== confirmPassword) {
    confirmPasswordInput.setCustomValidity("Las contraseñas no coinciden");
  } else {
    confirmPasswordInput.setCustomValidity("");
  }
}

// Handle registration form submission
async function handleRegister(event) {
  event.preventDefault();

  if (passwordInput.value !== confirmPasswordInput.value) {
    return;
  }

  const userData = {
    name: nameInput.value,
    email: emailInput.value,
    password: passwordInput.value,
  };

  try {
    // Here you would typically make an API call to register the user
    console.log("Attempting registration with:", userData);

    // Simulate API call
    await simulateApiCall();

    // On successful registration
    handleRegistrationSuccess();
  } catch (error) {
    handleRegistrationError(error);
  }
}

// Handle successful registration
function handleRegistrationSuccess() {
  // Here you would typically:
  // 1. Show a success message
  // 2. Redirect to login page or automatically log in the user
  console.log("Registration successful");

  // Clear the form
  registerForm.reset();

  // Redirect to login page
  window.location.href = "/login.html";
}

// Handle registration error
function handleRegistrationError(error) {
  console.error("Registration failed:", error);
  // Here you would typically show an error message to the user
}

// Simulate API call (remove in production)
function simulateApiCall() {
  return new Promise((resolve) => {
    setTimeout(resolve, 1000);
  });
}

// Password validation
function isPasswordValid(password) {
  // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
  const minLength = password.length >= 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);

  return minLength && hasUpperCase && hasLowerCase && hasNumber;
}

// Initialize the page when DOM is loaded
document.addEventListener("DOMContentLoaded", initializePage);
