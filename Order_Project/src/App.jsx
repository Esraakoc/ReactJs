import "./App.css";
import {Routes, Route} from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Menu from "./components/Menu";
import CartForm from "./components/CartForm";
import LogIn from "./components/LogIn";
import Register from "./components/Register";
import Footer from "./components/Footer";
import AboutUs from "./components/AboutUs";
import Error from "./components/Error";
import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {gettedMenuActions, gettedCartsActions} from "./Api";

function App() {
  const dispatch = useDispatch();

  //useEffect ile proje başlayınca menu ve cart yapısını getiriyoruz
  useEffect(() => {
    dispatch(gettedMenuActions());
    dispatch(gettedCartsActions());
  }, []);

  return (
    <div>
      <Navbar />
      <Routes>
        <Route
          path="/"
          exact
          element={<Home />}
        />
        <Route
          path="/menu"
          exact
          element={<Menu />}
        />
        <Route
          path="/cart"
          element={<CartForm />}
        />
        <Route
          path="/login"
          exact
          element={<LogIn />}
        />
        <Route
          path="/register"
          exact
          element={<Register />}
        />
        <Route
          path="/aboutus"
          exact
          element={<AboutUs />}
        />
        <Route
          path="/*"
          element={<Error />}
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
