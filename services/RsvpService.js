const RSVP = require('../models/RSVP');
const RsvpStatus = require('../models/RsvpStatus');

class RsvpService {
  constructor(eventRepository, rsvpRepository, notificationService) {
    this.eventRepository = eventRepository;
    this.rsvpRepository = rsvpRepository;
    this.notificationService = notificationService;
  }

  countGoing(eventId) {
    return this.rsvpRepository
      .findByEvent(eventId)
      .filter((r) => r.status === RsvpStatus.GOING).length;
  }

  rsvp(userId, eventId) {
    const event = this.eventRepository.findById(eventId);
    if (!event) throw new Error('Event not found');

    const existing = this.rsvpRepository
      .findByUser(userId)
      .find(
        (r) => r.eventId === eventId && r.status !== RsvpStatus.CANCELLED
      );
    if (existing) {
      throw new Error('User already RSVPed for this event');
    }

    const goingCount = this.countGoing(eventId);
    let status = RsvpStatus.GOING;

    if (event.isFull(goingCount)) {
      status = RsvpStatus.WAITLISTED;
    }

    const rsvp = new RSVP({ eventId, userId, status });
    this.rsvpRepository.create(rsvp);


    const reminderTime = new Date(event.startTime.getTime() - 60 * 60 * 1000);
    this.notificationService.scheduleReminder(userId, eventId, reminderTime);

    return rsvp;
  }

  cancelRsvp(userId, eventId) {
    const userRsvps = this.rsvpRepository.findByUser(userId);
    const rsvp = userRsvps.find((r) => r.eventId === eventId);
    if (!rsvp) return;
    rsvp.cancel();
  }
}

module.exports = RsvpService;
