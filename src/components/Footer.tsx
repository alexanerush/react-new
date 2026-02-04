import React from "react";
import "../styles/Footer.css";
import { FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import logo from "../assets/Logo1.png";
import PatternFooter from "../assets/PatternFooter.png";
import { useLang } from "../i18n/LanguageContext";

const Footer: React.FC = () => {
  const { t } = useLang();

  const footerData = [
    {
      title: t("footer.company"),
      links: [t("footer.home"), t("footer.order"), t("footer.faq"), t("footer.contact")],
    },
    {
      title: t("footer.template"),
      links: [
        t("footer.styleGuide"),
        t("footer.changelog"),
        t("footer.licence"),
        t("footer.webflowUniversity"),
      ],
    },
    {
      title: t("footer.flowbase"),
      links: [t("footer.moreCloneables")],
    },
  ];

  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-pattern">
          <img src={PatternFooter} alt="pattern" />
        </div>

        <div className="columns">
          <div className="logo-column">
            <img src={logo} alt="Logo" className="footer-logo" />
            <p className="footer-description">{t("footer.description")}</p>
          </div>

          <div className="footer-columns">
            {footerData.map((column) => (
              <div className="footer-column" key={column.title}>
                <p className="footer-column-title">{column.title}</p>
                <ul className="footer-links">
                  {column.links.map((link) => (
                    <li className="footer-link-item" key={link}>
                      <button className="footer-link-btn" type="button">
                        {link}
                      </button>
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
          {t("footer.builtBy")} <span className="footer-bottom-link">Flowbase</span> ·{" "}
          {t("footer.poweredBy")} <span className="footer-bottom-link">Webflow</span>
        </p>

        <div className="footer-socials" aria-label="Social links">
          <FaInstagram />
          <FaTwitter />
          <FaYoutube />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
