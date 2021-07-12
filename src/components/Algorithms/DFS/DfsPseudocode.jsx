import React from 'react';

export default function BfsPseudocode({ focusCodeLine }) {
  function highlight(id) {
    return { backgroundColor: focusCodeLine === id ? '#06121f' : '' };
  }
  return (
    <ol className='pseudocode'>
      <li className='tab1'>Recursive Dfs: Call DFS(s)</li>
      <li className='tab1'>
        <strong>function</strong> DFS(u) &#123;
      </li>
      <li className='tab2' style={highlight(3)}>
        <strong>if</strong> ( u is visited )
      </li>
      <li className='tab3' style={highlight(3)}>
        <strong>return</strong>
      </li>
      <li className='tab2' style={highlight(5)}>
        visit[u] = 1
      </li>
      <li className='tab2'>
        <strong>for</strong> each v &#8712; G.Adj[u]
      </li>
      <li className='tab3' style={highlight(7)}>
        DFS(v)
      </li>
      <li className='tab1'>&#125;</li>
    </ol>
  );
}
