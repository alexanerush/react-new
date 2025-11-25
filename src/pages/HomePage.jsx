import React from "react";
import Button from "../components/Button";
import "../styles/HomePage.css";
import mainImage from "../assets/homepage.svg";
import star from "../assets/star.png";
import Tooltip from "../components/Tooltip";

const HomePage = () => {
  return (
    <main className="main-page">
      <section className="main">
        <div className="main-text">
          <h1>
            Beautiful food & <br />
            takeaway, <span className="blueword">delivered</span> <br />
            to your door.
          </h1>

          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500.
          </p>

          <Button text="Place an Order" className="order-btn" disabled />


          <div className="star">
            <img src={star} alt="rating stars" />
          </div>
          
          <div className="rating-block">
            <div className="stars">★★★★★</div>
          </div>

          <div className="reviews">
            <h2>
              <span className="hightlight">4.8 out of 5</span> based on 2000+
              reviews
            </h2>
          </div>

          <p className="contact-text">
            For more information —{" "}
            <Tooltip text="+3706578976">
              <span className="call-word">call us</span>
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
