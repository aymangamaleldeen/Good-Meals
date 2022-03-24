import React, { useState } from "react";
import Header from "./Components/Layout/Header";
import Meals from "./Components/Meals/Meals";
import Cart from "./Components/Cart/Cart";
import CartContextProvider from "./Store/CartContextProvider";

function App() {
  const [isVisible, setIsVisible] = useState(false);

  function showCartHandler() {
    setIsVisible(true);
  }

  function hideCartHandler() {
    setIsVisible(false);
  }


  return (
    <CartContextProvider>
      {isVisible && (
        <Cart onhide={hideCartHandler} />
      )}
      <Header onshow={showCartHandler} />
      <main>
        <Meals />
      </main>
    </CartContextProvider>
  );
}

export default App;
