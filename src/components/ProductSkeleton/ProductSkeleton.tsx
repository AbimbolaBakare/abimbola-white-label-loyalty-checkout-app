import React from "react";
import styles from "./ProductSkeleton.module.css";

const ProductSkeleton: React.FC = () => {
  return (
    <div className={styles.skeleton}>
      <div className={styles.skeletonName}></div>
      <div className={styles.skeletonPrice}></div>
      <div className={styles.skeletonCode}></div>
    </div>
  );
};

export default ProductSkeleton;
