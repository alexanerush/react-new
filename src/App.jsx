import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import MenuPage from "./pages/Menu";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  const [cartCount, setCartCount] = useState(0);

  const handleAddToCart = (item) => {
    const qty = item?.quantity ? Number(item.quantity) : 1;
    setCartCount((prev) => prev + qty);
  };

  return (
    <Router>
      <div className="app">
        <Header cartCount={cartCount} />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/menu"
            element={<MenuPage onAddToCart={handleAddToCart} />}
          />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
