import React, { useState } from 'react';
import { bfs, dfs } from '../pathfinder/bfsdfs';
import { dijkstra } from '../pathfinder/dikstra';
import { bellmanFord } from '../pathfinder/bellmanford';
import { floydWarshall } from '../pathfinder/floydWarshall';
import { kruskal } from '../pathfinder/kruskal';
import { prim } from '../pathfinder/prim\'s';

const NUM_ROWS = 20;
const NUM_COLS = 30;
const START = [2, 2];
const END = [NUM_ROWS - 3, NUM_COLS - 3];
const ALGO_INFO = {
    bfs: {
        name: "Breadth-First Search (BFS)",
        desc: "Explores the graph level by level, guaranteeing the shortest path in unweighted graphs.",
        time: "O(V + E)",
        space: "O(V)",
        applications: [
            "Shortest path in unweighted graphs",
            "Web crawlers",
            "Broadcasting in networks",
            "Finding connected components"
        ],
        why: "Used when you need the shortest path in an unweighted graph or to explore all nodes at a certain distance."
    },
    dfs: {
        name: "Depth-First Search (DFS)",
        desc: "Explores as far as possible along each branch before backtracking.",
        time: "O(V + E)",
        space: "O(V)",
        applications: [
            "Pathfinding in mazes",
            "Topological sorting",
            "Cycle detection",
            "Solving puzzles"
        ],
        why: "Used for exhaustive traversal, topological sorting, and cycle detection in graphs."
    },
    dijkstra: {
        name: "Dijkstra's Algorithm",
        desc: "Finds the shortest path from a source to all vertices in a weighted graph with non-negative weights.",
        time: "O((V + E) log V) with min-heap",
        space: "O(V)",
        applications: [
            "Shortest path in weighted graphs",
            "GPS navigation",
            "Network routing protocols"
        ],
        why: "Used when you need the shortest path in a weighted graph with non-negative weights."
    },
    "bellman-ford": {
        name: "Bellman-Ford Algorithm",
        desc: "Finds shortest paths from a source to all vertices, works with negative weights and detects negative cycles.",
        time: "O(V * E)",
        space: "O(V)",
        applications: [
            "Graphs with negative weights",
            "Detecting negative cycles",
            "Currency arbitrage"
        ],
        why: "Used when the graph may have negative edge weights."
    },
    "floyd-warshall": {
        name: "Floyd-Warshall Algorithm",
        desc: "Finds shortest paths between all pairs of vertices in a weighted graph.",
        time: "O(V^3)",
        space: "O(V^2)",
        applications: [
            "All-pairs shortest path",
            "Transitive closure",
            "Network analysis"
        ],
        why: "Used when shortest paths between all pairs of nodes are needed."
    },
    kruskal: {
        name: "Kruskal's Algorithm",
        desc: "Finds a minimum spanning tree for a connected weighted graph.",
        time: "O(E log V)",
        space: "O(V)",
        applications: [
            "Minimum spanning tree",
            "Network design",
            "Clustering"
        ],
        why: "Used for finding the minimum spanning tree in a graph."
    },
    prim: {
        name: "Prim's Algorithm",
        desc: "Builds a minimum spanning tree by adding the lowest-weight edge at each step.",
        time: "O(E + V log V) with min-heap",
        space: "O(V)",
        applications: [
            "Minimum spanning tree",
            "Network design",
            "Approximation algorithms"
        ],
        why: "Used for finding the minimum spanning tree, especially in dense graphs."
    }
};
function createGrid(walls = []) {
    const grid = [];
    for (let r = 0; r < NUM_ROWS; r++) {
        const row = [];
        for (let c = 0; c < NUM_COLS; c++) {
            row.push({
                row: r,
                col: c,
                isVisited: false,
                isPath: false,
                isWall: walls.some(([wr, wc]) => wr === r && wc === c),
                distance: Infinity,
                prev: null,
            });
        }
        grid.push(row);
    }
    return grid;
}

function randomMaze() {
    const walls = [];
    for (let r = 0; r < NUM_ROWS; r++) {
        for (let c = 0; c < NUM_COLS; c++) {
            if ((r === START[0] && c === START[1]) || (r === END[0] && c === END[1])) continue;
            if (Math.random() < 0.28) walls.push([r, c]);
        }
    }
    return walls;
}

