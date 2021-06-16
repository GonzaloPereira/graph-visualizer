import React from "react";

export default function Node({ position, id, currentNode, setCurrentNode, createEdge }) {
  function handleClick(e) {
    e.stopPropagation();
    if (currentNode == null) setCurrentNode(id);
    else createEdge(currentNode, id);
  }
  return (
    <g transform={`translate(${position.x},${position.y})`} onClick={handleClick}>
      <circle r="20" fill={currentNode === id ? "yellow" : "white"} stroke="black" strokeWidth="4px"></circle>
      <text x={-4.5 * (1 + (id >= 9))} className="unselectable" y="5" fill="black">
        {Number(id) + 1}
      </text>
    </g>
  );
}
