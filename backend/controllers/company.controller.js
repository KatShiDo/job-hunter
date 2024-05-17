import CompanyDto from "../dtos/company.dto.js";
import Company from "../models/company.model.js";
import { errorHandler } from "../utils/error.js";

export const create = (request, response, next) => {
  const { name, description, address, image } = request.body;
  if (!name || name == "") {
    return next(errorHandler(400, "Please provide all required fields"));
  }
  if (!image) {
    image = "https://csko38.ru/wp-content/uploads/2023/10/7.png";
  }
  const newCompany = new Company({
    name,
    description,
    address,
    image,
    employees: [request.user.id],
  });
  newCompany
    .save()
    .then((dbResponse) => {
      const companyDto = new CompanyDto(dbResponse);
      response.status(200).send(companyDto);
    })
    .catch((error) => next(error));
};
