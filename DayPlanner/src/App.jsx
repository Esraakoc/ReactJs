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

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(gettedEventActions());
  }, []);
  return (
    <div className="appDiv">
      <Navbar />
      <Routes>
        <Route
          path="/"
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
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
