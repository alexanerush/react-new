import React, { useEffect, useMemo, useState } from "react";
import Card, { type Product, type ProductInCart } from "../components/Card";
import Button from "../components/Button";
import "../styles/Menu.css";
import useFetch from "../hooks/useFetch";

const MEALS_API = "https://65de35f3dccfcd562f5691bb.mockapi.io/api/v1/meals";
const INITIAL_VISIBLE = 6;

type Meal = Product & {
  id?: string | number;
  category?: string | null;
};

type MenuPageProps = {
  onAddToCart?: (item: ProductInCart) => void;
};

const MenuPage: React.FC<MenuPageProps> = ({ onAddToCart = () => {} }) => {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [visibleCount, setVisibleCount] = useState<number>(INITIAL_VISIBLE);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const fetchWithLogger = useFetch();

  useEffect(() => {
    const fetchMeals = async () => {
      setIsLoading(true);
      setError("");

      try {
        const response = await fetchWithLogger(MEALS_API);
        const data: unknown = await response.json();

        const mealsData: Meal[] = Array.isArray(data) ? (data as Meal[]) : [];
        setMeals(mealsData);

        const uniqueCategories = Array.from(
          new Set(
            mealsData
              .map((meal) => meal.category)
              .filter((c): c is string => Boolean(c && c.trim()))
          )
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
  }, [fetchWithLogger]);

  const categories = useMemo<string[]>(
    () =>
      Array.from(
        new Set(
          meals
            .map((meal) => meal.category)
            .filter((c): c is string => Boolean(c && c.trim()))
        )
      ),
    [meals]
  );

  const activeCategory =
    selectedCategory || (categories.length ? categories[0] : "");

  const filteredMeals = useMemo<Meal[]>(
    () =>
      activeCategory
        ? meals.filter(
            (meal) =>
              typeof meal.category === "string" &&
              meal.category.toLowerCase() === activeCategory.toLowerCase()
          )
        : meals,
    [meals, activeCategory]
  );

  const visibleMeals = filteredMeals.slice(0, visibleCount);
  const hasMore = visibleCount < filteredMeals.length;

  const handleSeeMore = () => {
    setVisibleCount((prev) => prev + INITIAL_VISIBLE);
  };

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    setVisibleCount(INITIAL_VISIBLE);
  };

  const renderContent = (): React.ReactNode => {
    if (isLoading) return <p>Loading...</p>;
    if (error) return <p className="error-text">{error}</p>;
    if (visibleMeals.length === 0) return <p>No meals available.</p>;

    return (
      <div className="item-cards">
        {visibleMeals.map((meal, idx) => (
          <Card
            key={meal.id ?? `${meal.meal ?? "meal"}-${idx}`}
            product={meal}
            onAddToCart={onAddToCart}
          />
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
              className={`filter-button ${activeCategory === category ? "active" : ""}`}
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
