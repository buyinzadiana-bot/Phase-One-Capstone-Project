// LAB2/discover.js
import { fetchBooks } from "/LAB3/APIs.js";

const searchInput = document.querySelector("#searchInput");
const searchButton = document.querySelector("#searchBtn");
const resultsContainer = document.querySelector("#booksContainer");

// Toast container
const toastContainer = document.createElement("div");
toastContainer.className = "fixed top-5 right-5 z-50 space-y-2";
document.body.appendChild(toastContainer);

// Create a modal for details
const modal = document.createElement("div");
modal.className =
  "hidden fixed inset-0 bg-black/70 flex items-center justify-center z-40";
modal.innerHTML = `
  <div class="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-6 rounded-2xl shadow-xl max-w-md w-full relative">
    <button id="closeModal" class="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-2xl">✖</button>
    <div id="modalContent"></div>
  </div>
`;
document.body.appendChild(modal);

document.getElementById("closeModal").addEventListener("click", () => {
  modal.classList.add("hidden");
});

// Toast function
function showToast(message, type = "info") {
  const toast = document.createElement("div");
  toast.className = `px-4 py-2 rounded-lg shadow text-white ${
    type === "success"
      ? "bg-green-600"
      : type === "error"
      ? "bg-red-600"
      : "bg-gray-700"
  } animate-slideIn`;
  toast.textContent = message;
  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.classList.add("opacity-0", "translate-x-5");
    setTimeout(() => toast.remove(), 500);
  }, 2000);
}

// Favorite
let favorite = JSON.parse(localStorage.getItem("favorite")) || [];
let currentBooks = [];

function saveFavorite() {
  localStorage.setItem("favorite", JSON.stringify(favorite));
  window.dispatchEvent(new Event("favoriteUpdated")); // Sync with other pages
}

function isFavorite(bookId) {
  return favorite.some((b) => b.id === bookId);
}

function toggleFavorite(book) {
  if (isFavorite(book.id)) {
    favorite = favorite.filter((b) => b.id !== book.id);
    showToast("Removed from favorite ❌", "error");
  } else {
    favorite.push(book);
    showToast("Added to favorite ❤️", "success");
  }
  saveFavorite();
  renderBooks(currentBooks);
}

// Render books
function renderBooks(books) {
  resultsContainer.innerHTML = books
    .map(
      (book) => `
    <div class="p-4 bg-white dark:bg-gray-800 shadow rounded hover:shadow-lg transition-shadow relative group">
      <img src="${book.cover}" alt="${
        book.title
      }" class="w-full h-64 object-cover rounded cursor-pointer" data-id="${
        book.id
      }">
      <h3 class="mt-2 font-bold">${book.title}</h3>
      <p class="text-gray-600 dark:text-gray-400">${book.author}</p>
      <button 
        class="absolute top-3 right-3 text-xl ${
          isFavorite(book.id) ? "text-red-500" : "text-gray-400"
        } hover:text-red-500"
        data-fav="${book.id}"
      >❤️</button>
    </div>`
    )
    .join("");

  // Favorite buttons
  document.querySelectorAll("[data-fav]").forEach((btn) => {
    const id = btn.getAttribute("data-fav");
    const book = books.find((b) => b.id === id);
    btn.addEventListener("click", (e) => {
      e.stopPropagation(); // Prevent click on image triggering modal
      toggleFavorite(book);
    });
  });

  // Book detail modal
  document.querySelectorAll("img[data-id]").forEach((img) => {
    const id = img.getAttribute("data-id");
    const book = books.find((b) => b.id === id);
    img.addEventListener("click", () => openModal(book));
  });
}

// Book detail popup
function openModal(book) {
  const html = `
    <img src="${book.cover}" alt="${
    book.title
  }" class="w-full h-64 object-cover rounded mb-4">
    <h2 class="text-2xl font-bold mb-2">${book.title}</h2>
    <p class="text-gray-600 dark:text-gray-400 mb-3">by ${book.author}</p>
    <p class="text-sm text-gray-500 mb-3">Book ID: ${book.id}</p>
    <button class="mt-2 w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700" id="favFromModal">
      ${isFavorite(book.id) ? "Remove from Favorite" : "Add to Favorite"}
    </button>
  `;
  document.getElementById("modalContent").innerHTML = html;
  modal.classList.remove("hidden");

  document.getElementById("favFromModal").addEventListener("click", () => {
    toggleFavorite(book);
    modal.classList.add("hidden");
  });
}

// Handle search
searchButton.addEventListener("click", async () => {
  const query = searchInput.value.trim();
  if (!query) return;
  resultsContainer.innerHTML = `<p class="text-center text-gray-500 col-span-full">Searching for "${query}"...</p>`;
  const books = await fetchBooks(query);
  currentBooks = books;
  if (books.length === 0) {
    resultsContainer.innerHTML = `<p class="text-center text-gray-500 col-span-full">No books found.</p>`;
    return;
  }
  renderBooks(books);
});

// Load default books
window.addEventListener("DOMContentLoaded", async () => {
  const books = await fetchBooks("bestsellers");
  currentBooks = books;
  renderBooks(books);
});
