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
              <h2>{event.date}</h2>
              <h2>{event.hour}</h2>
              <h2>{event.name}</h2>
              <h3>{event.note}</h3>
              <h3>{event.location}</h3>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ShowPlans;
