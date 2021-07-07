import React, { useState, useEffect } from 'react';
import NodeSelector from '../Extra/NodeSelector';
import BfsPseudocode from './BfsPseudocode';
import { Bfs } from './Bfs';

export default function BFSController({
  currentAlgorithm,
  graphData,
  vizNode,
  vizEdge,
  resetViz,
  delayTime,
  isPlaying,
  setIsPlaying,
}) {
  const [source, setSource] = useState(0);
  const [focusCodeLine, setFocusCodeLine] = useState();

  useEffect(() => {
    if (isPlaying) {
      resetViz();
      Bfs(graphData, source, vizNode, vizEdge, setFocusCodeLine, delayTime, setIsPlaying);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlaying]);

  return (
    <div className='controller'>
      <h3>{currentAlgorithm}</h3>
      <BfsPseudocode focusCodeLine={focusCodeLine} />
      <NodeSelector nodes={Object.keys(graphData.nodes)} source={source} setSource={setSource} />
    </div>
  );
}
