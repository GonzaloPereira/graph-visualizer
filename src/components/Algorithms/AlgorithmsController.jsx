import React from 'react';
import BfsController from './BFS/BfsController';
import DijkstraController from './Dijkstra/DijkstraController';
import DfsController from './DFS/DfsController';
import TopsortController from './Topsort/TopsortController';
import BellmanfordController from './Bellmanford/BellmanfordController';
import KruskalController from './Kruskal/KruskalController';
import PrimController from './Prim/PrimController';
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
      case 'Topological sort':
        return <TopsortController {...props} />;
      case 'Bellman-Ford algorithm':
        return <BellmanfordController {...props} />;
      case 'Kruskal':
        return <KruskalController {...props} />;
      case 'Prim':
        return <PrimController {...props} />;
      default:
        return;
    }
  }
  return <div className='algorithm'>{getAlgorithm(props.currentAlgorithm)}</div>;
}
