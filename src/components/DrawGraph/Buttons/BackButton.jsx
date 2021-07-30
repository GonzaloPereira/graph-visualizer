import React from 'react';
import BackspaceIcon from '@material-ui/icons/Backspace';

export default function Back({ close }) {
  return (
    <div className='draw-graph-button' onClick={close}>
      <BackspaceIcon style={{ fontSize: '1rem', marginTop: '0.15rem' }} />
      <h3>Back</h3>
    </div>
  );
}
