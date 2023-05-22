const mongoose = require("mongoose");
// import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: Number, default: 0 },
    address: { type: String, default: "" },
    city: { type: String, default: "" },
    country: { type: String, default: "" },
    zip: { type: Number, default: 0 },
    profilepic: { type: String, default: "" },
  },
  { timestamps: true }
);

// module.exports = mongoose.models.User || mongoose.model("User", UserSchema);
// module.exports.get = function (callback, limit) {
//   User.find(callback).limit(limit);
// };

export default mongoose.models.User || mongoose.model("User", UserSchema);
