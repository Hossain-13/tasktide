const Assignment = require('../models/Assignment');
const Course = require('../models/Course');
const PDFDocument = require('pdfkit');
const { logger } = require('../utils/logger');

// @desc    Export assignments as PDF
// @route   GET /api/export/pdf
// @access  Private
exports.exportPDF = async (req, res) => {
  try {
    const assignments = await Assignment.find({ userId: req.userId });
    const courses = await Course.find({ userId: req.userId });

    // Create PDF document
    const doc = new PDFDocument();
    
    // Set response headers
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=tasktide-assignments.pdf');
    
    // Pipe to response
    doc.pipe(res);

    // Add content
    doc.fontSize(24).text('TaskTide Assignment Report', { align: 'center' });
    doc.moveDown();
    doc.fontSize(12).text(`Generated: ${new Date().toLocaleDateString()}`, { align: 'center' });
    doc.moveDown(2);

    // Add assignments
    assignments.forEach(assignment => {
      doc.fontSize(14).text(assignment.title, { underline: true });
      doc.fontSize(10);
      doc.text(`Due: ${new Date(assignment.dueDate).toLocaleDateString()}`);
      doc.text(`Priority: ${assignment.priority}`);
      doc.text(`Status: ${assignment.status}`);
      if (assignment.description) {
        doc.text(`Description: ${assignment.description}`);
      }
      doc.moveDown();
    });

    // Finalize PDF
    doc.end();

    logger.info(`PDF exported for user ${req.userId}`);
  } catch (error) {
    logger.error('Export PDF error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Export assignments as CSV
// @route   GET /api/export/csv
// @access  Private
exports.exportCSV = async (req, res) => {
  try {
    const assignments = await Assignment.find({ userId: req.userId });
    
    // Create CSV header
    let csv = 'Title,Course,Due Date,Priority,Status,Estimated Time,Description\n';
    
    // Add data rows
    assignments.forEach(assignment => {
      const row = [
        assignment.title,
        assignment.courseId || '',
        new Date(assignment.dueDate).toLocaleDateString(),
        assignment.priority,
        assignment.status,
        assignment.estimatedTime || 0,
        assignment.description || ''
      ].map(field => `"${field}"`).join(',');
      
      csv += row + '\n';
    });

    // Set response headers
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=tasktide-assignments.csv');
    
    res.send(csv);

    logger.info(`CSV exported for user ${req.userId}`);
  } catch (error) {
    logger.error('Export CSV error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Export assignments as text
// @route   GET /api/export/txt
// @access  Private
exports.exportText = async (req, res) => {
  try {
    const assignments = await Assignment.find({ userId: req.userId });
    
    let text = 'TASKTIDE ASSIGNMENT LIST\n';
    text += '=' .repeat(50) + '\n\n';
    text += `Generated: ${new Date().toLocaleString()}\n\n`;
    
    assignments.forEach((assignment, index) => {
      text += `${index + 1}. ${assignment.title}\n`;
      text += `   Due: ${new Date(assignment.dueDate).toLocaleDateString()}\n`;
      text += `   Priority: ${assignment.priority}\n`;
      text += `   Status: ${assignment.status}\n`;
      if (assignment.description) {
        text += `   Description: ${assignment.description}\n`;
      }
      text += '\n';
    });

    // Set response headers
    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Content-Disposition', 'attachment; filename=tasktide-assignments.txt');
    
    res.send(text);

    logger.info(`Text exported for user ${req.userId}`);
  } catch (error) {
    logger.error('Export text error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};