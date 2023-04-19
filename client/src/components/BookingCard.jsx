import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import DeletePortal from "./DeletePortal";
import EditPortal from "./EditPortal";

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
  start_time = new Date(start_time).toLocaleString();
  end_time = new Date(end_time).toLocaleString();

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
      />
      <div className="card-body">
        <h5 className="card-title">{room_id.room_number} Room</h5>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <p>{user_email}</p>
        </div>
        <div className="form-group">
          <label htmlFor="startTime">From</label>
          <p>{start_time}</p>
        </div>
        <div className="form-group">
          <label htmlFor="endTime">To</label>
          <p>{end_time}</p>
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
