export default class CompanyDto {
  id;
  name;
  description;
  address;
  image;
  constructor(dbResponse) {
    this.id = dbResponse._id;
    this.name = dbResponse.name;
    this.description = dbResponse.description;
    this.address = dbResponse.address;
    this.image = dbResponse.image;
  }
}
