import React, { useState } from 'react';

function LinkManager({ links = [], onUpdate }) {
  const [newLink, setNewLink] = useState({ title: '', url: '' });

  const handleAdd = () => {
    if (newLink.url) {
      onUpdate([...links, newLink]);
      setNewLink({ title: '', url: '' });
    }
  };

  const handleRemove = (index) => {
    onUpdate(links.filter((_, i) => i !== index));
  };

  return (
    <div className="link-manager">
      <h3>Resource Links</h3>
      <div className="link-form">
        <input
          type="text"
          placeholder="Link title"
          value={newLink.title}
          onChange={(e) => setNewLink({ ...newLink, title: e.target.value })}
        />
        <input
          type="url"
          placeholder="https://..."
          value={newLink.url}
          onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
        />
        <button onClick={handleAdd}>Add</button>
      </div>
      <LinkList links={links} onRemove={handleRemove} />
    </div>
  );
}

export default LinkManager;