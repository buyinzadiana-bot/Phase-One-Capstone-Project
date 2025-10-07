PHASE ONE CAPSTONE PROJECT (BOOK CATALOGUE DESCRIPTION)

The Book Catalogue is a web platform for discovering, tracking, and managing books across all genres. Users can explore categories, search for titles, and save favorites or track their reading progress. It also features author highlights, a personal reading tracker, and an intuitive, responsive interface.


1. Structure & Organization

* HTML Pages:

All pages have a consistent layout with a sticky header, mobile-responsive navigation, and TailwindCSS styling.

Mobile menus with toggling are implemented consistently.

Semantic sections (<header>, <main>, <section>, <footer>) are used correctly.

Hero sections, category sections, book grids, and footers are cleanly organized.

* JavaScript:

index.js handles categories, books, authors, and the reading tracker.

discover.js handles search, favorites, modals, and toast notifications.

APIs.js handles fetching data from Open Library with error handling.

* Local Storage Usage:

Reading list and favorites are saved in localStorage and synchronized across pages using events.

Overall: Very organized and modular. Each file has a clear responsibility.

2. UI & UX

* TailwindCSS Usage:

Excellent use of Tailwind classes for responsive design, dark mode support, hover effects, and rounded elements.

Cards for books and authors look visually appealing.

* Responsiveness:

Mobile menus, grid layouts, and sections scale nicely on different screen sizes.

* User Experience:

Book tracking, favorites, and modal popups are intuitive.

Toast messages provide immediate feedback.

Search feature includes “Searching…” feedback.

3. Functionality

*C ategory Selection: Dynamic rendering of categories, books, and authors.

* Book Tracker: Add/remove functionality with persistent local storage.

* Favorites: Can add/remove books; synced across pages via favoritesUpdated event.

* Search: Works well with API calls and fallback messages.

* Modals: Show detailed book info with add/remove favorite option.


4. API Integration

* Fetches data correctly from Open Library.

* Handles missing authors and covers gracefully.

* Error handling included.

5. Code Quality

* Readable, modular, and well-indented.

* Consistent naming conventions (camelCase) and clear variable names (currentBooks, readingList, favorites).

* Makes good use of ES6 features (async/await, import/export, arrow functions, template literals).

  IMAGES OF HOW MY WEBSITE LOOKS LIKE

* ![image alt ](https://github.com/buyinzadiana-bot/Phase-One-Capstone-Project/blob/40cae3ab57701445c37499db7bebe69e443f6624/Home.jpeg)
* ![image alt ]( https://github.com/buyinzadiana-bot/PHASE-1-CAPSTONE/blob/3c9dde8ae7168bb038c496230753392ed085f164/Discover.jpeg)
* ![image alt ](https://github.com/buyinzadiana-bot/PHASE-1-CAPSTONE/blob/28ab1c0394dbd2a5d2447f8c50fda4cb665c7fb9/Favorite.jpeg )
* ![image alt ]( https://github.com/buyinzadiana-bot/PHASE-1-CAPSTONE/blob/e68e38dad4f6e5c1092a90f58a1b0c01e72dadbc/About.jpeg)
* ![image alt ](https://github.com/buyinzadiana-bot/PHASE-1-CAPSTONE/blob/f1e3a9ac28c6b23322d2d325b31900f64ccfc364/Sign%20up.jpeg )




<img width="468" height="645" alt="image" src="https://github.com/user-attachments/assets/90836873-a72d-45ae-b426-55c210b00a6a" />

