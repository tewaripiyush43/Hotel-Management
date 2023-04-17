const express = require("express");
const router = express.Router();

const {
  createRoomType,
  updateRoomType,
  deleteRoomType,
} = require("../controllers/createRoomType");

router.post("/create", createRoomType);
router.put("/update", updateRoomType);
router.delete("/delete", deleteRoomType);

module.exports = router;
