import React, { useState } from 'react';
import { Dijkstra } from './Dijkstra';
import DijkstraPseudocode from './DijkstraPseudocode';
import NodeSelector from '../Extra/NodeSelector';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
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
    setIsPlaying(true);
    Dijkstra(graphData, source, vizNode, vizEdge, setFocusCodeLine, delayTime, setIsPlaying, printLog, setTag);
  }
  return (
    <div className='controller'>
      <h3>{currentAlgorithm}</h3>
      <DijkstraPseudocode focusCodeLine={focusCodeLine} />
      <NodeSelector nodes={Object.keys(graphData.nodes)} source={source} setSource={setSource} />
      <div className='play-button' onClick={handleClick}>
        <h2>Play!</h2>
        <PlayArrowIcon style={{ fontSize: '1rem', marginTop: '0.1rem' }} />
      </div>
      <SnackbarAlert openError={openError} setOpenError={setOpenError} error={error} />
    </div>
  );
}
