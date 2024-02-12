import {useEffect} from "react";
import "./App.css";
import {useDispatch} from "react-redux";
import {gettedEventActions} from "./Api";
import MyCalendar from "./components/MyCalendar";
import Navbar from "./components/Navbar";
import {Routes, Route} from "react-router-dom";
import ShowPlans from "./components/ShowPlans";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Register from "./components/Register";
import AboutUs from "./components/AboutUs";
import Home from "./components/Home";
import {UserProvider} from "./UserContext";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(gettedEventActions());
  }, []);
  return (
    <div className="app">
      <UserProvider>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={<Home />}
          />
          <Route
            path="/create"
            element={<MyCalendar />}
          />
          <Route
            path="/show_plans"
            element={<ShowPlans />}
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
      </UserProvider>
    </div>
  );
}

export default App;
