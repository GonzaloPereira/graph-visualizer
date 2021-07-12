import React from 'react';

export default function TopsortPseudocode({ focusCodeLine }) {
  function highlight(id) {
    return { backgroundColor: focusCodeLine === id ? '#06121f' : '' };
  }
  return (
    <ol className='pseudocode'>
      <li className='tab1'>
        <strong>for</strong> each vertex u &#8712; G:V
      </li>
      <li className='tab2'>DFS(u)</li>
      <li className='tab1'>
        <strong>function</strong> DFS(u) &#123;
      </li>
      <li className='tab2' style={highlight(4)}>
        <strong>if</strong> u has <strong>permanent</strong> mark
      </li>
      <li className='tab3' style={highlight(4)}>
        <strong>return</strong>
      </li>
      <li className='tab2' style={highlight(6)}>
        <strong>if</strong> u has <strong>temporary</strong> mark
      </li>
      <li className='tab3' style={highlight(6)}>
        G is not a DAG <strong>(STOP)</strong>
      </li>

      <li className='tab2' style={highlight(8)}>
        <strong>temporary</strong> mark on u
      </li>
      <li className='tab2'>
        <strong>for</strong> each v &#8712; G.Adj[u]
      </li>
      <li className='tab3' style={highlight(10)}>
        DFS(v)
      </li>
      <li className='tab2' style={highlight(11)}>
        <strong>permanent</strong> mark on u
      </li>
      <li className='tab2' style={highlight(11)}>
        add u to head of List
      </li>
      <li className='tab1'>&#125;</li>
    </ol>
  );
}
