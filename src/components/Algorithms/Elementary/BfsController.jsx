import React, { useState } from 'react';
import NodeSelector from '../Extra/NodeSelector';
import BfsPseudocode from './BfsPseudocode';
import { Bfs } from './Bfs';

export default function BFSController({ currentAlgorithm, graphData, vizNode, vizEdge, resetViz }) {
  const [source, setSource] = useState(0);
  const [focusCodeLine, setFocusCodeLine] = useState();

  return (
    <div className='controller'>
      <h3
        onClick={() => {
          resetViz();
          Bfs(graphData, source, vizNode, vizEdge, setFocusCodeLine);
        }}
      >
        {currentAlgorithm}
      </h3>
      <BfsPseudocode focusCodeLine={focusCodeLine} />
      <NodeSelector nodes={Object.keys(graphData.nodes)} source={source} setSource={setSource} />
    </div>
  );
}
