import axios from "axios";
import {
  gettedMenu,
  gettedCarts,
  menuChangeQuantity,
  cartChangeQuantity,
  addedCart,
  deleteCartData,
  clearCart,
} from "./store/slices/menuSlice.jsx";

//get ile pizzas'daki menümüzü çağırırız
//dispatch ile de Slice'a gönderiyoruz
export const gettedMenuActions = () => async (dispatch) => {
  const response = await axios.get("http://localhost:8000/pizzas");
  dispatch(gettedMenu(response.data));
};

export const gettedCartsActions = () => async (dispatch) => {
  const response = await axios.get("http://localhost:8000/carts");
  dispatch(gettedCarts(response.data));
};
//Göndermiş olduğumuz newData ve id ile put sayesinde o id ye denk gelen datayı değiştiririz.
//quantity değerini arttırma azaltma değişikliği yapıyoruz.
export const menuChangeQuantityActions = (newData, id) => async (dispatch) => {
  const response = await axios.put(
    `http://localhost:8000/pizzas/${id}`,
    newData
  );
  dispatch(menuChangeQuantity(response.data));
};

export const cartChangeQuantityActions = (newData, id) => async (dispatch) => {
  const response = await axios.put(
    `http://localhost:8000/carts/${id}`,
    newData
  );
  dispatch(cartChangeQuantity(response.data));
};
//Gönderdiğimiz newDatayı sepete eklemiş oluyoruz post ile
export const addedCartActions = (newData) => async (dispatch) => {
  const response = await axios.post("http://localhost:8000/carts/", newData);
  dispatch(addedCart(response.data));
};
//id ye denk gelen datayı siliyoruz delete ile
export const deleteCartDataActions = (id) => async (dispatch) => {
  await axios.delete(`http://localhost:8000/carts/${id}`);
  dispatch(deleteCartData(id));
};
//Sepeti boşaltma işlemi; for döngüsü ile bütün cart yapısındaki datalrı sildik
//menü'deki quantity değeri 0'dan büyük olanların quantity değerini 0 yaptık
export const clearCartActions = () => async (dispatch, getState) => {
  const {carts, menus} = getState().menu;

  for (const cart of carts) {
    await axios.delete(`http://localhost:8000/carts/${cart.id}`);
  }
  {
    menus.map(async (menu) => {
      if (menu.quantity > 0) {
        // Menü nesnesini klonlayın ve quantity'yi sıfırlayın
        const updatedMenu = {...menu, quantity: 0};
        await axios.put(`http://localhost:8000/pizzas/${menu.id}`, updatedMenu);
      }
    });
  }
  dispatch(clearCart());
};
