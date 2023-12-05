import React, {useState} from "react";
import "../style/eventForm.css";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import {useDispatch} from "react-redux";
import {sendEventActions} from "../Api";

function EventForm({date}) {
  const dispatch = useDispatch();
  //useState
  const [hour, setHour] = useState("");
  const [name, setName] = useState("");
  const [note, setNote] = useState("");
  const [location, seLocation] = useState("");
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
    seLocation(e.target.value);
  };
  //button'a basıldığında çalışacak olan Arrow function
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const newEvent = {date, name, hour, note, location};
    dispatch(sendEventActions(newEvent));
    setName("");
    setHour("");
    setNote("");
    seLocation("");
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

  return (
    <div className="eventFormDiv">
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
    </div>
  );
}

export default EventForm;
