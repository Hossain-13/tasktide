const PDFDocument = require('pdfkit');
const { logger } = require('../utils/logger');

const generateAssignmentPDF = (assignments, courses) => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({
        margin: 50,
        size: 'A4'
      });

      const chunks = [];
      doc.on('data', chunk => chunks.push(chunk));
      doc.on('end', () => resolve(Buffer.concat(chunks)));

      // Header
      doc.fontSize(24)
        .font('Helvetica-Bold')
        .text('TaskTide', 50, 50);
      
      doc.fontSize(18)
        .font('Helvetica')
        .text('Assignment Report', 50, 80);
      
      doc.fontSize(10)
        .fillColor('#666')
        .text(`Generated: ${new Date().toLocaleDateString()}`, 50, 110);
      
      doc.moveDown(2);

      // Summary Stats
      const pending = assignments.filter(a => a.status === 'pending').length;
      const completed = assignments.filter(a => a.status === 'completed').length;
      const overdue = assignments.filter(a => a.status === 'overdue').length;

      doc.fontSize(14)
        .fillColor('#000')
        .font('Helvetica-Bold')
        .text('Summary', 50, 150);
      
      doc.fontSize(11)
        .font('Helvetica')
        .text(`Total Assignments: ${assignments.length}`, 70, 175)
        .text(`Pending: ${pending}`, 70, 195)
        .text(`Completed: ${completed}`, 70, 215)
        .text(`Overdue: ${overdue}`, 70, 235);

      doc.moveDown(2);

      // Assignments by Course
      let yPosition = 280;
      
      courses.forEach(course => {
        const courseAssignments = assignments.filter(a => a.courseId === course.id);
        if (courseAssignments.length === 0) return;

        // Check if we need a new page
        if (yPosition > 650) {
          doc.addPage();
          yPosition = 50;
        }

        // Course Header
        doc.fontSize(14)
          .font('Helvetica-Bold')
          .fillColor(course.color || '#000')
          .text(course.name, 50, yPosition);
        
        yPosition += 25;

        // Course Assignments
        courseAssignments.forEach(assignment => {
          if (yPosition > 700) {
            doc.addPage();
            yPosition = 50;
          }

          doc.fontSize(11)
            .font('Helvetica-Bold')
            .fillColor('#000')
            .text(`• ${assignment.title}`, 70, yPosition);
          
          doc.fontSize(10)
            .font('Helvetica')
            .fillColor('#666')
            .text(`Due: ${new Date(assignment.dueDate).toLocaleDateString()}`, 90, yPosition + 15)
            .text(`Priority: ${assignment.priority} | Status: ${assignment.status}`, 90, yPosition + 30);
          
          if (assignment.description) {
            doc.text(assignment.description.substring(0, 100), 90, yPosition + 45);
            yPosition += 15;
          }

          yPosition += 60;
        });

        yPosition += 20;
      });

      // Footer
      const pages = doc.bufferedPageRange();
      for (let i = 0; i < pages.count; i++) {
        doc.switchToPage(i);
        doc.fontSize(8)
          .fillColor('#666')
          .text(
            `Page ${i + 1} of ${pages.count}`,
            50,
            doc.page.height - 50,
            { align: 'center' }
          );
      }

      doc.end();
    } catch (error) {
      logger.error('PDF generation error:', error);
      reject(error);
    }
  });
};

module.exports = {
  generateAssignmentPDF
};