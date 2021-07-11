import React from 'react';

export default function DijkstraPseudocode({ focusCodeLine }) {
  function highlight(id) {
    return { backgroundColor: focusCodeLine === id ? '#06121f' : '' };
  }
  return (
    <ol className='pseudocode'>
      <li className='tab1'>for each vertex u &#8712; G:V &minus; &#123;s&#125;</li>
      <li className='tab2'>d[u] = &infin;</li>
      <li className='tab1'>d[s] = 0</li>
      <li className='tab1' style={highlight(4)}>
        ENQUEUE(Q,s)
      </li>
      <li className='tab1'>while (Q not empty) &#123;</li>
      <li className='tab2' style={highlight(6)}>
        u ← vertex in Q with min dist[u]
      </li>
      <li className='tab2'>remove u from Q</li>
      <li className='tab2'>for each v &#8712; G.Adj[u] &#123;</li>
      <li className='tab3'>if (d[u] + w[u][v] &#60; d[v]) &#123;</li>
      <li className='tab4' style={highlight(10)}>
        d[v] = d[u] + w[u][v]
      </li>
      <li className='tab4' style={highlight(10)}>
        ENQUEUE(Q,v)
      </li>
      <li className='tab3'>&#125;</li>
      <li className='tab2'>&#125;</li>
      <li className='tab1'>&#125;</li>
    </ol>
  );
}
