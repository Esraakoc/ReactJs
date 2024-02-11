import React, {useEffect, useState} from "react";
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
  // useEffect(() => {
  //   dispatch(gettedEventActions());
  // }, [eventId]);
  const dispatch = useDispatch();
  const [hour1, setHour1] = useState(eventId ? events.hour1 : "");
  const [hour2, setHour2] = useState(eventId ? events.hour2 : "");
  const [hour3, setHour3] = useState(eventId ? events.hour3 : "");
  const [name, setName] = useState(eventId ? events.name : "");
  const [note, setNote] = useState(eventId ? events.note : "");
  const [location, setLocation] = useState(eventId ? events.location : "");
  const choice1 = 0;
  const choice2 = 0;
  const choice3 = 0;
  const none = 0;
  const totalChocice = 0;
  //onChange Arrow Functionları
  const handleSelectChange = (e) => {
    setHour1(e.target.value);
  };
  const handleSelectSecondChange = (e) => {
    setHour2(e.target.value);
  };
  const handleSelectThirdChange = (e) => {
    setHour3(e.target.value);
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
    const newEvent = {
      date,
      name,
      hour1,
      hour2,
      hour3,
      note,
      location,
      choice1,
      choice2,
      choice3,
      none,
      totalChocice,
    };
    dispatch(sendEventActions(newEvent));
    setHour1("");
    setHour2("");
    setHour3("");
    setName("");
    setNote("");
    setLocation("");
  };

  //button'a basıldığında çalışacak olan Arrow function

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
  // const eventToUpdate = foundEvent.length > 0 ? foundEvent[0] : null;
  // console.log(foundEvent.name, 555);
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
                    value={hour1}
                    onChange={(e) => setHour1(e.target.value)}
                    placeholder={event.hour1}
                  />
                  <input
                    className="hourInput"
                    value={hour2}
                    onChange={(e) => setHour2(e.target.value)}
                    placeholder={event.hour1}
                  />
                  <input
                    className="hourInput"
                    value={hour3}
                    onChange={(e) => setHour3(e.target.value)}
                    placeholder={event.hour1}
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
                          hour1,
                          hour2,
                          hour3,
                          name,
                          note,
                          location
                        );
                      } else {
                        onUpdate(
                          eventId,
                          event.date,
                          event.hour1,
                          event.hour2,
                          event.hour3,
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
              value={hour1}
              onChange={handleSelectChange}
            >
              {generateOptions()}
            </select>
            <select
              value={hour2}
              onChange={handleSelectSecondChange}
            >
              {generateOptions()}
            </select>
            <select
              value={hour3}
              onChange={handleSelectThirdChange}
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
