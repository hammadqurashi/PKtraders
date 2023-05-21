const mongoose = require("mongoose");

const OTPVerifySchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, unique: true },
    otp: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.OTPVerify ||
  mongoose.model("OTPVerify", OTPVerifySchema);

// expireAt: { type: Date, default: Date.now, index: { expires: 0 } },
