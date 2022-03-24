import React, { useRef } from "react";
import classes from "./MealItemForm.module.css";
import Input from "../../UI/Input";

function MealItemForm(props) {
  const amountRef = useRef();

  function formSubmitHandler(event) {
    event.preventDefault();
    const enteredAmount = amountRef.current.value;
    const enteredAmountNumber = +enteredAmount;

    if (
      enteredAmount.trim().length === 0 ||
      enteredAmountNumber > 5 ||
      enteredAmountNumber < 1
    ) {
      return;
    }

    props.onAddAmount(enteredAmountNumber);
  }

  return (
    <form className={classes.form} onSubmit={formSubmitHandler}>
      <Input
        ref={amountRef}
        label="Amount"
        input={{
          id: props.id,
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button> + Add </button>
    </form>
  );
}

export default MealItemForm;
