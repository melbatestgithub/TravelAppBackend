const express=require("express")
const router=express.Router()

const {
  addCountry,
  getAllCountry,
  getCountry,
  updateCountry,
  getAll,
  getPopular,
  getRecommended,
} = require("../controllers/countryController");
router.post("/addCountry",addCountry)
router.get("/allCountry",getAllCountry)
router.get("/getCountry/:id",getCountry)
router.post("/updateCountry", updateCountry);
router.get("/allCount",getAll)
router.get("/getPopular",getPopular)
router.get("/getRecommended", getRecommended);

module.exports=router