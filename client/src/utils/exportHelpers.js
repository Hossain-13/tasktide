// Export functionality helpers

/**
 * Convert assignments to CSV format
 */
export const assignmentsToCSV = (assignments) => {
  const headers = ['Title', 'Course', 'Due Date', 'Priority', 'Status', 'Estimated Time', 'Description'];
  
  const rows = assignments.map(assignment => [
    assignment.title,
    assignment.courseName || '',
    new Date(assignment.dueDate).toLocaleDateString(),
    assignment.priority,
    assignment.status,
    `${assignment.estimatedTime || 0} hours`,
    assignment.description || ''
  ]);
  
  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
  ].join('\n');
  
  return csvContent;
};

/**
 * Convert assignments to text format
 */
export const assignmentsToText = (assignments) => {
  let text = 'TASKTIDE ASSIGNMENT LIST\n';
  text += '=' .repeat(50) + '\n\n';
  
  assignments.forEach((assignment, index) => {
    text += `${index + 1}. ${assignment.title}\n`;
    text += `   Course: ${assignment.courseName || 'N/A'}\n`;
    text += `   Due: ${new Date(assignment.dueDate).toLocaleDateString()}\n`;
    text += `   Priority: ${assignment.priority}\n`;
    text += `   Status: ${assignment.status}\n`;
    text += `   Description: ${assignment.description || 'No description'}\n`;
    text += '\n';
  });
  
  return text;
};

/**
 * Download file helper
 */
export const downloadFile = (content, filename, type) => {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

/**
 * Export assignments
 */
export const exportAssignments = (assignments, format = 'csv') => {
  const timestamp = new Date().toISOString().split('T')[0];
  
  switch (format) {
    case 'csv':
      const csvContent = assignmentsToCSV(assignments);
      downloadFile(csvContent, `tasktide_assignments_${timestamp}.csv`, 'text/csv');
      break;
      
    case 'txt':
      const textContent = assignmentsToText(assignments);
      downloadFile(textContent, `tasktide_assignments_${timestamp}.txt`, 'text/plain');
      break;
      
    default:
      console.error('Unsupported export format:', format);
  }
};