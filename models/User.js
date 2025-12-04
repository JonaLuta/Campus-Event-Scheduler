const Role = require('./Role');
const { randomUUID } = require('crypto');

class User {
  constructor({ id = randomUUID(), name, email, role = Role.STUDENT }) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.role = role;
  }

  getEmail() {
    return this.email;
  }
}

module.exports = User;
