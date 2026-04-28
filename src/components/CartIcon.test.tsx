import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import CartIcon from "./CartIcon";

describe("CartIcon", () => {
  it("does not render count badge when itemCount is 0", () => {
    render(<CartIcon itemCount={0} />);
    expect(screen.queryByText("0")).not.toBeInTheDocument();
  });

  it("renders count badge when itemCount > 0", () => {
    render(<CartIcon itemCount={3} />);
    expect(screen.getByText("3")).toBeInTheDocument();
  });

  it("always renders the cart image", () => {
    render(<CartIcon itemCount={0} />);
    expect(screen.getByAltText(/cart icon/i)).toBeInTheDocument();
  });
});
