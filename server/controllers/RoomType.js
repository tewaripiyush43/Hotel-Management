const RoomType = require("../models/roomType");

exports.createRoomType = async (req, res) => {
  //   console.log("hogi request sexy");
  const { type, price_per_hour, total_rooms } = req.body;

  const newRoomType = new RoomType({
    type,
    price_per_hour,
    total_rooms,
  });

  await newRoomType
    .save()
    .then(() => {
      console.log("RoomType Created");
    })
    .catch((err) => {
      return err;
    });

  return res.send({ room: newRoomType });
};

exports.updateRoomType = async (req, res) => {
  //   console.log("hogya update ");

  const { type, price_per_hour, total_rooms } = req.body;
  const filter = { type: type };
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
  //   console.log("hogya update ");

  const { type } = req.body;
  const filter = { type: type };

  RoomType.deleteOne(filter)
    .then(() => {
      console.log("RoomType Deleted");
    })
    .catch((err) => {
      return err;
    });

  return res.send({ message: "console dekh" });
};
