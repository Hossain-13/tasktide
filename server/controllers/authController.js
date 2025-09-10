const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { jwtSecret, jwtExpire } = require('../config/keys');
const { logger } = require('../utils/logger');

// Generate JWT Token
const generateToken = (userId) => {
  return jwt.sign({ userId }, jwtSecret, { expiresIn: jwtExpire });
};

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ 
        success: false,
        message: 'User already exists' 
      });
    }

    // Create user
    const user = await User.create({
      name,
      email,
      password
    });

    // Create token
    const token = generateToken(user._id);

    // Send response
    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        preferences: user.preferences,
        stats: user.stats
      }
    });

    logger.info(`New user registered: ${email}`);

  } catch (error) {
    logger.error('Registration error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error during registration',
      error: error.message 
    });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user and include password
    const user = await User.findOne({ email }).select('+password');
    
    if (!user) {
      return res.status(401).json({ 
        success: false,
        message: 'Invalid credentials' 
      });
    }

    // Check password
    const isMatch = await user.matchPassword(password);
    
    if (!isMatch) {
      return res.status(401).json({ 
        success: false,
        message: 'Invalid credentials' 
      });
    }

    // Create token
    const token = generateToken(user._id);

    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        preferences: user.preferences,
        stats: user.stats
      }
    });

    logger.info(`User logged in: ${email}`);

  } catch (error) {
    logger.error('Login error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error during login',
      error: error.message 
    });
  }
};

// @desc    Get current user
// @route   GET /api/auth/me
// @access  Private
exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    
    if (!user) {
      return res.status(404).json({ 
        success: false,
        message: 'User not found' 
      });
    }

    res.json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        preferences: user.preferences,
        stats: user.stats,
        createdAt: user.createdAt
      }
    });

  } catch (error) {
    logger.error('Get user error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error',
      error: error.message 
    });
  }
};

// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private
exports.updateProfile = async (req, res) => {
  try {
    const { name, preferences } = req.body;

    const user = await User.findById(req.userId);
    
    if (!user) {
      return res.status(404).json({ 
        success: false,
        message: 'User not found' 
      });
    }

    // Update fields
    if (name) user.name = name;
    if (preferences) {
      user.preferences = { ...user.preferences.toObject(), ...preferences };
    }

    await user.save();

    res.json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        preferences: user.preferences,
        stats: user.stats
      }
    });

  } catch (error) {
    logger.error('Update profile error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error',
      error: error.message 
    });
  }
};