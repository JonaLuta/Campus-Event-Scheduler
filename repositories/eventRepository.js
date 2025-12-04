class EventRepository {
  constructor() {
    this.events = [];
  }

  findById(id) {
    return this.events.find((e) => e.id === id) || null;
  }

  save(event) {
    const index = this.events.findIndex((e) => e.id === event.id);
    if (index >= 0) {
      this.events[index] = event;
    } else {
      this.events.push(event);
    }
    return event;
  }

  findAll() {
    return [...this.events];
  }
}

module.exports = EventRepository;
