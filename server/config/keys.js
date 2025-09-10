module.exports = {
  jwtSecret: process.env.JWT_SECRET || 'your-secret-key-for-development',
  jwtExpire: process.env.JWT_EXPIRE || '7d',
  nodeEnv: process.env.NODE_ENV || 'development'
};