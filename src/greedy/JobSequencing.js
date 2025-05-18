import React, { useState } from "react";

function JobSequencingVisualizer() {
  const [jobs] = useState([
    { id: "A", deadline: 2, profit: 100 },
    { id: "B", deadline: 1, profit: 19 },
    { id: "C", deadline: 2, profit: 27 },
    { id: "D", deadline: 1, profit: 25 },
    { id: "E", deadline: 3, profit: 15 }
  ]);
  const [result, setResult] = useState([]);

  const visualize = () => {
    // Sort jobs by profit descending
    const sortedJobs = [...jobs].sort((a, b) => b.profit - a.profit);
    const n = Math.max(...jobs.map(j => j.deadline));
    const slots = Array(n).fill(false);
    const res = Array(n).fill(null);

    for (let i = 0; i < sortedJobs.length; i++) {
      for (let j = Math.min(n, sortedJobs[i].deadline) - 1; j >= 0; j--) {
        if (!slots[j]) {
          slots[j] = true;
          res[j] = sortedJobs[i];
          break;
        }
      }
    }
    setResult(res.filter(Boolean));
  };

  return (
    <div>
      <h2>Job Sequencing Visualizer</h2>
      <button onClick={visualize} style={{ marginBottom: 16 }}>Visualize</button>
      <div>
        <b>Jobs:</b>
        <ul>
          {jobs.map(job => (
            <li key={job.id}>
              {job.id} (Deadline: {job.deadline}, Profit: {job.profit})
            </li>
          ))}
        </ul>
      </div>
      <div>
        <b>Selected Jobs for Maximum Profit:</b>
        <ul>
          {result.map(job => (
            <li key={job.id} style={{ color: "green" }}>
              {job.id} (Profit: {job.profit})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default JobSequencingVisualizer;
