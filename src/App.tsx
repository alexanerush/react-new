import React from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import HomePage from "./pages/HomePage";
import MenuPage from "./pages/Menu";
import LoginPage from "./pages/LoginPage";
import OrderPage from "./pages/OrderPage";

import Header from "./components/Header";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

import { addToCart, type CartItemPayload } from "./store/cartSlice";
import type { RootState, AppDispatch } from "./store/store";
import type { ProductInCart } from "./components/Card";

function App() {
  const dispatch = useDispatch<AppDispatch>();

  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  const handleAddToCart = (item: ProductInCart) => {
    // addToCart принимает payload с quantity (и может игнорить остальное)
    dispatch(addToCart(item as CartItemPayload));
  };

  return (
    <div className="app">
      <Header />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/menu"
          element={<MenuPage onAddToCart={handleAddToCart} />}
        />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/order"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <OrderPage />
            </ProtectedRoute>
          }
        />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
