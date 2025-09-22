import React from "react";
import type { DiscountResult } from "../../types";
import styles from "./OrderSummary.module.css";

const OrderSummary: React.FC<DiscountResult> = ({
  subtotal,
  bogofSavings,
  orderDiscount,
  grandTotal,
}) => {
  return (
    <div className={styles.orderSummary}>
      <div className={styles.summaryLine}>
        <span>Subtotal:</span>
        <span>£{subtotal.toFixed(2)}</span>
      </div>

      {bogofSavings > 0 && (
        <div className={styles.discountLine}>
          <span>BOGOF Asparagus:</span>
          <span>−£{bogofSavings.toFixed(2)}</span>
        </div>
      )}

      {orderDiscount > 0 && (
        <div className={styles.discountLine}>
          <span>20% off orders over £10:</span>
          <span>−£{orderDiscount.toFixed(2)}</span>
        </div>
      )}

      <div className={styles.totalLine}>
        <span>Total:</span>
        <span>£{grandTotal.toFixed(2)}</span>
      </div>
    </div>
  );
};

export default OrderSummary;
