export class Event {
  constructor(id, title, description, startTime, endTime, venueId, capacity, tags=[]) {}
  isFull() { return false; }
  getDurationMinutes() { return 0; }
}
