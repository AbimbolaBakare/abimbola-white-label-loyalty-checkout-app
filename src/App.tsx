import React, { useMemo } from "react";
import ProductCard from "./components/ProductCard";
import CartItemComponent from "./components/CartItem";
import OrderSummary from "./components/OrderSummary";
import { calculateCartTotal } from "./utils/businessLogic";
import styles from "./App.module.css";
import { useCart } from "./hooks/useCart";
import { useProducts } from "./hooks/useProducts";
import ProductSkeleton from "./components/ProductSkeleton";

const App: React.FC = () => {
  const { products, isLoading, error, refetch } = useProducts();
  const {
    items: cartItems,
    addProduct,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
  } = useCart();

  const total = useMemo(() => calculateCartTotal(cartItems), [cartItems]);

  if (error) {
    return (
      <div className={styles.app}>
        <div className={styles.errorContainer}>
          <h1 className={styles.errorTitle}>Unable to Load Store</h1>
          <p className={styles.errorMessage}>{error}</p>
          <button onClick={refetch} className={styles.retryButton}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <h1 className={styles.title}>White Label Loyalty Supermarket</h1>
        <p className={styles.subtitle}>
          {isLoading
            ? "Loading products..."
            : "Click on products to add them to the cart"}
        </p>
      </header>

      <main className={styles.mainContent}>
        <section className={styles.productsSection}>
          <h2 className={styles.sectionTitle}>Products</h2>

          <div className={styles.productsGrid}>
            {isLoading
              ? Array.from({ length: 3 }, (_, index) => (
                  <ProductSkeleton key={`skeleton-${index}`} />
                ))
              : products.map((product) => (
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
                {isLoading
                  ? "Loading products..."
                  : "Click on products to add them to the cart"}
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
