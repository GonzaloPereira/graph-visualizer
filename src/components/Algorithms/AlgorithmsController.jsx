import React from 'react';
import BfsController from './BFS/BfsController';
import DijkstraController from './Dijkstra/DijkstraController';
import DfsController from './DFS/DfsController';
import './AlgorithmsController.css';

export default function AlgorithmsController(props) {
  function getAlgorithm(currentAlgorithm) {
    switch (currentAlgorithm) {
      case 'Breadth-first search':
        return <BfsController {...props} />;
      case 'Dijkstra’s algorithm':
        return <DijkstraController {...props} />;
      case 'Depth-first search':
        return <DfsController {...props} />;
      default:
        return;
    }
  }
  return <div className='algorithm'>{getAlgorithm(props.currentAlgorithm)}</div>;
}
