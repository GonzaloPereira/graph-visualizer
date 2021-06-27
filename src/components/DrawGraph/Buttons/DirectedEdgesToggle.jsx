import React from 'react';
import Switch from '@material-ui/core/Switch';

export default function DirectedEdgesToggle({ isDirected, setIsDirected }) {
  return (
    <div className='draw-graph-checkbox grid-right'>
      <h3>Directed edges</h3>
      <Switch
        checked={isDirected}
        onChange={(e) => {
          setIsDirected(e.target.checked);
        }}
        color='secondary'
      />
    </div>
  );
}
