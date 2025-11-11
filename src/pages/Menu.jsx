import React, { useState, useEffect } from "react";
import Card from "../components/Card";
import Button from "../components/Button";
import "../styles/Menu.css";

const MEALS_API = "https://65de35f3dccfcd562f5691bb.mockapi.io/api/v1/meals";
const INITIAL_VISIBLE = 6;

const MenuPage = ({ onAddToCart = () => {} }) => {
  const [meals, setMeals] = useState([]);
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    const fetchMeals = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(MEALS_API);
        const data = await response.json();
        const mealsData = Array.isArray(data) ? data : [];
        setMeals(mealsData);

        const uniqueCategories = Array.from(
          new Set(mealsData.map((meal) => meal.category).filter(Boolean))
        );
        if (uniqueCategories.length > 0) {
          setSelectedCategory(uniqueCategories[0]);
        }
      } catch (err) {
        console.error("Error fetching meals:", err);
        setError("Failed to load menu. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMeals();
  }, []);

  const categories = Array.from(
    new Set(meals.map((meal) => meal.category).filter(Boolean))
  );

  const activeCategory = selectedCategory || (categories.length ? categories[0] : "");

  const filteredMeals = activeCategory
    ? meals.filter(
        (meal) =>
          meal.category &&
          meal.category.toLowerCase() === activeCategory.toLowerCase()
      )
    : meals;

  const visibleMeals = filteredMeals.slice(0, visibleCount);
  const hasMore = visibleCount < filteredMeals.length;

  const handleSeeMore = () => {
    setVisibleCount((prev) => prev + INITIAL_VISIBLE);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setVisibleCount(INITIAL_VISIBLE);
  };

  const renderContent = () => {
    if (isLoading) {
      return <p>Loading...</p>;
    }

    if (error) {
      return <p className="error-text">{error}</p>;
    }

    if (visibleMeals.length === 0) {
      return <p>No meals available.</p>;
    }

    return (
      <div className="item-cards">
        {visibleMeals.map((meal) => (
          <Card key={meal.id} product={meal} onAddToCart={onAddToCart} />
        ))}
      </div>
    );
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
          {categories.map((category) => (
            <Button
              key={category}
              className={`filter-button ${
                activeCategory === category ? "active" : ""
              }`}
              onClick={() => handleCategoryClick(category)}
            >
              {category}
            </Button>
          ))}
        </div>

        {renderContent()}

        {hasMore && !isLoading && !error && (
          <Button className="button--more" onClick={handleSeeMore}>
            See more
          </Button>
        )}
      </div>
    </div>
  );
};

export default MenuPage;
