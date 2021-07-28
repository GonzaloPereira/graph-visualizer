import React, { useState } from 'react';
import BackButton from './Buttons/BackButton';
import SelectButton from './Buttons/SelectButton';
import Card from './Card';
import { graphList } from './graphList.js';
import './SelectGraph.css';

export default function SelectGraph({ close, sendGraph }) {
  const [graphData, setGraphData] = useState(null);
  const [current, setCurrent] = useState(null);
  return (
    <div className='popup-out'>
      <div className='select-graph popup-in'>
        <h2>Graph Examples</h2>
        <div className='card-container'>
          {graphList.map((graph, idx) => {
            return (
              <Card graphData={graph} id={idx} selected={idx === current} setCurrent={setCurrent} setGraphData={setGraphData} />
            );
          })}
        </div>
        <BackButton close={close} />
        <SelectButton
          finish={() => {
            if (graphData) sendGraph(graphData);
            close();
          }}
        />
      </div>
    </div>
  );
}
