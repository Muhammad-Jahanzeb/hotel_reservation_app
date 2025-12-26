const express = require("express");
const test = require("../controller/test");
const {
  createHotel,
  getAll,
  updateHotel,
  deleteHotel,
  getOne,
  countByCity,
  countByType,
} = require("../controller/hotels");

const router = express.Router();

router.get("/hotel", getAll).post("/hotel", createHotel);

router
  .put("/hotel/:id", updateHotel)
  .delete("/hotel/:id", deleteHotel)
  .get("/hotel/:id", getOne);

router.get("/countByCity", countByCity);

router.get("/countByType", countByType);

module.exports = router;
