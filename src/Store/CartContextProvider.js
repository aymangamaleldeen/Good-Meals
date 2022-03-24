import React, { useState } from "react";
import CartContext from "./CartContext";

const defaultCartState = {
  items: [],
  totalPrice: 0,
};

function CartContextProvider(props) {
  const [cartState, setCartState] = useState(defaultCartState);

  function addToCartHandler(item) {
    setCartState((cartState) => {
      const updatedTotalPrice = cartState.totalPrice + item.amount * item.price;

      const existingItemIndex = cartState.items.findIndex((obj) => {
        return obj.id === item.id;
      });
      const existingItem = cartState.items[existingItemIndex];
      let updatedItems;

      if (existingItem) {
        const updatedItem = {
          ...existingItem,
          amount: existingItem.amount + item.amount,
        };
        updatedItems = [...cartState.items];
        updatedItems[existingItemIndex] = updatedItem;
      } else {
        updatedItems = cartState.items.concat(item);
      }
      return { items: updatedItems, totalPrice: updatedTotalPrice };
    });
  }

  function removeFromCartHandler(id) {
    setCartState((cartState) => {
      const existingItemIndex = cartState.items.findIndex((obj) => {
        return obj.id === id;
      });
      const existingItem = cartState.items[existingItemIndex];
      const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };
      let updatedItems;

      if (updatedItem.amount === 0) {
        updatedItems = [...cartState.items];
        updatedItems.splice(existingItemIndex, 1);
      } else {
        updatedItems = [...cartState.items];
        updatedItems[existingItemIndex] = updatedItem;
      }
      const updatedTotalPrice = cartState.totalPrice - updatedItem.price;
      return { items: updatedItems, totalPrice: updatedTotalPrice };
    });
  }

  function clearCartHandler() {
    setCartState((cartState)=>{
      return defaultCartState;
    });
  }

  const cartContextValue = {
    items: cartState.items,
    totalPrice: cartState.totalPrice,
    addItem: addToCartHandler,
    removeItem: removeFromCartHandler,
    clearItem: clearCartHandler,
  };

  return (
    <CartContext.Provider value={cartContextValue}>
      {props.children}
    </CartContext.Provider>
  );
}

export default CartContextProvider;
