const User = require("../models/User");


const getUser = async (req, res) => {
  const userId = req.params.userId; // Assuming userId is undefined or not set correctly
  try {
    const user = await User.findById(userId); // Pass userId directly, not as an object
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const DeleteUser = async (req, res, next) => {
  const user_id = req.params.userId;
  try {
    const user = await User.findOneAndDelete( user_id );
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User is not found ",
      });
    }
    res.status(200).json({
      success: true,
      message: "user is deleted successfully",
    });
  } catch (error) {
    return next(error);
  }
};
const updateUser = async (req, res, next) => {
  try {
    const result = await User.updateMany(
      {},
      {
        $set: {
          isAdmin:false
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
module.exports = { DeleteUser, getUser,updateUser };
