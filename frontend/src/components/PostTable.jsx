import React from 'react';
import './Table.css'; // External CSS file styling ke liye

// PostTable component jo posts ko table format mein dikhata hai
function PostTable({ posts, onEdit, onDelete }) {
  return (
    <table className="post-table">
      <thead>
        <tr>
          <th>ID</th>        {/* Column header: ID */}
          <th>Title</th>     {/* Column header: Title */}
          <th>Body</th>      {/* Column header: Body */}
          <th>Actions</th>   {/* Column header: Actions (Edit/Delete buttons) */}
        </tr>
      </thead>
      <tbody>
        {
          // Agar posts array khali hai to ek row dikhao jo bataye ki koi post nahi hai
          posts.length === 0 ? (
            <tr><td colSpan="4">Koi post nahi hai</td></tr>
          ) : (
            // Nahi to har post ke liye ek table row create karo
            posts.map(post => (
              <tr key={post.id}>
                <td>{post.id}</td>           {/* Post ka ID dikhaye */}
                <td>{post.title}</td>        {/* Post ka Title dikhaye */}
                <td>{post.body}</td>         {/* Post ka Body dikhaye */}
                <td>
                  {/* Edit button, click par onEdit function call hoga with current post */}
                  <button onClick={() => onEdit(post)} className="btn-edit">Edit</button>

                  {/* Delete button, click par onDelete function call hoga with post id */}
                  <button onClick={() => onDelete(post.id)} className="btn-delete">Delete</button>
                </td>
              </tr>
            ))
          )
        }
      </tbody>
    </table>
  );
}

export default PostTable;
