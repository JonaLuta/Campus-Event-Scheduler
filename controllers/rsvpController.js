class RsvpController {
  constructor(rsvpService, authService) {
    this.rsvpService = rsvpService;
    this.authService = authService;

    this.rsvp = this.rsvp.bind(this);
    this.cancel = this.cancel.bind(this);
  }

  rsvp(req, res, next) {
    try {
      const user = this.authService.currentUser(req);
      this.authService.requireRole(['STUDENT'], user);

      const eventId = req.params.eventId;
      const rsvp = this.rsvpService.rsvp(user.id, eventId);
      res.status(201).json(rsvp);
    } catch (err) {
      next(err);
    }
  }

  cancel(req, res, next) {
    try {
      const user = this.authService.currentUser(req);
      this.authService.requireRole(['STUDENT'], user);

      const eventId = req.params.eventId;
      this.rsvpService.cancelRsvp(user.id, eventId);
      res.status(204).end();
    } catch (err) {
      next(err);
    }
  }
}

module.exports = RsvpController;
