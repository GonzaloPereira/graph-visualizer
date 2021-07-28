import React from 'react';
import CardEdge from './CardEdge';
import CardNode from './CardNode';

export default function Card({ id, graphData, selected, setCurrent, setGraphData }) {
  function findEdgeId(u, v) {
    return Object.keys(graphData.edges).find(
      (id) => Number(graphData.edges[id].u) === Number(u) && Number(graphData.edges[id].v) === Number(v)
    );
  }
  function select() {
    setCurrent(id);
    setGraphData(graphData);
  }
  const selectedStyle = { border: selected ? 'solid #F54748 3px' : '' };
  return (
    <div className='card' onClick={select} style={selectedStyle}>
      <svg>
        {Object.entries(graphData.edges).map((element) => {
          const idx = element[0];
          const edge = element[1];
          return (
            <CardEdge
              key={idx}
              id={idx}
              edge={edge}
              position={{
                x1: graphData.nodes[edge.u].x,
                y1: graphData.nodes[edge.u].y,
                x2: graphData.nodes[edge.v].x,
                y2: graphData.nodes[edge.v].y,
              }}
              isWeighted={graphData.isWeighted}
              isDirected={graphData.isDirected}
              isCurved={findEdgeId(edge.v, edge.u) !== undefined}
            />
          );
        })}
        {Object.entries(graphData.nodes).map((element) => {
          const idx = element[0];
          const node = element[1];
          return <CardNode key={idx} id={idx} position={{ x: node.x, y: node.y }} />;
        })}
      </svg>
    </div>
  );
}
