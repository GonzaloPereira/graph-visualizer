import React from 'react';

export default function BfsPseudocode({ focusCodeLine }) {
  function highlight(id) {
    return { backgroundColor: focusCodeLine === id ? '#06121f' : '' };
  }
  return (
    <ol className='pseudocode'>
      <li className='tab1'>Recursive Dfs: Call DFS(s)</li>
      <li className='tab1'> DFS(u) &#123;</li>
      <li className='tab2'>for each v &#8712; G.Adj[u] &#123;</li>
      <li className='tab3'>if (v is not visited) &#123;</li>
      <li className='tab4' style={highlight(9)}>
        DFS(v)
      </li>
      <li className='tab3'>&#125;</li>
      <li className='tab2'>&#125;</li>
      <li className='tab1'>&#125;</li>
    </ol>
  );
}
