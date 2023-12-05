import React, {useState} from "react";
import Calendar from "react-calendar";
import "../style/Calendar.css";
import EventForm from "./EventForm";
import ShowEventForm from "./ShowEventForm";
import {useDispatch, useSelector} from "react-redux";
import {setFoundData} from "../store/slice/dataSlice";

const MyCalendar = () => {
  const dispatch = useDispatch();
  const {events, foundData} = useSelector((state) => state.user);
  //useState value değerlerinin tutulduğu yer
  const [date, setDate] = useState(new Date());
  const [event, setEvent] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [show, setShow] = useState(false);
  //takvimde herhangi bir güne basıldığında
  const onChange = (selectedDate) => {
    let foundEvent = false;
    events.forEach((event) => {
      if (event.date === selectedDate.toDateString()) {
        foundEvent = true;
        dispatch(setFoundData(selectedDate.toDateString()));
        return;
      }
    });
    setShow(foundEvent);
    if (selectedDate.toDateString() === date.toDateString()) {
      setEvent((prevEvent) => !prevEvent);
    } else {
      setEvent(true);
    }
    setDate(selectedDate);
    setSelectedDate(selectedDate.toDateString());
  };

  return (
    <div>
      <h2 style={{marginLeft: "60px", marginBottom: "2vw"}}>Agenda</h2>
      <div style={{display: "flex"}}>
        {show ? <ShowEventForm /> : <div></div>}
        <Calendar
          onChange={onChange}
          value={date}
        />
        {event ? <EventForm date={selectedDate} /> : <div></div>}
      </div>
    </div>
  );
};

export default MyCalendar;
