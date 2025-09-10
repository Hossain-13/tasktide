const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/keys');
const User = require('../models/User');

const auth = async (req, res, next) => {
  try {
    // Get token from header (case-insensitive)
    const authHeader = req.headers['authorization'] || req.headers['Authorization'];
    const token = authHeader && authHeader.startsWith('Bearer ')
      ? authHeader.replace('Bearer ', '')
      : null;
    
    if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }

    // Verify token
    const decoded = jwt.verify(token, jwtSecret);
    
    // Find user
    const user = await User.findById(decoded.userId);
    
    if (!user) {
      return res.status(401).json({ message: 'User not found, authorization denied' });
    }

    // Add user to request
    req.userId = decoded.userId;
    req.user = user;
    
    next();
  } catch (error) {
    res.status(401).json({ message: 'Please authenticate' });
  }
};

module.exports = auth;