import React, { useState } from "react";
import JobSequencingVisualizer from "../greedy/JobSequencing";
import FractionalKnapsackVisualizer from "../greedy/FractionalKnapsack";
import HuffmanCodingVisualizer from "../greedy/HuffmanCoding";
import ActivitySelectionVisualizer from "../greedy/ActivitySelection"; // Fix: use consistent naming and default export

const ALGO_OPTIONS = [
  { value: "job-sequencing", label: "Job Sequencing" },
  { value: "fractional-knapsack", label: "Fractional Knapsack" },
  { value: "huffman-coding", label: "Huffman Coding" },
  { value: "activity-selection", label: "Activity Selection" }
];

function GreedyVisualizer() {
  const [selected, setSelected] = useState(ALGO_OPTIONS[0].value);
  const ALGO_INFO = {
    "job-sequencing": {
      name: "Job Sequencing",
      desc: "Schedules jobs with deadlines and profits to maximize total profit. Selects jobs in order of profit, assigning each to the latest available slot before its deadline.",
      time: "O(n^2) (with sorting), O(n log n) (with efficient data structures)",
      space: "O(n)",
      applications: [
        "Task scheduling",
        "Resource allocation",
        "Maximizing profit in deadline-based jobs"
      ],
      why: "Use when you need to maximize profit from jobs with deadlines and each job takes a single unit of time."
    },
    "fractional-knapsack": {
      name: "Fractional Knapsack",
      desc: "Selects items to maximize value in a knapsack with limited capacity. Items can be broken into smaller parts. Picks items with highest value-to-weight ratio first.",
      time: "O(n log n) (due to sorting)",
      space: "O(1) or O(n) (if storing sorted items)",
      applications: [
        "Resource allocation",
        "Cargo loading",
        "Financial investment"
      ],
      why: "Use when items can be divided and you want to maximize value within a weight limit."
    },
    "huffman-coding": {
      name: "Huffman Coding",
      desc: "Builds an optimal prefix code for data compression by repeatedly combining the two least frequent symbols.",
      time: "O(n log n)",
      space: "O(1)",
      applications: [
        "Data compression (ZIP, JPEG, MP3)",
        "Efficient encoding/decoding",
        "Transmission of data"
      ],
      why: "Use when you need to compress data efficiently using variable-length codes."
    },
    "activity-selection": {
      name: "Activity Selection",
      desc: "Selects the maximum number of non-overlapping activities from a set, choosing activities that finish earliest.",
      time: "O(n log n) (due to sorting)",
      space: "O(1) or O(n)",
      applications: [
        "Scheduling meetings",
        "Resource allocation",
        "Event planning"
      ],
      why: "Use when you want to schedule as many non-overlapping activities as possible."
    }
  };

  let VisualizerComponent = null;
  if (selected === "job-sequencing") VisualizerComponent = JobSequencingVisualizer;
  else if (selected === "fractional-knapsack") VisualizerComponent = FractionalKnapsackVisualizer;
  else if (selected === "huffman-coding") VisualizerComponent = HuffmanCodingVisualizer;
  else if (selected === "activity-selection") VisualizerComponent = ActivitySelectionVisualizer;
  else VisualizerComponent = null;

  return (
    <div style={{ padding: 24 }}>
      <h2 style={{ color: "#0056d2" }}>Greedy Algorithms Visualizer</h2>
      <div style={{ margin: "18px 0" }}>
        <select
          value={selected}
          onChange={e => setSelected(e.target.value)}
          style={{
            padding: "8px 16px",
            borderRadius: 8,
            border: "1px solid #bbb",
            fontSize: 16,
            background: "#fff"
          }}
        >
          {ALGO_OPTIONS.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>
      <div style={{ marginTop: 24 }}>
        {VisualizerComponent && <VisualizerComponent />}
      </div>
      {/* Show selected algorithm info */}
      <div style={{ margin: "16px 0", background: "#f5f7fa", borderRadius: 8, padding: 16, border: "1px solid #e0e5ec" }}>
        <h3 style={{ margin: "0 0 8px 0", color: "#0070c0" }}>{ALGO_INFO[selected].name}</h3>
        <div style={{ marginBottom: 8 }}>{ALGO_INFO[selected].desc}</div>
        <div><b>Time Complexity:</b> {ALGO_INFO[selected].time}</div>
        <div><b>Space Complexity:</b> {ALGO_INFO[selected].space}</div>
        <div style={{ margin: "8px 0" }}>
          <b>Applications:</b>
          <ul style={{ margin: "4px 0 0 18px" }}>
            {ALGO_INFO[selected].applications.map((app, i) => (
              <li key={i}>{app}</li>
            ))}
          </ul>
        </div>
        <div><b>Why use:</b> {ALGO_INFO[selected].why}</div>
      </div>
    </div>
  );
}

export default GreedyVisualizer;
