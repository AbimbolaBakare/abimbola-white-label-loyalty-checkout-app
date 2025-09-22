import { render, screen, fireEvent } from "@testing-library/react";
import CartItem from "./CartItem";
import type { CartItem as CartItemType } from "../../types";

describe("CartItem", () => {
  const mockCartItem: CartItemType = {
    product: {
      code: "CA6",
      name: "Cake",
      price: 2.0,
    },
    quantity: 3,
  };

  const mockOnIncrease = jest.fn();
  const mockOnDecrease = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render cart item information correctly", () => {
    render(
      <CartItem
        item={mockCartItem}
        onIncrease={mockOnIncrease}
        onDecrease={mockOnDecrease}
      />
    );

    expect(screen.getByText("Cake")).toBeInTheDocument();
    expect(screen.getByText("(CA6)")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
    expect(screen.getByText("£6.00")).toBeInTheDocument();
  });

  it("should calculate item total correctly", () => {
    const expensiveItem: CartItemType = {
      product: {
        code: "A21",
        name: "Kitty Litter",
        price: 18.99,
      },
      quantity: 2,
    };

    render(
      <CartItem
        item={expensiveItem}
        onIncrease={mockOnIncrease}
        onDecrease={mockOnDecrease}
      />
    );

    expect(screen.getByText("£37.98")).toBeInTheDocument();
  });

  it("should call onIncrease when increase button is clicked", () => {
    render(
      <CartItem
        item={mockCartItem}
        onIncrease={mockOnIncrease}
        onDecrease={mockOnDecrease}
      />
    );

    const increaseButton = screen.getByRole("button", {
      name: "Add one Cake",
    });
    fireEvent.click(increaseButton);

    expect(mockOnIncrease).toHaveBeenCalledTimes(1);
  });

  it("should call onDecrease when decrease button is clicked", () => {
    render(
      <CartItem
        item={mockCartItem}
        onIncrease={mockOnIncrease}
        onDecrease={mockOnDecrease}
      />
    );

    const decreaseButton = screen.getByRole("button", {
      name: "Remove one Cake",
    });
    fireEvent.click(decreaseButton);

    expect(mockOnDecrease).toHaveBeenCalledTimes(1);
  });

  it("should handle multiple clicks on buttons", () => {
    render(
      <CartItem
        item={mockCartItem}
        onIncrease={mockOnIncrease}
        onDecrease={mockOnDecrease}
      />
    );

    const increaseButton = screen.getByRole("button", {
      name: "Add one Cake",
    });
    const decreaseButton = screen.getByRole("button", {
      name: "Remove one Cake",
    });

    fireEvent.click(increaseButton);
    fireEvent.click(increaseButton);
    fireEvent.click(decreaseButton);

    expect(mockOnIncrease).toHaveBeenCalledTimes(2);
    expect(mockOnDecrease).toHaveBeenCalledTimes(1);
  });
});
