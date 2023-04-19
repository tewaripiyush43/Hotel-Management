import React, { useState, useEffect } from "react";
import BookingForm from "../components/BookingForm";
import axios from "axios";

const Home = () => {
  const [roomTypes, setRoomTypes] = useState([]);

  useEffect(() => {
    const getRoomTypes = async (req, res) => {
      await axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/roomtype/find`)
        .then((res) => {
          setRoomTypes(res.data);
        })
        .catch((err) => {
          console.log(err);
          return err;
        });
    };

    getRoomTypes();
  }, []);

  return (
    <div className="parent">
      <div className="component-heading">Create Booking</div>
      <div className="forms">
        {roomTypes.map((RoomType) => {
          return <BookingForm roomInfo={RoomType} />;
        })}
      </div>
    </div>
  );
};

export default Home;
