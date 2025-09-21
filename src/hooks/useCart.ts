import { useReducer, useCallback } from "react";
import type { CartAction, CartState, Product } from "../types";

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "ADD_PRODUCT": {
      const existingItem = state.items.find(
        (item) => item.product.code === action.product.code
      );

      if (existingItem) {
        return {
          items: state.items.map((item) =>
            item.product.code === action.product.code
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }

      return {
        items: [...state.items, { product: action.product, quantity: 1 }],
      };
    }

    case "INCREASE_QUANTITY": {
      return {
        items: state.items.map((item) =>
          item.product.code === action.code
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      };
    }

    case "DECREASE_QUANTITY": {
      return {
        items: state.items
          .map((item) =>
            item.product.code === action.code
              ? { ...item, quantity: item.quantity - 1 }
              : item
          )
          .filter((item) => item.quantity > 0),
      };
    }

    case "CLEAR_CART":
      return { items: [] };

    default:
      return state;
  }
};

export const useCart = () => {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  const addProduct = useCallback((product: Product) => {
    dispatch({ type: "ADD_PRODUCT", product });
  }, []);

  const increaseQuantity = useCallback((code: string) => {
    dispatch({ type: "INCREASE_QUANTITY", code });
  }, []);

  const decreaseQuantity = useCallback((code: string) => {
    dispatch({ type: "DECREASE_QUANTITY", code });
  }, []);

  const clearCart = useCallback(() => {
    dispatch({ type: "CLEAR_CART" });
  }, []);

  return {
    items: state.items,
    addProduct,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
  };
};
