import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/HomePage.css";           
import mainImage from "../assets/homepage.svg";
import star from "../assets/star.png";

const HomePage = () => {
  return (
    <>
      <Header />
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

            <button className="order-btn">Place an Order</button>

            <div className="star">
              <img src={star} alt="rating stars" />
            </div>

            <div className="reviews">
              <h1>
                <span className="hightlight">4.8 out of 5</span> based on 2000+ reviews
              </h1>
            </div>
          </div>

          <div className="main-img">
            <img src={mainImage} alt="Delivery illustration" />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default HomePage;
