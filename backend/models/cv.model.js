import mongoose from "mongoose";

const cvSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: false,
    },
    description: {
      type: String,
      required: false,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { versionKey: false }
);

const Cv = mongoose.model("Cv", cvSchema);

export default Cv;
