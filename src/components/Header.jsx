import React from "react";
import "../styles/Header.css";             

import logo from "../assets/logo.png";
import Cart from "../assets/Cart.png";


const Header = () => {
  return (
    <header className="header">
      <nav className="nav">
        <div className="logo">
          <img src={logo} alt="Logo" />
        </div>

        <ul className="nav-links">
          <li><button>Home</button></li>
          <li><button>Menu</button></li>
          <li><button>Company</button></li>
          <li><button>Login</button></li>
        </ul>

        <div className="Cart">
          <img src={Cart} alt="cart" />
        </div>
      </nav>
    </header>
  );
};

export default Header;
