import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { MemoryRouter } from "react-router-dom";

import Header from "./Header";
import cartReducer from "../store/cartSlice";
import authReducer from "../store/authSlice";
import { LanguageProvider } from "../i18n/LanguageContext";
import { ThemeProvider } from "../theme/ThemeContext";

function renderHeader(preloadedState: any = {}) {
  const store = configureStore({
    reducer: { cart: cartReducer, auth: authReducer },
    preloadedState,
  });

  render(
    <Provider store={store}>
      <MemoryRouter>
        <ThemeProvider>
          <LanguageProvider>
            <Header />
          </LanguageProvider>
        </ThemeProvider>
      </MemoryRouter>
    </Provider>
  );

  return store;
}

describe("Header (cart count)", () => {
  it("shows cart badge when cart.count > 0", () => {
    renderHeader({
      cart: { count: 5 },
      auth: { isAuthenticated: false },
    });

    expect(screen.getByText("5")).toBeInTheDocument();
  });

  it("does not show cart badge when cart.count is 0", () => {
    renderHeader({
      cart: { count: 0 },
      auth: { isAuthenticated: false },
    });

    expect(screen.queryByText("0")).not.toBeInTheDocument();
  });
});
