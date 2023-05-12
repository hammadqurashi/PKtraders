const mongoose = require("mongoose");
// import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: Number },
    address: { type: String },
    city: { type: String },
    country: { type: String },
    zip: { type: Number },
    profilepic: { type: String },
  },
  { timestamps: true }
);

// module.exports = mongoose.models.User || mongoose.model("User", UserSchema);
// module.exports.get = function (callback, limit) {
//   User.find(callback).limit(limit);
// };

export default mongoose.models.User || mongoose.model("User", UserSchema);
