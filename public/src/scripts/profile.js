// DOM Elements
const userAvatar = document.getElementById("user-avatar");
const userName = document.getElementById("user-name");
const logoutBtn = document.getElementById("logout-btn");
const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll(".profile-section");
const filteredNamesGrid = document.getElementById("filtered-names");
const genderFilter = document.getElementById("gender-filter");
const originFilter = document.getElementById("origin-filter");
const lengthFilter = document.getElementById("length-filter");
const letterFilter = document.getElementById("letter-filter");

let namesData = {
  male: [],
  female: [],
};

// Initialize page
async function initializePage() {
  checkAuthentication();
  setupUser();
  setupEventListeners();
  await Promise.all([loadUserData(), loadNamesData()]);
  setupFilters();
  filterNames();
}

// Check authentication
function checkAuthentication() {
  if (!localStorage.getItem("token")) {
    window.location.href = "../pages/login.html";
  }
}

// Setup user
function setupUser() {
  const user = JSON.parse(localStorage.getItem("user"));
  userName.textContent = user.name;
  userAvatar.src = `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.id}`;
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
  // Origin filter
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

  // Letter filter
  const letters = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ".split("");
  letterFilter.innerHTML = `
    <option value="all">Todas las letras</option>
    ${letters
      .map((letter) => `<option value="${letter}">${letter}</option>`)
      .join("")}
  `;
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
      <p class="meaning">${name.meaning}</p>
      <p class="origin">${name.origin}</p>
      <div class="popularity">
        <span class="popularity-icon">⭐</span>
        <span>${name.popularity?.global || "Popular"}</span>
      </div>
      <button class="save-name-btn" onclick="saveName(${JSON.stringify(
        name
      ).replace(/"/g, "&quot;")})">
        Guardar nombre
      </button>
    </div>
  `
    )
    .join("");

  // Add click events for name details
  document.querySelectorAll(".name-card").forEach((card) => {
    card.addEventListener("click", (e) => {
      if (!e.target.classList.contains("save-name-btn")) {
        showNameDetails(card.dataset.name);
      }
    });
  });
}

// Show name details
function showNameDetails(name) {
  const nameData = [...namesData.male, ...namesData.female].find(
    (n) => n.name === name
  );
  if (!nameData) return;

  const modal = document.createElement("div");
  modal.className = "modal";
  modal.innerHTML = `
    <div class="modal-content">
      <span class="close-modal">&times;</span>
      <h2>${nameData.name}</h2>
      <div class="name-details">
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
      </div>
      <button class="save-name-btn" onclick="saveName(${JSON.stringify(
        nameData
      ).replace(/"/g, "&quot;")})">
        Guardar nombre
      </button>
    </div>
  `;

  document.body.appendChild(modal);

  // Close modal
  const closeBtn = modal.querySelector(".close-modal");
  closeBtn.onclick = () => modal.remove();
  modal.onclick = (e) => {
    if (e.target === modal) modal.remove();
  };
}

// Load user data
async function loadUserData() {
  try {
    const [namesResponse, blogResponse] = await Promise.all([
      fetch("/api/user/names", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
      fetch("/api/user/blog", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
    ]);

    const [names, posts] = await Promise.all([
      namesResponse.json(),
      blogResponse.json(),
    ]);

    displaySavedNames(names);
    displayBlogPosts(posts);
  } catch (error) {
    console.error("Error loading user data:", error);
  }
}

// Display saved names
function displaySavedNames(names) {
  const savedNamesGrid = document.getElementById("saved-names");
  savedNamesGrid.innerHTML = names.length
    ? names
        .map(
          (name) => `
    <div class="name-card">
      <h3>${name.name}</h3>
      <p>${name.meaning}</p>
      <p class="origin">${name.origin}</p>
      <button class="remove-name" onclick="removeName('${name._id}')">
        Eliminar
      </button>
    </div>
  `
        )
        .join("")
    : '<p class="no-names">No hay nombres guardados</p>';
}

// Display blog posts
function displayBlogPosts(posts) {
  const blogPosts = document.getElementById("blog-posts");
  blogPosts.innerHTML = posts.length
    ? posts
        .map(
          (post) => `
    <div class="blog-post">
      <h3>${post.title}</h3>
      <p class="post-meta">Publicado el ${new Date(
        post.date
      ).toLocaleDateString()}</p>
      <p>${post.content}</p>
    </div>
  `
        )
        .join("")
    : '<p class="no-posts">No hay posts publicados</p>';
}

// Save name
async function saveName(nameData) {
  try {
    const response = await fetch("/api/user/names", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        name: nameData.name,
        gender: nameData.gender || "unknown",
        origin: nameData.origin,
        meaning: nameData.meaning,
      }),
    });

    const savedNames = await response.json();
    displaySavedNames(savedNames);
    alert("Nombre guardado exitosamente");
  } catch (error) {
    console.error("Error saving name:", error);
    alert("Error al guardar el nombre");
  }
}

// Remove name
async function removeName(nameId) {
  try {
    const response = await fetch(`/api/user/names/${nameId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    const savedNames = await response.json();
    displaySavedNames(savedNames);
    alert("Nombre eliminado exitosamente");
  } catch (error) {
    console.error("Error removing name:", error);
    alert("Error al eliminar el nombre");
  }
}

// Create blog post
async function createBlogPost(postData) {
  try {
    const response = await fetch("/api/user/blog", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(postData),
    });

    const posts = await response.json();
    displayBlogPosts(posts);
  } catch (error) {
    console.error("Error creating post:", error);
  }
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
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "../pages/login.html";
  });

  // New blog post
  document.getElementById("new-post-btn")?.addEventListener("click", () => {
    const title = prompt("Título del post:");
    const content = prompt("Contenido del post:");
    if (title && content) {
      createBlogPost({ title, content });
    }
  });
}

// Initialize the page when DOM is loaded
document.addEventListener("DOMContentLoaded", initializePage);
