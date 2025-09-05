// Simple logger utility for development
// In production, you might want to use Winston or another logging library

const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

const logger = {
  info: (message, ...args) => {
    console.log(
      `${colors.blue}[INFO]${colors.reset} ${new Date().toISOString()} - ${message}`,
      ...args
    );
  },

  success: (message, ...args) => {
    console.log(
      `${colors.green}[SUCCESS]${colors.reset} ${new Date().toISOString()} - ${message}`,
      ...args
    );
  },

  warning: (message, ...args) => {
    console.log(
      `${colors.yellow}[WARNING]${colors.reset} ${new Date().toISOString()} - ${message}`,
      ...args
    );
  },

  error: (message, ...args) => {
    console.error(
      `${colors.red}[ERROR]${colors.reset} ${new Date().toISOString()} - ${message}`,
      ...args
    );
  },

  debug: (message, ...args) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(
        `${colors.magenta}[DEBUG]${colors.reset} ${new Date().toISOString()} - ${message}`,
        ...args
      );
    }
  },

  request: (req) => {
    console.log(
      `${colors.cyan}[REQUEST]${colors.reset} ${new Date().toISOString()} - ${req.method} ${req.originalUrl}`
    );
  }
};

// Express middleware for logging requests
const requestLogger = (req, res, next) => {
  logger.request(req);
  next();
};

module.exports = { logger, requestLogger };