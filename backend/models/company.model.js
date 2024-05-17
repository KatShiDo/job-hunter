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
    employees: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    jobs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job",
      },
    ],
    image: {
      type: String,
      default: "https://csko38.ru/wp-content/uploads/2023/10/7.png",
    },
  },
  { versionKey: false }
);

const Company = mongoose.model("Company", companySchema);

export default Company;
