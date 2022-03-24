import React, { useState, useContext } from "react";
import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import CartContext from "../../Store/CartContext";
import OrderForm from "./OrderForm";
import { Fragment } from "react/cjs/react.production.min";


function Cart(props) {
  const [cartisLoading, setCartIsLoading] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);

  const ctx = useContext(CartContext);
  const totalPrice = `$${ctx.totalPrice.toFixed(2)}`;
  const hasItems = ctx.items.length > 0;
  const [showForm, setShowForm] = useState(false);

  function addHandler(item) {
    ctx.addItem({ ...item, amount: 1 });
  }

  function removeHandler(id) {
    ctx.removeItem(id);
  }

  function ShowFormHandler() {
    setShowForm(true);
  }

  async function sendDataHandler(userData) {
    setCartIsLoading(true);
    await fetch(
      "https://good-meals-8809e-default-rtdb.firebaseio.com//orders.json",
      {
        method: "POST",
        body: JSON.stringify({ user: userData, orderItems: ctx.items }),
        headers: { "content-Type": "application/json" },
      }
    );
    setCartIsLoading(false);
    setIsSubmit(true);
    ctx.clearItem();
  }

  const cartModalContent = (
    <Fragment>
         {!showForm && <ul className={classes["cart-items"]}>
            {ctx.items.map((item) => (
              <CartItem
                key={item.id}
                name={item.name}
                price={item.price}
                amount={item.amount}
                onAdd={addHandler.bind(null, item)}
                onRemove={removeHandler.bind(null, item.id)}
              />
            ))}
          </ul> }
          <div className={classes.total}>
            <span> Total Price</span>
            <span> {totalPrice}</span>
          </div>
      {showForm && (
        <OrderForm onhide={props.onhide} onSendData={sendDataHandler} />
      )}
      <div className={classes.actions}>
        {!showForm && (
          <button className={classes["button--alt"]} onClick={props.onhide}>
            Close
          </button>
        )}
        {!showForm && hasItems && (
          <button className={classes.button} onClick={ShowFormHandler}>
            Order
          </button>
        )}
      </div>
    </Fragment>
  );

  return (
    <Modal onhide={props.onhide}>
      {cartisLoading && !isSubmit && <p> Sending Order Data...</p>}
      {!cartisLoading && !isSubmit && cartModalContent}
      {isSubmit && (
        <Fragment>
          <p> Successfully Sent The Order</p>
          <div className={classes.actions}>
            <button onClick={props.onhide} className={classes.button}>
              Close
            </button>
          </div>
        </Fragment>
      )}
    </Modal>
  );
}

export default Cart;
