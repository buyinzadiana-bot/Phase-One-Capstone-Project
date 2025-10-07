// LAB2/index.js
import { fetchBooks } from "/LAB3/APIs.js";

// CATEGORY LIST
const categories = [
  "Science Fiction",
  "Romance",
  "Mystery",
  "Fantasy",
  "Business",
  "Self-Help",
  "Health",
  "Education",
  "Biography",
  "History",
  "Children",
];

const categoryContainer = document.querySelector("#categoryContainer");
const booksContainer = document.querySelector("#booksContainer");
const authorsList = document.querySelector("#authorsList");
const bookTracker = document.querySelector("#bookTracker");
const categoryTitle = document.querySelector("#categoryTitle");

let readingList = JSON.parse(localStorage.getItem("readingList")) || [];
let currentBooks = [];

// RENDER CATEGORY BUTTONS
function renderCategories() {
  categoryContainer.innerHTML = categories
    .map(
      (cat) => `
    <button
      class="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
      data-category="${cat}"
    >${cat}</button>`
    )
    .join("");

  document.querySelectorAll("[data-category]").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const category = btn.getAttribute("data-category");
      categoryTitle.textContent = `📖 Showing ${category} Books`;
      const books = await fetchBooks(category);
      currentBooks = books;
      renderBooks(books);
      renderAuthors(books);
    });
  });
}

// RENDER BOOKS
function renderBooks(books) {
  if (!books || books.length === 0) {
    booksContainer.innerHTML =
      '<p class="text-center text-gray-500 col-span-full">No books found.</p>';
    return;
  }

  booksContainer.innerHTML = books
    .map(
      (book) => `
      <div class="p-4 bg-white dark:bg-gray-800 shadow rounded hover:shadow-lg transition animate-slideIn">
        <img src="${book.cover}" alt="${book.title}" class="w-full h-64 object-cover rounded">
        <h3 class="mt-2 font-bold">${book.title}</h3>
        <p class="text-gray-600 dark:text-gray-400">${book.author}</p>
        <button 
          class="mt-2 bg-blue-600 text-white px-3 py-1 rounded hover:bg-green-700"
          data-track="${book.id}"
        >Add to Tracker</button>
      </div>`
    )
    .join("");

  document.querySelectorAll("[data-track]").forEach((btn) => {
    const bookId = btn.getAttribute("data-track");
    const book = currentBooks.find((b) => b.id === bookId);
    btn.addEventListener("click", () => addToTracker(book));
  });
}

// BOOK TRACKER
function renderTracker() {
  if (readingList.length === 0) {
    bookTracker.innerHTML = `<p class="text-gray-500">No books tracked yet.</p>`;
    return;
  }

  bookTracker.innerHTML = readingList
    .map(
      (book) => `
    <li class="flex justify-between items-center p-2 bg-gray-100 dark:bg-gray-700 rounded">
      <span>${book.title} — <em>${book.author}</em></span>
      <button class="text-red-500 hover:text-red-700 remove-btn" data-id="${book.id}">✖</button>
    </li>`
    )
    .join("");

  document.querySelectorAll(".remove-btn").forEach((btn) => {
    const id = btn.getAttribute("data-id");
    btn.addEventListener("click", () => {
      readingList = readingList.filter((b) => b.id !== id);
      saveTracker();
      renderTracker();
    });
  });
}

// AUTHORS
function renderAuthors(books) {
  const authors = [...new Set(books.map((b) => b.author))];
  authorsList.innerHTML = authors
    .map(
      (a) => `
    <span class="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-full text-sm">
      ${a}
    </span>`
    )
    .join("");
}

// TRACKER SAVE
function saveTracker() {
  localStorage.setItem("readingList", JSON.stringify(readingList));
}

function addToTracker(book) {
  if (!readingList.find((b) => b.id === book.id)) {
    readingList.push(book);
    saveTracker();
    renderTracker();
  }
}

// INIT
renderCategories();
renderTracker();
