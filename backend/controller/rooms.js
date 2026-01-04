const Room = require("../models/Room")
const Hotel = require("../models/Hotel")

const createRoom = async (req, res) =>{
    try{
        const hotelId = req.params.hotelId
        const newRoom = new Room(req.body)

        const savedRoom = await newRoom.save()
        const updateHotel = await Hotel.findByIdAndUpdate(hotelId, {
            $push: { rooms: savedRoom._id}
        })
        res.status(200).json({
            "message": "Successfully added new room!",
            "room": savedRoom
        })
    }
    catch(error){
        console.error(`Issue in adding new room - Error - ${error}`)
        res.status(500).json({
            "message": "Error in creating new room"
        })
    }
}

//Update
const updateRoom = async (req, res) => {
  try {
    const updateRoom = await Room.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updateRoom).status(200);
  } catch (err) {
    res.json(err).status(500);
  }
};

//Update room availability
const updateRoomAvailability = async (req, res) => {
  try {
    await Room.updateOne({"roomNumbers._id": req.params.roomId},
      {
        $push:{
          "roomNumbers.$.unavailableDates":req.body.dates
        }
      }
    )
    res.json({"message": "Room availability has been updated!"}).status(200);
  } catch (err) {
    res.json(err).status(500);
  }
};

//Delete
const deleteRoom = async (req, res) => {
  try {
    const hotelId = req.params.hotelId;
    const updateHotel = await Hotel.findByIdAndUpdate(hotelId, {
      $pull: { rooms: req.params.id },
    });
    await Room.findByIdAndDelete(req.params.id);
    res.json({"message": "Room deleted successfully!"}).status(200);
  } catch (err) {
    res.json(err).status(500);
  }
};

//Get One
const getOneRoom = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    res.json(room).status(200);
  } catch (err) {
    res.json(err).status(400);
  }
};

const getRooms = async(req, res) => {
    try{
        const rooms = await Rooms.find()
        res.status(200).json({
            "message": "Successfully fetched all rooms",
            "rooms": rooms
        })
    }
    catch(error){
        console.error(`Issue in fetching rooms - Error - ${error}`);
        res.status(500).json({
          message: "Error in fetching rooms",
        });
    }
}

module.exports = {
  createRoom,
  updateRoom,
  deleteRoom,
  getOneRoom,
  getRooms,
  updateRoomAvailability
};