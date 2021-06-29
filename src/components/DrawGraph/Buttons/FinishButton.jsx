import React from 'react';

export default function FinishButton({ finish }) {
  return (
    <div className='draw-graph-button' onClick={finish}>
      <h3>Finish</h3>
    </div>
  );
}
