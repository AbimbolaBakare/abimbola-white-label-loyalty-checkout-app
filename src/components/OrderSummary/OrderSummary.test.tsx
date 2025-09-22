import { render, screen } from "@testing-library/react";
import OrderSummary from "./OrderSummary";
import type { DiscountResult } from "../../types";

describe("OrderSummary", () => {
  it("should render basic order summary without discounts", () => {
    const mockResult: DiscountResult = {
      subtotal: 10.0,
      bogofSavings: 0,
      orderDiscount: 0,
      grandTotal: 10.0,
    };

    render(<OrderSummary {...mockResult} />);

    expect(screen.getByText("Subtotal:")).toBeInTheDocument();
    expect(screen.getAllByText("£10.00")).toHaveLength(2);
    expect(screen.getByText("Total:")).toBeInTheDocument();

    expect(screen.queryByText("BOGOF Asparagus:")).not.toBeInTheDocument();
    expect(
      screen.queryByText("20% off orders over £10:")
    ).not.toBeInTheDocument();
  });

  it("should render BOGOF discount when present", () => {
    const mockResult: DiscountResult = {
      subtotal: 5.0,
      bogofSavings: 2.5,
      orderDiscount: 0,
      grandTotal: 5.0,
    };

    render(<OrderSummary {...mockResult} />);

    expect(screen.getByText("BOGOF Asparagus:")).toBeInTheDocument();
    expect(screen.getByText("−£2.50")).toBeInTheDocument();
    expect(
      screen.queryByText("20% off orders over £10:")
    ).not.toBeInTheDocument();
  });

  it("should render order discount(20%) when present", () => {
    const mockResult: DiscountResult = {
      subtotal: 20.0,
      bogofSavings: 0,
      orderDiscount: 4.0,
      grandTotal: 16.0,
    };

    render(<OrderSummary {...mockResult} />);

    expect(screen.getByText("20% off orders over £10:")).toBeInTheDocument();
    expect(screen.getByText("−£4.00")).toBeInTheDocument();
    expect(screen.queryByText("BOGOF Asparagus:")).not.toBeInTheDocument();
  });

  it("should render both discounts when present", () => {
    const mockResult: DiscountResult = {
      subtotal: 25.0,
      bogofSavings: 3.32,
      orderDiscount: 5.0,
      grandTotal: 20.0,
    };

    render(<OrderSummary {...mockResult} />);

    expect(screen.getByText("Subtotal:")).toBeInTheDocument();
    expect(screen.getByText("£25.00")).toBeInTheDocument();

    expect(screen.getByText("BOGOF Asparagus:")).toBeInTheDocument();
    expect(screen.getByText("−£3.32")).toBeInTheDocument();

    expect(screen.getByText("20% off orders over £10:")).toBeInTheDocument();
    expect(screen.getByText("−£5.00")).toBeInTheDocument();

    expect(screen.getByText("Total:")).toBeInTheDocument();
    expect(screen.getByText("£20.00")).toBeInTheDocument();
  });
});
