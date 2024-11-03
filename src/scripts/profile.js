// DOM Elements
const userAvatar = document.getElementById("user-avatar");
const userName = document.getElementById("user-name");
const logoutBtn = document.getElementById("logout-btn");
const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll(".profile-section");

// Filters
const genderFilter = document.getElementById("gender-filter");
const originFilter = document.getElementById("origin-filter");
const lengthFilter = document.getElementById("length-filter");
const letterFilter = document.getElementById("letter-filter");

// Grids
const filteredNamesGrid = document.getElementById("filtered-names");
const savedNamesGrid = document.getElementById("saved-names");
const blogPosts = document.getElementById("blog-posts");

// Templates
const nameModalTemplate = document.getElementById("name-modal-template");
const blogModalTemplate = document.getElementById("blog-modal-template");

let namesData = {
  male: [],
  female: [],
};

// Initialize page
async function initializePage() {
  checkAuthentication();
  await loadNamesData();
  setupUser();
  setupFilters();
  setupEventListeners();
  loadSavedNames();
  loadBlogPosts();
  filterNames();
}

// Check authentication
function checkAuthentication() {
  if (!localStorage.getItem("user")) {
    window.location.href = "../pages/login.html";
  }
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

// Setup user
function setupUser() {
  const user = JSON.parse(localStorage.getItem("user"));
  userAvatar.src = user.avatar;
  userName.textContent = user.name;
  document.body.classList.toggle(
    "dark-theme",
    user.preferences?.theme === "dark"
  );
}

// Setup filters
function setupFilters() {
  // Setup origin filter
  const origins = [
    ...new Set([
      ...namesData.male.map((n) => n.origin),
      ...namesData.female.map((n) => n.origin),
    ]),
  ].sort();

  originFilter.innerHTML = `
        <option value="all">Todos los orígenes</option>
        ${origins
          .map((origin) => `<option value="${origin}">${origin}</option>`)
          .join("")}
    `;

  // Setup letter filter
  const letters = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ".split("");
  letterFilter.innerHTML = `
        <option value="all">Todas las letras</option>
        ${letters
          .map((letter) => `<option value="${letter}">${letter}</option>`)
          .join("")}
    `;
}

// Setup event listeners
function setupEventListeners() {
  // Navigation
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.forEach((l) => l.classList.remove("active"));
      link.classList.add("active");

      const targetSection = link.id.replace("-tab", "-section");
      sections.forEach((section) => {
        section.classList.toggle("active", section.id === targetSection);
      });
    });
  });

  // Filters
  [genderFilter, originFilter, lengthFilter, letterFilter].forEach((filter) => {
    filter.addEventListener("change", filterNames);
  });

  // Logout
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("user");
    window.location.href = "../pages/login.html";
  });

  // New blog post
  document
    .getElementById("new-post-btn")
    ?.addEventListener("click", showNewPostModal);
}

