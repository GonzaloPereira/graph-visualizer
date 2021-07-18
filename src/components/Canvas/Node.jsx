import React, { useRef } from 'react';

export default function Node({ position, id, highlight, tag }) {
  function color() {
    switch (highlight) {
      case 'blue':
        return '#39A2DB'; // blue
      case 'red':
        return 'red';
      case 'green':
        return '#79D70F'; // green
      case 'yellow':
        return 'yellow';
      case 'white':
        return 'white';
      default:
        return 'white';
    }
  }
  function colortag() {
    switch (highlight) {
      case 1:
        return 'blue'; // blue
      case 2:
        return 'red';
      case 3:
        return 'green'; // green
      case 4:
        return 'blue';
      default:
        return 'black';
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
          <text ref={tagRef} x='0' y='-31' className='unselectable' fill={colortag()}>
            {tag}
          </text>
        </>
      )}
    </g>
  );
}
