export default class UserDto {
  id;
  username;
  email;
  avatar;
  isAdmin;
  company;
  constructor(dbResponse) {
    this.id = dbResponse._id;
    this.username = dbResponse.username;
    this.email = dbResponse.email;
    this.avatar = dbResponse.avatar;
    this.isAdmin = dbResponse.isAdmin;
  }
}
