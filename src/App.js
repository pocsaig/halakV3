// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import FishList from './components/FishList';
import FishDetails from './components/FishDetails';
import EditFish from './components/EditFish';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <Routes>
          <Route path="/" element={<FishList />} />
          <Route path="/fish/:id" element={<FishDetails />} />
          <Route path="/fish/:id/edit" element={<EditFish />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;