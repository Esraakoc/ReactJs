import React, {useState} from "react";
import "../style/eventForm.css";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import {useDispatch, useSelector} from "react-redux";
import {sendEventActions} from "../Api";

function EventForm({date, eventId, updateOpen, onUpdate}) {
  const {events} = useSelector((state) => {
    return state.user;
  });
  const dispatch = useDispatch();
  const [hour, setHour] = useState(eventId ? events.hour : "");
  debugger;
  const [name, setName] = useState(eventId ? events.name : "");
  const [note, setNote] = useState(eventId ? events.note : "");
  const [location, setLocation] = useState(eventId ? events.location : "");
  //onChange Arrow Functionları
  const handleSelectChange = (e) => {
    setHour(e.target.value);
  };
  const handleChangeName = (e) => {
    setName(e.target.value);
  };
  const handleChangeNote = (e) => {
    setNote(e.target.value);
  };
  const handleChangeLocation = (e) => {
    setLocation(e.target.value);
  };

  //button'a basıldığında çalışacak olan Arrow function
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const newEvent = {date, name, hour, note, location};
    dispatch(sendEventActions(newEvent));
    setName("");
    setHour("");
    setNote("");
    setLocation("");
  };
  //30 dakika aralıklarla olan saat optionları
  const generateOptions = () => {
    const options = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const formattedHour = hour.toString().padStart(2, "0");
        const formattedMinute = minute.toString().padStart(2, "0");
        const time = `${formattedHour}:${formattedMinute}`;
        options.push(
          <option
            key={time}
            value={time}
          >
            {time}
          </option>
        );
      }
    }
    return options;
  };
  let foundEvent = events.filter((event) => event.id == eventId);
  const eventToUpdate = foundEvent.length > 0 ? foundEvent[0] : null;
  return (
    <div className="eventFormDiv">
      {updateOpen ? (
        <>
          {foundEvent.map((event, item) => {
            return (
              <div
                key={item}
                className="showPupdateDiv"
              >
                <div className="titleAndAnsw">
                  <h4>Date: </h4>
                  <h5>{event.date}</h5>
                </div>
                <div className="titleAndAnsw">
                  <h4>Hour: </h4>
                  <input
                    className="hourInput"
                    value={hour}
                    onChange={(e) => setHour(e.target.value)}
                    placeholder={event.hour}
                  />
                </div>
                <div className="titleAndAnsw">
                  <h4>Event Name: </h4>
                  <input
                    className="nameInput"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={event.name}
                  />
                </div>
                <div className="titleAndAnsw">
                  <h4>Event Note: </h4>
                  <input
                    className="noteInput"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder={event.note}
                  />
                </div>
                <div className="titleAndAnsw">
                  <h4>Location: </h4>
                  <input
                    className="locaInput"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder={event.location}
                  />
                </div>
                <div className="buttons">
                  <button
                    className="buttonUpdate"
                    onClick={(e) => {
                      e.preventDefault();
                      if (updateOpen) {
                        onUpdate(
                          eventId,
                          event.date,
                          hour,
                          name,
                          note,
                          location
                        );
                      } else {
                        onUpdate(
                          eventId,
                          event.date,
                          event.hour,
                          event.name,
                          event.note,
                          event.location
                        );
                      }
                    }}
                  >
                    Complete the Update
                  </button>
                </div>
              </div>
            );
          })}
        </>
      ) : (
        <form onSubmit={handleFormSubmit}>
          <div>
            <h5>
              <DriveFileRenameOutlineIcon /> Event Name
            </h5>
            <input
              value={name}
              onChange={handleChangeName}
            />
            <h5>
              <QueryBuilderIcon /> Hour
            </h5>
            <select
              value={hour}
              onChange={handleSelectChange}
            >
              {generateOptions()}
            </select>
            <h5>
              <EditNoteIcon /> Note
            </h5>
            <textarea
              value={note}
              onChange={handleChangeNote}
            />
            <h5>
              <FmdGoodIcon />
              Location
            </h5>
            <input
              value={location}
              onChange={handleChangeLocation}
            />
            <div>
              <button>Add to Calendar</button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}

export default EventForm;
