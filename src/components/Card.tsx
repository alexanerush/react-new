import React, { useState } from "react";
import Button from "../components/Button";
import "../styles/Card.css";

export type Product = {
  id?: string | number;
  meal?: string;
  price?: string | number | null;
  img?: string | null;
  instructions?: string | null;
};

export type ProductInCart = Product & {
  quantity: number;
};

type CardProps = {
  product?: Product | null;
  onAddToCart?: (item: ProductInCart) => void;
};

const Card: React.FC<CardProps> = ({ product, onAddToCart }) => {
  const [quantity, setQuantity] = useState<number>(1);

  if (!product) return null;

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (Number.isFinite(value) && value >= 1) setQuantity(value);
  };

  const handleAddToCart = () => {
    onAddToCart?.({ ...product, quantity });
  };

  const priceNumber = product.price !== null && product.price !== undefined
    ? Number(product.price)
    : NaN;

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
            {Number.isFinite(priceNumber) ? `$${priceNumber.toFixed(2)}` : "—"}
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
            min={1}
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
