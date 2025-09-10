const express = require('express');
const router = express.Router();
const {
  exportPDF,
  exportCSV,
  exportText
} = require('../controllers/exportController');
const auth = require('../middleware/auth');

// All routes require authentication
router.use(auth);

router.get('/pdf', exportPDF);
router.get('/csv', exportCSV);
router.get('/txt', exportText);

module.exports = router;