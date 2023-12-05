import {useEffect} from "react";
import "./App.css";
import {useDispatch} from "react-redux";
import {gettedEventActions} from "./Api";
import MyCalendar from "./components/MyCalendar";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(gettedEventActions());
  }, []);
  return (
    <div className="appDiv">
      <MyCalendar />
    </div>
  );
}

export default App;
