import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/HomePage";
import "./styles/_styles.scss";
import Navbar from "./components/Navbar";
import UpdateBookings from "./pages/UpdateBookingsPage";
import ViewBookings from "./pages/ViewBookingsPage";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/updatebookings" element={<UpdateBookings />} />
        <Route path="/viewbookings" element={<ViewBookings />} />
      </Routes>
    </div>
  );
}

export default App;
