import React from 'react';

export default function PrimPseudocode({ focusCodeLine }) {
  function highlight(id) {
    return { backgroundColor: focusCodeLine === id ? '#06121f' : '' };
  }
  return (
    <ol className='pseudocode'>
      <li className='tab1'>
        <strong>for</strong> each vertex u &#8712; G:V &minus; &#123;s&#125;
      </li>
      <li className='tab2'>cost[u] = &infin;</li>
      <li className='tab1'>cost[s] = 0</li>
      <li className='tab1'>ENQUEUE(Q,s)</li>
      <li className='tab1'>
        <strong>while</strong> (Q not empty)
      </li>
      <li className='tab2'>u ← vertex in Q with min cost[u]</li>
      <li className='tab2'>remove u from Q</li>
      <li className='tab2'>
        <strong>if</strong> node u is not in tree
      </li>
      <li className='tab3' style={highlight(9)}>
        <strong>add</strong> node u to tree
      </li>
      <li className='tab3'>
        <strong>for</strong> each v &#8712; G.Adj[u]
      </li>
      <li className='tab4'>
        <strong>if</strong> ( cost[v] &#60; w[u][v] )
      </li>
      <li className='tab5'>cost[v] = w[u][v]</li>
      <li className='tab5'>ENQUEUE(Q,v)</li>
    </ol>
  );
}
