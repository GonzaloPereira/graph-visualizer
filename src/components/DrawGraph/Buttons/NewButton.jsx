import React from 'react';
import RestoreIcon from '@material-ui/icons/Restore';

export default function NewButton({ resetGraph }) {
  return (
    <div className='draw-graph-button' onClick={resetGraph}>
      <h3>New</h3>
      <RestoreIcon fontSize='inherit' />
    </div>
  );
}
