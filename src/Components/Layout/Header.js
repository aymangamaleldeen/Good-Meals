import React, { Fragment } from "react";
import classes from "./Header.module.css";
import mealsImage from "../../Assets/meals.jpg";
import HeaderCartButton from "./HeaderCartButton";

function Header(props) {
  return (
    <Fragment>
        <header className={classes.header}>
          <h1> Good Meals</h1>
          <HeaderCartButton onshow={props.onshow} />
        </header>
  
        <div className={classes["main-image"]}>
          <img src={mealsImage} alt="A table full of delicious food!" />
        </div>
    </Fragment>
  );
}

export default Header;
