import React from 'react';

export default function Edge({ id, edge, position, currentEdge, handleClick, isWeighted, isDirected, isCurved }) {
  const weight = edge.w;
  const alfa = (Math.atan2(position.y2 - position.y1, position.x2 - position.x1) * 180) / Math.PI;
  const length = Math.sqrt((position.x1 - position.x2) ** 2 + (position.y1 - position.y2) ** 2);
  const centerX = (position.x1 + position.x2) / 2;
  const centerY = 5 + (position.y1 + position.y2) / 2;
  const isRight = position.x2 > position.x1;
  const rotateTextAngle = alfa - 180 * !isRight;
  const translateTextDistance = weight === '' ? 0 : -4.5 * Math.round(Math.log10(Math.abs(weight) + 1) + 1);
  const bezierX =
    centerX + (edge.u < edge.v ? 1 : -1) * ((isRight ? 1 : -1) * Math.min(length / 4, 50) * Math.sin((alfa * Math.PI) / 180));
  const bezierY =
    centerY + (edge.u < edge.v ? 1 : -1) * ((!isRight ? 1 : -1) * Math.min(length / 4, 50) * Math.cos((alfa * Math.PI) / 180));
  const textPosX = isCurved ? 0.25 * position.x1 + 0.5 * bezierX + 0.25 * position.x2 : centerX;
  const textPosY = isCurved ? 0.25 * position.y1 + 0.5 * bezierY + 0.25 * position.y2 : centerY;
  const liftDistance = isCurved && edge.u > edge.v ? 20 : -10;
  const t = 0.8;
  const tempX = (1 - t) ** 2 * position.x1 + 2 * (1 - t) * t * bezierX + t ** 2 * position.x2;
  const tempY = (1 - t) ** 2 * position.y1 + 2 * (1 - t) * t * bezierY + t ** 2 * position.y2;
  const angle = (Math.atan2(position.y2 - tempY, position.x2 - tempX) * 180) / Math.PI;
  return (
    <g
      onMouseDown={(e) => {
        e.stopPropagation();
        handleClick(id, 'single');
      }}
      onDoubleClick={(e) => {
        e.stopPropagation();
        handleClick(id, 'double');
      }}
      className='edge'
    >
      {/* Straight lines */}
      {!isCurved && (
        <>
          <line x1={position.x1} y1={position.y1} x2={position.x2} y2={position.y2} stroke='rgba(0,0,0,0)' strokeWidth='15px' />
          <line
            x1={position.x1}
            y1={position.y1}
            x2={position.x2}
            y2={position.y2}
            stroke={currentEdge && currentEdge === id ? '#3F72AF' : 'black'}
            strokeWidth='3px'
          />
        </>
      )}
      {/* Curved lines  */}
      {isCurved && (
        <>
          <path
            d={`M ${position.x1} ${position.y1} Q ${bezierX} ${bezierY} ${position.x2} ${position.y2}`}
            stroke='rgba(0,0,0,0)'
            strokeWidth='15px'
            fill='transparent'
          />
          <path
            d={`M ${position.x1} ${position.y1} Q ${bezierX} ${bezierY} ${position.x2} ${position.y2}`}
            stroke={currentEdge && currentEdge === id ? '#3F72AF' : 'black'}
            strokeWidth='3px'
            fill='transparent'
          />
        </>
      )}
      {isWeighted && (
        <text
          x={textPosX}
          y={textPosY}
          className='unselectable'
          fill={currentEdge && currentEdge.id === id ? '#3F72AF' : 'black'}
          transform={`rotate(${rotateTextAngle} ${textPosX} ${textPosY}) 
          translate(${translateTextDistance} ${liftDistance})`}
        >
          {weight}
        </text>
      )}
      {isDirected && (
        <path
          d={`M ${position.x2} ${position.y2} L ${position.x2 + 6} ${position.y2 + 20} 
          L ${position.x2 - 6} ${position.y2 + 20} Z`}
          transform={`rotate(${(isCurved ? angle : alfa) + 90} ${position.x2} ${position.y2}) translate(0 18)`}
          fill={currentEdge && currentEdge === id ? '#3F72AF' : 'black'}
        />
      )}
    </g>
  );
}
