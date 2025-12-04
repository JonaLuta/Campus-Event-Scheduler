const { randomUUID } = require('crypto');
const RsvpStatus = require('./RsvpStatus');

class RSVP {
  constructor({
    id = randomUUID(),
    eventId,
    userId,
    timestamp = new Date(),
    status = RsvpStatus.GOING,
  }) {
    this.id = id;
    this.eventId = eventId;
    this.userId = userId;
    this.timestamp = new Date(timestamp);
    this.status = status;
  }

  confirm() {
    this.status = RsvpStatus.GOING;
  }

  cancel() {
    this.status = RsvpStatus.CANCELLED;
  }
}

module.exports = RSVP;
