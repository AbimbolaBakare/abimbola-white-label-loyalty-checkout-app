export interface Product {
  code: string;
  name: string;
  price: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
}

export interface DiscountResult {
  subtotal: number;
  bogofSavings: number;
  orderDiscount: number;
  grandTotal: number;
}

export interface ProductsResult {
  products: Product[];
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

export type CartAction =
  | { type: "ADD_PRODUCT"; product: Product }
  | { type: "INCREASE_QUANTITY"; code: string }
  | { type: "DECREASE_QUANTITY"; code: string }
  | { type: "CLEAR_CART" };
