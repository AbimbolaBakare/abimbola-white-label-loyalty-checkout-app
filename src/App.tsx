import React, { useMemo } from "react";
import { PRODUCTS } from "./data/products";
import ProductCard from "./components/ProductCard";
import CartItemComponent from "./components/CartItem";
import OrderSummary from "./components/OrderSummary";
import { calculateCartTotal } from "./utils/businessLogic";
import styles from "./App.module.css";
import { useCart } from "./hooks/useCart";

const App: React.FC = () => {
  const {
    items: cartItems,
    addProduct,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
  } = useCart();

  const total = useMemo(() => calculateCartTotal(cartItems), [cartItems]);

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <h1 className={styles.title}>White Label Loyalty Supermarket</h1>
        <p className={styles.subtitle}>
          Click on products to add them to the cart
        </p>
      </header>

      <main className={styles.mainContent}>
        <section className={styles.productsSection}>
          <h2 className={styles.sectionTitle}>Products</h2>
          <div className={styles.productsGrid}>
            {PRODUCTS.map((product) => (
              <ProductCard
                key={product.code}
                product={product}
                onAddProduct={addProduct}
              />
            ))}
          </div>
        </section>

        <section className={styles.cartSection}>
          <div className={styles.cartHeader}>
            <h2 className={styles.sectionTitle}>Your Order</h2>
            {cartItems.length > 0 && (
              <button
                onClick={clearCart}
                className={styles.clearButton}
                aria-label="Clear all items from cart"
              >
                Clear Cart
              </button>
            )}
          </div>

          {cartItems.length === 0 ? (
            <div className={styles.emptyCart}>
              <p className={styles.emptyMessage}>Your cart is empty</p>
              <p className={styles.emptySubtext}>
                Click on products to add them to your cart
              </p>
            </div>
          ) : (
            <>
              <div className={styles.cartItems}>
                {cartItems.map((item) => (
                  <CartItemComponent
                    key={item.product.code}
                    item={item}
                    onIncrease={() => increaseQuantity(item.product.code)}
                    onDecrease={() => decreaseQuantity(item.product.code)}
                  />
                ))}
              </div>

              <OrderSummary {...total} />
            </>
          )}
        </section>
      </main>
    </div>
  );
};

export default App;
