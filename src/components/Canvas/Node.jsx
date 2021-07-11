import React, { useRef } from 'react';

export default function Node({ position, id, highlight, tag }) {
  function color() {
    switch (highlight) {
      case 1:
        return '#39A2DB'; // blue
      case 2:
        return 'red';
      case 3:
        return '#79D70F'; // green
      case 4:
        return 'yellow';
      default:
        return 'white';
    }
  }
  const tagRef = useRef();
  const backWidth = tagRef.current ? tagRef.current.getBoundingClientRect().width : 0;
  return (
    <g transform={`translate(${position.x},${position.y})`}>
      <circle r='20' fill={color()} stroke='black' strokeWidth='4px'></circle>
      <text x={-4.5 * (1 + (id > 9))} className='unselectable' y='5' fill='black'>
        {Number(id)}
      </text>
      {tag !== undefined && (
        <>
          <rect width={backWidth + 10} height='26' x='-5' y='-50' fill='#DBE2EF' rx='10' ry='10' />
          <text ref={tagRef} x='0' y='-31' className='unselectable' fill='black'>
            {tag}
          </text>
        </>
      )}
    </g>
  );
}
