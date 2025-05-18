import React from 'react'

function Control({
    handleNewArrayGenrate,
    setSpeed,
    isSorting,
    handleSorting,
    userInputArray,
    setUserInputArray,
    reSet,
    selectedSorting
}) {
    return (
        <div className='controls-container'>
            <div className="input-wrapper">
                <input
                    type="text"
                    value={userInputArray}
                    onChange={e => setUserInputArray(e.target.value)}
                    className="neumorphic-input"
                    placeholder="Enter comma-separated integers (1-500)"
                />
                <div className="info-icon-wrapper">
                    <i className="info-icon">i</i>
                    <span className="tooltip-text">
                        Provide your array as comma-separated integers (1-500)
                    </span>
                </div>
            </div>
            <button className='neu-button' onClick={handleNewArrayGenrate}>Generate New Array</button>
            <select className='neumorphism-dropdown' value={selectedSorting} onChange={handleSorting}>
                <option value=''>Select Sorting</option>
                <option value='bubbleSort'>Bubble Sort</option>
                <option value="mergeSort">Merge Sort</option>
                <option value="selectionSort">Selection Sort</option>
                <option value='insertionSort'>Insertion Sort</option>
                <option value="quickSort">Quick Sort</option>
                <option value="heapSort">Heap Sort</option>
                <option value='countSort'>Count Sort</option>
            </select>
            <label>
                Speed:
                <input
                    type="range"
                    min="10"
                    max="200"
                    className="speedControl"
                    onChange={e => setSpeed(200 - e.target.value)}
                    disabled={isSorting}
                />
            </label>
            <button className="neu-button" onClick={reSet}>
                Reset
            </button>
        </div>
    )
}

export default Control
