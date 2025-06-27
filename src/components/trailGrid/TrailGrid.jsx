import React from 'react';
import './TrailGrid.css';


export default function TrailGrid({ rows = 12, cols = 30 }) {
  // Creamos un array con rows * cols elementos
  const cells = Array.from({ length: rows * cols });

  return (
    <div
      className="trail-grid"
      style={{
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gridTemplateRows: `repeat(${rows}, 1fr)`,
      }}
    >
      {cells.map((_, i) => (
        <div key={i} className="trail-cell" />
      ))}
    </div>
  );
}
