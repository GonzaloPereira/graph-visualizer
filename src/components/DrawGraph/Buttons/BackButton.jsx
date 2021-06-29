import React from 'react';
import BackspaceIcon from '@material-ui/icons/Backspace';

export default function Back({ close }) {
  return (
    <div className='draw-graph-button' onClick={close}>
      <BackspaceIcon fontSize='inherit' />
      <h3>Back</h3>
    </div>
  );
}
