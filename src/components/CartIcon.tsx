import React from "react";
import CartImg from "../assets/Cart.png";

type CartIconProps = {
  itemCount?: number;
};

const CartIcon: React.FC<CartIconProps> = ({ itemCount = 0 }) => (
  <div className="cart">
    <img src={CartImg} alt="Cart icon" className="cart-icon" />
    {itemCount > 0 && <span className="cart-count">{itemCount}</span>}
  </div>
);

export default CartIcon;
