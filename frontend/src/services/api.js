import axios from 'axios';

// Axios ka ek instance create kiya jisme baseURL set kiya gaya hai
const API = axios.create({
  baseURL: 'http://localhost:5000',  // Backend server ka address (local machine)
});

// GET request bhejne ke liye function jo /posts se data fetch karega
export const getData = () => API.get('/posts');

// POST request bhejne ke liye function jo naya post backend mein add karega
export const postData = (newPost) => API.post('/posts', newPost);

// PUT request bhejne ke liye function jo kisi post ko update karega (id ke basis pe)
export const updateData = (id, updatedPost) => API.put(`/posts/${id}`, updatedPost);

// DELETE request bhejne ke liye function jo kisi post ko delete karega (id ke basis pe)
export const deleteData = (id) => API.delete(`/posts/${id}`);

