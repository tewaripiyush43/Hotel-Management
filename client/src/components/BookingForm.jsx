import axios from "axios";
import React, { useEffect, useState } from "react";

const BookingForm = (RoomType) => {
  const [inputs, setInputs] = useState({
    email: "",
    startTime: "",
    endTime: "",
    totalPrice: 0,
  });

  useEffect(() => {
    // console.log(hours);
  }, [inputs]);

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

    const totalPrice = hours > 0 ? hours * RoomType.roomInfo.price_per_hour : 0;

    setInputs((prev) => ({
      ...prev,
      [name]: value,
      totalPrice: Math.ceil(totalPrice),
    }));
  };

  const bookRoom = async () => {
    await axios
      .post("http://localhost:9000/booking/create", {
        user_email: inputs.email,
        room_type: RoomType.roomInfo.room_type,
        start_time: inputs.startTime,
        end_time: inputs.endTime,
        total_price: inputs.totalPrice,
      })
      .then(() => {})
      .catch((err) => {
        console.log(err);
        return err;
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    bookRoom();
  };

  return (
    <div className="form-container">
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-heading-container">
          <p className="form-heading">{RoomType.roomInfo.room_type} Rooms</p>
          <p>
            Price {RoomType.roomInfo.price_per_hour}
            Rs. / hr.
          </p>
        </div>
        <div className="form-textfield">
          <label>Email</label>

          <input
            className="form-input"
            name="email"
            value={inputs.email}
            onChange={handleChange}
            type="email"
            required
            placeholder="123@example.com"
          />
        </div>
        <div className="form-textfield">
          <label>From</label>

          <input
            className="form-input"
            name="startTime"
            value={inputs.startTime}
            onChange={handleChange}
            required
            type="datetime-local"
            min={new Date().toISOString().slice(0, 16)}
          />
        </div>
        <div className="form-textfield">
          <label>To</label>
          <input
            className="form-input"
            name="endTime"
            value={inputs.endTime}
            onChange={handleChange}
            required
            type="datetime-local"
            min={inputs.startTime}
          />
        </div>
        <p className="total-price">Total Price: {inputs.totalPrice}</p>
        <button className="form-btn" type="submit">
          Book
        </button>
      </form>
    </div>
  );
};

export default BookingForm;
