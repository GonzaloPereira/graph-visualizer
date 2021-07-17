import React from 'react';
import SubMenu from './SubMenu';
import './Menu.css';

export default function Menu({ setCurrentAlgorithm }) {
  const algorithms = [
    ['Elementary Graph Algorithms', ['Breadth-first search', 'Depth-first search', 'Topological sort']],
    ['Single-Source Shortest Paths', ['Breadth-first search', 'Dijkstra’s algorithm', 'Bellman-Ford algorithm']],
    ['Minimum Spanning Trees', ['Kruskal', 'Prim']],
    ['All-Pairs Shortest Paths', ['Floyd-Warshall algorithm']],
    ['Maximum Flow', ['Ford-Fulkerson', 'Maximum bipartite matching']],
  ];
  return (
    <div className='menu'>
      <h2>Algorithms</h2>
      {/* Elementary Graph Algorithms */}
      <SubMenu title={algorithms[0][0]} list={algorithms[0][1]} setCurrentAlgorithm={setCurrentAlgorithm} />
      {/* Minimum Spanning Trees */}
      <SubMenu title={algorithms[1][0]} list={algorithms[1][1]} setCurrentAlgorithm={setCurrentAlgorithm} />
      {/* Single-Source Shortest Paths */}
      <SubMenu title={algorithms[2][0]} list={algorithms[2][1]} setCurrentAlgorithm={setCurrentAlgorithm} />
      {/* All-Pairs Shortest Paths */}
      <SubMenu title={algorithms[3][0]} list={algorithms[3][1]} setCurrentAlgorithm={setCurrentAlgorithm} />
      {/* Maximum Flow */}
      <SubMenu title={algorithms[4][0]} list={algorithms[4][1]} setCurrentAlgorithm={setCurrentAlgorithm} />
    </div>
  );
}
