import React from 'react';
import './TrailGrid.css';


export default function TrailGrid({ rows = 12, cols = 30, size = 48 }) {
  // Creamos un array con rows * cols elementos
  const cells = Array.from({ length: rows * cols });

  return (
    <div
      className="trail-grid"
      style={{
        gridTemplateColumns: `repeat(${cols}, ${size}px)`,
        gridTemplateRows: `repeat(${rows}, ${size}px)`,
      }}
    >
      {cells.map((_, i) => (
        <div key={i} className="trail-cell" />
      ))}
    </div>
  );
}
