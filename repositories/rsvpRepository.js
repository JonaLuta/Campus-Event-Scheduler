class RsvpRepository {
  constructor() {
    this.rsvps = [];
  }

  findByEvent(eventId) {
    return this.rsvps.filter((r) => r.eventId === eventId);
  }

  findByUser(userId) {
    return this.rsvps.filter((r) => r.userId === userId);
  }

  create(rsvp) {
    this.rsvps.push(rsvp);
    return rsvp;
  }

  delete(id) {
    this.rsvps = this.rsvps.filter((r) => r.id !== id);
  }
}

module.exports = RsvpRepository;
