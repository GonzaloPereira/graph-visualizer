import React, { useState, useReducer } from 'react';
import DrawGraph from './DrawGraph/DrawGraph';
import Node from './Canvas/Node';
import Edge from './Canvas/Edge';
import Menu from './Menu/Menu';
import Footer from './Footer';
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
  return (
    <>
      <main>
        <div className='header'>
          <h1>Graph Visualizer</h1>
        </div>

        <Menu setCurrentAlgorithm={setCurrentAlgorithm} />
        <div className='canvas'>
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
                    x1: graphData.nodes[edge.u].x,
                    y1: graphData.nodes[edge.u].y,
                    x2: graphData.nodes[edge.v].x,
                    y2: graphData.nodes[edge.v].y,
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
              return <Node key={idx} id={idx} position={node} highlight={vizData.nodes[idx]} />;
            })}
          </svg>
        </div>
        <AlgorithmsController
          currentAlgorithm={currentAlgorithm}
          vizNode={vizNode}
          vizEdge={vizEdge}
          graphData={graphData}
          resetViz={resetViz}
        />
        <div className='reproductor'>Reproductor</div>
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
