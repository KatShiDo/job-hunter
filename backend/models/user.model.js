import mongoose, { mongo } from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    fullname: {
      type: String,
      required: false,
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
      required: false,
      default:
        "https://www.pngmart.com/files/21/Account-User-PNG-Photo.png",
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "Company",
    },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

userSchema.virtual("sessions", {
  ref: "RefreshToken",
  localField: "_id",
  foreignField: "userId",
});
userSchema.virtual("cvs", {
  ref: "Cv",
  localField: "_id",
  foreignField: "userId",
});

const User = mongoose.model("User", userSchema);

export default User;
