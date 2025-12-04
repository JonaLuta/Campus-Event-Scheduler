const Event = require('../models/Event');
const EventStatus = require('../models/EventStatus');
const RsvpStatus = require('../models/RsvpStatus');

class EventService {
  constructor(eventRepository, rsvpRepository, userRepository, searchService) {
    this.eventRepository = eventRepository;
    this.rsvpRepository = rsvpRepository;
    this.userRepository = userRepository;
    this.searchService = searchService;
  }

  createEvent(dto, organizerUser) {
    // simple validation like in diagram
    if (!dto.title || !dto.startTime || !dto.endTime || !dto.venueId) {
      throw new Error('Missing required event fields');
    }

    const event = new Event({
      ...dto,
      status: EventStatus.PUBLISHED,
    });

    return this.eventRepository.save(event);
  }

  listEvents(filters = {}) {
    const all = this.eventRepository.findAll();
    return this.searchService.search(all, filters);
  }

  getGuestList(eventId) {
    const rsvps = this.rsvpRepository.findByEvent(eventId);
    const active = rsvps.filter(
      (r) => r.status === RsvpStatus.GOING || r.status === RsvpStatus.WAITLISTED
    );

    return active.map((r) => {
      const user = this.userRepository.findById(r.userId);
      return {
        id: user?.id,
        name: user?.name,
        email: user?.email,
        rsvpStatus: r.status,
        timestamp: r.timestamp,
      };
    });
  }
}

module.exports = EventService;
