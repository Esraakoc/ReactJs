import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import "../style/showPlans.css";
import {changeSearchs} from "../store/slice/dataSlice";
function ShowPlans() {
  const dispatch = useDispatch();
  const {events, searchs} = useSelector((state) => {
    return state.user;
  });
  const [search, setSearch] = useState("");
  const [searchMade, setSearchmade] = useState(false);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleClick = () => {
    setSearchmade(false);
    setSearch("");
  };
  let filteredEvents = events;

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(changeSearchs(search));
    if (search.trim() !== "") {
      setSearchmade(true);
    } else {
      setSearchmade(false);
    }
  };
  if (searchMade) {
    filteredEvents = events.filter((event) => event.name == searchs.trim());
  }
  return (
    <div className="showPdiv">
      <div className="showPsearch">
        <form onSubmit={handleSubmit}>
          <h2>Search for Event</h2>
          <input
            value={search}
            onChange={handleChange}
          />
        </form>
        <button onClick={handleClick}>Show All</button>
      </div>
      <div className="showPmapDiv">
        {filteredEvents.map((event, item) => {
          return (
            <div
              key={item}
              className="showPmap"
            >
              <div className="titleAndAnsw">
                <h4>Date: </h4>
                <h5>{event.date}</h5>
              </div>
              <div className="titleAndAnsw">
                <h4>Hour: </h4>
                <h5>{event.hour}</h5>
              </div>
              <div className="titleAndAnsw">
                <h4>Event Name: </h4>
                <h5>{event.name}</h5>
              </div>
              <div className="titleAndAnsw">
                <h4>Event Note: </h4>
                <h5>{event.note}</h5>
              </div>
              <div className="titleAndAnsw">
                <h4>Location: </h4>
                <h5>{event.location}</h5>
              </div>
              <div className="buttons">
                <button className="buttonDelete">Delete</button>
                <button className="buttonUpdate">Update</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ShowPlans;
