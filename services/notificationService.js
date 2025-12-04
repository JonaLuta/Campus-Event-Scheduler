class NotificationService {
  constructor() {
    this.reminders = []; // { userId, eventId, at }
  }

  scheduleReminder(userId, eventId, at) {
    this.reminders.push({ userId, eventId, at: new Date(at) });
  }

  // For now: log due reminders and remove them
  sendDue(now = new Date()) {
    const due = this.reminders.filter((r) => r.at <= now);
    due.forEach((r) => {
      console.log(
        `[Reminder] User ${r.userId}, event ${r.eventId} is coming up!`
      );
    });
    this.reminders = this.reminders.filter((r) => r.at > now);
    return due.length;
  }
}

module.exports = NotificationService;
