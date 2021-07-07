import React, { useState, useReducer, useRef, useEffect } from 'react';
import DrawGraph from './DrawGraph/DrawGraph';
import Node from './Canvas/Node';
import Edge from './Canvas/Edge';
import Menu from './Menu/Menu';
import Footer from './Footer';
import Reproductor from './Reproductor';
import AlgorithmsController from './Algorithms/AlgorithmsController';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import './Main.css';

function vizDataReducer(state, event) {
  switch (event.name) {
    case 'node':
      return { ...state, nodes: { ...state.nodes, [event.value.id]: event.value.highlightId } };
    case 'edge':
      return { ...state, edges: { ...state.edges, [event.value.id]: event.value.highlightId } };
    case 'reset':
      return event.value;
    default:
      throw new Error();
  }
}

export default function Main() {
  const [showDrawGraph, setShowDrawGraph] = useState(false);
  const blankGraph = { topNode: 0, topEdge: 0, isWeighted: false, isDirected: false, nodes: {}, edges: {} };
  const [graphData, setGraphData] = useState(blankGraph);
  const blankVizData = { nodes: {}, edges: {} };
  const [vizData, updateVizData] = useReducer(vizDataReducer, blankVizData);
  const [currentAlgorithm, setCurrentAlgorithm] = useState('');
  const [speed, setSpeed] = useState(500);
  function vizNode(id, highlightId) {
    updateVizData({
      name: 'node',
      value: { id: id, highlightId: highlightId },
    });
  }
  function vizEdge(u, v, highlightId) {
    const edge = findEdgeId(u, v);
    if (edge !== undefined) {
      updateVizData({
        name: 'edge',
        value: { id: edge, highlightId: highlightId },
      });
    }
  }
  function resetViz() {
    updateVizData({
      name: 'reset',
      value: blankVizData,
    });
  }
  function findEdgeId(u, v) {
    return Object.keys(graphData.edges).find(
      (id) => Number(graphData.edges[id].u) === Number(u) && Number(graphData.edges[id].v) === Number(v)
    );
  }
  const canvasRef = useRef();
  const [addPos, setAddPos] = useState({ x: 0, y: 0 });
  const canvasWidth = canvasRef.current ? canvasRef.current.getBoundingClientRect().width : 900;
  const canvasHeight = canvasRef.current ? canvasRef.current.getBoundingClientRect().height : 500;

  useEffect(() => {
    setAddPos({ x: (canvasWidth - 900) / 2, y: (canvasHeight - 500) / 2 });
  }, [canvasWidth, canvasHeight]);
  return (
    <>
      <main>
        <div className='header'>
          <h1>Graph Visualizer</h1>
        </div>

        <Menu setCurrentAlgorithm={setCurrentAlgorithm} />
        <div className='canvas' ref={canvasRef}>
          <svg>
            {Object.entries(graphData.edges).map((element) => {
              const idx = element[0];
              const edge = element[1];
              return (
                <Edge
                  key={idx}
                  id={idx}
                  edge={edge}
                  position={{
                    x1: graphData.nodes[edge.u].x + addPos.x,
                    y1: graphData.nodes[edge.u].y + addPos.y,
                    x2: graphData.nodes[edge.v].x + addPos.x,
                    y2: graphData.nodes[edge.v].y + addPos.y,
                  }}
                  isWeighted={graphData.isWeighted}
                  isDirected={graphData.isDirected}
                  isCurved={findEdgeId(edge.v, edge.u) !== undefined}
                  highlight={vizData.edges[idx]}
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
                  position={{ x: node.x + addPos.x, y: node.y + addPos.y }}
                  highlight={vizData.nodes[idx]}
                />
              );
            })}
          </svg>
        </div>
        <AlgorithmsController
          currentAlgorithm={currentAlgorithm}
          vizNode={vizNode}
          vizEdge={vizEdge}
          graphData={graphData}
          resetViz={resetViz}
          delayTime={1000 - speed}
        />
        <Reproductor speed={speed} setSpeed={setSpeed} />
        <div className='logdata'>Log Data</div>
        <div className='draw-graph-area'>
          <div onClick={() => setShowDrawGraph(true)}>
            <h2>Draw graph</h2>
            <ArrowForwardIosIcon style={{ fontSize: '1rem', marginTop: '0.1rem' }} />
          </div>
        </div>
        <Footer />
      </main>
      {showDrawGraph && (
        <DrawGraph
          currentGraph={graphData}
          sendGraph={setGraphData}
          close={() => {
            setShowDrawGraph(false);
            resetViz();
          }}
        />
      )}
    </>
  );
}
