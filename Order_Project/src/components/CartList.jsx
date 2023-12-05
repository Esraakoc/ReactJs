import React, {useEffect} from "react";
import "../styles/cart.css";
import {useDispatch} from "react-redux";
import {gettedTotal} from "../store/slices/menuSlice";

function CartList({id, img, title, description, price, quantity, category}) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(gettedTotal());
  }, [quantity]);
  return (
    <div>
      <h4>{title}</h4>
      <h6>{description}</h6>
      <div style={{display: "flex"}}>
        <p style={{marginRight: "15vw"}}>Price: {price}$</p>
        <p>Quantity: {quantity}</p>
      </div>
      <div className="cartListLine"></div>
    </div>
  );
}

export default CartList;
