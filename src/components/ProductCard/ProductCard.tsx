import React from "react";
import type { Product } from "../../types";
import styles from "./ProductCard.module.css";

interface ProductCardProps {
  product: Product;
  onAddProduct: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddProduct }) => {
  return (
    <button
      className={styles.productCard}
      onClick={() => onAddProduct(product)}
      aria-label={`Add ${product.name} to cart, £${product.price.toFixed(2)}`}
    >
      <div className={styles.productName}>{product.name}</div>
      <div className={styles.productPrice}>£{product.price.toFixed(2)}</div>
      <div className={styles.productCode}>{product.code}</div>
    </button>
  );
};

export default ProductCard;
