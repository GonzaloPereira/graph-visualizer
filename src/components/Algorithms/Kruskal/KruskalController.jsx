import React, { useState } from 'react';
import { Kruskal } from './Kruskal';
import KruskalPseudocode from './KruskalPseudocode';
import PlayButton from '../Extra/PlayButton';
import SnackbarAlert from '../../Common/SnackbarAlert';

export default function KruskalController({
  currentAlgorithm,
  graphData,
  vizNode,
  vizEdge,
  delayTime,
  isPlaying,
  setIsPlaying,
  printLog,
}) {
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
    if (!graphData.isWeighted) {
      setOpenError(true);
      setError('Graph should be weighted for this algorithm');
      return;
    }
    if (graphData.isDirected) {
      setOpenError(true);
      setError('Graph should not be directed for this algorithm');
      return;
    }
    setIsPlaying(true);
    Kruskal(graphData, vizNode, vizEdge, setFocusCodeLine, delayTime, setIsPlaying, printLog);
  }
  return (
    <div className='controller'>
      <h3>{currentAlgorithm}</h3>
      <KruskalPseudocode focusCodeLine={focusCodeLine} />
      <PlayButton handleClick={handleClick} />
      <SnackbarAlert openError={openError} setOpenError={setOpenError} error={error} />
    </div>
  );
}
