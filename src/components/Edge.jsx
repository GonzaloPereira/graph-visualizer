import React from 'react';

export default function Edge({ id, position, currentEdge, handleClick }) {
  return (
    <g
      onMouseDown={(e) => {
        e.stopPropagation();
        handleClick(id);
      }}
      className='edge'
    >
      <line x1={position.x1} y1={position.y1} x2={position.x2} y2={position.y2} stroke='rgba(0,0,0,0)' strokeWidth='15px' />
      <line
        x1={position.x1}
        y1={position.y1}
        x2={position.x2}
        y2={position.y2}
        stroke={currentEdge === id ? 'blue' : 'black'}
        strokeWidth='3px'
      />
    </g>
  );
}
