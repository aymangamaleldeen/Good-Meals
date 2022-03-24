import React, { useState, useEffect } from "react";
import MealItem from "./MealItem/MealItem";
import classes from "./AvaliableMeals.module.css";
import Card from "../UI/Card";

function AvaliableMeals() {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://good-meals-8809e-default-rtdb.firebaseio.com//meals.json"
        );
        if (!response.ok) {
          throw Error("Something went wrong");
        }

        const data = await response.json();
        let mealsArray = [];
        for (const key in data) {
          mealsArray.push({
            id: key,
            name: data[key].name,
            description: data[key].description,
            price: data[key].price,
          });
        }
        setMeals(mealsArray);
      } catch (err) {
        setError(err.message);
      }

      setIsLoading(false);
    };
    fetchData();
  }, []);

  return (
    <section className={classes.meals}>
      <Card>
        <ul>
          {isLoading ? (
            <p> Loading.... </p>
          ) : (
            meals.map((meal) => {
              return (
                <MealItem
                  id={meal.id}
                  key={meal.id}
                  name={meal.name}
                  description={meal.description}
                  price={meal.price}
                />
              );
            })
          )}
          {error && <p> {error}</p>}
        </ul>
      </Card>
    </section>
  );
}

export default AvaliableMeals;
