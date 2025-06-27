import React from 'react';
import './eyes.css';

export default function EyesAnimation() {
  return (
    <div className="eyes-wrapper">
      {/* Ojo izquierdo */}
      <div className="eye">
        <span className="eyelid" />
        <span className="pupil" />
      </div>

      {/* Ojo derecho */}
      <div className="eye">
        <span className="eyelid" />
        <span className="pupil" />
      </div>
    </div>
  );
}
