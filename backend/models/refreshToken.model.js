import mongoose from "mongoose";

const refreshTokenSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    ua: {
      type: String,
      required: true,
    },
    fingerprint: {
      type: String,
      required: true,
    },
    ip: {
      type: String,
      required: true,
    },
    expiresIn: {
      type: BigInt,
      required: true
    },
  },
);

const RefreshToken = mongoose.model("RefreshToken", refreshTokenSchema);

export default RefreshToken;