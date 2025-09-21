export interface Product {
  code: string;
  name: string;
  price: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
