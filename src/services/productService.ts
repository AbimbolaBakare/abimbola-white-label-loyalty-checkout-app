import { PRODUCTS } from "../data/products";
import type { Product } from "../types";

export const productService = {
  getProducts: async (): Promise<Product[]> => {
    await new Promise((resolve) => setTimeout(resolve, 1200));
    return PRODUCTS;
  },
};
