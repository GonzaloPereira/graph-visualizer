import React from 'react';

export default function Instructions() {
  return (
    <ul className='instructions'>
      <h2>Instructions</h2>
      <li>Click in an empty space to create a node</li>
      <li>Click a node and then click another to create an edge</li>
      <li>Drag nodes by pressing and releasing</li>
      <li>Click a node or an edge and then press "Delete" to remove them</li>
      <li>Double click an edge to change its weight (if weights are activated)</li>
    </ul>
  );
}
