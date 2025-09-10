const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const connectDB = require('./config/database'); // <-- Add this line
const assignmentRoutes = require('./routes/assignment.routes');

// Load environment variables
dotenv.config();

connectDB(); // <-- And this line

// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'TaskTide server is running! 🚀' });
});

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK',
    message: 'Server is healthy',
    timestamp: new Date().toISOString()
  });
});

// Test API route
app.get('/api/test', (req, res) => {
  res.json({
    message: 'API is working!',
    data: {
      courses: 5,
      assignments: 12,
      completed: 8
    }
  });
});

// Serve Postman collection
app.get('/postman', (req, res) => {
  res.sendFile(path.join(__dirname, '../tasktide.postman_collection.json'));
});

// Auth routes
app.use('/api/auth', require('./routes/auth.routes'));

// Register assignment routes
app.use('/api/assignments', assignmentRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`\n${'='.repeat(50)}`);
  console.log(`🚀 TaskTide Server Started Successfully!`);
  console.log(`${'='.repeat(50)}`);
  console.log(`📍 Server URL: http://localhost:${PORT}`);
  console.log(`📍 Health Check: http://localhost:${PORT}/api/health`);
  console.log(`📍 Test API: http://localhost:${PORT}/api/test`);
  console.log(`${'='.repeat(50)}\n`);
});