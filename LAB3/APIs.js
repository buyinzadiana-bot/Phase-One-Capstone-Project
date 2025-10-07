// LAB3/APIs.js
export async function fetchBooks(query) {
  try {
    const response = await fetch(
      `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`
    );
    const data = await response.json();

    return data.docs.slice(0, 100).map((book) => ({
      id: book.key,
      title: book.title,
      author: book.author_name ? book.author_name[0] : "Unknown Author",
      cover: book.cover_i
        ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
        : "https://via.placeholder.com/150x200?text=No+Cover",
    }));
  } catch (err) {
    console.error("Error fetching books:", err);
    return [];
  }
}
