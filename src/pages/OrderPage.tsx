import React from "react";
import "../styles/OrderPage.css";

const OrderPage: React.FC = () => {
  return (
    <main className="order-wrapper">
      <section className="order-card">
        <h1 className="order-title">Order Page (protected)</h1>
        <p className="order-text">You are logged in</p>
      </section>
    </main>
  );
};

export default OrderPage;
