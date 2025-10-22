import React from "react";
import "../styles/Footer.css";             
import { FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import logo from "../assets/logo.png";
import PatternFooter from "../assets/PatternFooter.png";

const Footer = () => {
  return (
    <footer className="footer">            
      <div className="footer-top">
        <div className="pattern">
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
            <div className="footer-column">
              <h4>Company</h4>
              <ul>
                <li><button>Home</button></li>
                <li><button>Order</button></li>
                <li><button>FAQ</button></li>
                <li><button>Contact</button></li>
              </ul>
            </div>

            <div className="footer-column">
              <h4>Template</h4>
              <ul>
                <li><button>Style Guide</button></li>
                <li><button>Changelog</button></li>
                <li><button>Licence</button></li>
                <li><button>Webflow University</button></li>
              </ul>
            </div>

            <div className="footer-column">
              <h4>Flowbase</h4>
              <ul>
                <li><button>More Cloneables</button></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          Built by <span className="link">Flowbase</span> · Powered by <span className="link">Webflow</span>
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
