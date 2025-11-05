Food Delivery App

This project is a React single-page application for browsing and ordering meals.
It includes a main page with presentation content and a menu page that fetches data from a public API.
Users can select meal categories, adjust quantity, and add items to the cart.

# Features

- Routing - implemented with react-router-dom (Home & Menu pages)
- Dynamic menu - meals loaded from MockAPI.io
- Reusable components - Header, Footer, Card, Button
- Cart counter - updates in real time when items are added
- Category filtering - Dessert / Dinner / Breakfast
- Responsive design – adaptive layout for desktop and mobile
- Error handling & loading states



# Tech Stack

Category         Tools

Framework	      React

Routing           React Router DOM

Styling	          CSS (custom, responsive)
API	              MockAPI.io

Build tool	      Vite / Create React App (depending on setup)


# Project Structure

src/
 ├── components/
 │   ├── Header.jsx
 │   ├── Footer.jsx
 │   ├── Card.jsx
 │   ├── Button.jsx
 │   └── ...
 ├── pages/
 │   ├── HomePage.jsx
 │   └── MenuPage.jsx
 ├── styles/
 │   ├── Menu.css
 │   ├── Card.css
 │   └── ...
 ├── assets/
 ├── App.jsx
 └── main.jsx

# Installation & Setup

Clone the repository:

```bash
git clone https://github.com/alexanerush/react-new.git
cd react-new
```

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open in browser:

```arduino
http://localhost:5173
```



