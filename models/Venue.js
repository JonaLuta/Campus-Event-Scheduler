const { randomUUID } = require('crypto');

class Venue {
  constructor({ id = randomUUID(), name, address, room, capacity }) {
    this.id = id;
    this.name = name;
    this.address = address;
    this.room = room;
    this.capacity = capacity;
  }
}

module.exports = Venue;
