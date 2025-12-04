class UserRepository {
  constructor() {
    this.users = [];
  }

  findById(id) {
    return this.users.find((u) => u.id === id) || null;
  }

  save(user) {
    const index = this.users.findIndex((u) => u.id === user.id);
    if (index >= 0) {
      this.users[index] = user;
    } else {
      this.users.push(user);
    }
    return user;
  }

  findAll() {
    return [...this.users];
  }
}

module.exports = UserRepository;
