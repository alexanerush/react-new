import React from "react";
import { Link } from "react-router-dom";
import "../styles/Header.css";
import Logo from "./Logo";
import CartIcon from "./CartIcon";

const Header = ({ cartCount = 0 }) => {
  return (
    <header className="header">
      <nav className="nav">
        <Logo />

        <ul className="nav-links">
          <li>
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          <li>
            <Link to="/menu" className="nav-link">
              Menu
            </Link>
          </li>
          <li>
            <Link to="/company" className="nav-link">
              Company
            </Link>
          </li>
          <li>
            <Link to="/login" className="nav-link">
              Login
            </Link>
          </li>
        </ul>

        <CartIcon itemCount={cartCount} />
      </nav>
    </header>
  );
};

export default Header;
