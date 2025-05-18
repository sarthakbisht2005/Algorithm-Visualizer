import React from "react";

function About() {
  return (
    <div style={{
      padding: "40px 20px",
      maxWidth: 800,
      margin: "40px auto",
      background: "#fff",
      borderRadius: 10,
      boxShadow: "0 2px 8px #e0e0e0",
      fontFamily: "sans-serif"
    }}>
      <h2 style={{ color: "#0056d2" }}>About Algorithm Visualizer</h2>
      <p style={{ fontSize: 17, color: "#333", marginTop: 18 }}>
        <b>Algorithm Visualizer</b> is an interactive web application designed to help users understand and explore various algorithms through step-by-step visualizations.
        <br /><br />
        You can visualize sorting, searching, and pathfinding algorithms, observe their behavior, and compare their efficiency. The platform is ideal for students, educators, and anyone interested in learning algorithms in an engaging and intuitive way.
        <br /><br />
        <b>Features:</b>
        <ul>
          <li>Visualize popular algorithms with animations</li>
          <li>Learn about time and space complexity, applications, and use-cases</li>
          <li>Experiment with custom and random data</li>
          <li>Compare different algorithms side by side</li>
        </ul>
        <b>Why use Algorithm Visualizer?</b>
        <br />
        Understanding algorithms is crucial for problem-solving and technical interviews. Visual learning makes complex concepts easier to grasp and more memorable.
      </p>
    </div>
  );
}

export default About;
