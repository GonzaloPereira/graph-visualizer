import React, { useState } from 'react';
import { Dijkstra } from './Dijkstra';
import DijkstraPseudocode from './DijkstraPseudocode';
import NodeSelector from '../Extra/NodeSelector';
import PlayButton from '../Extra/PlayButton';
import SnackbarAlert from '../../Common/SnackbarAlert';

export default function DijkstraController({
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
    if (source === '') {
      setOpenError(true);
      setError('Please select source');
      return;
    }
    if (!graphData.isWeighted) {
      setOpenError(true);
      setError('Graph should be weighted for this algorithm');
      return;
    }
    if (negativeEdges()) {
      setOpenError(true);
      setError('Graph should not have negative weights for this algorithm');
      return;
    }
    setIsPlaying(true);
    Dijkstra(graphData, Number(source), vizNode, vizEdge, setFocusCodeLine, delayTime, setIsPlaying, printLog, setTag);
  }
  function negativeEdges() {
    let ret = false;
    Object.values(graphData.edges).forEach(({ w }) => {
      if (w < 0) ret = true;
    });
    return ret;
  }
  return (
    <div className='controller'>
      <h3>{currentAlgorithm}</h3>
      <DijkstraPseudocode focusCodeLine={focusCodeLine} />
      <NodeSelector nodes={Object.keys(graphData.nodes)} source={source} setSource={setSource} />
      <PlayButton handleClick={handleClick} />
      <SnackbarAlert openError={openError} setOpenError={setOpenError} error={error} />
    </div>
  );
}
