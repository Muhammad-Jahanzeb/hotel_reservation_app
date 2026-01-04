const express = require("express");
const {
  createRoom,
  updateRoom,
  deleteRoom,
  getOneRoom,
  getRooms,
  updateRoomAvailability
} = require("../controller/rooms");

const router = express.Router();

router.get("/rooms/getRooms", getRooms);

router.post("/rooms/:hotelId", createRoom);

router
  .put("/rooms/:id", updateRoom)
  .get("/rooms/:id", getOneRoom);

router.delete("/rooms/:hotelId/:id", deleteRoom)

router.put("/rooms/availability/:roomId", updateRoomAvailability);

module.exports = router;
