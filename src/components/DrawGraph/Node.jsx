import React from 'react';

export default function Node({ position, id, currentNode, handleClick, isDragged }) {
  return (
    <g
      transform={`translate(${position.x},${position.y})`}
      onMouseDown={(e) => {
        e.stopPropagation();
        handleClick(id);
      }}
      className='node'
      style={{ cursor: `${isDragged ? 'move' : ''}` }}
    >
      <circle r='20' fill={currentNode === id ? '#DBE2EF' : 'white'} stroke='black' strokeWidth='4px'></circle>
      <text x={-4.5 * (1 + (id >= 9))} className='unselectable' y='5' fill='black'>
        {Number(id)}
      </text>
    </g>
  );
}
