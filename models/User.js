const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, unique: true },
  profile: { type: String, default: "" },
  role: { type: String, enum: ["user", "admin"], default: "user" },
  isAdmin: { type: Boolean },
});

module.exports = mongoose.model("User", UserSchema);
