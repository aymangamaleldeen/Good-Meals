import { useContext, useEffect, useState } from "react";
import classes from "./HeaderCartButton.module.css";
import CartIcon from "../Cart/CartIcon";
import CartContext from "../../Store/CartContext";

function HeaderCartButton(props) {
  const ctx = useContext(CartContext);

  const numberOfCartItems = ctx.items.reduce((prev, curr) => {
    return prev + curr.amount;
  },0);

  const [isBump, setIsBump] = useState(false);
  let btnClass = `${classes.button} ${isBump && classes.bump}`;

  useEffect(() => {
    if (ctx.items.length === 0) {
      return;
    }

    setIsBump(true);

    const timer = setTimeout(() => {
      setIsBump(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [ctx.items]);

  return (
    <button className={btnClass} onClick={props.onshow}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span> Your Cart</span>
      <span className={classes.badge}> {numberOfCartItems} </span>
    </button>
  );
}

export default HeaderCartButton;
