import React from 'react';

function LinkList({ links = [], onRemove }) {
  return (
    <div className="link-list">
      {links.map((link, index) => (
        <div key={index} className="link-item">
          <a href={link.url} target="_blank" rel="noopener noreferrer">
            {link.title || link.url}
          </a>
          {onRemove && (
            <button onClick={() => onRemove(index)}>×</button>
          )}
        </div>
      ))}
    </div>
  );
}

export default LinkList;