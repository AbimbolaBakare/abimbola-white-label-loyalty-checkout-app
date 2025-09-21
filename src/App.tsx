import React from "react";
import { PRODUCTS } from "./data/products";
import styles from "./App.module.css";

const App: React.FC = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>White Label Loyalty Supermarket</h1>

      <section className={styles.productsSection}>
        <h2 className={styles.sectionTitle}>Products</h2>
        <div className={styles.productsList}>
          {PRODUCTS.map((product) => (
            <div key={product.code} className={styles.productItem}>
              <div className={styles.productName}>{product.name}</div>
              <div className={styles.productPrice}>£{product.price}</div>
              <div className={styles.productCode}>{product.code}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default App;
