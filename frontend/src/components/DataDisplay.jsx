import React, { useEffect, useState } from 'react';
import { getData, deleteData } from '../services/api';  // API calls ke functions import kiye
import DataForm from './DataForm';                       // Form component import kiya (data create/update ke liye)
import PostTable from './PostTable';                     // Table component import kiya (posts dikhane ke liye)

function DataDisplay() {
  const [posts, setPosts] = useState([]);               // Posts ko state mein store karne ke liye
  const [loading, setLoading] = useState(true);         // Loading state (data aa raha hai ya nahi)
  const [editPost, setEditPost] = useState(null);       // Edit karne ke liye selected post ko store karta hai

  // Function: posts load karta hai backend se
  const loadPosts = () => {
    setLoading(true);                                    // Loading true kar do jab data fetch kar rahe ho
    getData().then(res => {                              // API se data laao
      setPosts(res.data);                                // Mil gaya data posts state mein set karo
      setLoading(false);                                 // Loading complete, false karo
      setEditPost(null);                                 // Edit mode reset karo (koi edit nahi)
    });
  };

  // useEffect: component ke mount hone par loadPosts call karo
  useEffect(() => {
    loadPosts();
  }, []);

  // Delete handler: post ko delete karta hai
  const handleDelete = (id) => {
    // User se confirmation mangta hai
    if (window.confirm('Kya aap delete karna chahte hain?')) {
      deleteData(id).then(() => {                        // Delete API call karo
        alert('🗑️ Delete ho gaya');                      // Success alert dikhaye
        loadPosts();                                     // Posts reload karo taaki updated list mile
      });
    }
  };

  // Edit handler: kisi post ko edit mode mein lane ke liye
  const handleEdit = (post) => {
    setEditPost(post);                                   // Jo post edit karna hai usse state mein set karo
    window.scrollTo({ top: 0, behavior: 'smooth' });    // Page ko smoothly upar scroll karo taaki form dikhe
  };

  return (
    <div className="page-container">
      <h1>🚀 Full Stack Post App</h1>
      
      {/* DataForm component ko render karo, editPost aur success callback pass karo */}
      <DataForm 
        onSuccess={loadPosts} 
        editPost={editPost} 
        onCancel={() => setEditPost(null)}                // Cancel karne par edit mode hata do
      />
      
      {/* Agar loading true hai to loading message dikhaye warna PostTable */}
      {loading ? <p>Loading...</p> : 
        <PostTable 
          posts={posts} 
          onEdit={handleEdit} 
          onDelete={handleDelete} 
        />
      }
    </div>
  );
}

export default DataDisplay;
