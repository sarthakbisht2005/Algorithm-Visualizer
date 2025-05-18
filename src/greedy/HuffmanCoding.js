import React, { useState } from "react";

function HuffmanCodingVisualizer() {
  const [chars] = useState([
    { char: "a", freq: 5 },
    { char: "b", freq: 9 },
    { char: "c", freq: 12 },
    { char: "d", freq: 13 },
    { char: "e", freq: 16 },
    { char: "f", freq: 45 }
  ]);
  const [codes, setCodes] = useState([]);

  function buildHuffman() {
    let nodes = chars.map(c => ({ ...c, left: null, right: null }));
    while (nodes.length > 1) {
      nodes.sort((a, b) => a.freq - b.freq);
      let left = nodes.shift();
      let right = nodes.shift();
      nodes.push({
        char: left.char + right.char,
        freq: left.freq + right.freq,
        left,
        right
      });
    }
    let root = nodes[0];
    let result = [];
    function traverse(node, code) {
      if (!node.left && !node.right) {
        result.push({ char: node.char, code });
        return;
      }
      if (node.left) traverse(node.left, code + "0");
      if (node.right) traverse(node.right, code + "1");
    }
    traverse(root, "");
    setCodes(result);
  }

  return (
    <div>
      <h2>Huffman Coding Visualizer</h2>
      <button onClick={buildHuffman} style={{ marginBottom: 16 }}>Visualize</button>
      <div>
        <b>Characters and Frequencies:</b>
        <ul>
          {chars.map(c => (
            <li key={c.char}>
              {c.char}: {c.freq}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <b>Huffman Codes:</b>
        <ul>
          {codes.map(c => (
            <li key={c.char} style={{ color: "green" }}>
              {c.char}: {c.code}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default HuffmanCodingVisualizer;
