// // Datos de ejemplo para los nombres más populares
// const topNames = [
//   "Sofía",
//   "Santiago",
//   "Isabella",
//   "Mateo",
//   "Valentina",
//   "Sebastián",
//   "Emma",
//   "Diego",
//   "Mía",
//   "Daniel",
// ];

// // Datos de ejemplo para los detalles del nombre
// const nameDetails = {
//   name: "Sofía",
//   meaning: "Sabiduría",
//   origin: "Griego",
//   popularIn: "Colombia, México, Argentina",
//   description:
//     'Sofía es un nombre femenino de origen griego que significa "sabiduría". Es un nombre clásico y elegante que ha ganado popularidad en muchos países de habla hispana.',
//   detailedDescription:
//     'El nombre Sofía encarna la esencia de la sabiduría y el conocimiento. En la antigua Grecia, "sophia" era un concepto filosófico que representaba la sabiduría divina y la comprensión profunda del mundo y la existencia humana. Como nombre, Sofía no solo evoca inteligencia, sino también gracia, elegancia y una conexión con el saber ancestral.\n\nLas personas llamadas Sofía a menudo son percibidas como reflexivas, intuitivas y con una inclinación natural hacia el aprendizaje y la comprensión. El nombre sugiere una personalidad equilibrada, capaz de combinar el intelecto con la empatía, y la razón con la intuición.\n\nEn muchas culturas, Sofía se asocia con la idea de una sabiduría que va más allá del mero conocimiento académico, abarcando también la sabiduría práctica de la vida y la capacidad de tomar decisiones acertadas. Este nombre puede inspirar a quien lo lleva a buscar constantemente el conocimiento y a aplicarlo de manera benéfica en su vida y en la de los demás.',
//   history:
//     "El nombre Sofía tiene sus raíces en la antigua Grecia, donde era asociado con la diosa de la sabiduría, Atenea. A lo largo de la historia, ha sido utilizado por varias reinas y figuras históricas importantes.",
//   variants: ["Sophie (francés)", "Sophia (inglés)", "Zofia (polaco)"],
//   famousPersons: [
//     "Sofía Vergara (actriz colombiana)",
//     "Sofía Loren (actriz italiana)",
//   ],
//   nameDay: "30 de septiembre (en algunos países católicos)",
//   popularity: {
//     global:
//       "Muy popular en países de habla hispana y en muchos otros países occidentales",
//     trend: "Ha mantenido una alta popularidad en las últimas décadas",
//   },
// };

// // Datos de ejemplo para los posts del blog
// const blogPosts = [
//   {
//     id: 1,
//     title: "Los nombres más populares de 2023",
//     author: "María García",
//     date: "2023-05-15",
//     content:
//       "Este año hemos visto una tendencia hacia nombres cortos y sonoros. Los más populares han sido...",
//     comments: [
//       {
//         id: 1,
//         author: "Juan Pérez",
//         content:
//           "¡Interesante! Mi hija se llama Sofía, que sigue siendo muy popular.",
//       },
//       {
//         id: 2,
//         author: "Ana Martínez",
//         content: "Me sorprende no ver más nombres tradicionales en la lista.",
//       },
//     ],
//   },
//   {
//     id: 2,
//     title: "Cómo elegir un nombre único sin ser extravagante",
//     author: "Carlos Rodríguez",
//     date: "2023-05-10",
//     content:
//       "Elegir un nombre único puede ser un desafío. Aquí te damos algunos consejos para encontrar el equilibrio perfecto...",
//     comments: [
//       {
//         id: 3,
//         author: "Laura Sánchez",
//         content:
//           "Excelentes consejos. Los tendré en cuenta para mi futuro bebé.",
//       },
//     ],
//   },
// ];