const ALGO_OPTIONS = [
    { value: "bfs", label: "BFS" },
    { value: "dfs", label: "DFS" },
    { value: "dijkstra", label: "Dijkstra" },
    { value: "bellman-ford", label: "Bellman-Ford" },
    { value: "floyd-warshall", label: "Floyd-Warshall" },
    { value: "kruskal", label: "Kruskal's MST" },
    { value: "prim", label: "Prim's MST" }
];

function PathfindingVisualizer() {
    const [grid, setGrid] = useState(createGrid());
    const [isRunning, setIsRunning] = useState(false);
    const [algorithm, setAlgorithm] = useState('bfs');
    const [walls, setWalls] = useState([]);

    const resetGrid = (walls = []) => {
        setGrid(createGrid(walls));
    };

    const handleMaze = () => {
        const mazeWalls = randomMaze();
        setWalls(mazeWalls);
        resetGrid(mazeWalls);
    };

    const handleReset = () => {
        setWalls([]);
        resetGrid([]);
        setIsRunning(false);
    };

    const visualize = async () => {
        setIsRunning(true);
        let result;
        let newGrid = grid.map(row => row.map(cell => ({
            ...cell,
            isVisited: false,
            isPath: false,
        })));
        setGrid(newGrid);

        if (algorithm === 'bfs') {
            result = bfs(newGrid, START, END);
        } else if (algorithm === 'dfs') {
            result = dfs(newGrid, START, END);
        } else if (algorithm === 'dijkstra') {
            result = dijkstra(newGrid, START, END);
        } else if (algorithm === 'bellman-ford') {
            result = bellmanFord(newGrid, START, END);
        } else if (algorithm === 'floyd-warshall') {
            result = floydWarshall(newGrid, START, END);
        } else if (algorithm === 'kruskal') {
            result = kruskal(newGrid);
        } else if (algorithm === 'prim') {
            result = prim(newGrid);
        }

        // Animate visited
        if (result && result.visitedOrder) {
            for (const [r, c] of result.visitedOrder) {
                newGrid[r][c].isVisited = true;
                setGrid(newGrid.map(row => row.map(cell => ({ ...cell }))));
                await new Promise(res => setTimeout(res, 10));
            }
        }
        // Animate path
        if (result && result.path) {
            for (const [r, c] of result.path) {
                newGrid[r][c].isPath = true;
                setGrid(newGrid.map(row => row.map(cell => ({ ...cell }))));
                await new Promise(res => setTimeout(res, 20));
            }
        }
        setIsRunning(false);
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'sans-serif', background: '#f7f9fa', minHeight: '100vh' }}>
            <h2 style={{ marginBottom: 0, color: '#0056d2' }}>Pathfinding & Graph Algorithms Visualizer</h2>
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
                    disabled={isRunning}
                    style={{
                        padding: '8px 16px',
                        borderRadius: 8,
                        border: '1px solid #bbb',
                        fontSize: 16,
                        background: '#fff'
                    }}
                >
                    {ALGO_OPTIONS.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                </select>
                <button
                    onClick={visualize}
                    disabled={isRunning}
                    style={{
                        padding: '8px 24px',
                        borderRadius: 8,
                        background: '#0056d2',
                        color: '#fff',
                        border: 'none',
                        fontWeight: 600,
                        fontSize: 16,
                        cursor: isRunning ? 'not-allowed' : 'pointer'
                    }}
                >
                    Visualize
                </button>
                <button
                    onClick={handleMaze}
                    disabled={isRunning}
                    style={{
                        padding: '8px 24px',
                        borderRadius: 8,
                        background: '#43d36c',
                        color: '#fff',
                        border: 'none',
                        fontWeight: 600,
                        fontSize: 16,
                        cursor: isRunning ? 'not-allowed' : 'pointer'
                    }}
                >
                    Generate Maze
                </button>
                <button
                    onClick={handleReset}
                    disabled={isRunning}
                    style={{
                        padding: '8px 24px',
                        borderRadius: 8,
                        background: '#e74c3c',
                        color: '#fff',
                        border: 'none',
                        fontWeight: 600,
                        fontSize: 16,
                        cursor: isRunning ? 'not-allowed' : 'pointer'
                    }}
                >
                    Reset
                </button>
            </div>
            {/* Algorithm Info Box */}
            <div style={{
                background: '#fff',
                border: '1px solid #d0d7de',
                borderRadius: 8,
                padding: 16,
                marginBottom: 18,
                maxWidth: 600,
                boxShadow: '0 2px 8px #e0e0e0'
            }}>
                <h3 style={{ margin: '0 0 8px 0', color: '#0056d2' }}>
                    {ALGO_INFO[algorithm].name}
                </h3>
                <div style={{ marginBottom: 6 }}>{ALGO_INFO[algorithm].desc}</div>
                <div style={{ marginBottom: 6 }}>
                    <b>Time Complexity:</b> {ALGO_INFO[algorithm].time} &nbsp; | &nbsp;
                    <b>Space Complexity:</b> {ALGO_INFO[algorithm].space}
                </div>
                <div style={{ marginBottom: 6 }}>
                    <b>Why used:</b> {ALGO_INFO[algorithm].why}
                </div>
                <div>
                    <b>Applications:</b>
                    <ul style={{ margin: '4px 0 0 18px' }}>
                        {ALGO_INFO[algorithm].applications.map((app, i) => (
                            <li key={i}>{app}</li>
                        ))}
                    </ul>
                </div>
            </div>
            <div style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${NUM_COLS}, 22px)`,
                gap: 1,
                background: '#bbb',
                border: '2px solid #888',
                marginBottom: 16,
                borderRadius: 8,
                boxShadow: '0 2px 8px #e0e0e0',
                overflow: 'auto'
            }}>
                {grid.flat().map((cell, idx) => {
                    let bg = '#fff';
                    let border = '1px solid #ccc';
                    let boxShadow = '';
                    if (cell.row === START[0] && cell.col === START[1]) {
                        bg = '#43d36c';
                        border = '2px solid #2ecc40';
                        boxShadow = '0 0 8px #43d36c';
                    } else if (cell.row === END[0] && cell.col === END[1]) {
                        bg = '#e74c3c';
                        border = '2px solid #c0392b';
                        boxShadow = '0 0 8px #e74c3c';
                    } else if (cell.isWall) {
                        bg = '#222';
                    } else if (cell.isPath) {
                        bg = '#f7d51d';
                        border = '2px solid #f1c40f';
                        boxShadow = '0 0 6px #f7d51d';
                    } else if (cell.isVisited) {
                        bg = '#6ec6ff';
                        border = '1px solid #3498db';
                    }
                    return (
                        <div
                            key={idx}
                            style={{
                                width: 22,
                                height: 22,
                                background: bg,
                                border,
                                boxSizing: 'border-box',
                                borderRadius: cell.isPath ? 6 : 3,
                                transition: 'background 0.2s, border 0.2s, box-shadow 0.2s',
                                boxShadow,
                                cursor: 'pointer'
                            }}
                            title={`(${cell.row},${cell.col})`}
                        />
                    );
                })}
            </div>
            <div style={{ display: 'flex', gap: 20, alignItems: 'center', fontSize: 14, marginBottom: 10 }}>
                <span>
                    <span style={{
                        display: 'inline-block', width: 18, height: 18, background: '#43d36c', borderRadius: 3, marginRight: 4, border: '2px solid #2ecc40'
                    }} /> Start
                </span>
                <span>
                    <span style={{
                        display: 'inline-block', width: 18, height: 18, background: '#e74c3c', borderRadius: 3, marginRight: 4, border: '2px solid #c0392b'
                    }} /> End
                </span>
                <span>
                    <span style={{
                        display: 'inline-block', width: 18, height: 18, background: '#222', borderRadius: 3, marginRight: 4, border: '1px solid #111'
                    }} /> Wall
                </span>
                <span>
                    <span style={{
                        display: 'inline-block', width: 18, height: 18, background: '#6ec6ff', borderRadius: 3, marginRight: 4, border: '1px solid #3498db'
                    }} /> Visited
                </span>
                <span>
                    <span style={{
                        display: 'inline-block', width: 18, height: 18, background: '#f7d51d', borderRadius: 6, marginRight: 4, border: '2px solid #f1c40f'
                    }} /> Path
                </span>
                <span>
                    <span style={{
                        display: 'inline-block', width: 18, height: 18, background: '#fff', borderRadius: 3, marginRight: 4, border: '1px solid #ccc'
                    }} /> Unvisited
                </span>
            </div>
        </div>
    );
}

export default PathfindingVisualizer;
