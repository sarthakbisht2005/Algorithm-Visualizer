import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home';
import SortingVisualizer from './visualizers/SortingVisualizer';
import SearchingVisualizer from './visualizers/SearchingVisualizer';
import PathfindingVisualizer from './visualizers/PathfindingVisualizer';
import Navbar from './components/Navbar';
import About from './components/About';
import GreedyVisualizer from './visualizers/GreedyVisualizer';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/sorting" element={<SortingVisualizer />} />
        <Route path="/searching" element={<SearchingVisualizer />} />
        <Route path="/pathfinding" element={<PathfindingVisualizer />} />
        <Route path="/greedy" element={<GreedyVisualizer />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
