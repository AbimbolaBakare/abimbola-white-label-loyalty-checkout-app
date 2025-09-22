import { productService } from "./productService";
import { PRODUCTS } from "../data/products";

describe("productService", () => {
  beforeEach(() => {
    jest.clearAllTimers();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  describe("getProducts", () => {
    it("should return products after delay", async () => {
      const promise = productService.getProducts();

      jest.advanceTimersByTime(1200);

      const result = await promise;

      expect(result).toEqual(PRODUCTS);
      expect(result).toHaveLength(3);
      expect(result[0]).toEqual({ code: "CA6", name: "Cake", price: 2.0 });
      expect(result[1]).toEqual({
        code: "A21",
        name: "Kitty Litter",
        price: 18.99,
      });
      expect(result[2]).toEqual({
        code: "G95",
        name: "Asparagus",
        price: 0.83,
      });
    });

    it("should return products with correct structure", async () => {
      const promise = productService.getProducts();
      jest.advanceTimersByTime(1200);
      const result = await promise;

      result.forEach((product) => {
        expect(product).toHaveProperty("code");
        expect(product).toHaveProperty("name");
        expect(product).toHaveProperty("price");
      });
    });
  });
});
