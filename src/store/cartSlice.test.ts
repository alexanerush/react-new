import { describe, it, expect } from "vitest";
import cartReducer, { addToCart, resetCart } from "./cartSlice";

describe("cartSlice", () => {
  it("should return initial state", () => {
    const state = cartReducer(undefined, { type: "UNKNOWN" });
    expect(state).toEqual({ count: 0 });
  });

  it("addToCart: increments by 1 when payload has no quantity", () => {
    const state = cartReducer({ count: 0 }, addToCart({} as any));
    expect(state.count).toBe(1);
  });

  it("addToCart: increments by payload.quantity", () => {
    const state = cartReducer({ count: 0 }, addToCart({ quantity: 3 } as any));
    expect(state.count).toBe(3);
  });

  it("addToCart: if quantity is not a number -> increments by 1", () => {
    const state = cartReducer({ count: 0 }, addToCart({ quantity: "lol" } as any));
    expect(state.count).toBe(1);
  });

  it("resetCart: sets count to 0", () => {
    const state = cartReducer({ count: 10 }, resetCart());
    expect(state.count).toBe(0);
  });
});
