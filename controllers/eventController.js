class EventController {
  constructor(eventService, authService) {
    this.eventService = eventService;
    this.authService = authService;

    this.createEvent = this.createEvent.bind(this);
    this.listEvents = this.listEvents.bind(this);
    this.getGuestList = this.getGuestList.bind(this);
  }

  createEvent(req, res, next) {
    try {
      const user = this.authService.currentUser(req);
      this.authService.requireRole(['ORGANIZER', 'ADMIN'], user);

      const event = this.eventService.createEvent(req.body, user);
      res.status(201).json(event);
    } catch (err) {
      next(err);
    }
  }

  listEvents(req, res, next) {
    try {
      const events = this.eventService.listEvents(req.query);
      res.json(events);
    } catch (err) {
      next(err);
    }
  }

  getGuestList(req, res, next) {
    try {
      const eventId = req.params.eventId;
      const guests = this.eventService.getGuestList(eventId);
      res.json(guests);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = EventController;
