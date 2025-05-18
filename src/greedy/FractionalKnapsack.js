import React, { useState } from "react";

function FractionalKnapsackVisualizer() {
  const [items] = useState([
    { id: "A", value: 60, weight: 10 },
    { id: "B", value: 100, weight: 20 },
    { id: "C", value: 120, weight: 30 }
  ]);
  const [capacity] = useState(50);
  const [result, setResult] = useState([]);
  const [maxValue, setMaxValue] = useState(0);

  const visualize = () => {
    const arr = [...items].map(item => ({
      ...item,
      ratio: item.value / item.weight
    })).sort((a, b) => b.ratio - a.ratio);

    let w = capacity;
    let totalValue = 0;
    let res = [];
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].weight <= w) {
        res.push({ ...arr[i], take: 1 });
        w -= arr[i].weight;
        totalValue += arr[i].value;
      } else {
        let fraction = w / arr[i].weight;
        res.push({ ...arr[i], take: fraction });
        totalValue += arr[i].value * fraction;
        break;
      }
    }
    setResult(res);
    setMaxValue(totalValue);
  };

  return (
    <div>
      <h2>Fractional Knapsack Visualizer</h2>
      <button onClick={visualize} style={{ marginBottom: 16 }}>Visualize</button>
      <div>
        <b>Items:</b>
        <ul>
          {items.map(item => (
            <li key={item.id}>
              {item.id} (Value: {item.value}, Weight: {item.weight})
            </li>
          ))}
        </ul>
      </div>
      <div>
        <b>Selected Items:</b>
        <ul>
          {result.map(item => (
            <li key={item.id} style={{ color: "green" }}>
              {item.id} - {item.take === 1 ? "Full" : `Fraction: ${(item.take * 100).toFixed(1)}%`}
            </li>
          ))}
        </ul>
        <div><b>Maximum Value:</b> {maxValue.toFixed(2)}</div>
      </div>
    </div>
  );
}

export default FractionalKnapsackVisualizer;
