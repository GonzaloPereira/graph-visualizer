import React from 'react';

export default function KruskalPseudocode({ focusCodeLine }) {
  function highlight(id) {
    return { backgroundColor: focusCodeLine === id ? '#06121f' : '' };
  }
  return (
    <ol className='pseudocode'>
      <li className='tab1'>
        <strong>for</strong> each vertex u &#8712; G:V &minus; &#123;s&#125;
      </li>
      <li className='tab2'>MAKE-SET(v)</li>
      <li className='tab1'>
        <strong>sort</strong> edges by <strong>weight</strong>
      </li>
      <li className='tab1'>
        <strong>for</strong> each edge (u,v)
      </li>
      <li className='tab2' style={highlight(5)}>
        <strong>if </strong> FIND(u) ≠ FIND(v)
      </li>
      <li className='tab3' style={highlight(5)}>
        UNION(SET(u), SET(v))
      </li>
    </ol>
  );
}
