const express=require("express")
const verifyToken = require("../middleware/authMiddleware");
const {DeleteUser,getUser,updateUser}=require("../controllers/UserController")
const router=express.Router()

router.delete("/deleteAccount/:userId",verifyToken,DeleteUser)
router.get("/getUser/:userId",verifyToken,getUser)
router.post("/updateUser",updateUser)

module.exports=router