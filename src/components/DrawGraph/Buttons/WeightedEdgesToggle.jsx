import React from 'react';
import Switch from '@material-ui/core/Switch';

export default function WeightedEdgesToggle({ isWeighted, setIsWeighted }) {
  return (
    <div className='draw-graph-checkbox grid-left'>
      <h3>Weighted edges</h3>
      <Switch
        checked={isWeighted}
        onChange={(e) => {
          setIsWeighted(e.target.checked);
        }}
        color='secondary'
      />
    </div>
  );
}
