import React from 'react';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

export default function DrawGraphButton({ setShowDrawGraph }) {
  return (
    <div className='draw-graph-area'>
      <div onClick={() => setShowDrawGraph(true)}>
        <h2>Draw graph</h2>
        <ArrowForwardIosIcon style={{ fontSize: '1rem', marginTop: '0.1rem' }} />
      </div>
    </div>
  );
}
