import CompanyDto from "../dtos/company.dto.js";
import Company from "../models/company.model.js";
import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";

export const createCompany = async (request, response, next) => {
  const { name, description, address, image } = request.body;
  if (!name || name == "") {
    return next(errorHandler(400, "Please provide all required fields"));
  }
  if (!image || image == "") {
    image = "https://csko38.ru/wp-content/uploads/2023/10/7.png";
  }
  const newCompany = new Company({
    name,
    description,
    address,
    image,
  });
  try {
    const savedCompany = await newCompany.save();
    const companyDto = new CompanyDto(savedCompany);
    const user = await User.findById(request.user.id);
    user.companyId = savedCompany._id;
    await user.save();
    response.status(200).send(companyDto);
  } catch (error) {
    next(error);
  }
};
