import React from 'react';

export default function TemporalEdge({ x1, y1, x2, y2 }) {
  const alfa = (Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI;
  return (
    <g>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke='black' strokeWidth='3px' />
      <path
        d={`M ${x2} ${y2} L ${x2 + 6} ${y2 + 20} 
          L ${x2 - 6} ${y2 + 20} Z`}
        transform={`rotate(${alfa + 90} ${x2} ${y2})`}
      />
    </g>
  );
}
