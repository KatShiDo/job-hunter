class AuthDto {
  id;
  username;
  email;
  createdAt;
  avatar;
  access_token;
  refresh_token;
  constructor(dbResponse) {
    this.id = dbResponse._id;
    this.username = dbResponse.username;
    this.email = dbResponse.email;
    this.createdAt = dbResponse.createdAt;
    this.avatar = dbResponse.avatar;
  }
}

export default AuthDto;
