import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import axios from "axios";

const DeletePortal = ({
  isOpen,
  setOpen,
  bookingId,
  refreshData,
  start_time,
}) => {
  if (!isOpen) return null;

  const [hours, setHours] = useState(0);

  const countHours = () => {
    // console.log(start_ti me, Date.now().toLocaleString());
    const start = new Date(start_time);
    const now = new Date();
    const diffMs = start - now; // difference in milliseconds
    const diffHrs = Math.round((diffMs / 3600000) * 10) / 10; // difference in hours rounded to one decimal point
    // return diffHrs;
    setHours(diffHrs);
  };

  useEffect(() => {
    countHours();
  }, []);

  const sendDeleteRequest = async (req, res) => {
    setOpen(false);
    await axios
      .delete(`http://localhost:9000/booking/delete/${bookingId}`)
      .then(() => {
        // console.log("Delete request sent");
        refreshData();
      })
      .catch((err) => {
        console.log(err);
        return err;
      });
  };

  return ReactDOM.createPortal(
    <div className="delete-portal">
      <div className="overlay-style" />
      <div className="delete-component">
        <div className="delete-component-title">Are you sure?</div>
        <p className="delete-component-message">
          {hours < 24
            ? "You are cancelling your booking in the last moment, So you won't get any refund."
            : hours < 48
            ? `You are cancelling your booking a day before, So you will get 50% refund.`
            : "You are cancelling your booking 48hrs before, So you will get 100% refund."}
        </p>
        <div className="cancel-booking-btn">
          <button className="cancel-btn" onClick={() => setOpen(false)}>
            No
          </button>
          <button className="confirm-btn" onClick={sendDeleteRequest}>
            Confirm
          </button>
        </div>
      </div>
    </div>,
    document.getElementById("portal")
  );
};

export default DeletePortal;
