import React, { useState } from 'react';
import './SearchingVisualizer.css';

function getRandomSortedArray(size = 10) {
  const arr = Array.from({ length: size }, () => Math.floor(Math.random() * 100));
  arr.sort((a, b) => a - b);
  return arr;
}

const ALGO_INFO = {
  linear: {
    name: "Linear Search",
    desc: "Checks each element one by one from left to right until the target is found or the array ends.",
    time: "O(n)",
    space: "O(1)",
    applications: [
      "Unsorted/small datasets",
      "Finding a value in a list",
      "Checking for duplicates"
    ],
    why: "Use when the array is unsorted or very small, or when you want a simple search."
  },
  binary: {
    name: "Binary Search",
    desc: "Efficiently searches a sorted array by repeatedly dividing the search interval in half.",
    time: "O(log n)",
    space: "O(1)",
    applications: [
      "Searching in sorted arrays/lists",
      "Database indexing",
      "Debugging (finding first/last occurrence)"
    ],
    why: "Use when the array is sorted and you need fast search performance."
  },
  exponential: {
    name: "Exponential Search",
    desc: "Finds the range where the target may exist by repeated doubling, then uses binary search in that range.",
    time: "O(log i), i = index of target",
    space: "O(1)",
    applications: [
      "Unbounded/infinite lists",
      "Large sorted datasets",
      "Searching in unknown size arrays"
    ],
    why: "Use when the array is sorted and you don't know its size or want to quickly narrow down the search range."
  },
  jump: {
    name: "Jump Search",
    desc: "Jumps ahead by fixed steps, then does linear search in the found block. Works on sorted arrays.",
    time: "O(√n)",
    space: "O(1)",
    applications: [
      "Sorted arrays with slow random access",
      "Databases and file systems",
      "Memory-efficient search"
    ],
    why: "Use when the array is sorted and you want a compromise between linear and binary search."
  }
};

