import {
  calculateBogofPricing,
  calculateOrderDiscount,
  calculateCartTotal,
} from "./businessLogic";
import type { CartItem, Product } from "../types";
import { PRODUCTS } from "../data/products";

describe("businessLogic", () => {
  const mockProducts: Product[] = PRODUCTS;

  describe("calculateBogofPricing", () => {
    it("should apply BOGOF discount for asparagus (G95)", () => {
      const item: CartItem = {
        product: mockProducts[2],
        quantity: 4,
      };

      const result = calculateBogofPricing(item);

      expect(result.subtotal).toBe(1.66);
      expect(result.bogofSavings).toBe(1.66);
    });

    it("should not apply BOGOF discount for non-asparagus products", () => {
      const item: CartItem = {
        product: mockProducts[0],
        quantity: 4,
      };

      const result = calculateBogofPricing(item);

      expect(result.subtotal).toBe(8.0);
      expect(result.bogofSavings).toBe(0);
    });

    it("should handle single quantity items", () => {
      const item: CartItem = {
        product: mockProducts[2],
        quantity: 1,
      };

      const result = calculateBogofPricing(item);

      expect(result.subtotal).toBe(0.83);
      expect(result.bogofSavings).toBe(0);
    });
  });

  describe("calculateOrderDiscount", () => {
    it("should apply 20% discount for orders over £10", () => {
      const result = calculateOrderDiscount(15.0);
      expect(result).toBe(3.0);
    });

    it("should not apply discount for orders at exactly £10", () => {
      const result = calculateOrderDiscount(10.0);
      expect(result).toBe(0);
    });

    it("should not apply discount for orders under £10", () => {
      const result = calculateOrderDiscount(9.99);
      expect(result).toBe(0);
    });
  });

  describe("calculateCartTotal", () => {
    it("should calculate total with only regular items", () => {
      const items: CartItem[] = [
        { product: mockProducts[0], quantity: 2 },
        { product: mockProducts[1], quantity: 1 },
      ];

      const result = calculateCartTotal(items);

      expect(result.subtotal).toBe(22.99);
      expect(result.bogofSavings).toBe(0);
      expect(result.orderDiscount).toBe(4.598);
      expect(result.grandTotal).toBe(18.392);
    });

    it("should calculate total with BOGOF PRODUCT", () => {
      const items: CartItem[] = [{ product: mockProducts[2], quantity: 4 }];

      const result = calculateCartTotal(items);

      expect(result.subtotal).toBe(1.66);
      expect(result.bogofSavings).toBe(1.66);
      expect(result.orderDiscount).toBe(0);
      expect(result.grandTotal).toBe(1.66);
    });

    it("should calculate total with mixed items and consider all discounts", () => {
      const items: CartItem[] = [
        { product: mockProducts[0], quantity: 3 },
        { product: mockProducts[1], quantity: 1 },
        { product: mockProducts[2], quantity: 6 },
      ];

      const result = calculateCartTotal(items);

      expect(Number(result.subtotal.toFixed(2))).toBe(27.48);
      expect(Number(result.bogofSavings.toFixed(2))).toBe(2.49);
      expect(Number(result.orderDiscount.toFixed(2))).toBe(5.5);
      expect(Number(result.grandTotal.toFixed(2))).toBe(21.98);
    });

    it("should handle empty cart", () => {
      const result = calculateCartTotal([]);

      expect(result.subtotal).toBe(0);
      expect(result.bogofSavings).toBe(0);
      expect(result.orderDiscount).toBe(0);
      expect(result.grandTotal).toBe(0);
    });

    it("should handle cart with items totaling exactly £10", () => {
      const items: CartItem[] = [{ product: mockProducts[0], quantity: 5 }];

      const result = calculateCartTotal(items);

      expect(result.subtotal).toBe(10.0);
      expect(result.bogofSavings).toBe(0);
      expect(result.orderDiscount).toBe(0);
      expect(result.grandTotal).toBe(10.0);
    });
  });
});
