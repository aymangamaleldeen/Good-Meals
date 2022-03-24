import React, { Fragment } from "react";
import MealsSummary from "./MealsSummary";
import AvaliableMeals from "./AvaliableMeals";

function Meals() {
  return (
    <Fragment>
      <MealsSummary />
      <AvaliableMeals />
    </Fragment>
  );
}

export default Meals;
