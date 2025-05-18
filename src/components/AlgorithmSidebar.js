import React from "react";
import { Link } from "react-router-dom";
import "./AlgorithmSidebar.css";

const AlgorithmSidebar = () => {
  const categories = [
    {
      title: "Greedy Algorithms",
      items: [
        { name: "Greedy Algorithms Visualizer", path: "/greedy" },
      ],
    },
    {
      title: "Dynamic Programming",
      items: [
        { name: "Knapsack Problem", path: "/knapsack" },
        { name: "Longest Common Subsequence", path: "/lcs" },
      ],
    },
    {
      title: "Backtracking",
      items: [
        { name: "N-Queens Problem", path: "/n-queens" },
        { name: "Sudoku Solver", path: "/sudoku" },
      ],
    },
    {
      title: "Sorting Algorithms",
      items: [
        { name: "Bubble Sort", path: "/bubble-sort" },
        { name: "Quick Sort", path: "/quick-sort" },
        { name: "Merge Sort", path: "/merge-sort" },
      ],
    },
    {
      title: "Searching Algorithms",
      items: [
        { name: "Binary Search", path: "/binary-search" },
        { name: "Linear Search", path: "/linear-search" },
      ],
    },
    {
      title: "Graph Algorithms",
      items: [
        { name: "Dijkstra's Algorithm", path: "/dijkstra" },
        { name: "A* Search Algorithm", path: "/a-star" },
      ],
    },
    {
      title: "Miscellaneous",
      items: [
        { name: "Random Algorithm", path: "/random" },
        { name: "Brute Force", path: "/brute-force" },
      ],
    },
  ];

  return (
    <div className="algorithm-sidebar">
      {categories.map((category, index) => (
        <div key={index} className="algorithm-category">
          <h3 className="category-title">{category.title}</h3>
          <ul className="algorithm-list">
            {category.items.map((item, idx) => (
              <li key={idx} className="algorithm-item">
                <Link to={item.path}>{item.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default AlgorithmSidebar;