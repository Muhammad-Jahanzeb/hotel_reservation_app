const Hotel = require("../models/Hotel");

//Create hotel
const createHotel = async (req, res) => {
  const newHotel = new Hotel(req.body);

  try {
    const savedHotel = await newHotel.save();
    res.json(savedHotel).status(200);
  } catch (err) {
    res.json(err).status(500);
  }
};

//Get all
const getAll = async (req, res) => {
  const { min, max, limit, featured, ...others } = req.query;
  try {
    let minPrice = min == ('' || undefined || null)? 0: min
    let maxPrice = max == ("" || undefined || null) ? 100000 : max;
    const query = {
      ...others,
      cheapestPrice: { $gt: minPrice, $lte: maxPrice },
    };

    // ✅ Convert "true"/"false" string to boolean
    if (featured !== undefined) {
      query.featured = featured === "true";
    }
    const hotels = await Hotel.find({
      featured: true,
      $expr: {
        $and: [
          { $gt: [{ $toDouble: "$cheapestPrice" }, Number(min) || 0] },
          { $lte: [{ $toDouble: "$cheapestPrice" }, Number(max) || 100000] },
        ],
      },
    }).limit(limit);
    res.json(hotels).status(200);
  } catch (err) {
    res.json(err).status(500);
  }
};

//Update
const updateHotel = async (req, res) => {
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedHotel).status(200);
  } catch (err) {
    res.json(err).status(500);
  }
};

//Delete
const deleteHotel = async (req, res) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);
    res.json("Hotel deleted!").status(200);
  } catch (err) {
    res.json(err).status(500);
  }
};

//Get One
const getOne = async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    res.json(hotel).status(200);
  } catch (err) {
    res.json(err).status(400);
  }
};

const countByCity = async (req, res) => {
  try {
    const cities = req.query.cities.split(",");
    const hotels = await Promise.all(
      cities.map((city) => {
        return Hotel.countDocuments({ city: city });
      })
    );

    res.status(200).json(hotels);
  } catch (error) {
    console.log(`Error in getting cout by city ${error}`);
  }
};

const countByType = async (req, res) => {
  const types = ["hotel", "apartment", "resort", "villa", "cabin"];

  try {
    const counts = await Promise.all(
      types.map((t) => Hotel.countDocuments({ type: t }))
    );

    const result = types.map((t, i) => ({
      type: t + "s", // plural if you want
      count: counts[i],
    }));

    res.status(200).json(result);
  } catch (error) {
    console.error(`Error in getting count by type: ${error}`);
    res.status(500).json({ error: "Internal server error" });
  }
};


module.exports = {
  createHotel,
  getAll,
  updateHotel,
  deleteHotel,
  getOne,
  countByCity,
  countByType
};
