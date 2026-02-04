import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../store/store";
import { logout } from "../store/authSlice";
import "../styles/Header.css";
import Logo from "./Logo";
import CartIcon from "./CartIcon";
import ThemeSwitcher from "./ThemeSwitcher";


const Header: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const cartCount = useSelector((state: RootState) => state.cart.count);
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

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
            <Link to="/order" className="nav-link">
              Order
            </Link>
          </li>
          <li>
            <Link to="/login" className="nav-link">
              Login
            </Link>
          </li>

          {isAuthenticated && (
            <li>
              <button
                type="button"
                className="nav-link nav-link-btn"
                onClick={handleLogout}
              >
                Logout
              </button>
            </li>
          )}
        </ul>

        <ThemeSwitcher />
        <CartIcon itemCount={cartCount} />
      </nav>
    </header>
  );
};

export default Header;
