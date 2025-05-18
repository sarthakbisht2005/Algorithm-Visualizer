import React from 'react'
import "./Visualizer.css";

function Visualizer({ array }) {
  return (
    <div className="array-container">
      {Array.isArray(array) && array.map((item, index) =>
        (typeof item === 'number' && !isNaN(item)) ? (
          <div key={index} className="bar-wrapper">
            <div className="bar-label">{item}</div>
            <div
              className='bar'
              style={{ height: `${item}px` }}
              title={item}
            ></div>
          </div>
        ) : null
      )}
    </div>
  )
}

export default Visualizer
