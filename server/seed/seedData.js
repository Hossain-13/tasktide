const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const path = require('path');

// Load env vars
dotenv.config({ path: path.join(__dirname, '../.env') });

// Load models
const User = require('../models/User');
const Course = require('../models/Course');
const Assignment = require('../models/Assignment');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const seedData = async () => {
  try {
    // Clear existing data
    await User.deleteMany();
    await Course.deleteMany();
    await Assignment.deleteMany();

    console.log('🗑️  Cleared existing data');

    // Create test user
    const hashedPassword = await bcrypt.hash('password123', 10);
    const user = await User.create({
      name: 'Test Student',
      email: 'student@test.com',
      password: hashedPassword,
      preferences: {
        theme: 'light',
        notifications: {
          email: true,
          push: true,
          reminderIntervals: [1440, 120, 30]
        }
      }
    });

    console.log('👤 Created test user - Email: student@test.com, Password: password123');

    // Create courses
    const courses = await Course.create([
      {
        userId: user._id,
        name: 'Database Systems',
        code: 'CSE 370',
        instructor: 'Dr. Smith',
        color: '#8B5CF6',
        semester: 'Fall 2024',
        credits: 3
      },
      {
        userId: user._id,
        name: 'Computer Graphics',
        code: 'CSE 423',
        instructor: 'Dr. Johnson',
        color: '#FFD700',
        semester: 'Fall 2024',
        credits: 3
      },
      {
        userId: user._id,
        name: 'Calculus II',
        code: 'MAT 120',
        instructor: 'Prof. Williams',
        color: '#10B981',
        semester: 'Fall 2024',
        credits: 4
      }
    ]);

    console.log('📚 Created 3 courses');

    // Create assignments
    const today = new Date();
    const assignments = await Assignment.create([
      {
        userId: user._id,
        courseId: courses[0]._id,
        title: 'SQL Query Optimization Project',
        description: 'Optimize the given database queries for better performance',
        dueDate: new Date(today.getTime() + 24 * 60 * 60 * 1000), // Tomorrow
        priority: 'high',
        status: 'pending',
        estimatedTime: 120,
        tags: ['project', 'sql', 'database']
      },
      {
        userId: user._id,
        courseId: courses[1]._id,
        title: 'OpenGL 3D Rendering Lab',
        description: 'Implement 3D object rendering using OpenGL',
        dueDate: new Date(today.getTime() + 3 * 24 * 60 * 60 * 1000), // 3 days
        priority: 'medium',
        status: 'pending',
        estimatedTime: 240,
        tags: ['lab', 'graphics', '3d']
      },
      {
        userId: user._id,
        courseId: courses[2]._id,
        title: 'Calculus Practice Problems Set 5',
        description: 'Complete problems 1-20 from chapter 5',
        dueDate: new Date(today.getTime() + 5 * 24 * 60 * 60 * 1000), // 5 days
        priority: 'low',
        status: 'pending',
        estimatedTime: 60,
        tags: ['homework', 'math']
      },
      {
        userId: user._id,
        courseId: courses[0]._id,
        title: 'Database Design Assignment',
        description: 'Design a database schema for an e-commerce platform',
        dueDate: new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000), // 1 week
        priority: 'medium',
        status: 'pending',
        estimatedTime: 180,
        tags: ['assignment', 'design']
      },
      {
        userId: user._id,
        courseId: courses[1]._id,
        title: 'Ray Tracing Implementation',
        description: 'Implement basic ray tracing algorithm',
        dueDate: new Date(today.getTime() + 10 * 24 * 60 * 60 * 1000), // 10 days
        priority: 'high',
        status: 'pending',
        estimatedTime: 300,
        tags: ['project', 'algorithm']
      }
       ]);

   console.log('📝 Created 5 assignments');

   console.log('\n✅ Seed data created successfully!');
   console.log('\n📧 Login credentials:');
   console.log('   Email: student@test.com');
   console.log('   Password: password123\n');

   process.exit(0);
 } catch (error) {
   console.error('❌ Error seeding data:', error);
   process.exit(1);
 }
};

// Run seed
seedData();