import React from 'react';

export default function Edge({ id, position, weight, currentEdge, handleClick }) {
  const alfa = Math.atan2(position.y2 - position.y1, position.x2 - position.x1);
  const centerX = (position.x1 + position.x2) / 2 - 4.5 * (1 + (id >= 9)),
    centerY = 5 + (position.y1 + position.y2) / 2;
  const d = 10;
  const textPosX = centerX + (position.x2 > position.x1 ? 1 : -1) * d * Math.sin(alfa);
  const textPosY = centerY + (position.x2 > position.x1 ? -1 : 1) * d * Math.cos(alfa);
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
      <text x={textPosX} y={textPosY} className='unselectable' fill='black'>
        {1}
      </text>
    </g>
  );
}
