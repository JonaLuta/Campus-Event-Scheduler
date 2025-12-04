const Role = require('../models/Role');
const User = require('../models/User');

class AuthService {
  constructor(userRepository) {
    this.userRepository = userRepository;

    // Seed a demo organizer and student
    const organizer = new User({
      name: 'Olivia Organizer',
      email: 'organizer@example.com',
      role: Role.ORGANIZER,
    });
    const student = new User({
      name: 'Sam Student',
      email: 'student@example.com',
      role: Role.STUDENT,
    });

    this.userRepository.save(organizer);
    this.userRepository.save(student);

    this.defaultUserId = student.id; // pretend student is logged in by default
  }

  currentUser(req) {
    const userId = req?.headers?.['x-user-id'] || this.defaultUserId;
    const user = this.userRepository.findById(userId);
    if (!user) {
      throw new Error('Not authenticated');
    }
    return user;
  }

  requireRole(allowedRoles, user) {
    if (!allowedRoles.includes(user.role)) {
      throw new Error('Forbidden: insufficient role');
    }
  }
}

module.exports = AuthService;
