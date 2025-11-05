import React, { useState, useEffect } from "react";
import Card from "../components/Card";
import Button from "../components/Button";
import "../styles/Menu.css";

const MEALS_API = "https://65de35f3dccfcd562f5691bb.mockapi.io/api/v1/meals";
const INITIAL_VISIBLE = 6;
const CATEGORIES = ["Dessert", "Dinner", "Breakfast"];

const MenuPage = ({ onAddToCart = () => {} }) => {
  const [meals, setMeals] = useState([]);
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Dessert"); 

  useEffect(() => {
    const fetchMeals = async () => {
      setIsLoading(true);
      setError("");
      try {
        const response = await fetch(MEALS_API);
        const data = await response.json();
        setMeals(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error fetching meals:", err);
        setError("Failed to load menu. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMeals();
  }, []);

  const filteredMeals = meals.filter(
    (meal) =>
      meal.category &&
      meal.category.toLowerCase() === selectedCategory.toLowerCase()
  );

  const visibleMeals = filteredMeals.slice(0, visibleCount);
  const hasMore = visibleCount < filteredMeals.length;

  const handleSeeMore = () => {
    setVisibleCount((prev) => prev + INITIAL_VISIBLE);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setVisibleCount(INITIAL_VISIBLE);
  };

  return (
    <div className="menu-page">
      <div className="menu-container">
        <h1 className="menu-title">Browse our menu</h1>
        <p className="menu-subtitle">
          Use our menu to place an order online, or{" "}
          <span className="highlight">phone</span> our store to place a pickup
          order. Fast and fresh food.
        </p>

        <div className="menu-filters">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              className={`filter-button ${
                selectedCategory === category ? "active" : ""
              }`}
              onClick={() => handleCategoryClick(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {isLoading && <p>Loading...</p>}
        {error && <p className="error-text">{error}</p>}

        <div className="item-cards">
          {!isLoading &&
            !error &&
            visibleMeals.map((meal) => (
              <Card key={meal.id} product={meal} onAddToCart={onAddToCart} />
            ))}

          {!isLoading && !error && visibleMeals.length === 0 && (
            <p>No meals available.</p>
          )}
        </div>

        {hasMore && !isLoading && (
          <Button className="button--more" onClick={handleSeeMore}>
            See more
          </Button>
        )}
      </div>
    </div>
  );
};

export default MenuPage;
