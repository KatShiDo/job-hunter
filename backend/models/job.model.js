import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: false,
    },
    salaryUp: {
      type: Number,
      required: false,
    },
    salaryDown: {
      type: Number,
      required: false,
    },
    description: {
      type: String,
      required: false,
    },
    exp: {
      type: Number,
      required: false,
    },
    category: {
      type: String,
      default: "Uncategorized",
    },
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
    },
  },
  { versionKey: false, timestamps: true }
);

const Job = mongoose.model("Job", jobSchema);

export default Job;
