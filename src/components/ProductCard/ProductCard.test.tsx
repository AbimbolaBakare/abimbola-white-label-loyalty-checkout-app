import { render, screen, fireEvent } from "@testing-library/react";
import ProductCard from "./ProductCard";
import type { Product } from "../../types";

describe("ProductCard", () => {
  const mockProduct: Product = {
    code: "CA6",
    name: "Cake",
    price: 2.0,
  };

  const mockOnAddProduct = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render product information correctly", () => {
    render(
      <ProductCard product={mockProduct} onAddProduct={mockOnAddProduct} />
    );

    expect(screen.getByText("Cake")).toBeInTheDocument();
    expect(screen.getByText("£2.00")).toBeInTheDocument();
    expect(screen.getByText("CA6")).toBeInTheDocument();
  });

  it("should call onAddProduct when clicked", () => {
    render(
      <ProductCard product={mockProduct} onAddProduct={mockOnAddProduct} />
    );

    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(mockOnAddProduct).toHaveBeenCalledTimes(1);
    expect(mockOnAddProduct).toHaveBeenCalledWith(mockProduct);
  });

  it("should handle multiple clicks", () => {
    render(
      <ProductCard product={mockProduct} onAddProduct={mockOnAddProduct} />
    );

    const button = screen.getByRole("button");
    fireEvent.click(button);
    fireEvent.click(button);
    fireEvent.click(button);

    expect(mockOnAddProduct).toHaveBeenCalledTimes(3);
    expect(mockOnAddProduct).toHaveBeenCalledWith(mockProduct);
  });
});
