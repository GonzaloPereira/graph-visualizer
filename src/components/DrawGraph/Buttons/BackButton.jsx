import React from 'react';
import BackspaceIcon from '@material-ui/icons/Backspace';

export default function Back() {
  return (
    <div className='draw-graph-button'>
      <BackspaceIcon fontSize='inherit' />
      <h3>Back</h3>
    </div>
  );
}