// // Función para cargar el contenido de la página de inicio
// function loadHomePage() {
//   document.getElementById("home-content").classList.remove("hidden");
//   document.getElementById("name-details").classList.add("hidden");
//   document.getElementById("blog-content").classList.add("hidden");
//   document.getElementById("login-content").classList.add("hidden");
//   document.getElementById("register-content").classList.add("hidden");

//   const topNamesList = document.getElementById("top-names-list");
//   topNamesList.innerHTML = "";
//   topNames.forEach((name, index) => {
//     const li = document.createElement("li");
//     li.textContent = `${index + 1}. ${name}`;
//     topNamesList.appendChild(li);
//   });

//   const firstLetterSelect = document.getElementById("first-letter");
//   firstLetterSelect.innerHTML = "<option>Primera letra</option>";
//   for (let i = 65; i <= 90; i++) {
//     const option = document.createElement("option");
//     option.textContent = String.fromCharCode(i);
//     firstLetterSelect.appendChild(option);
//   }
// }

// // Función para mostrar detalles de un nombre
// function showNameDetails() {
//   document.getElementById("home-content").classList.add("hidden");
//   document.getElementById("name-details").classList.remove("hidden");

//   document.getElementById("selected-name").textContent = nameDetails.name;
//   document.getElementById("name-meaning").textContent = nameDetails.meaning;
//   document.getElementById("name-origin").textContent = nameDetails.origin;
//   document.getElementById("name-description").textContent =
//     nameDetails.description;
//   document.getElementById("name-detailed-description").textContent =
//     nameDetails.detailedDescription;
//   document.getElementById("name-history").textContent = nameDetails.history;

//   const variantsList = document.getElementById("name-variants");
//   variantsList.innerHTML = "";
//   nameDetails.variants.forEach((variant) => {
//     const li = document.createElement("li");
//     li.textContent = variant;
//     variantsList.appendChild(li);
//   });

//   const famousPersonsList = document.getElementById("famous-persons");
//   famousPersonsList.innerHTML = "";
//   nameDetails.famousPersons.forEach((person) => {
//     const li = document.createElement("li");
//     li.textContent = person;
//     famousPersonsList.appendChild(li);
//   });

//   document.getElementById("name-day").textContent = nameDetails.nameDay;
//   document.getElementById("name-popularity").textContent =
//     nameDetails.popularIn;
//   document.getElementById(
//     "popularity-global"
//   ).textContent = `Global: ${nameDetails.popularity.global}`;
//   document.getElementById(
//     "popularity-trend"
//   ).textContent = `Tendencia: ${nameDetails.popularity.trend}`;
// }

// // Función para cargar el contenido del blog
// function loadBlogContent() {
//   document.getElementById("home-content").classList.add("hidden");
//   document.getElementById("name-details").classList.add("hidden");
//   document.getElementById("blog-content").classList.remove("hidden");
//   document.getElementById("login-content").classList.add("hidden");
//   document.getElementById("register-content").classList.add("hidden");

//   const blogPostsContainer = document.getElementById("blog-posts");
//   blogPostsContainer.innerHTML = "";

//   blogPosts.forEach((post) => {
//     const postElement = document.createElement("div");
//     postElement.className = "blog-post";
//     postElement.innerHTML = `
//           <h2>${post.title}</h2>
//           <p class="blog-post-meta">Por ${post.author} | ${post.date}</p>
//           <div class="blog-post-content">${post.content}</div>
//           <h3>Comentarios:</h3>
//           ${post.comments
//             .map(
//               (comment) => `
//               <div class="comment">
//                   <p>${comment.author}</p>
//                   <p>${comment.content}</p>
//               </div>
//           `
//             )
//             .join("")}
//           <form class="comment-form" data-post-id="${post.id}">
//               <textarea placeholder="Añade un comentario" required></textarea>
//               <button type="submit">Comentar</button>
//           </form>
//       `;
//     blogPostsContainer.appendChild(postElement);
//   });

