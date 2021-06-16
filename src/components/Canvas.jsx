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
  const [edgeVector, setEdgeVector] = useState({ x: 0, y: 0 });
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
  function handleClickEdge(id) {
    setCurrentEdge(id);
    setCurrentNode(null);
  }
  // Drag and drop functionality
  const dragTimeoutId = useRef('');
  const [isDragging, setIsDragging] = useState(false);

  function handleMouseUpNode() {
    if (isDragging) {
      DropNode();
    } else {
      clearTimeout(dragTimeoutId.current);
    }
  }
  function handleClickNode(id) {
    if (currentNode == null) {
      setCurrentNode(id);
      setCurrentEdge(null);
      dragTimeoutId.current = setTimeout(() => {
        setIsDragging(true);
      }, 100);
    } else {
      createEdge(currentNode, id);
      setCurrentNode(null);
    }
  }
  function DragNode(posX, posY) {
    updateGraphData({
      name: 'add-node',
      value: { id: currentNode, node: { x: posX, y: posY } },
    });
  }
  function DropNode() {
    setCurrentNode(null);
    setIsDragging(false);
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
        if (isDragging) {
          DragNode(event.nativeEvent.offsetX, event.nativeEvent.offsetY);
        } else {
          setEdgeVector({
            x: event.nativeEvent.offsetX,
            y: event.nativeEvent.offsetY,
          });
        }
      }}
      onMouseUp={handleMouseUpNode}
      onKeyDown={(event) => {
        console.log(event.code);
        if (event.code === 'Escape') {
          setCurrentNode(null);
          setCurrentEdge(null);
        }
        if (event.code === 'Delete') {
          if (currentEdge != null) deleteEdge(currentEdge);
          if (currentNode != null) deleteNode(currentNode);
          setCurrentNode(null);
          setCurrentEdge(null);
        }
      }}
      tabIndex='0'
    >
      <svg style={{ width: '100%', height: '100%' }}>
        {currentNode != null && isDragging === false && (
          <line
            x1={graphData.nodes[currentNode].x}
            y1={graphData.nodes[currentNode].y}
            x2={edgeVector.x}
            y2={edgeVector.y}
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
          return (
            <Node
              key={idx}
              id={idx}
              position={node}
              handleClick={handleClickNode}
              currentNode={currentNode}
              isDragged={isDragging && idx === currentNode}
            />
          );
        })}
      </svg>
    </div>
  );
}
