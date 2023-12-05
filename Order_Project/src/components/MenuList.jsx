import React from "react";
import "../styles/menu.css";
import {useDispatch, useSelector} from "react-redux";
import {
  menuChangeQuantityActions,
  cartChangeQuantityActions,
  addedCartActions,
  deleteCartDataActions,
} from "../Api";

function MenuList(menus) {
  const {carts} = useSelector((state) => state.menu);

  const dispatch = useDispatch();

  const handleDecrease = (event) => {
    event.preventDefault();
    if (menus.quantity > 0) {
      const newQuantity = menus.quantity - 1;
      const newData = {
        ...menus,
        quantity: newQuantity,
      };
      dispatch(menuChangeQuantityActions(newData, menus.id)).then((res) => {
        //CartsUpdate
        const ısItemInCart = carts.some((item) => item.id === menus.id);
        if (ısItemInCart) {
          dispatch(cartChangeQuantityActions(newData, menus.id));
        }
        if (newQuantity === 0) {
          dispatch(deleteCartDataActions(menus.id));
        }
      });
    }
  };

  const handleIncrease = (event) => {
    event.preventDefault();
    const newQuantity = menus.quantity + 1;
    const newData = {
      ...menus,
      quantity: newQuantity,
    };
    dispatch(menuChangeQuantityActions(newData, menus.id)).then((res) => {
      //CartsUpdate
      const ısItemInCart = carts.some((item) => item.id === menus.id);
      if (ısItemInCart) {
        dispatch(cartChangeQuantityActions(newData, menus.id));
      } else {
        dispatch(addedCartActions(newData));
      }
    });
  };

  return (
    <div className="menuItem">
      <img
        src={menus.img}
        alt={menus.title}
        className="menuImage"
      />
      <div className="menuInfo">
        <h4 className="menuListTitle">{menus.title}</h4>
        <h6 className="menuDescription">{menus.description}</h6>
        <div className="menuDetails">
          <i className="menuPrice">{menus.price}$</i>
          <div className="menuQuantity">
            <button
              className="menuButton"
              onClick={handleDecrease}
            >
              -
            </button>
            <p className="quantityValue">{menus.quantity}</p>
            <button
              className="menuButton"
              onClick={handleIncrease}
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MenuList;
