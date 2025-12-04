// app.js

const express = require('express');
const bodyParser = require('body-parser');

// Repositories
const UserRepository = require('./repositories/UserRepository');
const EventRepository = require('./repositories/EventRepository');
const RsvpRepository = require('./repositories/RsvpRepository');

// Services
const SearchService = require('./services/SearchService');
const NotificationService = require('./services/NotificationService');
const AuthService = require('./services/AuthService');
const EventService = require('./services/EventService');
const RsvpService = require('./services/RsvpService');

// Controllers
const EventController = require('./controllers/EventController');
const RsvpController = require('./controllers/RsvpController');

const app = express();
app.use(bodyParser.json());

// Instantiate repositories
const userRepo = new UserRepository();
const eventRepo = new EventRepository();
const rsvpRepo = new RsvpRepository();

// Instantiate services
const searchService = new SearchService();
const notificationService = new NotificationService();
const authService = new AuthService(userRepo);
const eventService = new EventService(eventRepo, rsvpRepo, userRepo, searchService);
const rsvpService = new RsvpService(eventRepo, rsvpRepo, notificationService);

// Instantiate controllers
const eventController = new EventController(eventService, authService);
const rsvpController = new RsvpController(rsvpService, authService);

// Routes matching your sequence diagrams
app.post('/events', eventController.createEvent);
app.get('/events', eventController.listEvents);
app.get('/events/:eventId/guests', eventController.getGuestList);

app.post('/events/:eventId/rsvp', rsvpController.rsvp);
app.delete('/events/:eventId/rsvp', rsvpController.cancel);

// Basic error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(400).json({ error: err.message });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Campus Event Scheduler running on http://localhost:${PORT}`);
});
