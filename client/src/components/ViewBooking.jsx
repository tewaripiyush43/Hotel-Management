import React, { useEffect, useState } from "react";
import BookingCard from "./BookingCard";

const ViewBooking = ({ bookings, refreshData }) => {
  // console.log(bookings);
  return (
    <div className="view-booking-container">
      {bookings?.map((booking) => {
        return <BookingCard bookingInfo={booking} refreshData={refreshData} />;
      })}
    </div>
  );
};

export default ViewBooking;
