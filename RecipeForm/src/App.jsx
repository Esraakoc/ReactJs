import {Routes, Route} from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AddRecipe from "./components/AddRecipe";
import Dessert from "./components/Dessert";
import Soup from "./components/Soup";
import Bread from "./components/Bread";
import Login from "./components/Login";
import Register from "./components/Register";
import {useDispatch} from "react-redux";
import {gettedItemActions, gettedRecipeActions} from "../Api";
import {useEffect} from "react";
import RecipeForm from "./components/RecipeForm";
import AboutUs from "./components/AboutUs";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(gettedRecipeActions());
    dispatch(gettedItemActions());
  }, []);

  return (
    <div>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={<Home />}
        />
        <Route
          path="/add_recipe"
          element={<AddRecipe />}
        />
        <Route
          path="/dessert"
          element={<Dessert />}
        />
        <Route
          path="/soup"
          element={<Soup />}
        />
        <Route
          path="/bread"
          element={<Bread />}
        />
        <Route
          path="/recipe"
          element={<RecipeForm />}
        />
        <Route
          path="/login"
          element={<Login />}
        />
        <Route
          path="/register"
          element={<Register />}
        />
        <Route
          path="/aboutUs"
          element={<AboutUs />}
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
