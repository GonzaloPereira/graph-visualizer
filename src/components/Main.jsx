import React, { useState } from 'react';
import DrawGraph from './DrawGraph/DrawGraph';
import Node from './Canvas/Node';
import Edge from './Canvas/Edge';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import './Main.css';

export default function Main() {
  const [showDrawGraph, setShowDrawGraph] = useState(false);
  const blankGraph = { topNode: 0, topEdge: 0, isWeighted: false, isDirected: false, nodes: {}, edges: {} };
  const [graphData, setGraphData] = useState(blankGraph);

  //Set to check if an edge between u,v exists
  const [edgesSet, setEdgesSet] = useState(() => new Set());
  function addToSet(item) {
    setEdgesSet((prev) => new Set(prev).add(item));
  }

  function updateGraph(newGraphData) {
    setGraphData(newGraphData);
    edgesSet.clear();
    Object.values(newGraphData.edges).forEach((edge) => {
      addToSet(JSON.stringify([edge.u, edge.v]));
    });
  }
  return (
    <>
      <main>
        <div className='header'>
          <h1>Graph Visualizer</h1>
        </div>
        <div className='draw-graph-area'>
          <div onClick={() => setShowDrawGraph(true)}>
            <h2>Draw graph</h2>
            <ArrowForwardIosIcon style={{ fontSize: '1rem', marginTop: '0.1rem' }} />
          </div>
        </div>
        <div className='algorithms'>Algorithms choose</div>
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
                  isCurved={edgesSet.has(JSON.stringify([edge.v, edge.u]))}
                />
              );
            })}
            {Object.entries(graphData.nodes).map((element) => {
              const idx = element[0];
              const node = element[1];
              return <Node key={idx} id={idx} position={node} />;
            })}
          </svg>
        </div>
        <div className='pseudocode'>PseudoCode</div>
        <div className='reproductor'>Reproductor</div>
        <div className='options-title'>Options title</div>
        <div className='logdata'>Log Data</div>
        <div className='options-panel'>Options panel</div>
        <div className='footer'>
          Copyright © 2021 <br />
          Gonzalo Pereira
        </div>
      </main>
      {showDrawGraph && <DrawGraph currentGraph={graphData} sendGraph={updateGraph} close={() => setShowDrawGraph(false)} />}
    </>
  );
}
