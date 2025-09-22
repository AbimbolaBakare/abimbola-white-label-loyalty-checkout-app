import { renderHook, act } from "@testing-library/react";
import { useCart } from "./useCart";
import type { Product } from "../types";

describe("useCart", () => {
  const mockProducts: Product[] = [
    { code: "CA6", name: "Cake", price: 2.0 },
    { code: "A21", name: "Kitty Litter", price: 18.99 },
    { code: "G95", name: "Asparagus", price: 0.83 },
  ];

  it("should initialize with empty cart", () => {
    const { result } = renderHook(() => useCart());

    expect(result.current.items).toEqual([]);
  });

  describe("addProduct", () => {
    it("should add new product to cart", () => {
      const { result } = renderHook(() => useCart());

      act(() => {
        result.current.addProduct(mockProducts[0]);
      });

      expect(result.current.items).toHaveLength(1);
      expect(result.current.items[0]).toEqual({
        product: mockProducts[0],
        quantity: 1,
      });
    });

    it("should increase quantity when adding existing product", () => {
      const { result } = renderHook(() => useCart());

      act(() => {
        result.current.addProduct(mockProducts[0]);
        result.current.addProduct(mockProducts[0]);
      });

      expect(result.current.items).toHaveLength(1);
      expect(result.current.items[0].quantity).toBe(2);
    });

    it("should add multiple different products", () => {
      const { result } = renderHook(() => useCart());

      act(() => {
        result.current.addProduct(mockProducts[0]);
        result.current.addProduct(mockProducts[1]);
      });

      expect(result.current.items).toHaveLength(2);
      expect(result.current.items[0].product.code).toBe("CA6");
      expect(result.current.items[1].product.code).toBe("A21");
    });
  });

  describe("increaseQuantity", () => {
    it("should increase quantity of existing item", () => {
      const { result } = renderHook(() => useCart());

      act(() => {
        result.current.addProduct(mockProducts[0]);
        result.current.increaseQuantity("CA6");
      });

      expect(result.current.items[0].quantity).toBe(2);
    });

    it("should not add non-existing product code", () => {
      const { result } = renderHook(() => useCart());

      act(() => {
        result.current.addProduct(mockProducts[0]);
        result.current.increaseQuantity("INVALID");
      });

      expect(result.current.items).toHaveLength(1);
      expect(result.current.items[0].quantity).toBe(1);
    });
  });

  describe("decreaseQuantity", () => {
    it("should decrease quantity of existing item", () => {
      const { result } = renderHook(() => useCart());

      act(() => {
        result.current.addProduct(mockProducts[0]);
        result.current.increaseQuantity("CA6");
        result.current.decreaseQuantity("CA6");
      });

      expect(result.current.items[0].quantity).toBe(1);
    });

    it("should remove item when quantity reaches zero", () => {
      const { result } = renderHook(() => useCart());

      act(() => {
        result.current.addProduct(mockProducts[0]);
        result.current.decreaseQuantity("CA6");
      });

      expect(result.current.items).toHaveLength(0);
    });

    it("should do nothing for non-existing product code", () => {
      const { result } = renderHook(() => useCart());

      act(() => {
        result.current.addProduct(mockProducts[0]);
        result.current.decreaseQuantity("INVALID");
      });

      expect(result.current.items).toHaveLength(1);
      expect(result.current.items[0].quantity).toBe(1);
    });

    it("should not create negative quantities", () => {
      const { result } = renderHook(() => useCart());

      act(() => {
        result.current.addProduct(mockProducts[0]);
        result.current.decreaseQuantity("CA6");
        result.current.decreaseQuantity("CA6");
      });

      expect(result.current.items).toHaveLength(0);
    });
  });

  describe("clearCart", () => {
    it("should remove all items from cart", () => {
      const { result } = renderHook(() => useCart());

      act(() => {
        result.current.addProduct(mockProducts[0]);
        result.current.addProduct(mockProducts[1]);
        result.current.clearCart();
      });

      expect(result.current.items).toHaveLength(0);
    });
  });
});
