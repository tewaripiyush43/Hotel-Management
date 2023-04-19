import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleClick = (name) => {
    navigate(`/${name}`);
  };

  return (
    <div>
      <nav id="nav">
        <h2 id="heading" onClick={() => handleClick("")}>
          HM
        </h2>

        <div className="links">
          <h3 onClick={() => handleClick("")} className="link">
            Create Booking
          </h3>
          <h3 onClick={() => handleClick("viewbookings")} className="link">
            View Bookings
          </h3>
        </div>
      </nav>
    </div>
  );
};
export default Navbar;
