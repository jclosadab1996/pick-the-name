// Data
const topNames = [
  "Sofía",
  "Santiago",
  "Isabella",
  "Mateo",
  "Valentina",
  "Sebastián",
  "Emma",
  "Diego",
  "Mía",
  "Daniel",
];

const filters = {
  gender: ["Género", "Masculino", "Femenino"],
  theme: ["Tema", "Naturaleza", "Histórico", "Literario"],
  origin: ["Origen", "Latino", "Griego", "Hebreo"],
  length: [
    "Longitud",
    "Corto (1-4 letras)",
    "Medio (5-7 letras)",
    "Largo (8+ letras)",
  ],
};

// DOM Elements
const topNamesList = document.getElementById("top-names-list");
const genderSelect = document.getElementById("gender");
const themeSelect = document.getElementById("theme");
const originSelect = document.getElementById("origin");
const lengthSelect = document.getElementById("length");
const firstLetterSelect = document.getElementById("first-letter");
const showMoreButton = document.getElementById("show-more");
const modal = document.getElementById("name-details-modal");
const closeModal = document.querySelector(".close-modal");

// Initialize page
function initializePage() {
  loadTopNames();
  initializeFilters();
  setupEventListeners();
}

// Load top names list
function loadTopNames() {
  topNamesList.innerHTML = topNames
    .map(
      (name, index) =>
        `<li onclick="showNameDetails('${name}')">${index + 1}. ${name}</li>`
    )
    .join("");
}

// Initialize filter dropdowns
function initializeFilters() {
  populateSelect(genderSelect, filters.gender);
  populateSelect(themeSelect, filters.theme);
  populateSelect(originSelect, filters.origin);
  populateSelect(lengthSelect, filters.length);
  populateFirstLetterFilter();
}

// Populate select elements
function populateSelect(selectElement, options) {
  selectElement.innerHTML = options
    .map((option) => `<option value="${option}">${option}</option>`)
    .join("");
}

// Populate first letter filter
function populateFirstLetterFilter() {
  const letters = ["Primera letra"];
  for (let i = 65; i <= 90; i++) {
    letters.push(String.fromCharCode(i));
  }
  populateSelect(firstLetterSelect, letters);
}

// Setup event listeners
function setupEventListeners() {
  showMoreButton.addEventListener("click", handleShowMore);

  [
    genderSelect,
    themeSelect,
    originSelect,
    lengthSelect,
    firstLetterSelect,
  ].forEach((filter) => {
    filter.addEventListener("change", handleFilterChange);
  });

  // Modal event listeners
  closeModal.addEventListener("click", () => {
    modal.style.display = "none";
  });

  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });

  // Ad button listener
  document.querySelector(".ad-button").addEventListener("click", () => {
    alert("¡Gracias por tu interés! La guía se descargará pronto.");
  });
}

// Event Handlers
function handleShowMore() {
  console.log("Fetching more names with current filters:", {
    gender: genderSelect.value,
    theme: themeSelect.value,
    origin: originSelect.value,
    length: lengthSelect.value,
    firstLetter: firstLetterSelect.value,
  });
}

function handleFilterChange(event) {
  const filter = event.target;
  console.log(`Filter ${filter.id} changed to: ${filter.value}`);
}

// Show name details
function showNameDetails(name) {
  // Actualizar los datos del nombre (aquí usamos el mismo objeto para demo)
  nameDetails.name = name;

  // Inicializar la página de detalles
  initializeNameDetails();

  // Mostrar el modal
  modal.style.display = "block";
}

// Initialize the page when DOM is loaded
document.addEventListener("DOMContentLoaded", initializePage);
