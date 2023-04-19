import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import axios from "axios";

const EditPortal = ({ isOpen, setOpen, refreshData, bookingInfo }) => {
  let {
    _id,
    room_id,
    room_type,
    user_email,
    start_time,
    end_time,
    total_price,
  } = bookingInfo;
  if (!isOpen) return null;

  const [inputs, setInputs] = useState({
    email: user_email,
    startTime: new Date(start_time).toISOString().slice(0, 16),
    endTime: new Date(end_time).toISOString().slice(0, 16),
    totalPrice: total_price,
  });

  useEffect(() => {}, [inputs]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    const start =
      name === "startTime"
        ? new Date(value).getTime()
        : new Date(inputs.startTime).getTime();
    const end =
      name === "endTime"
        ? new Date(value).getTime()
        : new Date(inputs.endTime).getTime();
    const hours = (end - start) / (1000 * 60 * 60);

    const totalPrice = hours > 0 ? hours * room_type.price_per_hour : 0;

    setInputs((prev) => ({
      ...prev,
      [name]: value,
      totalPrice: Math.ceil(totalPrice),
    }));
  };
  const [hours, setHours] = useState(0);

  const countHours = () => {
    const start = new Date(start_time);
    const now = new Date();
    const diffMs = start - now;
    const diffHrs = Math.round((diffMs / 3600000) * 10) / 10;
    setHours(diffHrs);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateBooking();
  };

  useEffect(() => {
    countHours();
    console.log(new Date(start_time).toISOString().slice(0, 16));
  }, []);

  const updateBooking = async () => {
    setOpen(false);
    await axios
      .put("http://localhost:9000/booking/update", {
        bookingId: bookingInfo._id,
        user_email: inputs.email,
        room_type: room_type.room_type,
        start_time: inputs.startTime,
        end_time: inputs.endTime,
        total_price: inputs.totalPrice,
      })
      .then(() => {
        // console.log("Update Booking");
        refreshData();
      })
      .catch((err) => {
        console.log(err);
        return err;
      });
  };

  return ReactDOM.createPortal(
    <div className="edit-portal">
      <div className="overlay-style" />
      <div className="edit-component">
        <form className="update-form" onSubmit={handleSubmit}>
          <div className="update-form-heading-container">
            <p className="update-form-heading">{room_id.room_number} Room</p>
            <p>
              Price {room_type.price_per_hour}
              Rs. / hr.
            </p>
          </div>
          <div className="update-form-textfield">
            <label>Email</label>

            <input
              className="update-form-input"
              name="email"
              value={inputs.email}
              onChange={handleChange}
              type="email"
              required
              placeholder="123@example.com"
            />
          </div>
          <div className="update-form-textfield">
            <label>From:</label>

            <input
              className="update-form-input"
              name="startTime"
              value={inputs.startTime}
              onChange={handleChange}
              required
              type="datetime-local"
            />
          </div>
          <div className="update-form-textfield">
            <label>To:</label>
            <input
              className="update-form-input"
              name="endTime"
              value={inputs.endTime}
              onChange={handleChange}
              required
              type="datetime-local"
              min={inputs.startTime}
            />
          </div>
          <p className="update-total-price">Total Price: {inputs.totalPrice}</p>
          <button className="update-form-btn" type="submit">
            Update
          </button>
        </form>
      </div>
    </div>,
    document.getElementById("portal")
  );
};

export default EditPortal;
