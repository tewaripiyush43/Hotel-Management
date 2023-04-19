import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import DeletePortal from "./DeletePortal";
import EditPortal from "./EditPortal";

import PopUp from "./PopUp";

const BookingCard = ({ bookingInfo, refreshData }) => {
  const [isDeleteClicked, setIsDeleteClicked] = useState(false);
  const [isEditClicked, setIsEditClicked] = useState(false);
  let {
    _id,
    room_id,
    room_type,
    user_email,
    start_time,
    end_time,
    total_price,
  } = bookingInfo;

  // console.log(start_time);
  const start_time_string = new Date(start_time).toLocaleString(),
    end_time_string = new Date(end_time).toLocaleString();

  const [popupOpen, setPopupOpen] = useState(false);
  const [text, setText] = useState("");

  return (
    <div className="card">
      <DeletePortal
        start_time={start_time}
        refreshData={refreshData}
        bookingId={_id}
        isOpen={isDeleteClicked}
        setOpen={() => setIsDeleteClicked(false)}
      />
      <EditPortal
        bookingInfo={bookingInfo}
        refreshData={refreshData}
        isOpen={isEditClicked}
        setOpen={() => setIsEditClicked(false)}
        setPopupOpen={setPopupOpen}
        setText={setText}
      />
      <PopUp open={popupOpen} setOpen={setPopupOpen} text={text} />
      <div className="card-body">
        <h5 className="card-title">{room_id.room_number} Room</h5>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <p>{user_email}</p>
        </div>
        <div className="form-group">
          <label htmlFor="startTime">From</label>
          <p>{start_time_string}</p>
        </div>
        <div className="form-group">
          <label htmlFor="endTime">To</label>
          <p>{end_time_string}</p>
        </div>
        <div className="form-group">
          <label htmlFor="TotalPrice">Total Price</label>
          <p>{total_price}</p>
        </div>
        <div className="buttons-container">
          <button
            onClick={() => {
              setIsEditClicked(true);
            }}
            className="edit-button"
          >
            <EditIcon />
          </button>
          <button
            onClick={() => {
              setIsDeleteClicked(true);
            }}
            className="delete-button"
          >
            <DeleteIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingCard;
