import { renderHook, waitFor } from "@testing-library/react";
import { useProducts } from "./useProducts";
import { productService } from "../services/productService";
import { PRODUCTS } from "../data/products";

jest.mock("../services/productService", () => ({
  productService: {
    getProducts: jest.fn(),
  },
}));

const mockProductService = productService as jest.Mocked<typeof productService>;

describe("useProducts", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should initialize with loading state", () => {
    mockProductService.getProducts.mockImplementation(
      () => new Promise(() => {})
    );

    const { result } = renderHook(() => useProducts());

    expect(result.current.products).toEqual([]);
    expect(result.current.isLoading).toBe(true);
    expect(result.current.error).toBe(null);
  });

  it("should load products successfully", async () => {
    mockProductService.getProducts.mockResolvedValue(PRODUCTS);

    const { result } = renderHook(() => useProducts());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.products).toEqual(PRODUCTS);
    expect(result.current.error).toBe(null);
    expect(mockProductService.getProducts).toHaveBeenCalledTimes(1);
  });

  it("should handle loading error with Error object", async () => {
    const errorMessage = "Network error";
    mockProductService.getProducts.mockRejectedValue(new Error(errorMessage));

    const { result } = renderHook(() => useProducts());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.products).toEqual([]);
    expect(result.current.error).toBe(errorMessage);
    expect(console.error).toHaveBeenCalledWith(
      "Error loading products:",
      expect.any(Error)
    );
  });
});
