import React from 'react';

export default function BfsPseudocode({ focusCodeLine }) {
  function highlight(id) {
    return { backgroundColor: focusCodeLine === id ? '#06121f' : '' };
  }
  return (
    // <ol className='pseudocode'>
    //   <li className='tab1'>
    //     <strong>for</strong> each vertex u &#8712; G:V &minus; &#123;s&#125;
    //   </li>
    //   <li className='tab2'>d[u] = &infin;</li>
    //   <li className='tab1'>d[s] = 0</li>
    //   <li className='tab1' style={highlight(4)}>
    //     ENQUEUE(Q,s)
    //   </li>
    //   <li className='tab1'>
    //     <strong>while</strong> (Q not empty)
    //   </li>
    //   <li className='tab2' style={highlight(6)}>
    //     u = DEQUEUE(Q)
    //   </li>
    //   <li className='tab2'>
    //     <strong>for</strong> each v &#8712; G.Adj[u]
    //   </li>
    //   <li className='tab3'>
    //     <strong>if</strong> (d[v] == &infin;)
    //   </li>
    //   <li className='tab4' style={highlight(9)}>
    //     d[v] = d[u] + 1
    //   </li>
    //   <li className='tab4' style={highlight(9)}>
    //     ENQUEUE(Q,v)
    //   </li>
    // </ol>
    <ol className='pseudocode'>
      <li className='tab1'>
        <strong>for</strong> each vertex u &#8712; G:V &minus; &#123;s&#125;
      </li>
      <li className='tab2'>d[u] = &infin;</li>
      <li className='tab1'>d[s] = 0</li>
      <li className='tab1'>
        <strong>repeat</strong> |V|-1 <strong>times:</strong>
      </li>
      <li className='tab2'>
        <strong>for</strong> each edge (u,v,w)
      </li>
      <li className='tab3' style={highlight(6)}>
        <strong>if</strong> ( d[u] + w &#60; d[v] )
      </li>
      <li className='tab4' style={highlight(6)}>
        d[v] = d[u] + w
      </li>
      <li className='tab1'>
        <strong>for</strong> each edge (u,v,w)
      </li>
      <li className='tab2' style={highlight(9)}>
        <strong>if</strong> ( d[u] + w &#60; d[v] )
      </li>
      <li className='tab3' style={highlight(9)}>
        <strong>Negative-weight cycle</strong>
      </li>
    </ol>
  );
}
