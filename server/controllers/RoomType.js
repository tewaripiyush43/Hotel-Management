const RoomType = require("../models/roomType");

exports.findRoomType = async (req, res) => {
  const roomTypes = await RoomType.find().catch((err) => {
    console.log(err);
    return err;
  });

  res.json(roomTypes);
};

exports.createRoomType = async (req, res) => {
  const { room_type, price_per_hour, total_rooms } = req.body;

  const newRoomType = new RoomType({
    room_type,
    price_per_hour,
    total_rooms,
  });

  await newRoomType
    .save()
    .then(() => {
      console.log("RoomType Created");
    })
    .catch((err) => {
      console.log(err);
      return err;
    });

  return res.send({ room: newRoomType });
};

exports.updateRoomType = async (req, res) => {
  const { room_type, price_per_hour, total_rooms } = req.body;
  const filter = { room_type: room_type };
  const update = { $set: { ...req.body } };

  RoomType.updateOne(filter, update)
    .then(() => {
      console.log("RoomType Updated");
    })
    .catch((err) => {
      return err;
    });

  return res.send({ message: "console dekh" });
};

exports.deleteRoomType = async (req, res) => {
  const { room_type } = req.body;
  const filter = { room_type: room_type };

  RoomType.deleteOne(filter)
    .then(() => {
      console.log("RoomType Deleted");
    })
    .catch((err) => {
      return err;
    });

  return res.send({ message: "console dekh" });
};