// Filter names
function filterNames() {
  const gender = genderFilter.value;
  const origin = originFilter.value;
  const length = lengthFilter.value;
  const letter = letterFilter.value;

  let filteredNames =
    gender === "male"
      ? namesData.male
      : gender === "female"
      ? namesData.female
      : [...namesData.male, ...namesData.female];

  if (origin !== "all") {
    filteredNames = filteredNames.filter((name) => name.origin === origin);
  }

  if (letter !== "all") {
    filteredNames = filteredNames.filter((name) =>
      name.name.toUpperCase().startsWith(letter)
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

  displayFilteredNames(filteredNames);
}

// Display filtered names
function displayFilteredNames(names) {
  filteredNamesGrid.innerHTML = names
    .map(
      (name) => `
        <div class="name-card" data-name="${name.name}">
            <h3>${name.name}</h3>
            <p>${name.meaning}</p>
            <p class="origin">${name.origin}</p>
            <div class="popularity">
                <span class="popularity-icon">⭐</span>
                <span>${name.popularity?.global || "Popular"}</span>
            </div>
        </div>
    `
    )
    .join("");

  // Add click events
  document.querySelectorAll(".name-card").forEach((card) => {
    card.addEventListener("click", () => showNameDetails(card.dataset.name));
  });
}

// Show name details
function showNameDetails(name) {
  const nameData = [...namesData.male, ...namesData.female].find(
    (n) => n.name === name
  );
  if (!nameData) return;

  const modal = nameModalTemplate.content.cloneNode(true);
  const modalElement = modal.querySelector(".modal");
  const nameTitle = modal.querySelector(".name-title");
  const nameDetails = modal.querySelector(".name-details");
  const saveButton = modal.querySelector(".save-name-btn");

  nameTitle.textContent = nameData.name;
  nameDetails.innerHTML = `
        <p><strong>Significado:</strong> ${nameData.meaning}</p>
        <p><strong>Origen:</strong> ${nameData.origin}</p>
        <p><strong>Popular en:</strong> ${nameData.popularIn}</p>
        <p><strong>Descripción:</strong> ${nameData.description}</p>
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
    `;

  const user = JSON.parse(localStorage.getItem("user"));
  const isSaved = user.savedNames.includes(nameData.name);
  saveButton.textContent = isSaved ? "Eliminar de favoritos" : "Guardar nombre";
  saveButton.addEventListener("click", () =>
    toggleSaveName(nameData.name, saveButton)
  );

  document.body.appendChild(modalElement);

  // Close modal
  const closeBtn = modalElement.querySelector(".close-modal");
  closeBtn.onclick = () => modalElement.remove();
  modalElement.onclick = (e) => {
    if (e.target === modalElement) modalElement.remove();
  };
}

// Toggle save/unsave name
function toggleSaveName(name, button) {
  const user = JSON.parse(localStorage.getItem("user"));
  const index = user.savedNames.indexOf(name);

  if (index === -1) {
    user.savedNames.push(name);
    button.textContent = "Eliminar de favoritos";
    addActivity(`Guardado el nombre "${name}"`);
  } else {
    user.savedNames.splice(index, 1);
    button.textContent = "Guardar nombre";
    addActivity(`Eliminado el nombre "${name}" de favoritos`);
  }

  localStorage.setItem("user", JSON.stringify(user));
  loadSavedNames();
}

// Load saved names
function loadSavedNames() {
  const user = JSON.parse(localStorage.getItem("user"));
  const allNames = [...namesData.male, ...namesData.female];

  savedNamesGrid.innerHTML = user.savedNames.length
    ? user.savedNames
        .map((name) => {
          const nameData = allNames.find((n) => n.name === name);
          return nameData
            ? `
            <div class="name-card" data-name="${nameData.name}">
                <h3>${nameData.name}</h3>
                <p>${nameData.meaning}</p>
                <p class="origin">${nameData.origin}</p>
                <button class="remove-name" data-name="${nameData.name}">
                    Eliminar
                </button>
            </div>
        `
            : "";
        })
        .join("")
    : '<p class="no-names">No hay nombres guardados</p>';

  // Add event listeners
  document.querySelectorAll(".name-card").forEach((card) => {
    card.addEventListener("click", () => showNameDetails(card.dataset.name));
  });
}

// Load blog posts
function loadBlogPosts() {
  const user = JSON.parse(localStorage.getItem("user"));
  blogPosts.innerHTML = user.blogPosts?.length
    ? user.blogPosts
        .map(
          (post) => `
        <div class="blog-post">
            <h3>${post.title}</h3>
            <p class="post-meta">Por ${user.name} | ${new Date(
            post.date
          ).toLocaleDateString()}</p>
            <p>${post.content}</p>
        </div>
    `
        )
        .join("")
    : '<p class="no-posts">No hay posts publicados</p>';
}

// Show new post modal
function showNewPostModal() {
  const modal = blogModalTemplate.content.cloneNode(true);
  const modalElement = modal.querySelector(".modal");
  const form = modal.querySelector("form");

  document.body.appendChild(modalElement);

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = form.querySelector("input").value;
    const content = form.querySelector("textarea").value;

    const user = JSON.parse(localStorage.getItem("user"));
    if (!user.blogPosts) user.blogPosts = [];

    user.blogPosts.unshift({
      title,
      content,
      date: new Date().toISOString(),
    });

    localStorage.setItem("user", JSON.stringify(user));
    addActivity("Publicado nuevo post en el blog");
    loadBlogPosts();
    modalElement.remove();
  });

  // Close modal
  const closeBtn = modalElement.querySelector(".close-modal");
  closeBtn.onclick = () => modalElement.remove();
  modalElement.onclick = (e) => {
    if (e.target === modalElement) modalElement.remove();
  };
}

// Add activity
function addActivity(text) {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user.activities) user.activities = [];

  user.activities.unshift({
    text,
    date: new Date().toISOString(),
  });

  user.activities = user.activities.slice(0, 10);
  localStorage.setItem("user", JSON.stringify(user));

  const activityList = document.getElementById("activity-list");
  if (activityList) {
    activityList.innerHTML = user.activities
      .map(
        (activity) => `
            <div class="activity-item">
                <p>${activity.text}</p>
                <span class="activity-date">${new Date(
                  activity.date
                ).toLocaleDateString()}</span>
            </div>
        `
      )
      .join("");
  }
}

// Initialize the page when DOM is loaded
document.addEventListener("DOMContentLoaded", initializePage);
