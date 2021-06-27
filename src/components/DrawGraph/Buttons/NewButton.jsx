import React from 'react';
import RestoreIcon from '@material-ui/icons/Restore';

export default function NewButton({ setGraph }) {
  return (
    <div className='draw-graph-button' onClick={() => setGraph({ topNode: 0, topEdge: 0, nodes: {}, edges: {} })}>
      <h3>New</h3>
      <RestoreIcon fontSize='inherit' />
    </div>
  );
}
