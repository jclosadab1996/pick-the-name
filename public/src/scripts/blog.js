// Data structure for blog posts
let blogPosts = [
  {
    id: 1,
    title: "Los nombres más populares de 2023",
    author: "María García",
    date: "2023-05-15",
    content:
      "Este año hemos visto una tendencia hacia nombres cortos y sonoros. Los más populares han sido...",
    comments: [
      {
        id: 1,
        author: "Juan Pérez",
        content:
          "¡Interesante! Mi hija se llama Sofía, que sigue siendo muy popular.",
      },
    ],
  },
];

// DOM Elements
const blogPostsContainer = document.getElementById("blog-posts");
const newPostForm = document.getElementById("new-post");

// Initialize page
function initializePage() {
  loadBlogPosts();
  setupEventListeners();
}

// Load blog posts
function loadBlogPosts() {
  blogPostsContainer.innerHTML = blogPosts
    .map((post) => createPostHTML(post))
    .join("");
}

// Create HTML for a single post
function createPostHTML(post) {
  return `
      <div class="blog-post" data-post-id="${post.id}">
          <h2>${post.title}</h2>
          <p class="blog-post-meta">Por ${post.author} | ${formatDate(
    post.date
  )}</p>
          <div class="blog-post-content">${post.content}</div>
          <div class="comments">
              <h3>Comentarios (${post.comments.length})</h3>
              ${post.comments
                .map((comment) => createCommentHTML(comment))
                .join("")}
          </div>
          <form class="comment-form" data-post-id="${post.id}">
              <textarea placeholder="Añade un comentario" required></textarea>
              <button type="submit">Comentar</button>
          </form>
      </div>
  `;
}

// Create HTML for a single comment
function createCommentHTML(comment) {
  return `
      <div class="comment" data-comment-id="${comment.id}">
          <p class="comment-author">${comment.author}</p>
          <p class="comment-content">${comment.content}</p>
      </div>
  `;
}

// Format date
function formatDate(dateString) {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString("es-ES", options);
}

// Setup event listeners
function setupEventListeners() {
  // New post form submission
  newPostForm.addEventListener("submit", handleNewPost);

  // Comment form submissions
  document.addEventListener("submit", function (e) {
    if (e.target.classList.contains("comment-form")) {
      e.preventDefault();
      handleNewComment(e.target);
    }
  });
}

// Handle new post submission
function handleNewPost(event) {
  event.preventDefault();

  const titleInput = document.getElementById("post-title");
  const contentInput = document.getElementById("post-content");

  const newPost = {
    id: blogPosts.length + 1,
    title: titleInput.value,
    author: "Usuario Anónimo", // In a real app, this would be the logged-in user
    date: new Date().toISOString().split("T")[0],
    content: contentInput.value,
    comments: [],
  };

  blogPosts.unshift(newPost);
  loadBlogPosts();
  event.target.reset();
}

// Handle new comment submission
function handleNewComment(form) {
  const postId = parseInt(form.getAttribute("data-post-id"));
  const commentContent = form.querySelector("textarea").value;
  const post = blogPosts.find((p) => p.id === postId);

  if (post) {
    const newComment = {
      id: post.comments.length + 1,
      author: "Usuario Anónimo", // In a real app, this would be the logged-in user
      content: commentContent,
    };

    post.comments.push(newComment);
    loadBlogPosts();
    form.reset();
  }
}

// Initialize the page when DOM is loaded
document.addEventListener("DOMContentLoaded", initializePage);
