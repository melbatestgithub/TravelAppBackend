const express = require("express");
const router = express.Router();

const {
  addPlace,
  getAllPlace,
  getPlace,
  getPlaceByCountry,
  updatePlace,
  BookPlace,
} = require("../controllers/placeController");
router.post("/addPlace", addPlace);
router.get("/getAllPlace", getAllPlace);
router.get("/getPlace/:placeId", getPlace);
router.get("/getPlaceByCountry/:countryId", getPlaceByCountry);
router.post("/updatePlace", updatePlace);
router.post("/book/:placeId", BookPlace);

module.exports = router;
