const express = require("express");
const {
  createRoom,
  updateRoom,
  deleteRoom,
  getOneRoom,
  getRooms
} = require("../controller/rooms");
const {verifyToken} = require('../utils/verifyToken')

const router = express.Router();

router.get("/rooms/getRooms", getRooms);

router.post("/rooms/:hotelId", createRoom);

router
  .put("/rooms/:id", updateRoom)
  .get("/rooms/:id", getOneRoom);

router.delete("/rooms/:hotelId/:id", deleteRoom)

// router.get("/rooms/:id", )

module.exports = router;
