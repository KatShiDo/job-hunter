export default class JobDto {
    id;
    title;
    description;
    salaryUp;
    salaryDown;
    exp;
    category;
    updatedAt;
    constructor(dbResponse) {
      this.id = dbResponse._id;
      this.title = dbResponse.title;
      this.description = dbResponse.description;
      this.salaryUp = dbResponse.salaryUp;
      this.salaryDown = dbResponse.salaryDown;
      this.exp = dbResponse.exp;
      this.category = dbResponse.category;
      this.updatedAt = dbResponse.updatedAt;
    }
  }
  