function SearchingVisualizer() {
  const [array, setArray] = useState(getRandomSortedArray(10));
  const [target, setTarget] = useState('');
  const [currentIndex, setCurrentIndex] = useState(null);
  const [foundIndex, setFoundIndex] = useState(null);
  const [message, setMessage] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [algorithm, setAlgorithm] = useState('linear');
  const [userInput, setUserInput] = useState('');
  const [speed, setSpeed] = useState(400);
  const [steps, setSteps] = useState(0);

  const handleRandomArray = () => {
    setArray(getRandomSortedArray(10));
    setUserInput('');
    setMessage('');
    setFoundIndex(null);
    setCurrentIndex(null);
    setSteps(0);
  };

  const handleUserInput = (e) => {
    setUserInput(e.target.value);
    const arr = e.target.value
      .split(',')
      .map(x => parseInt(x.trim()))
      .filter(x => !isNaN(x) && x >= 1 && x <= 500);
    if (arr.length) {
      arr.sort((a, b) => a - b);
      setArray(arr);
    } else {
      setArray([]);
    }
    setMessage('');
    setFoundIndex(null);
    setCurrentIndex(null);
    setSteps(0);
  };

  // --- Search Algorithms ---
  const linearSearch = async () => {
    setIsSearching(true);
    setMessage('');
    setFoundIndex(null);
    let stepCounter = 0;
    for (let i = 0; i < array.length; i++) {
      setCurrentIndex(i);
      stepCounter++;
      setSteps(stepCounter);
      await new Promise(res => setTimeout(res, speed));
      if (array[i] === parseInt(target)) {
        setFoundIndex(i);
        setMessage(`Found ${target} at index ${i}`);
        setIsSearching(false);
        return;
      }
    }
    setMessage('Not found');
    setCurrentIndex(null);
    setIsSearching(false);
  };

  const binarySearch = async () => {
    setIsSearching(true);
    setMessage('');
    setFoundIndex(null);
    let l = 0, r = array.length - 1;
    let stepCounter = 0;
    while (l <= r) {
      const mid = Math.floor((l + r) / 2);
      setCurrentIndex(mid);
      stepCounter++;
      setSteps(stepCounter);
      await new Promise(res => setTimeout(res, speed));
      if (array[mid] === parseInt(target)) {
        setFoundIndex(mid);
        setMessage(`Found ${target} at index ${mid}`);
        setIsSearching(false);
        return;
      } else if (array[mid] < target) {
        l = mid + 1;
      } else {
        r = mid - 1;
      }
    }
    setMessage('Not found');
    setCurrentIndex(null);
    setIsSearching(false);
  };

  const exponentialSearch = async () => {
    setIsSearching(true);
    setMessage('');
    setFoundIndex(null);
    let stepCounter = 0;
    if (array.length === 0) {
      setMessage('Not found');
      setIsSearching(false);
      return;
    }
    let bound = 1;
    while (bound < array.length && array[bound] < parseInt(target)) {
      setCurrentIndex(bound);
      stepCounter++;
      setSteps(stepCounter);
      await new Promise(res => setTimeout(res, speed));
      bound *= 2;
    }
    let l = Math.floor(bound / 2);
    let r = Math.min(bound, array.length - 1);
    while (l <= r) {
      const mid = Math.floor((l + r) / 2);
      setCurrentIndex(mid);
      stepCounter++;
      setSteps(stepCounter);
      await new Promise(res => setTimeout(res, speed));
      if (array[mid] === parseInt(target)) {
        setFoundIndex(mid);
        setMessage(`Found ${target} at index ${mid}`);
        setIsSearching(false);
        return;
      } else if (array[mid] < target) {
        l = mid + 1;
      } else {
        r = mid - 1;
      }
    }
    setMessage('Not found');
    setCurrentIndex(null);
    setIsSearching(false);
  };

  const jumpSearch = async () => {
    setIsSearching(true);
    setMessage('');
    setFoundIndex(null);
    let stepCounter = 0;
    const n = array.length;
    const step = Math.floor(Math.sqrt(n));
    let prev = 0;
    let curr = step;
    while (curr < n && array[curr - 1] < parseInt(target)) {
      setCurrentIndex(curr - 1);
      stepCounter++;
      setSteps(stepCounter);
      await new Promise(res => setTimeout(res, speed));
      prev = curr;
      curr += step;
    }
    for (let i = prev; i < Math.min(curr, n); i++) {
      setCurrentIndex(i);
      stepCounter++;
      setSteps(stepCounter);
      await new Promise(res => setTimeout(res, speed));
      if (array[i] === parseInt(target)) {
        setFoundIndex(i);
        setMessage(`Found ${target} at index ${i}`);
        setIsSearching(false);
        return;
      }
    }
    setMessage('Not found');
    setCurrentIndex(null);
    setIsSearching(false);
  };

  const handleSearch = () => {
    setSteps(0);
    if (!target) return;
    if (algorithm === 'linear') linearSearch();
    else if (algorithm === 'binary') binarySearch();
    else if (algorithm === 'exponential') exponentialSearch();
    else if (algorithm === 'jump') jumpSearch();
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', background: '#f7f9fa', minHeight: '100vh' }}>
      <div style={{
        width: "100%",
        background: "linear-gradient(90deg, #eaf4ff 60%, #fff 100%)",
        padding: "40px 0 10px 0",
        marginBottom: 10,
        textAlign: "center"
      }}>
        <h1 style={{ color: "#0056d2", fontSize: 48, fontWeight: 700, margin: 0 }}>Searching Visualizer</h1>
        <div style={{ color: "#444", fontSize: 22, marginTop: 8 }}>
          Visualize and compare popular searching algorithms interactively.
        </div>
      </div>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 24,
        marginBottom: 18,
        marginTop: 8,
        flexWrap: 'wrap'
      }}>
        <select
          value={algorithm}
          onChange={e => setAlgorithm(e.target.value)}
          disabled={isSearching}
          style={{
            padding: '8px 16px',
            borderRadius: 8,
            border: '1px solid #bbb',
            fontSize: 16,
            background: '#fff'
          }}
        >
          <option value="linear">Linear Search</option>
          <option value="binary">Binary Search</option>
          <option value="exponential">Exponential Search</option>
          <option value="jump">Jump Search</option>
        </select>
        <input
          type="number"
          value={target}
          onChange={e => setTarget(e.target.value)}
          placeholder="Enter number to search"
          disabled={isSearching}
          className="searching-input"
        />
        <button
          onClick={handleSearch}
          disabled={isSearching || !target}
          className="searching-btn primary"
        >
          Search
        </button>
        <button
          onClick={handleRandomArray}
          disabled={isSearching}
          className="searching-btn success"
        >
          Random Array
        </button>
        <label className="searching-speed-label">
          Speed:
          <input
            type="range"
            min="100"
            max="1000"
            step="50"
            value={speed}
            onChange={e => setSpeed(Number(e.target.value))}
            disabled={isSearching}
            className="searching-speed"
          />
          <span>{speed}ms</span>
        </label>
      </div>
      <div className="searching-userinput">
        <input
          type="text"
          value={userInput}
          onChange={handleUserInput}
          placeholder="Enter comma separated numbers"
          disabled={isSearching}
          className="searching-userinput-input"
        />
      </div>
      <div className="searching-info">
        <div className="searching-info-title">{ALGO_INFO[algorithm].name}</div>
        <div className="searching-info-desc">{ALGO_INFO[algorithm].desc}</div>
        <div className="searching-info-details">
          <div className="searching-info-item">
            <span className="searching-info-label">Time Complexity:</span>
            <span className="searching-info-value">{ALGO_INFO[algorithm].time}</span>
          </div>
          <div className="searching-info-item">
            <span className="searching-info-label">Space Complexity:</span>
            <span className="searching-info-value">{ALGO_INFO[algorithm].space}</span>
          </div>
          <div className="searching-info-item">
            <span className="searching-info-label">Applications:</span>
            <ul className="searching-info-list">
              {ALGO_INFO[algorithm].applications.map((app, i) => (
                <li key={i} className="searching-info-list-item">{app}</li>
              ))}
            </ul>
          </div>
          <div className="searching-info-item">
            <span className="searching-info-label">Why use?</span>
            <span className="searching-info-value">{ALGO_INFO[algorithm].why}</span>
          </div>
        </div>
      </div>
      <div className="searching-array">
        {array.map((val, idx) => (
          <div
            key={idx}
            className={
              idx === foundIndex
                ? "searching-bar found"
                : idx === currentIndex
                ? "searching-bar current"
                : "searching-bar"
            }
            title={`Index ${idx}`}
          >
            {val}
          </div>
        ))}
      </div>
      <div className="searching-legend">
        <span><span className="legend-box current"></span>Current</span>
        <span><span className="legend-box found"></span>Found</span>
        <span><span className="legend-box"></span>Unvisited</span>
      </div>
      <div className="searching-stats">
        <span>Steps: <b>{steps}</b></span>
        <span>Array Size: <b>{array.length}</b></span>
      </div>
      <p className={`searching-message ${foundIndex !== null ? "success" : "fail"}`}>{message}</p>
    </div>
  );
}

export default SearchingVisualizer;