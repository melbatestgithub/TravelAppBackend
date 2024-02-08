const Places = require("../models/Place");

const addPlace = async (req, res, next) => {
  const {
    countryId,
    description,
    imageUrl,
    region,
    title,
    rating,
    review,
    latitude,
    longitude,
    location,
  } = req.body;
  try {
    const newPlace = new Places({
      countryId,
      description,
      imageUrl,
      region,
      title,
      review,
      rating,
      latitude,
      longitude,
      location,
    });
    await newPlace.save();
    res.status(201).json({
      success: true,
      message: "place added successfully",
    });
  } catch (error) {
    next(error);
  }
};
const getAllPlace = async (req, res, next) => {
  try {
    const places = await Places.find(
      {},
      "_id imageUrl review rating title countryId"
    );
    res.status(200).send({
      success: true,
      places,
    });
  } catch (error) {
    next(error);
  }
};
const getPlace = async (req, res, next) => {
  const placeId = req.params.placeId;
  try {
    const place = await Places.findById(placeId, {
      createdAt: 0,
      updatedAt: 0,
      __v: 0,
    });
    res.status(200).json({
      success: true,
      place,
    });
  } catch (error) {
    next(error);
  }
};

const getPlaceByCountry = async (req, res, next) => {
  const countryId = req.params.countryId;
  try {
    console.log("Requested Country ID:", countryId);

    const places = await Places.find({ countryId: countryId });

    if (!places || places.length === 0) {
      return res.status(200).json([]);
    }

    res.status(200).send({
      success: true,
      place: places,
    });
  } catch (error) {
    console.error("Error in getPlaceByCountry:", error);
    next(error);
  }
};

const updatePlace = async (req, res, next) => {
  try {
    const result = await Places.updateMany(
      {},
      {
        $set: {
          isRecommended: false,
          isPopular: false,
        },
      }
    );
    res.status(200).json({
      success: true,
      result,
    });
  } catch (error) {
    next(error);
  }
};

const BookPlace = async (req, res, next) => {
  const placeId = req.params.placeId;
  try {
    const BookedPlace = await Places.findByIdAndUpdate(placeId, {
      booked: true,
    });
    if (BookedPlace) {
      res.status(201).json({
        success: true,
        book: BookedPlace,
        message: "Booking succesffull",
      });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addPlace,
  getAllPlace,
  getPlace,
  getPlaceByCountry,
  updatePlace,
  BookPlace,
};
