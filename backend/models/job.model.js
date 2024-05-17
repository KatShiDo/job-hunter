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
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
    },
  },
  { versionKey: false }
);

const Job = mongoose.model("Job", jobSchema);

export default Job;
