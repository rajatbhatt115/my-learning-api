import React from 'react';
import DataDisplay from './components/DataDisplay';  // DataDisplay component import kiya
import './App.css';                                   // App ke liye CSS import kiya

function App() {
  return (
    <div>
      {/* Page ka heading */}
      <h1>🚀 Full Stack Post App</h1>

      {/* DataDisplay component render kar rahe hain jo poora data dikhaata hai */}
      <DataDisplay />
    </div>
  );
}

export default App;
