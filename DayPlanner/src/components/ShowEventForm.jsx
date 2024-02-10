import React from "react";
import {useSelector} from "react-redux";
import "../style/ShowEventForm.css";

function ShowEventForm() {
  const {events, foundData} = useSelector((state) => {
    return state.user;
  });
  //seçilen tarih ile events içindeki aynı tarihteki event'i arar ve onu foundEventste tutar
  const foundEvents = events.filter((event) => event.date === foundData);
  return (
    <div className="showDiv">
      <h3>Event Details</h3>
      {foundEvents.length > 0 ? (
        foundEvents.map((foundEvent, index) => (
          <div key={index}>
            <div style={{color: "black", fontWeight: "bold"}}>
              {index + 1}. Event
            </div>
            <div style={{display: "flex"}}>
              <h5>Name:</h5>
              <p> {foundEvent.name}</p>
            </div>
            <div style={{display: "flex"}}>
              <h5>Date:</h5>
              <p> {foundEvent.date}</p>
            </div>
            <div style={{display: "flex"}}>
              <h5>Hours: </h5> <span>{foundEvent.hour1}</span>
              <span>-{foundEvent.hour2}-</span>
              <span>{foundEvent.hour3}</span>
            </div>
            <div className="button-hours">
              <p>Which time suits you?</p>
              <button>{foundEvent.hour1}</button>
              <button>{foundEvent.hour2}</button>
              <button>{foundEvent.hour3}</button>
            </div>
            <div style={{display: "flex"}}>
              <h5>Note: </h5> <p>{foundEvent.note}</p>
            </div>
            <div style={{display: "flex"}}>
              <h5>Location: </h5> <p> {foundEvent.location}</p>
            </div>
            <hr />
          </div>
        ))
      ) : (
        <p>No events found for the selected date</p>
      )}
    </div>
  );
}

export default ShowEventForm;
