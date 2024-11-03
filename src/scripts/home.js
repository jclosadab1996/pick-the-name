// DOM Elements
const topNamesList = document.getElementById("top-names-list");
const genderSelect = document.getElementById("gender");
const themeSelect = document.getElementById("theme");
const originSelect = document.getElementById("origin");
const lengthSelect = document.getElementById("length");
const firstLetterSelect = document.getElementById("first-letter");
const showMoreButton = document.getElementById("show-more");
const filteredNamesList = document.createElement("div");
filteredNamesList.id = "filtered-names-list";

let namesData = {
  male: [],
  female: [],
};

let currentPage = 1;
const namesPerPage = 12;

// Initialize page
async function initializePage() {
  await loadNamesData();
  setupFilters();
  setupEventListeners();
  displayTopNames();
  document.querySelector(".content").appendChild(filteredNamesList);
}

// Load names data
async function loadNamesData() {
  try {
    const [maleResponse, femaleResponse] = await Promise.all([
      fetch("../data/hombres.json"),
      fetch("../data/mujeres.json"),
    ]);
    namesData.male = await maleResponse.json();
    namesData.female = await femaleResponse.json();
  } catch (error) {
    console.error("Error loading names data:", error);
  }
}

// Setup filters
function setupFilters() {
  // Gender filter
  genderSelect.innerHTML = `
        <option value="all">Todos</option>
        <option value="male">Masculino</option>
        <option value="female">Femenino</option>
    `;

  // Origin filter
  const origins = [
    ...new Set([
      ...namesData.male.map((n) => n.origin),
      ...namesData.female.map((n) => n.origin),
    ]),
  ].sort();

  originSelect.innerHTML = `
        <option value="all">Todos los orígenes</option>
        ${origins
          .map((origin) => `<option value="${origin}">${origin}</option>`)
          .join("")}
    `;

  // First letter filter
  const letters = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ".split("");
  firstLetterSelect.innerHTML = `
        <option value="all">Todas las letras</option>
        ${letters
          .map((letter) => `<option value="${letter}">${letter}</option>`)
          .join("")}
    `;

  // Length filter
  lengthSelect.innerHTML = `
        <option value="all">Todas las longitudes</option>
        <option value="short">Corto (1-4 letras)</option>
        <option value="medium">Medio (5-7 letras)</option>
        <option value="long">Largo (8+ letras)</option>
    `;

  // Theme filter
  themeSelect.innerHTML = `
        <option value="all">Todos los temas</option>
        <option value="nature">Naturaleza</option>
        <option value="historical">Histórico</option>
        <option value="religious">Religioso</option>
        <option value="modern">Moderno</option>
    `;
}

// Display top names with click functionality
function displayTopNames() {
  const allNames = [...namesData.male, ...namesData.female];
  const topTenNames = allNames
    .sort((a, b) =>
      b.popularity?.global?.localeCompare(a.popularity?.global || "")
    )
    .slice(0, 10);

  topNamesList.innerHTML = topTenNames
    .map(
      (name, index) => `
            <li class="top-name" data-name="${name.name}">
                <span class="rank">${index + 1}</span>
                <span class="name">${name.name}</span>
                <span class="origin">${name.origin}</span>
            </li>
        `
    )
    .join("");

  document.querySelectorAll(".top-name").forEach((nameElement) => {
    nameElement.addEventListener("click", () =>
      showNameDetails(nameElement.dataset.name)
    );
  });
}

// Filter names based on selected criteria
function filterNames() {
  const gender = genderSelect.value;
  const theme = themeSelect.value;
  const origin = originSelect.value;
  const length = lengthSelect.value;
  const firstLetter = firstLetterSelect.value;

  let filteredNames =
    gender === "male"
      ? namesData.male
      : gender === "female"
      ? namesData.female
      : [...namesData.male, ...namesData.female];

  if (origin !== "all") {
    filteredNames = filteredNames.filter((name) => name.origin === origin);
  }

  if (firstLetter !== "all") {
    filteredNames = filteredNames.filter((name) =>
      name.name.toUpperCase().startsWith(firstLetter)
    );
  }

  if (length !== "all") {
    filteredNames = filteredNames.filter((name) => {
      const nameLength = name.name.length;
      switch (length) {
        case "short":
          return nameLength <= 4;
        case "medium":
          return nameLength >= 5 && nameLength <= 7;
        case "long":
          return nameLength >= 8;
        default:
          return true;
      }
    });
  }

  currentPage = 1;
  displayFilteredNames(filteredNames);
}

