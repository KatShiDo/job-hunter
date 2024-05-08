import mongoose from "mongoose";

const refreshTokenSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  fingerprint: {
    type: String,
    required: true
  },
  expirationDate: {
    type: Date,
    default: new Date().getTime() + 5184000000,
  },
  creationDate: {
    type: Date,
    default: new Date(),
  },
});

const RefreshToken = mongoose.model("RefreshToken", refreshTokenSchema);

export default RefreshToken;
