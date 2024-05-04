export default class AuthDto {
  id;
  username;
  email;
  avatar;
  accessToken;
  constructor(dbResponse) {
    this.id = dbResponse._id;
    this.username = dbResponse.username;
    this.email = dbResponse.email;
    this.avatar = dbResponse.avatar;
  }
}