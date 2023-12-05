import React from "react";
import {useSelector} from "react-redux";
import MenuList from "./MenuList";
import Cart from "./Cart";
import "../styles/menu.css";

function Menu() {
  const {menus} = useSelector((state) => {
    return state.menu;
  });

  const uniqueCategories = [...new Set(menus.map((item) => item.category))];

  return (
    <div>
      <div className="menuTitle">
        <h1 className="menuH1">MENU</h1>
        <div className="menuLine"></div>
      </div>
      <div className="MenuCart">
        <div className="menuList">
          {uniqueCategories.map((category) => (
            <div
              key={category}
              className="categorySection"
            >
              <div style={{display: "flex"}}>
                <h2 style={{textTransform: "capitalize"}}>{category} </h2>
                <div className="menuLineCategory"></div>
              </div>
              <div className="menuItems">
                {menus
                  .filter((item) => item.category === category)
                  .map((item) => (
                    <MenuList
                      key={item.id}
                      {...item}
                    />
                  ))}
              </div>
            </div>
          ))}
        </div>
        <div className="Cart">
          <Cart />
        </div>
      </div>
    </div>
  );
}

export default Menu;
