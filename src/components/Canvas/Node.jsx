import React from 'react';

export default function Node({ position, id, highlight }) {
  function color() {
    switch (highlight) {
      case 1:
        return 'red';
      case 2:
        return 'blue';
      default:
        return 'white';
    }
  }
  return (
    <g transform={`translate(${position.x},${position.y})`}>
      <circle r='20' fill={color()} stroke='black' strokeWidth='4px'></circle>
      <text x={-4.5 * (1 + (id > 9))} className='unselectable' y='5' fill='black'>
        {Number(id)}
      </text>
    </g>
  );
}
