import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import "../style/ShowEventForm.css";
import {ClockUpdateActions, gettedEventActions} from "../Api";

function ShowEventForm() {
  const dispatch = useDispatch(); 
  const {events, foundData} = useSelector((state) => {
    return state.user;
  });
  //seçilen tarih ile events içindeki aynı tarihteki event'i arar ve onu foundEventste tutar
  const foundEvents = events.filter((event) => event.date === foundData);

  const handleVote = (eventId, vote) => {
    dispatch(ClockUpdateActions(eventId, vote))
      .then(() => {
        dispatch(gettedEventActions());
      })
      .catch((error) => {
        console.error("Error occurred while handling vote:", error);
      });
  };

  const calculatePercentage = (votes, totalChocice) => {
    debugger;
    const percentage = (votes / totalChocice) * 100;
    return totalChocice === 0 ? "0%" : `${percentage.toFixed(2)}%`;
  };
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
              <p>🕐Which time suits you?</p>
              <button onClick={() => handleVote(foundEvent.id, "choice1")}>
                {foundEvent.hour1}{" "}
                <span>
                  (
                  {calculatePercentage(
                    foundEvent.choice1,
                    foundEvent.totalChocice
                  )}
                  )
                </span>
              </button>
              <button onClick={() => handleVote(foundEvent.id, "choice2")}>
                {foundEvent.hour2}
                <span>
                  (
                  {calculatePercentage(
                    foundEvent.choice2,
                    foundEvent.totalChocice
                  )}
                  )
                </span>
              </button>
              <button onClick={() => handleVote(foundEvent.id, "choice3")}>
                {foundEvent.hour3}
                <span>
                  (
                  {calculatePercentage(
                    foundEvent.choice3,
                    foundEvent.totalChocice
                  )}
                  )
                </span>
              </button>
              <button onClick={() => handleVote(foundEvent.id, "none")}>
                none
                <span>
                  (
                  {calculatePercentage(
                    foundEvent.none,
                    foundEvent.totalChocice
                  )}
                  )
                </span>
              </button>
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
