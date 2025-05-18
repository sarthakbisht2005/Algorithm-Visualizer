import React, { useEffect, useState } from "react";
import "./SortingVisualizer.css";
import Visualiser from "../control/Visualizer";
import Control from "../control/Control";
import { bubbleSort } from "../sortingAlgorithm/BubbleSort";
import { MergeSort } from "../sortingAlgorithm/MergeSort";
import { selectionSort } from "../sortingAlgorithm/SelectionSort";
import { insertionSort } from "../sortingAlgorithm/InsertionSort";
import { quickSort } from "../sortingAlgorithm/QuickSort";
import { heapSort } from "../sortingAlgorithm/HeapSort";
import { countSort } from "../sortingAlgorithm/CountSort";

function SortingVisualizer() {
    const [array, setArray] = useState([]);
    const [userInputArray, setUserInputArray] = useState("");
    const [speed, setSpeed] = useState(100);
    const [isSorting, setIsSorting] = useState(false);
    const [selectedSorting, setSelectedSorting] = useState("");

    const ALGO_INFO = {
        bubbleSort: {
            name: "Bubble Sort",
            desc: "Repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.",
            time: "O(n^2)",
            space: "O(1)",
            applications: [
                "Educational purposes",
                "Small datasets",
                "Detecting nearly sorted data"
            ],
            why: "Simple to implement and visualize, but inefficient for large datasets."
        },
        selectionSort: {
            name: "Selection Sort",
            desc: "Selects the minimum element from the unsorted part and swaps it with the first unsorted element.",
            time: "O(n^2)",
            space: "O(1)",
            applications: [
                "Small datasets",
                "Situations where memory writes are costly"
            ],
            why: "Easy to understand and has minimal swaps, but not efficient for large datasets."
        },
        insertionSort: {
            name: "Insertion Sort",
            desc: "Builds the sorted array one item at a time by inserting elements into their correct position.",
            time: "O(n^2)",
            space: "O(1)",
            applications: [
                "Small or nearly sorted datasets",
                "Online sorting (sorting as data arrives)"
            ],
            why: "Efficient for small or nearly sorted data, simple and adaptive."
        },
        mergeSort: {
            name: "Merge Sort",
            desc: "Divides the array into halves, sorts each half, and merges them back together.",
            time: "O(n log n)",
            space: "O(n)",
            applications: [
                "Sorting linked lists",
                "External sorting (large datasets on disk)",
                "Stable sorting"
            ],
            why: "Efficient and stable, good for large datasets and linked lists."
        },
        quickSort: {
            name: "Quick Sort",
            desc: "Divides and conquers by selecting a pivot and partitioning the array around the pivot.",
            time: "O(n log n) average, O(n^2) worst",
            space: "O(log n)",
            applications: [
                "General-purpose sorting",
                "In-place sorting",
                "Large datasets"
            ],
            why: "Very fast in practice for most inputs, but not stable."
        },
        heapSort: {
            name: "Heap Sort",
            desc: "Builds a heap from the array and repeatedly extracts the maximum element.",
            time: "O(n log n)",
            space: "O(1)",
            applications: [
                "In-place sorting",
                "Priority queues",
                "Large datasets"
            ],
            why: "Efficient, in-place, but not stable."
        },
        countSort: {
            name: "Counting Sort",
            desc: "Counts the occurrences of each value and calculates positions to sort the array.",
            time: "O(n + k)",
            space: "O(k)",
            applications: [
                "Sorting integers in a small range",
                "Linear time sorting for small keys",
                "Radix sort subroutine"
            ],
            why: "Very fast for small integer ranges, not comparison-based."
        }
    };
    // Parse user input into a valid array of integers (1-500)
    useEffect(() => {
        if (!userInputArray) {
            setArray([]);
            return;
        }
        const filteredInput = userInputArray
            .split(",")
            .map((item) => parseInt(item.trim()))
            .filter(
                (item) =>
                    !isNaN(item) &&
                    Number.isInteger(item) &&
                    item >= 1 &&
                    item <= 500
            );
        setArray(filteredInput);
    }, [userInputArray]);

    const handleNewArrayGenrate = () => {
        const newArray = Array.from({ length: 15 }, () =>
            Math.floor(Math.random() * 500) + 1
        );
        setArray(newArray);
        setUserInputArray("");
    };
    const reSet = () => {
        setArray([]);
        setSelectedSorting("");
        setUserInputArray("");
    };
    const Start = () => {};

    const handleSorting = (e) => {
        const sortingMethod = e.target.value;
        setSelectedSorting(sortingMethod);
        setIsSorting(true);
        let animationArr = [];
        switch (sortingMethod) {
            case "bubbleSort":
                animationArr = bubbleSort(array);
                bubbleAnimation(animationArr);
                break;
            case "mergeSort":
                animationArr = MergeSort(array);
                animateMergeSorting(animationArr);
                break;
            case "selectionSort":
                animationArr = selectionSort(array);
                animateSelectionSorting(animationArr);
                break;

            case "quickSort":
                animationArr = quickSort(array);
                animateQuickSorting(animationArr);
                break;

            case "heapSort":
                animationArr = heapSort(array);
                animateHeapSorting(animationArr);
                break;

            case "countSort":
                animationArr = countSort(array);
                animateCountSort(animationArr);
                break;

            case "insertionSort":
                animationArr = insertionSort(array);
                animateInsertionSort(animationArr);
                break;

            default:
                break;
        }
    };

    function bubbleAnimation(animation) {
        const barEle = document.getElementsByClassName("bar");
        for (let i = 0; i < animation.length; i++) {
            let [barOneInd, bartwoInd, swap] = animation[i];
            let barOne = barEle[barOneInd];
            let barTwo = barEle[bartwoInd];
            setTimeout(() => {
                barOne.style.backgroundColor = swap ? "red" : "yellow";
                barTwo.style.backgroundColor = swap ? "red" : "yellow";
                if (swap) {
                    const heightTemp = barOne.style.height;
                    barOne.style.height = barTwo.style.height;
                    barTwo.style.height = heightTemp;
                    const content = barOne.innerText;
                    barOne.innerText = barTwo.innerText;
                    barTwo.innerText = content;
                }
                setTimeout(() => {
                    barOne.style.backgroundColor = "blue";
                    barTwo.style.backgroundColor = "blue";
                }, speed);
            }, i * speed);
        }
        setTimeout(() => {
            for (let j = 0; j < barEle.length; j++) {
                setTimeout(() => {
                    barEle[j].style.backgroundColor = "green";
                }, j * speed);
            }
            setIsSorting(false);
        }, animation.length * speed);
    }

    const animateMergeSorting = (animations) => {
        const bars = document.getElementsByClassName("bar");
        for (let i = 0; i < animations.length; i++) {
            const isColorChange = i % 3 !== 2;
            if (isColorChange) {
                const [barOneIdx, barTwoIdx] = animations[i];
                const barOne = bars[barOneIdx];
                const barTwo = bars[barTwoIdx];
                const color = i % 3 === 0 ? "yellow" : "blue";
                setTimeout(() => {
                    barOne.style.backgroundColor = color;
                    barTwo.style.backgroundColor = color;
                }, i * speed);
            } else {
                setTimeout(() => {
                    const [barOneIdx, newHeight] = animations[i];
                    const barOne = bars[barOneIdx];
                    barOne.style.height = `${newHeight}px`;
                    barOne.innerHTML = newHeight;
                }, i * speed);
            }
        }

        setTimeout(() => {
            for (let j = 0; j < bars.length; j++) {
                setTimeout(() => {
                    bars[j].style.backgroundColor = "green";
                }, j * speed);
            }
            setIsSorting(false);
        }, animations.length * speed);
    };

    const animateSelectionSorting = (animations) => {
        const bars = document.getElementsByClassName("bar");
        for (let i = 0; i < animations.length; i++) {
            const [barOneIdx, barTwoIdx, swap] = animations[i];
            const barOne = bars[barOneIdx];
            const barTwo = bars[barTwoIdx];
            setTimeout(() => {
                barOne.style.backgroundColor = swap ? "red" : "yellow";
                barTwo.style.backgroundColor = swap ? "red" : "yellow";
                if (swap) {
                    const tempHeight = barOne.style.height;
                    barOne.style.height = barTwo.style.height;
                    barTwo.style.height = tempHeight;
                    const tempContent = barOne.innerHTML;
                    barOne.innerHTML = barTwo.innerHTML;
                    barTwo.innerHTML = tempContent;
                }
                setTimeout(() => {
                    barOne.style.backgroundColor = "blue";
                    barTwo.style.backgroundColor = "blue";
                }, speed);
            }, i * speed);
        }
        setTimeout(() => {
            for (let j = 0; j < bars.length; j++) {
                setTimeout(() => {
                    bars[j].style.backgroundColor = "green";
                }, j * speed);
            }
            setIsSorting(false);
        }, animations.length * speed);
    };

    const animateInsertionSort = (animations) => {
        const bars = document.getElementsByClassName("bar");
        for (let i = 0; i < animations.length; i++) {
            const [barOneIdx, barTwoIdx, swap] = animations[i];
            const barOne = bars[barOneIdx];
            const barTwo = bars[barTwoIdx];
            setTimeout(() => {
                barOne.style.backgroundColor = swap ? "red" : "yellow";
                barTwo.style.backgroundColor = swap ? "red" : "yellow";
                if (swap) {
                    const tempHeight = barOne.style.height;
                    barOne.style.height = barTwo.style.height;
                    barTwo.style.height = tempHeight;

                    const tempContent = barOne.innerHTML;
                    barOne.innerHTML = barTwo.innerHTML;
                    barTwo.innerHTML = tempContent;
                }
                setTimeout(() => {
                    barOne.style.backgroundColor = "blue";
                    barTwo.style.backgroundColor = "blue";
                }, speed);
            }, i * speed);
        }
        setTimeout(() => {
            Array.from(bars).forEach((bar, i) => {
                setTimeout(() => {
                    bar.style.backgroundColor = "green";
                }, i * speed);
            });
            setIsSorting(false);
        }, animations.length * speed);
    };

    const animateHeapSorting = (animations) => {
        const bars = document.getElementsByClassName("bar");

        for (let i = 0; i < animations.length; i++) {
            const [action, a, b] = animations[i];

            setTimeout(() => {
                if (action === "pivot") {
                    bars[a].style.backgroundColor = "purple";
                } else if (action === "compare") {
                    bars[a].style.backgroundColor = "yellow";
                    bars[b].style.backgroundColor = "yellow";
                    setTimeout(() => {
                        bars[a].style.backgroundColor = "blue";
                        bars[b].style.backgroundColor = "blue";
                    }, speed);
                } else if (action === "swap") {
                    bars[a].style.backgroundColor = "red";
                    bars[b].style.backgroundColor = "red";

                    const tempHeight = bars[a].style.height;
                    bars[a].style.height = bars[b].style.height;
                    bars[b].style.height = tempHeight;

                    const tempText = bars[a].innerText;
                    bars[a].innerText = bars[b].innerText;
                    bars[b].innerText = tempText;

                    setTimeout(() => {
                        bars[a].style.backgroundColor = "blue";
                        bars[b].style.backgroundColor = "blue";
                    }, speed);
                }
            }, i * speed);
        }

        setTimeout(() => {
            for (let j = 0; j < bars.length; j++) {
                setTimeout(() => {
                    bars[j].style.backgroundColor = "green";
                }, j * speed);
            }
            setIsSorting(false);
        }, animations.length * speed);
    };

    const animateCountSort = (animations) => {
        const bars = document.getElementsByClassName("bar");

        for (let i = 0; i < animations.length; i++) {
            const [action, a, b] = animations[i];

            setTimeout(() => {
                if (action === "count") {
                    bars[a].style.backgroundColor = "yellow";
                    setTimeout(() => {
                        bars[a].style.backgroundColor = "blue";
                    }, speed);
                } else if (action === "write") {
                    bars[a].style.backgroundColor = "red";
                    bars[a].style.height = `${b}px`;
                    bars[a].innerText = b;
                    setTimeout(() => {
                        bars[a].style.backgroundColor = "blue";
                    }, speed);
                }
            }, i * speed);
        }

        setTimeout(() => {
            for (let j = 0; j < bars.length; j++) {
                setTimeout(() => {
                    bars[j].style.backgroundColor = "green";
                }, j * speed);
            }
            setIsSorting(false);
        }, animations.length * speed);
    };

    const animateQuickSorting = (animations) => {
        const bars = document.getElementsByClassName("bar");

        for (let i = 0; i < animations.length; i++) {
            const [action, a, b] = animations[i];

            setTimeout(() => {
                if (action === "pivot") {
                    bars[a].style.backgroundColor = "purple";
                } else if (action === "compare") {
                    bars[a].style.backgroundColor = "yellow";
                    bars[b].style.backgroundColor = "yellow";
                    setTimeout(() => {
                        bars[a].style.backgroundColor = "blue";
                        bars[b].style.backgroundColor = "blue";
                    }, speed);
                } else if (action === "swap") {
                    bars[a].style.backgroundColor = "red";
                    bars[b].style.backgroundColor = "red";

                    const tempHeight = bars[a].style.height;
                    bars[a].style.height = bars[b].style.height;
                    bars[b].style.height = tempHeight;

                    const tempText = bars[a].innerText;
                    bars[a].innerText = bars[b].innerText;
                    bars[b].innerText = tempText;

                    setTimeout(() => {
                        bars[a].style.backgroundColor = "blue";
                        bars[b].style.backgroundColor = "blue";
                    }, speed);
                }
            }, i * speed);
        }

        setTimeout(() => {
            for (let j = 0; j < bars.length; j++) {
                setTimeout(() => {
                    bars[j].style.backgroundColor = "green";
                }, j * speed);
            }
            setIsSorting(false);
        }, animations.length * speed);
    };

    return (
        <div className="sorting-main-container">
            <header className="sorting-header">
                <h1>Sorting Visualizer</h1>
                <p className="sorting-subtitle">
                    Visualize and compare popular sorting algorithms interactively.
                </p>
            </header>
            <div className="sorting-controls-area">
                <Control
                    handleNewArrayGenrate={handleNewArrayGenrate}
                    handleSorting={handleSorting}
                    userInputArray={userInputArray}
                    setUserInputArray={setUserInputArray}
                    setSpeed={setSpeed}
                    reSet={reSet}
                    isSorting={isSorting}
                    speed={speed}
                    selectedSorting={selectedSorting}
                />
            </div>
            {/* Algorithm Info Box */}
            {selectedSorting && ALGO_INFO[selectedSorting] && (
                <div
                    style={{
                        background: "#fff",
                        border: "1px solid #d0d7de",
                        borderRadius: 8,
                        padding: 16,
                        margin: "18px auto",
                        maxWidth: 600,
                        boxShadow: "0 2px 8px #e0e0e0"
                    }}
                >
                    <h3 style={{ margin: "0 0 8px 0", color: "#0056d2" }}>
                        {ALGO_INFO[selectedSorting].name}
                    </h3>
                    <div style={{ marginBottom: 6 }}>{ALGO_INFO[selectedSorting].desc}</div>
                    <div style={{ marginBottom: 6 }}>
                        <b>Time Complexity:</b> {ALGO_INFO[selectedSorting].time} &nbsp; | &nbsp;
                        <b>Space Complexity:</b> {ALGO_INFO[selectedSorting].space}
                    </div>
                    <div style={{ marginBottom: 6 }}>
                        <b>Why used:</b> {ALGO_INFO[selectedSorting].why}
                    </div>
                    <div>
                        <b>Applications:</b>
                        <ul style={{ margin: "4px 0 0 18px" }}>
                            {ALGO_INFO[selectedSorting].applications.map((app, i) => (
                                <li key={i}>{app}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
            <div className="sorting-visualizer-area">
                <Visualiser array={array} />
            </div>
            <footer className="sorting-footer">
                <span>
                    Tip: You can input your own array or generate a random one. Adjust speed for step-by-step animation!
                </span>
            </footer>
        </div>
    );
}

export default SortingVisualizer;
