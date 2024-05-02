import mongoose from "mongoose";

const refreshTokenSchema = new mongoose.Schema(
    {
      token: {
        type: String,
        required: true,
        unique: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
      },
    },
    { timestamps: true }
  );
  
  const RefreshToken = mongoose.model("RefreshToken", refreshTokenSchema);
  
  export default RefreshToken;