import React from 'react';
import EditIcon from '@material-ui/icons/Edit';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import './Header.css';

export default function Header({ setShowDrawGraph, setShowSelectGraph }) {
  return (
    <div className='header'>
      <h1 className='header-title'>Graph Algorithms Visualizer</h1>
      <div className='header-button-container'>
        <div className='header-button' onClick={() => setShowSelectGraph(true)}>
          <h2>Select graph</h2>
          <ArrowForwardIosIcon style={{ fontSize: '1rem', marginTop: '0.1rem' }} />
        </div>
        <div className='header-button' onClick={() => setShowDrawGraph(true)}>
          <h2>Draw graph</h2>
          <EditIcon style={{ fontSize: '1.2rem', marginTop: '0.1rem' }} />
        </div>
      </div>
    </div>
  );
}
