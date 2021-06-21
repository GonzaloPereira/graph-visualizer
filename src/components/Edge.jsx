import React from 'react';

export default function Edge({ id, position, weight, currentEdge, handleClick }) {
  const alfa = Math.atan2(position.y2 - position.y1, position.x2 - position.x1);
  const centerX = (position.x1 + position.x2) / 2;
  const centerY = 5 + (position.y1 + position.y2) / 2;
  const d = 10;
  const isRight = position.x2 > position.x1;
  const textPosX = centerX + (isRight ? 1 : -1) * d * Math.sin(alfa);
  const textPosY = centerY + (!isRight ? 1 : -1) * d * Math.cos(alfa);
  const rotateTextAngle = (alfa * 180) / Math.PI - 180 * !isRight;
  const translateTextDistance = -4.5 * Math.round(Math.log10(Math.abs(weight)) + 1);
  return (
    <g
      onMouseDown={(e) => {
        e.stopPropagation();
        handleClick({ id, textPosX, textPosY });
      }}
      className='edge'
    >
      <line x1={position.x1} y1={position.y1} x2={position.x2} y2={position.y2} stroke='rgba(0,0,0,0)' strokeWidth='15px' />
      <line
        x1={position.x1}
        y1={position.y1}
        x2={position.x2}
        y2={position.y2}
        stroke={currentEdge && currentEdge.id === id ? 'blue' : 'black'}
        strokeWidth='3px'
      />
      <text
        x={textPosX}
        y={textPosY}
        className='unselectable'
        fill={currentEdge && currentEdge.id === id ? 'blue' : 'black'}
        transform={`rotate(${rotateTextAngle} ${textPosX} ${textPosY}) translate(${translateTextDistance})`}
      >
        {weight}
      </text>
    </g>
  );
}
