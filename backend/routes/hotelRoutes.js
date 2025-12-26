const express = require("express");
const {
  createHotel,
  getAll,
  updateHotel,
  deleteHotel,
  getOne,
  countByCity,
  countByType,
  getHotelRooms
} = require("../controller/hotels");

const router = express.Router();

router.get("/hotel", getAll).post("/hotel", createHotel);

router
  .put("/hotel/:id", updateHotel)
  .delete("/hotel/:id", deleteHotel)
  .get("/hotel/:id", getOne);

router.get("/countByCity", countByCity);

router.get("/countByType", countByType);

router.get("/rooms/:id", getHotelRooms); //688e2eb687fbcde09ee454c0

module.exports = router;
