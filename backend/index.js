const express = require('express');          // Express framework ko import karna
const cors = require('cors');                  // CORS middleware import karna (Cross-Origin Resource Sharing ke liye)
const bodyParser = require('body-parser');    // Body-parser middleware import karna (request body ko parse karne ke liye)

const app = express();                         // Express app banaya
app.use(cors());                              // CORS ko enable kiya taaki alag origin se requests aa saken
app.use(bodyParser.json());                   // JSON format mein request body ko parse karne ke liye middleware use kiya

// Posts ki initial list (array of objects)
let posts = [
  { id: 1, title: 'Pehla Post', body: 'Yeh pehla post hai' },
  { id: 2, title: 'Dusra Post', body: 'Yeh dusra post hai' },
  { id: 3, title: 'Teesra Post', body: 'Yeh teesra post hai' }
];

// Function: current posts mein sabse bada id find karta hai
function getMaxId() {
  if (posts.length === 0) return 0;           // Agar posts empty hain to 0 return karo
  return Math.max(...posts.map(p => p.id));   // Sabhi posts ke id mein se max id return karo
}

// Function: check karta hai ki koi particular id posts mein exist karti hai ya nahi
function idExists(id) {
  return posts.some(p => p.id === id);        // Agar koi post aisi hai jiska id match karta hai to true, warna false
}

// Function: next id decide karta hai jo new post ko assign karni hai
function getNextId() {
  const maxId = getMaxId();                    // Sabse bada id nikalte hain
  // Agar last maxId ki post exist nahi karti (khatam ho gayi hai)
  if (!idExists(maxId)) {
    return maxId;                              // To wahi id dubara use karo (reuse karo)
  }
  // Agar maxId wali post hai, to next id maxId + 1 karo
  return maxId + 1;
}

// GET endpoint: sabhi posts bhejne ke liye
app.get('/posts', (req, res) => {
  res.json(posts);                             // Posts ko JSON format mein response bhejo
});

// POST endpoint: naya post create karne ke liye
app.post('/posts', (req, res) => {
  const newId = getNextId();                   // Nayi post ke liye id generate karo
  const newPost = { ...req.body, id: newId }; // Request body se data lekar id add karo
  posts.push(newPost);                         // Naye post ko array mein add karo
  res.status(201).json(newPost);               // 201 status ke saath naye post ko bhejo response mein
});

// PUT endpoint: existing post ko update karne ke liye
app.put('/posts/:id', (req, res) => {
  const { id } = req.params;                   // URL se id nikaalo
  posts = posts.map(p => p.id == id ? { ...p, ...req.body } : p); // Jo post id match karti hai use update karo
  res.json({ message: 'Updated successfully' }); // Success message bhejo
});

// DELETE endpoint: post delete karne ke liye
app.delete('/posts/:id', (req, res) => {
  const { id } = req.params;                   // URL se id nikaalo
  posts = posts.filter(p => p.id != id);      // Jo post id se match nahi karti, unhe rakh do (matching post delete ho jayegi)
  res.json({ message: 'Deleted successfully' }); // Success message bhejo
});

// Server start karna port 5000 pe
app.listen(5000, () => {
  console.log('🚀 Server chalu ho gaya http://localhost:5000');
});
