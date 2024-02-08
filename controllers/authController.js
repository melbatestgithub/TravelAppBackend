const User = require("../models/User");
const CryptoJs = require("crypto-js");
const jwt = require("jsonwebtoken");

const createUser = async (req, res, next) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJs.AES.encrypt(
      req.body.password,
      process.env.SECRET
    ).toString(),
  });

  try {
    await newUser.save();
    res.status(201).json({
      success: true,
      message: "New user is created successfully",
    });
  } catch (error) {
    return next(error);
  }
  
};

const login = async (req, res, next) => {
  try {
    // Find the user based on the provided username or email
    const user = await User.findOne({
      $or: [{ username: req.body.username }, { email: req.body.email }],
    });
    if (!user) {
      // User not found
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    // Decrypt the stored password and compare it with the provided password
    const decryptedPassword = CryptoJs.AES.decrypt(
      user.password,
      process.env.SECRET
    ).toString(CryptoJs.enc.Utf8);
    if (decryptedPassword !== req.body.password) {
      // Passwords don't match
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    // If the credentials are valid, generate and return a token
    const token = jwt.sign({ userId: user._id ,role:user.role}, process.env.JWT_SECRET, 
    );
    res.status(200).json({ success: true, token,id:user._id,role:user.role});
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  createUser,
  login,
};
