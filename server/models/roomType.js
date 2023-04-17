const mongoose = require("mongoose");

const roomTypeSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    unique: true,
  },
  price_per_hour: {
    type: Number,
    required: true,
  },
  total_rooms: {
    type: Number,
    required: true,
  },
});

const RoomType = new mongoose.model("RoomType", roomTypeSchema);
module.exports = RoomType;
