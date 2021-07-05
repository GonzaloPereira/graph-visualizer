import React from 'react';
import BfsController from './Elementary/BfsController';
import './AlgorithmsController.css';

export default function AlgorithmsController(props) {
  function getAlgorithm(currentAlgorithm) {
    switch (currentAlgorithm) {
      case 'Breadth-first search':
        return <BfsController {...props} />;
      default:
        return;
    }
  }
  return <div className='algorithm'>{getAlgorithm(props.currentAlgorithm)}</div>;
}
