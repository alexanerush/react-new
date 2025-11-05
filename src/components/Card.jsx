import React, { useState } from "react";
import Button from "../components/Button";
import "../styles/Card.css";

const Card = ({ product, onAddToCart }) => {
  if (!product) return null;

  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (e) => {
    const value = Number(e.target.value);
    if (value >= 1) setQuantity(value);
  };

  const handleAddToCart = () => {
    if (typeof onAddToCart === "function") {
      onAddToCart({ ...product, quantity });
    }
  };

  return (
    <div className="item-card">
      <div className="item-card-left">
        {product.img ? (
          <img
            src={product.img}
            alt={product.meal || "menu item"}
            className="item-img"
          />
        ) : (
          <div className="item-img placeholder" />
        )}
      </div>

      <div className="item-card-right">
        <div className="item-info">
          <h2 className="product-title">{product.meal}</h2>
          <span className="card-price">
            {product.price ? `$${Number(product.price).toFixed(2)}` : "—"}
          </span>
        </div>

        {product.instructions && (
          <p className="item-description">
            {product.instructions.length > 100
              ? `${product.instructions.slice(0, 100)}...`
              : product.instructions}
          </p>
        )}

        <div className="item-footer">
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={handleQuantityChange}
            className="item-amount"
          />

          <Button
            text="Add to cart"
            className="add-to-cart"
            onClick={handleAddToCart}
          />
        </div>
      </div>
    </div>
  );
};

export default Card;

