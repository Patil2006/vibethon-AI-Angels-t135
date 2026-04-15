import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Learn from './pages/Learn';
import Game from './pages/Game';
import Quiz from './pages/Quiz';
import './App.css';

function App() {
  return (
    <Router>
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/learn" element={<Learn />} />
          <Route path="/game" element={<Game />} />
          <Route path="/quiz" element={<Quiz />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
