import React, { useState, useReducer } from "react";
import Node from "./Node";
import "./Canvas.css";

function dataReducer(state, event) {
  switch (event.name) {
    case "nodes":
      return { ...state, nodes: [...state.nodes, event.value] };
    case "edges":
      return { ...state, edges: [...state.edges, event.value] };
    default:
      throw new Error();
  }
}
export default function Canvas() {
  const [graphData, updateGraphData] = useReducer(dataReducer, { nodes: [], edges: [] });
  const [currentNode, setCurrentNode] = useState(null);
  const [vector, setVector] = useState({ x: 0, y: 0 });

  function createNode(posX, posY) {
    updateGraphData({
      name: "nodes",
      value: { x: posX, y: posY },
    });
  }
  function createEdge(first, second) {
    console.log("Creating...");
    updateGraphData({
      name: "edges",
      value: { u: first, v: second, w: 1 },
    });
    setCurrentNode(null);
  }
  console.log(graphData);
  return (
    <div
      className="draw-graph"
      onClick={(event) => {
        if (currentNode == null) createNode(event.nativeEvent.offsetX, event.nativeEvent.offsetY);
        else setCurrentNode(null);
      }}
      onMouseMove={(event) => {
        setVector({
          x: event.nativeEvent.offsetX,
          y: event.nativeEvent.offsetY,
        });
      }}
    >
      <svg style={{ width: "100%", height: "100%" }}>
        {currentNode != null && (
          <line
            x1={graphData.nodes[currentNode].x}
            y1={graphData.nodes[currentNode].y}
            x2={vector.x}
            y2={vector.y}
            stroke="black"
            strokeWidth="3px"
          />
        )}
        {graphData.edges.map((edge, idx) => (
          <line
            key={idx}
            x1={graphData.nodes[edge.u].x}
            y1={graphData.nodes[edge.u].y}
            x2={graphData.nodes[edge.v].x}
            y2={graphData.nodes[edge.v].y}
            stroke="black"
            strokeWidth="3px"
          />
        ))}
        {graphData.nodes.map((node, idx) => (
          <Node
            key={idx}
            id={idx}
            position={node}
            currentNode={currentNode}
            setCurrentNode={setCurrentNode}
            createEdge={createEdge}
          />
        ))}
      </svg>
    </div>
  );
}
