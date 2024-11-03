// Datos de ejemplo para los detalles del nombre
const nameDetails = {
  name: "Sofía",
  gener: "Femenino",
  meaning: "Sabiduría",
  origin: "Griego",
  popularIn: "Colombia, México, Argentina",
  description:
    'Sofía es un nombre femenino de origen griego que significa "sabiduría". Es un nombre clásico y elegante que ha ganado popularidad en muchos países de habla hispana.',
  detailedDescription:
    'El nombre Sofía encarna la esencia de la sabiduría y el conocimiento. En la antigua Grecia, "sophia" era un concepto filosófico que representaba la sabiduría divina y la comprensión profunda del mundo y la existencia humana. Como nombre, Sofía no solo evoca inteligencia, sino también gracia, elegancia y una conexión con el saber ancestral.\n\nLas personas llamadas Sofía a menudo son percibidas como reflexivas, intuitivas y con una inclinación natural hacia el aprendizaje y la comprensión. El nombre sugiere una personalidad equilibrada, capaz de combinar el intelecto con la empatía, y la razón con la intuición.\n\nEn muchas culturas, Sofía se asocia con la idea de una sabiduría que va más allá del mero conocimiento académico, abarcando también la sabiduría práctica de la vida y la capacidad de tomar decisiones acertadas. Este nombre puede inspirar a quien lo lleva a buscar constantemente el conocimiento y a aplicarlo de manera benéfica en su vida y en la de los demás.',
  history:
    "El nombre Sofía tiene sus raíces en la antigua Grecia, donde era asociado con la diosa de la sabiduría, Atenea. A lo largo de la historia, ha sido utilizado por varias reinas y figuras históricas importantes.",
  variants: ["Sophie (francés)", "Sophia (inglés)", "Zofia (polaco)"],
  famousPersons: [
    "Sofía Vergara (actriz colombiana)",
    "Sofía Loren (actriz italiana)",
  ],
  nameDay: "30 de septiembre (en algunos países católicos)",
  popularity: {
    global:
      "Muy popular en países de habla hispana y en muchos otros países occidentales",
    trend: "Ha mantenido una alta popularidad en las últimas décadas",
  },
};

// Función para inicializar la página de detalles
function initializeNameDetails() {
  // Establecer el título de la página
  document.title = `Pick The Name - ${nameDetails.name}`;

  // Llenar la información básica
  document.getElementById("name-title").textContent = nameDetails.name;
  document.getElementById(
    "name-origin"
  ).textContent = `Origen: ${nameDetails.origin}`;
  document.getElementById(
    "name-meaning"
  ).textContent = `Significado: ${nameDetails.meaning}`;

  // Llenar las descripciones
  document.getElementById("name-short-description").textContent =
    nameDetails.description;
  document.getElementById("name-detailed-description").textContent =
    nameDetails.detailedDescription;
  document.getElementById("name-history").textContent = nameDetails.history;

  // Limpiar y llenar las variantes
  const variantsList = document.getElementById("name-variants");
  variantsList.innerHTML = "";
  nameDetails.variants.forEach((variant) => {
    const li = document.createElement("li");
    li.textContent = variant;
    variantsList.appendChild(li);
  });

  // Limpiar y llenar personas famosas
  const famousList = document.getElementById("name-famous");
  famousList.innerHTML = "";
  nameDetails.famousPersons.forEach((person) => {
    const li = document.createElement("li");
    li.textContent = person;
    famousList.appendChild(li);
  });

  // Llenar popularidad
  document.getElementById("name-popularity").textContent =
    nameDetails.popularity.global;
  document.getElementById("name-trend").textContent =
    nameDetails.popularity.trend;

  // Llenar información adicional
  document.getElementById("name-popular-in").textContent =
    nameDetails.popularIn;
  document.getElementById("name-day").textContent = nameDetails.nameDay;
}
