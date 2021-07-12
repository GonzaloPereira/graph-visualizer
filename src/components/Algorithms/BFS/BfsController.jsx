import React, { useState } from 'react';
import { Bfs } from './Bfs';
import BfsPseudocode from './BfsPseudocode';
import NodeSelector from '../Extra/NodeSelector';
import PlayButton from '../Extra/PlayButton';
import SnackbarAlert from '../../Common/SnackbarAlert';

export default function BfsController({
  currentAlgorithm,
  graphData,
  vizNode,
  vizEdge,
  delayTime,
  isPlaying,
  setIsPlaying,
  printLog,
  setTag,
}) {
  const [source, setSource] = useState('');
  const [focusCodeLine, setFocusCodeLine] = useState();
  // Errors
  const [openError, setOpenError] = useState(false);
  const [error, setError] = useState();
  const isBlank = Object.keys(graphData.nodes).length === 0;
  function handleClick() {
    if (isPlaying) {
      setOpenError(true);
      setError('Wait until the visualization is finished');
      return;
    }
    if (isBlank) {
      setOpenError(true);
      setError('Please select or draw a graph first');
      return;
    }
    if (!source) {
      setOpenError(true);
      setError('Please select source');
      return;
    }
    if (graphData.isWeighted) {
      setOpenError(true);
      setError('Graph should not be weighted for this algorithm');
      return;
    }
    setIsPlaying(true);
    Bfs(graphData, source, vizNode, vizEdge, setFocusCodeLine, delayTime, setIsPlaying, printLog, setTag);
  }

  return (
    <div className='controller'>
      <h3>{currentAlgorithm}</h3>
      <BfsPseudocode focusCodeLine={focusCodeLine} />
      <NodeSelector nodes={Object.keys(graphData.nodes)} source={source} setSource={setSource} />
      <PlayButton handleClick={handleClick} />
      <SnackbarAlert openError={openError} setOpenError={setOpenError} error={error} />
    </div>
  );
}
