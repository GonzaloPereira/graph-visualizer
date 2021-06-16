import React, { useState, useReducer, useRef } from 'react';
import Node from './Node';
import Edge from './Edge';
import './Canvas.css';

function dataReducer(state, event) {
  switch (event.name) {
    case 'add-node':
      return { ...state, nodes: { ...state.nodes, [event.value.id]: event.value.node } };
    case 'add-edge':
      return { ...state, edges: { ...state.edges, [event.value.id]: event.value.edge } };
    case 'delete-node':
      delete state.nodes[event.value];
      return state;
    case 'delete-edge':
      delete state.edges[event.value];
      return state;
    default:
      throw new Error();
  }
}
export default function Canvas() {
  const [graphData, updateGraphData] = useReducer(dataReducer, { nodes: {}, edges: {} });
  const [currentNode, setCurrentNode] = useState(null);
  const [currentEdge, setCurrentEdge] = useState(null);
  const [vector, setVector] = useState({ x: 0, y: 0 });
  const numNodes = useRef(0);
  const numEdges = useRef(0);

  function createNode(posX, posY) {
    updateGraphData({
      name: 'add-node',
      value: { id: numNodes.current++, node: { x: posX, y: posY } },
    });
  }
  function createEdge(first, second) {
    updateGraphData({
      name: 'add-edge',
      value: { id: numEdges.current++, edge: { u: first, v: second, w: 1 } },
    });
  }
  function deleteNode(id) {
    Object.entries(graphData.edges).forEach((element) => {
      const key = element[0];
      const edge = element[1];
      if (edge.u === id || edge.v === id) deleteEdge(key);
    });
    updateGraphData({
      name: 'delete-node',
      value: id,
    });
  }
  function deleteEdge(id) {
    updateGraphData({
      name: 'delete-edge',
      value: id,
    });
  }
  function handleClickNode(id) {
    if (currentNode == null) {
      setCurrentNode(id);
      setCurrentEdge(null);
    } else {
      createEdge(currentNode, id);
      setCurrentNode(null);
    }
  }
  function handleClickEdge(id) {
    setCurrentEdge(id);
    setCurrentNode(null);
  }
  return (
    <div
      className='draw-graph'
      onMouseDown={(event) => {
        if (currentNode == null) createNode(event.nativeEvent.offsetX, event.nativeEvent.offsetY);
        else setCurrentNode(null);
        setCurrentEdge(null);
      }}
      onMouseMove={(event) => {
        setVector({
          x: event.nativeEvent.offsetX,
          y: event.nativeEvent.offsetY,
        });
      }}
      onKeyDown={(event) => {
        if (String(event.code) !== 'Delete') return;
        if (currentEdge != null) deleteEdge(currentEdge);
        if (currentNode != null) deleteNode(currentNode);
        setCurrentNode(null);
        setCurrentEdge(null);
      }}
      tabIndex='0'
    >
      <svg style={{ width: '100%', height: '100%' }}>
        {currentNode != null && (
          <line
            x1={graphData.nodes[currentNode].x}
            y1={graphData.nodes[currentNode].y}
            x2={vector.x}
            y2={vector.y}
            stroke='black'
            strokeWidth='3px'
          />
        )}
        {Object.entries(graphData.edges).map((element) => {
          const idx = element[0];
          const edge = element[1];
          return (
            <Edge
              key={idx}
              id={idx}
              position={{
                x1: graphData.nodes[edge.u].x,
                y1: graphData.nodes[edge.u].y,
                x2: graphData.nodes[edge.v].x,
                y2: graphData.nodes[edge.v].y,
              }}
              currentEdge={currentEdge}
              handleClick={handleClickEdge}
            />
          );
        })}
        {Object.entries(graphData.nodes).map((element) => {
          const idx = element[0];
          const node = element[1];
          return <Node key={idx} id={idx} position={node} handleClick={handleClickNode} currentNode={currentNode} />;
        })}
      </svg>
    </div>
  );
}