// Display filtered names
function displayFilteredNames(names) {
  const startIndex = (currentPage - 1) * namesPerPage;
  const endIndex = startIndex + namesPerPage;
  const displayedNames = names.slice(startIndex, endIndex);
  const hasMoreNames = names.length > endIndex;

  filteredNamesList.innerHTML = `
        <div class="filtered-names-grid">
            ${displayedNames
              .map(
                (name) => `
                <div class="name-card" data-name="${name.name}">
                    <h3>${name.name}</h3>
                    <p class="meaning">${name.meaning}</p>
                    <p class="origin">${name.origin}</p>
                    <div class="popularity">
                        <span class="popularity-icon">⭐</span>
                        <span>${name.popularity?.global || "Popular"}</span>
                    </div>
                </div>
            `
              )
              .join("")}
        </div>
    `;

  showMoreButton.style.display = hasMoreNames ? "block" : "none";
  showMoreButton.textContent = hasMoreNames
    ? "Ver más nombres de bebés"
    : "No hay más nombres";

  document.querySelectorAll(".name-card").forEach((card) => {
    card.addEventListener("click", () => showNameDetails(card.dataset.name));
  });
}

// Show name details in a modal
function showNameDetails(name) {
  const nameData = [...namesData.male, ...namesData.female].find(
    (n) => n.name === name
  );
  if (!nameData) return;

  const modal = document.createElement("div");
  modal.className = "name-modal";
  modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <h2>${nameData.name}</h2>
            <div class="name-details">
                <div class="detail-item">
                    <span class="detail-label">Significado:</span>
                    <span class="detail-value">${nameData.meaning}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Origen:</span>
                    <span class="detail-value">${nameData.origin}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Popular en:</span>
                    <span class="detail-value">${nameData.popularIn}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Descripción:</span>
                    <span class="detail-value">${nameData.description}</span>
                </div>
            </div>
            <div class="detailed-info">
                <h3>Historia</h3>
                <p>${nameData.history}</p>
                <h3>Variantes</h3>
                <p>${nameData.variants.join(", ")}</p>
                <h3>Personas Famosas</h3>
                <ul>
                    ${nameData.famousPersons
                      .map((person) => `<li>${person}</li>`)
                      .join("")}
                </ul>
            </div>
            ${
              isLoggedIn()
                ? `
                <button class="save-name" data-name="${nameData.name}">
                    ${
                      isSavedName(nameData.name)
                        ? "Eliminar de favoritos"
                        : "Guardar nombre"
                    }
                </button>
            `
                : ""
            }
        </div>
    `;

  document.body.appendChild(modal);

  const closeBtn = modal.querySelector(".close-modal");
  closeBtn.onclick = () => modal.remove();
  modal.onclick = (e) => {
    if (e.target === modal) modal.remove();
  };

  const saveBtn = modal.querySelector(".save-name");
  if (saveBtn) {
    saveBtn.onclick = () => toggleSaveName(nameData.name, saveBtn);
  }
}

// Check if user is logged in
function isLoggedIn() {
  return localStorage.getItem("user") !== null;
}

// Check if name is saved
function isSavedName(name) {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  return user.savedNames?.includes(name) || false;
}

// Toggle save/unsave name
function toggleSaveName(name, button) {
  if (!isLoggedIn()) return;

  const user = JSON.parse(localStorage.getItem("user"));
  if (!user.savedNames) user.savedNames = [];

  const index = user.savedNames.indexOf(name);
  if (index === -1) {
    user.savedNames.push(name);
    button.textContent = "Eliminar de favoritos";
  } else {
    user.savedNames.splice(index, 1);
    button.textContent = "Guardar nombre";
  }

  localStorage.setItem("user", JSON.stringify(user));
}

// Setup event listeners
function setupEventListeners() {
  [
    genderSelect,
    themeSelect,
    originSelect,
    lengthSelect,
    firstLetterSelect,
  ].forEach((filter) => {
    filter.addEventListener("change", filterNames);
  });

  showMoreButton.addEventListener("click", () => {
    currentPage++;
    filterNames();
  });
}

// Initialize the page when DOM is loaded
document.addEventListener("DOMContentLoaded", initializePage);
