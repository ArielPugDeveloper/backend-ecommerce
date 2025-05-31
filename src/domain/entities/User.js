class User {
  constructor({ username, email, password, roles }) {
    this.username = username;
    this.email = email;
    this.password = password;
    this.roles = roles || ['user'];
  }
}

module.exports = User;