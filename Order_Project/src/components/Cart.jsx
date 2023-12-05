import React from "react";
import "../styles/cart.css";
import {useDispatch, useSelector} from "react-redux";
import CartList from "./CartList";
import {clearCartActions} from "../Api";
import {useNavigate} from "react-router-dom";
import {FaShoppingCart} from "react-icons/fa";

function Cart() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {carts, total} = useSelector((state) => {
    return state.menu;
  });

  const handleClear = (event) => {
    event.preventDefault();
    dispatch(clearCartActions());
  };
  return (
    <div className="CartDiv">
      <div className="Cart">
        <h1 className="cartWrite">Cart</h1>
        <button
          className="ClearCart"
          onClick={handleClear}
        >
          Celart Cart
        </button>
        <div style={{marginTop: "90px"}}>Total: {total}</div>
        <button
          className="goToCart"
          onClick={() => navigate("/cart")}
        >
          Go To Cart
        </button>
      </div>
      <div className="cartLine"></div>
      {/* carts dizisi boş ise empty yazdırsın doluysa CartList'e girsin */}
      {carts.length === 0 ? (
        <div className="emptyDiv">
          <FaShoppingCart className="emptyIcon" />
          <h1>Cart is Empty!</h1>
        </div>
      ) : (
        <div className="cartLists">
          {carts.map((cart, index) => {
            return (
              <CartList
                key={index}
                {...cart}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Cart;
