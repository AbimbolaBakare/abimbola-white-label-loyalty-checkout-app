import React from "react";
import type { CartItem as CartItemType } from "../../types";
import styles from "./CartItem.module.css";

interface CartItemProps {
  item: CartItemType;
  onIncrease: () => void;
  onDecrease: () => void;
}

const CartItem: React.FC<CartItemProps> = ({
  item,
  onIncrease,
  onDecrease,
}) => {
  const itemTotal = item.quantity * item.product.price;

  return (
    <div className={styles.cartItem}>
      <div className={styles.itemDetails}>
        <div className={styles.itemName}>{item.product.name}</div>
        <div className={styles.itemCode}>({item.product.code})</div>
      </div>

      <div className={styles.quantityControls}>
        <button
          onClick={onDecrease}
          className={`${styles.quantityButton} ${styles.decreaseButton}`}
          aria-label={`Remove one ${item.product.name}`}
        >
          −
        </button>
        <span className={styles.quantity}>{item.quantity}</span>
        <button
          onClick={onIncrease}
          className={`${styles.quantityButton} ${styles.increaseButton}`}
          aria-label={`Add one ${item.product.name}`}
        >
          +
        </button>
      </div>

      <div className={styles.itemPrice}>£{itemTotal.toFixed(2)}</div>
    </div>
  );
};

export default CartItem;
