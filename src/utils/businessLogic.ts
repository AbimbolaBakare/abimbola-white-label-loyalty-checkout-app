import type { CartItem, DiscountResult } from "../types";

const ASPARAGUS_PRODUCT_CODE = "G95";
const ORDER_DISCOUNT_THRESHOLD = 10;
const ORDER_DISCOUNT_RATE = 0.2;

export const calculateBogofPricing = (item: CartItem) => {
  const hasBogof = item.product.code === ASPARAGUS_PRODUCT_CODE;
  const paidQty = hasBogof ? Math.ceil(item.quantity / 2) : item.quantity;
  const subtotal = paidQty * item.product.price;
  const bogofSavings = hasBogof
    ? (item.quantity - paidQty) * item.product.price
    : 0;

  return { subtotal, bogofSavings };
};

export const calculateOrderDiscount = (subtotal: number): number => {
  return subtotal > ORDER_DISCOUNT_THRESHOLD
    ? subtotal * ORDER_DISCOUNT_RATE
    : 0;
};

export const calculateCartTotal = (items: CartItem[]): DiscountResult => {
  let subtotal = 0;
  let bogofSavings = 0;

  for (const item of items) {
    const result = calculateBogofPricing(item);
    subtotal += result.subtotal;
    bogofSavings += result.bogofSavings;
  }

  const orderDiscount = calculateOrderDiscount(subtotal);
  const grandTotal = subtotal - orderDiscount;

  return { subtotal, bogofSavings, orderDiscount, grandTotal };
};
