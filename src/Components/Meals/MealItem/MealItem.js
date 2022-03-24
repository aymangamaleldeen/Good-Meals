import React, { useContext } from "react";
import classes from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";
import CartContext from "../../../Store/CartContext";

function MealItem(props) {
  const price = `${props.price} $`;
  const ctx = useContext(CartContext);

  function addAmountHandler(amount) {
    const item = {
      id: props.id,
      name: props.name,
      amount: amount,
      price: props.price,
    };
    ctx.addItem(item);
  }

  return (
    <li className={classes.meal}>
      <div>
        <h3>{props.name} </h3>
        <div className={classes.description}> {props.description}</div>
        <div className={classes.price}> {price} </div>
      </div>
      <MealItemForm id={props.id} onAddAmount={addAmountHandler} />
    </li>
  );
}

export default MealItem;
