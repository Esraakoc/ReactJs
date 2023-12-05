import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import "../styles/cartForm.css";
import {gettedTotal} from "../store/slices/menuSlice";

function CartForm() {
  const dispatch = useDispatch();

  const {carts, total} = useSelector((state) => {
    return state.menu;
  });

  useEffect(() => {
    dispatch(gettedTotal());
  }, [carts]);

  return (
    <div className="cartFormDiv">
      <h1 className="cartForm">CART</h1>
      <div className="cartFormLine"></div>
      {carts.map((item, index) => {
        return (
          <div
            className="cartFMap"
            key={index}
          >
            <div className="cartFImgDesc">
              <img
                className="cartFImg"
                src={item.img}
              />
              <div className="cartFContent">
                <h3 className="cartFTitle">{item.title}</h3>
                <h5 className="cartFDesc">{item.description}</h5>
                <div className="cartFPriceQuan">
                  <div className="cartFPrice">Price : {item.price}</div>
                  <div>Quantity : {item.quantity}</div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
      <div className="cartFormPrice">Price :{total} </div>
      <div className="cartFormFee">Order Fulfillment Fee : 5$</div>
      <div className="cartFormTotal">Total Price : {total + 5} </div>
      <button className="CheckOutBtn">CHECKOUT</button>
    </div>
  );
}

export default CartForm;
