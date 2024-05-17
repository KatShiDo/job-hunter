import mongoose from "mongoose";

const companySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: false,
    },
    address: {
      type: String,
      required: false,
    },
    image: {
      type: String,
    },
  },
  { versionKey: false }
);

companySchema.virtual("employees", {
  ref: "User",
  localField: "_id",
  foreignField: "companyId",
});
companySchema.virtual("jobs", {
  ref: "Job",
  localField: "_id",
  foreignField: "companyId",
});

const Company = mongoose.model("Company", companySchema);

export default Company;
