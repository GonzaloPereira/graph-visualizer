import React, { useState } from 'react';
import NodeSelector from '../Extra/NodeSelector';
import BfsPseudocode from './BfsPseudocode';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SnackbarAlert from '../../Common/SnackbarAlert';
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
  printLog,
}) {
  const [source, setSource] = useState();
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
    setIsPlaying(true);
    resetViz();
    Bfs(graphData, source, vizNode, vizEdge, setFocusCodeLine, delayTime, setIsPlaying, printLog);
  }

  return (
    <div className='controller'>
      <h3>{currentAlgorithm}</h3>
      <BfsPseudocode focusCodeLine={focusCodeLine} />
      <NodeSelector nodes={Object.keys(graphData.nodes)} source={source} setSource={setSource} />
      <div className='play-button' onClick={handleClick}>
        <h2>Play!</h2>
        <PlayArrowIcon style={{ fontSize: '1rem', marginTop: '0.1rem' }} />
      </div>
      <SnackbarAlert openError={openError} setOpenError={setOpenError} error={error} />
      <a href='https://en.wikipedia.org/wiki/Breadth-first_search' target='_blank' rel='noreferrer'>
        Algorithm info
      </a>
    </div>
  );
}
