import React from 'react';
import { BFS } from './Elementary/BFS';

export default function AlgorithmsController({ currentAlgorithm, vizNode, vizEdge, graphData, resetViz }) {
  return (
    <div className='algorithm'>
      <h3
        onClick={() => {
          resetViz();
          BFS(graphData, 0, vizNode, vizEdge);
        }}
      >
        {currentAlgorithm}
      </h3>
    </div>
  );
}
