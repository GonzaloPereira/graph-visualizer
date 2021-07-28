import React from 'react';

export default function SelectButton({ finish }) {
  return (
    <div className='select-graph-button' onClick={finish}>
      <h3>Select</h3>
    </div>
  );
}