//   // Event listeners for comment forms
//   document.querySelectorAll(".comment-form").forEach((form) => {
//     form.addEventListener("submit", function (e) {
//       e.preventDefault();
//       const postId = parseInt(this.getAttribute("data-post-id"));
//       const commentContent = this.querySelector("textarea").value;
//       addComment(postId, commentContent);
//       this.reset();
//     });
//   });
// }

// // Función para añadir un comentario
// function addComment(postId, content) {
//   const post = blogPosts.find((p) => p.id === postId);
//   if (post) {
//     const newComment = {
//       id: post.comments.length + 1,
//       author: "Usuario Anónimo", // En una aplicación real, esto sería el usuario logueado
//       content: content,
//     };
//     post.comments.push(newComment);
//     loadBlogContent(); // Recargar el contenido del blog para mostrar el nuevo comentario
//   }
// }

// // Función para mostrar el formulario de inicio de sesión
// function showLoginForm() {
//   document.getElementById("home-content").classList.add("hidden");
//   document.getElementById("name-details").classList.add("hidden");
//   document.getElementById("blog-content").classList.add("hidden");
//   document.getElementById("login-content").classList.remove("hidden");
//   document.getElementById("register-content").classList.add("hidden");
// }

// // Función para mostrar el formulario de registro
// function showRegisterForm() {
//   document.getElementById("home-content").classList.add("hidden");
//   document.getElementById("name-details").classList.add("hidden");
//   document.getElementById("blog-content").classList.add("hidden");
//   document.getElementById("login-content").classList.add("hidden");
//   document.getElementById("register-content").classList.remove("hidden");
// }

// // Inicialización
// document.addEventListener("DOMContentLoaded", () => {
//   loadHomePage();

//   // Event listeners para la navegación
//   document.querySelectorAll(".nav-links a").forEach((link) => {
//     link.addEventListener("click", (e) => {
//       e.preventDefault();
//       const page = e.target.getAttribute("data-page");
//       switch (page) {
//         case "home":
//           loadHomePage();
//           break;
//         case "blog":
//           loadBlogContent();
//           break;
//         case "login":
//           showLoginForm();
//           break;
//         case "register":
//           showRegisterForm();
//           break;
//       }
//     });
//   });

//   document
//     .getElementById("show-more")
//     .addEventListener("click", showNameDetails);
//   document
//     .getElementById("back-to-search")
//     .addEventListener("click", loadHomePage);

//   // Event listener para el formulario de inicio de sesión
//   document
//     .getElementById("login-form")
//     .addEventListener("submit", function (e) {
//       e.preventDefault();
//       const email = document.getElementById("login-email").value;
//       const password = document.getElementById("login-password").value;
//       console.log("Intento de inicio de sesión:", { email, password });
//       // Aquí iría la lógica de autenticación
//     });

//   // Event listener para el formulario de registro
//   document
//     .getElementById("register-form")
//     .addEventListener("submit", function (e) {
//       e.preventDefault();
//       const name = document.getElementById("register-name").value;
//       const email = document.getElementById("register-email").value;
//       const password = document.getElementById("register-password").value;
//       const confirmPassword = document.getElementById(
//         "register-confirm-password"
//       ).value;
//       console.log("Intento de registro:", {
//         name,
//         email,
//         password,
//         confirmPassword,
//       });
//       // Aquí iría la lógica de registro
//     });

//   // Event listener para el formulario de nuevo post del blog
//   document.getElementById("new-post").addEventListener("submit", function (e) {
//     e.preventDefault();
//     const title = document.getElementById("post-title").value;
//     const content = document.getElementById("post-content").value;
//     const newPost = {
//       id: blogPosts.length + 1,
//       title: title,
//       author: "Usuario Anónimo", // En una aplicación real, esto sería el usuario logueado
//       date: new Date().toISOString().split("T")[0],
//       content: content,
//       comments: [],
//     };
//     blogPosts.unshift(newPost);
//     loadBlogContent();
//     this.reset();
//   });
// });
