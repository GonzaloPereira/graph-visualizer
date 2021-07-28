import React from 'react';

export default function NodeDrawn({ position, id }) {
  return (
    <g transform={`translate(${position.x},${position.y})`}>
      <circle r='20' fill='white' stroke='black' strokeWidth='4px'></circle>
      <text x={-4.5 * (1 + (id > 9))} className='unselectable' y='5' fill='black'>
        {Number(id)}
      </text>
    </g>
  );
}
