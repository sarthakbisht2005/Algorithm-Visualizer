import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="hero-section">
        <div className="hero-text">
          <h1>Algorithm Visualizer</h1>
          <p>
            Explore algorithms with step-by-step visualizations, simplifying the
            learning process and making it more engaging for a better
            understanding.
          </p>
          <button className="cta-btn" onClick={() => navigate("/sorting")}>
            Get Started
          </button>
        </div>
        <div className="hero-image">
          <img src="/images/algorithm.png" alt="Graph illustration" />
        </div>
      </div>

      <div className="cards-container">
        <div className="card card-path" onClick={() => navigate("/pathfinding")}>
          <img src="/images/graph.png" alt="Pathfinder" />
          <h3>Pathfinder</h3>
          <p>Visualize graph algorithms like Dijkstra, BFS, DFS</p>
        </div>

        <div className="card card-search" onClick={() => navigate("/searching")}>
          <img src="/images/binary-search.png" alt="Searching" />
          <h3>Searching Algorithms</h3>
          <p>
            Visualize efficient algorithms for finding items in sorted or unsorted lists.
          </p>
        </div>

        <div className="card card-sort" onClick={() => navigate("/sorting")}>
          <img src="/images/sort.png" alt="Sorting" />
          <h3>Sorting Algorithms</h3>
          <p>Compare and learn different sorting algorithms visually.</p>
        </div>
        <div className="card card-greedy" onClick={() => navigate("/greedy")}>
          <img src="/images/greedy.jpg" alt="greedy" />
          <h3>Greedy Algorithms</h3>
          <p>Understand greedy algorithms with visualizations and examples.</p>
        </div>
      </div>
    </div>
  );
}

export default Home;

