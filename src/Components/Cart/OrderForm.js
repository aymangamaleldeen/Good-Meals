import React from "react";
import classes from "./OrderForm.module.css";
import { useForm } from "react-hook-form";

function OrderForm(props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function formSubmitHandler(data) {
    props.onSendData(data);
  }

  return (
    <form className={classes.form} onSubmit={handleSubmit(formSubmitHandler)}>
      <div
        className={`${classes.control} ${errors.address && classes.invalid}`}
      >
        <label htmlFor="name"> Your Name </label>
        <input
          type="text"
          id="name"
          {...register("name", { required: "Name is Required" })}
        />
        <p className={classes.text}> {errors.name?.message} </p>
      </div>
      <div
        className={`${classes.control} ${errors.address && classes.invalid}`}
      >
        <label htmlFor="address"> Home Address </label>
        <input
          type="text"
          id="address"
          {...register("address", { required: "Address is Required" })}
        />
        <p className={classes.text}> {errors.address?.message} </p>
      </div>
      <div className={`${classes.control} ${errors.mobile && classes.invalid}`}>
        <label htmlFor="mobile"> Mobile Number </label>
        <input
          type="mobile"
          id="mobile"
          {...register("mobile", {
            required: "Mobile is Required",
            pattern: {
              value: /^[0-9]*$/,
              message: "Only numbers are allowed",
            }
          })}
        />
        <p className={classes.text}> {errors.mobile?.message} </p>
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onhide}>
          Cancel
        </button>
        <button className={classes.submit}> Confirm </button>
      </div>
    </form>
  );
}

export default OrderForm;
