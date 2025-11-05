import React from "react";
import "../styles/Footer.css";
import { FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import logo from "../assets/logo.png";
import PatternFooter from "../assets/PatternFooter.png";

const footerData = [
  {
    title: "Company",
    links: ["Home", "Order", "FAQ", "Contact"],
  },
  {
    title: "Template",
    links: ["Style Guide", "Changelog", "Licence", "Webflow University"],
  },
  {
    title: "Flowbase",
    links: ["More Cloneables"],
  },
];

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-pattern">
          <img src={PatternFooter} alt="pattern" />
        </div>

        <div className="columns">
          <div className="logo-column">
            <img src={logo} alt="Logo" className="footer-logo" />
            <p className="footer-description">
              Takeaway & Delivery template <br /> for small – medium businesses.
            </p>
          </div>

          <div className="footer-columns">
            {footerData.map((column) => (
              <div className="footer-column" key={column.title}>
                <p className="footer-column-title">{column.title}</p>
                <ul className="footer-links">
                  {column.links.map((link) => (
                    <li className="footer-link-item" key={link}>
                      <button className="footer-link-btn">{link}</button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          Built by{" "}
          <span className="footer-bottom-link">Flowbase</span> · Powered by{" "}
          <span className="footer-bottom-link">Webflow</span>
        </p>
        <div className="footer-socials">
          <FaInstagram />
          <FaTwitter />
          <FaYoutube />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
