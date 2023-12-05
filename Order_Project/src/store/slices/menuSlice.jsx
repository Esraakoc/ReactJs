import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  menus: [],
  carts: [],
  total: 0,
};

const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    //gelen datadaki bilgileri menus dizisine aktarma işlemi
    gettedMenu: (state, actions) => {
      state.menus = actions.payload;
    },

    gettedCarts: (state, actions) => {
      state.carts = actions.payload;
    },

    gettedTotal: (state, actions) => {
      state.total = 0;
      state.carts.map((item) => {
        state.total += item.price * item.quantity;
      });
    },

    //değiştirilen quantity bilgisini önceki quantity değeri ile değiştirildi
    menuChangeQuantity: (state, actions) => {
      const newQuantity = actions.payload.quantity;

      const updatedMenus = state.menus.map((menu) => {
        if (menu.id === actions.payload.id) {
          return {...menu, quantity: newQuantity};
        }
        return menu;
      });
      state.menus = updatedMenus;
    },

    cartChangeQuantity: (state, actions) => {
      const newQuantity = actions.payload.quantity;

      const updatedCarts = state.carts.map((cart) => {
        if (cart.id === actions.payload.id) {
          return {...cart, quantity: newQuantity};
        }
        return cart;
      });
      state.carts = updatedCarts;
    },
    //gelen datayı sepete ekleme
    addedCart: (state, actions) => {
      state.carts.push(actions.payload);
    },
    //gelen datayı sepetten silme işlemi
    deleteCartData: (state, actions) => {
      const deletedCarts = state.carts.filter((value) => {
        return value.id !== actions.payload;
      });
      state.carts = deletedCarts;
    },
    //speti boşaltma ve menudeki quantity değerlerini sıfırlama işlemi
    clearCart: (state, actions) => {
      state.carts = [];
      state.total = 0;
      const response = state.menus.map((menu) => {
        if (menu.quantity > 0) {
          return {...menu, quantity: 0};
        }
        return menu;
      });
      state.menus = response;
    },
  },
});
export const {
  gettedMenu,
  gettedCarts,
  gettedTotal,
  menuChangeQuantity,
  cartChangeQuantity,
  addedCart,
  deleteCartData,
  clearCart,
} = menuSlice.actions;

export default menuSlice.reducer;
