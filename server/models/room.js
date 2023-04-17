const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  room_type_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "RoomType",
    required: true,
  },
  room_number: {
    type: String,
    unique: true,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

const Room = new mongoose.model("Room", roomSchema);
module.exports = Room;
