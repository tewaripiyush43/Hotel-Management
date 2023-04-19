import React, { useState, useEffect } from "react";
import ViewBooking from "../components/ViewBooking";
import FilterAltTwoToneIcon from "@mui/icons-material/FilterAltTwoTone";
import axios from "axios";

const ViewBookings = () => {
  const [isFilterClicked, setIsFilterClicked] = useState(false);
  const [bookings, setBookings] = useState();
  const [inputs, setInputs] = useState({
    startTime: "",
    endTime: "",
    roomType: "",
    roomNumber: "",
  });
  const getBookings = async () => {
    // console.log("getBookings called");
    setBookings([]);
    await axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/booking/getBookings`)
      .then((res) => {
        setBookings(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
        return err;
      });
  };

  useEffect(() => {
    getBookings();
  }, []);

  const sendRequest = async (req, res) => {
    if (
      (inputs.startTime === "" || inputs.endTime === "") &&
      (inputs.roomType === "" || inputs.roomNumber === "")
    ) {
      getBookings();
    } else {
      await axios
        .get(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/booking/filterBookings?start_time=${inputs.startTime}&end_time=${
            inputs.endTime
          }&room_type=${inputs.roomType}&room_number=${inputs.roomNumber}`
        )
        .then((res) => {
          console.log(res.data);
          setBookings(res.data);
        })
        .catch((err) => {
          console.log(err);
          return err;
        });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendRequest();
  };

  const handleReset = (e) => {
    setInputs({
      startTime: "",
      endTime: "",
      roomType: "",
      roomNumber: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="view-booking-container">
      <div className="filter-container">
        {isFilterClicked && (
          <form className="filter-fields" onSubmit={handleSubmit}>
            <label className="input-label" htmlFor="startTime">
              From:
            </label>
            <input
              name="startTime"
              type="datetime-local"
              value={inputs.startTime}
              onChange={handleChange}
            />
            <label className="input-label" htmlFor="endTime">
              - &nbsp; To:
            </label>
            <input
              name="endTime"
              type="datetime-local"
              value={inputs.endTime}
              onChange={handleChange}
              min={inputs.startTime}
            />
            <label className="input-label" htmlFor="roomNumber">
              Room no.
            </label>
            <input
              name="roomNumber"
              className="room-number-input"
              type="text"
              placeholder="A-1"
              value={inputs.roomNumber}
              onChange={handleChange}
            />
            <label className="input-label" htmlFor="roomyType">
              Room
            </label>
            <select
              name="roomType"
              id="roomTypes"
              value={inputs.roomType}
              onChange={handleChange}
            >
              <option defaultChecked value=""></option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
            </select>
            <button className="filter-submit-btn" onClick={handleReset}>
              Reset
            </button>
            <button className="filter-submit-btn" type="submit">
              Apply
            </button>
          </form>
        )}
        <div
          onClick={() => setIsFilterClicked(!isFilterClicked)}
          className="filter-icon-container"
        >
          <p>Filter</p>
          <FilterAltTwoToneIcon className="filter-icon" />
        </div>
      </div>
      <ViewBooking bookings={bookings} refreshData={() => getBookings()} />
    </div>
  );
};

export default ViewBookings;
