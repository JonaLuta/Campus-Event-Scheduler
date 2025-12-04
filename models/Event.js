const { randomUUID } = require('crypto');
const EventStatus = require('./EventStatus');

class Event {
  constructor({
    id = randomUUID(),
    title,
    description,
    startTime,
    endTime,
    venueId,
    tags = [],
    capacity,
    status = EventStatus.DRAFT,
  }) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.startTime = new Date(startTime);
    this.endTime = new Date(endTime);
    this.venueId = venueId;
    this.tags = tags;
    this.capacity = capacity;
    this.status = status;
  }

  isFull(currentGoingCount) {
    return typeof this.capacity === 'number' && currentGoingCount >= this.capacity;
  }

  getDurationMinutes() {
    return (this.endTime - this.startTime) / (1000 * 60);
  }
}

module.exports = Event;
