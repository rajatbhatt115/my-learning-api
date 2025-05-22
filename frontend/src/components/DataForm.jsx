import React, { useState, useEffect } from 'react';
import { postData, updateData } from '../services/api';  // API calls ke liye functions import kiye
import './Form.css'; // External CSS file import kiya styling ke liye

function DataForm({ onSuccess, editPost, onCancel }) {
  const [title, setTitle] = useState('');   // Title field ke liye state
  const [body, setBody] = useState('');     // Body field ke liye state

  // useEffect: jab editPost change ho tab form fields ko update karo
  useEffect(() => {
    if (editPost) {
      // Agar editPost hai to form mein uska data bhar do
      setTitle(editPost.title);
      setBody(editPost.body);
    } else {
      // Nahi to form fields ko blank kar do (naya post ke liye)
      setTitle('');
      setBody('');
    }
  }, [editPost]);

  // Form submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();  // Page reload hone se roko

    // Validation: dono fields bharna zaroori hai
    if (!title || !body) {
      alert('Dono fields bharna zaroori hai');
      return;
    }

    try {
      if (editPost) {
        // Agar edit mode mein ho to update API call karo
        await updateData(editPost.id, { title, body });
        alert('✏️ Post update hua!');
      } else {
        // Nahi to naya post create karo
        await postData({ title, body });
        alert('✅ Naya post add hua!');
      }
      onSuccess();  // Success hone par parent component ko notify karo (data reload ke liye)
    } catch (err) {
      console.error(err);
      alert('Kuch galat ho gaya');
    }
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <h3>{editPost ? '✏️ Post Edit Karein' : '📝 Naya Post Likhiye'}</h3>

      {/* Title input */}
      <input
        className="form-input"
        type="text"
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}  // Input change hone par state update karo
      />

      {/* Body textarea */}
      <textarea
        className="form-input"
        placeholder="Body"
        value={body}
        onChange={e => setBody(e.target.value)}    // Textarea change hone par state update karo
      />

      <div>
        {/* Submit button */}
        <button type="submit" className="btn-primary">
          {editPost ? 'Update Post' : 'Add Post'}
        </button>

        {/* Cancel button tabhi dikhao jab edit mode mein ho */}
        {editPost && (
          <button type="button" onClick={onCancel} className="btn-secondary">
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default DataForm;
