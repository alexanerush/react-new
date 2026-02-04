import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";

import Button from "../components/Button";
import "../styles/HomePage.css";
import mainImage from "../assets/homepage.svg";
import star from "../assets/star.png";
import Tooltip from "../components/Tooltip";
import { useLang } from "../i18n/LanguageContext";

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  const { t } = useLang();

  const handlePlaceOrder = () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    navigate("/order");
  };

  return (
    <main className="main-page">
      <section className="main">
        <div className="main-text">
          <h1>
            {t("home.title.line1")} <br />
            {t("home.title.line2")}{" "}
            <span className="blueword">{t("home.title.line3")}</span> <br />
            {t("home.title.line4")}
          </h1>

          <p>{t("home.description")}</p>

          <div onClick={handlePlaceOrder} style={{ display: "inline-block" }}>
            <Button text={t("home.orderButton")} className="order-btn" />
          </div>

          <div className="star">
            <img src={star} alt="rating stars" />
          </div>

          <div className="rating-block">
            <div className="stars">★★★★★</div>
          </div>

          <div className="reviews">
            <h2>{t("home.ratingText")}</h2>
          </div>

          <p className="contact-text">
            {t("home.contact")}{" "}
            <Tooltip text="+3706578976">
              <span className="call-word">{t("home.callUs")}</span>
            </Tooltip>
            .
          </p>
        </div>

        <div className="main-img">
          <img src={mainImage} alt="Delivery illustration" />
        </div>
      </section>
    </main>
  );
};

export default HomePage;
