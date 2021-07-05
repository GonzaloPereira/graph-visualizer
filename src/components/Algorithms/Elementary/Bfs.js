const { delay, getAdj } = require('../Extra/Common.js');

export async function Bfs(graphData, source, vizNode, vizEdge, setFocusCodeLine) {
  const topNode = graphData.topNode;
  const edges = Object.values(graphData.edges);
  const isDirected = graphData.isDirected;
  const adj = getAdj(topNode, edges, isDirected);

  // BFS starts here
  const D = []; // Array of distances
  const Q = []; // Queue
  for (let i = 0; i < topNode; i++) {
    D.push(Number.MAX_VALUE);
    adj.push([]);
  }
  Q.push(source);
  D[source] = 0;
  setFocusCodeLine(4);
  await delay(500);
  while (Q.length > 0) {
    const u = Q[0];
    Q.shift();
    vizNode(u, 2);
    setFocusCodeLine(6);
    await delay(500);
    for (let i = 0; i < adj[u].length; i++) {
      const v = adj[u][i];
      if (D[u] + 1 < D[v]) {
        D[v] = D[u] + 1;
        Q.push(v);
        vizEdge(u, v, 1);
        if (!isDirected) vizEdge(v, u, 1);
        vizNode(v, 1);
        setFocusCodeLine(9);
        await delay(500);
        setFocusCodeLine();
        await delay(100);
      }
    }
    vizNode(u, 1);
    setFocusCodeLine();
    await delay(100);
  }
}
