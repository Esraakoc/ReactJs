import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../style/showPlans.css";
import { changeSearchs } from "../store/slice/dataSlice";
import { CompleteUpdateActions, deletedEventActions } from "../Api";
import EventForm from "./EventForm";
import { useUser } from "../UserContext";
import { IoIosArrowDropupCircle } from "react-icons/io";
import { animateScroll as scroll } from "react-scroll";

function ShowPlans() {
  const { user } = useUser();
  const dispatch = useDispatch();

  const { events, searchs } = useSelector((state) => {
    return state.user;
  });

  const [search, setSearch] = useState("");
  const [searchMade, setSearchmade] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);
  const [eventId, setEventId] = useState("");

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

  const handleUpdateClick = (id, date, hour, name, note, location) => {
    debugger;
    setUpdateOpen(false);
    const newEvents = { date, hour, name, note, location };
    dispatch(CompleteUpdateActions(newEvents, id));
  };
  const scrollToTop = () => {
    scroll.scrollToTop();
  };
  const toggleUpdate = (id) => {
    setEventId(id);
  };
  return (
    <>
      {user && (
        <div className="showPdiv">
          <div className="showPsearch">
            <form onSubmit={handleSubmit}>
              <h2>Search for Event</h2>
              <input value={search} onChange={handleChange} />
            </form>
            <button onClick={handleClick}>Show All</button>
          </div>
          <div className="showPmap-main">
            {filteredEvents.map((event, item) => {
              return (
                <div key={item} className="showPmap">
                  {updateOpen && eventId === event.id ? (
                    <EventForm
                      eventId={eventId}
                      updateOpen={true}
                      onUpdate={handleUpdateClick}
                    />
                  ) : (
                    <>
                      <div className="title-answ-main">
                        <h4 className="text">Date: </h4>
                        <h5 className="answer">{event.date}</h5>
                      </div>
                      <div className="title-answ-main">
                        <h4 className="hour-text">1.Hour: </h4>
                        <h5 className="hour-answer">{event.hour1}</h5>
                        <h4 className="hour-text">2.Hour: </h4>
                        <h5 className="hour-answer">{event.hour2}</h5>
                        <h4 className="hour-text">3.Hour: </h4>
                        <h5 className="hour-answer">{event.hour3}</h5>
                      </div>
                      <div className="title-answ-main">
                        <h4 className="text">Event Name: </h4>
                        <h5 className="answer">{event.name}</h5>
                      </div>
                      <div className="title-answ-main">
                        <h4 className="text">Event Note: </h4>
                        <h5 className="answer">{event.note}</h5>
                      </div>
                      <div className="title-answ-main">
                        <h4 className="text">Location: </h4>
                        <h5 className="answer">{event.location}</h5>
                      </div>
                      <div className="buttons">
                        <button
                          className="buttonDelete"
                          onClick={() =>
                            dispatch(deletedEventActions(event.id))
                          }
                        >
                          Delete
                        </button>
                        <button
                          className="buttonUpdate"
                          onClick={() => {
                            setUpdateOpen(!updateOpen);
                            toggleUpdate(event.id);
                          }}
                        >
                          Update
                        </button>
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
          <div className="showPdiv_upIcon">
            <a href="" onClick={scrollToTop}>
              <IoIosArrowDropupCircle className="upIcon" />
            </a>
          </div>
        </div>
      )}
    </>
  );
}

export default ShowPlans;
