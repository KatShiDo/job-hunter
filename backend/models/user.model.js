import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      min: 3,
      max: 20,
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
    avatar: {
      type: String,
      default:
        "https://catherineasquithgallery.com/uploads/posts/2021-03/1614570231_59-p-chernaya-golova-na-belom-fone-63.png",
    },
    sessions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "RefreshSession",
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
