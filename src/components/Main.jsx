import React, { useState, useReducer, useRef, useEffect, useCallback } from 'react';
import DrawGraph from './DrawGraph/DrawGraph';
import SelectGraph from './SelectGraph/SelectGraph';
import Node from './Canvas/Node';
import Edge from './Canvas/Edge';
import Menu from './Menu/Menu';
import Footer from './Footer';
import Reproductor from './Reproductor/Reproductor';
import AlgorithmsController from './Algorithms/AlgorithmsController';
import LogData from './LogData/LogData';
import Header from './Header/Header';
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
  const [showSelectGraph, setShowSelectGraph] = useState(false);
  const blankGraph = useRef({ topNode: 0, topEdge: 0, isWeighted: false, isDirected: false, nodes: {}, edges: {} });
  const [graphData, setGraphData] = useState(blankGraph.current);

  const [currentAlgorithm, setCurrentAlgorithm] = useState();

  // Visualization states
  const blankVizData = useRef({ nodes: {}, edges: {} });
  const [vizData, updateVizData] = useReducer(vizDataReducer, blankVizData.current);
  const [speed, setSpeed] = useState(600);
  const [isPlaying, setIsPlaying] = useState(false);
  function vizNode(id, highlightId) {
    updateVizData({
      name: 'node',
      value: { id: id, highlightId: highlightId },
    });
  }
  function vizEdge(u, v, highlightId, isDirected) {
    vizEdgeDirected(u, v, highlightId);
    if (!isDirected) vizEdgeDirected(v, u, highlightId);
  }
  function vizEdgeDirected(u, v, highlightId) {
    const edge = findEdgeId(u, v);
    if (edge !== undefined) {
      updateVizData({
        name: 'edge',
        value: { id: edge, highlightId: highlightId },
      });
    }
  }
  function findEdgeId(u, v) {
    return Object.keys(graphData.edges).find(
      (id) => Number(graphData.edges[id].u) === Number(u) && Number(graphData.edges[id].v) === Number(v)
    );
  }
  // Canvas positioning
  const canvasRef = useRef();
  const [addPos, setAddPos] = useState({ x: 0, y: 0 });
  const canvasWidth = canvasRef.current ? canvasRef.current.getBoundingClientRect().width : 900;
  const canvasHeight = canvasRef.current ? canvasRef.current.getBoundingClientRect().height : 500;
  useEffect(() => {
    setAddPos({ x: (canvasWidth - 900) / 2, y: (canvasHeight - 500) / 2 });
  }, [canvasWidth, canvasHeight]);

  // Logdata states
  const [logdata, setLogData] = useState([]);
  function printLog(line) {
    setLogData((prevState) => prevState.concat(line));
  }
  // Tags for nodes
  const [tagData, setTagData] = useState({});
  function setTag(node, tag) {
    setTagData((prev) => {
      return { ...prev, [node]: tag };
    });
  }
  // Reset visualization
  const resetViz = useCallback(() => {
    setLogData([]);
    setTagData({});
    updateVizData({
      name: 'reset',
      value: blankVizData.current,
    });
  }, []);
  useEffect(() => {
    if (isPlaying) {
      resetViz();
    }
  }, [isPlaying, resetViz]);
  return (
    <>
      <main>
        <Header setShowDrawGraph={setShowDrawGraph} setShowSelectGraph={setShowSelectGraph} />
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
                  tag={tagData[idx]}
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
          delayTime={1000 - speed}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          printLog={printLog}
          setTag={setTag}
        />
        <Reproductor speed={speed} setSpeed={setSpeed} />
        <LogData logdata={logdata} />
        <Footer />
      </main>
      {showSelectGraph && (
        <SelectGraph
          sendGraph={setGraphData}
          close={() => {
            setShowSelectGraph(false);
            resetViz();
          }}
        />
      )}
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
