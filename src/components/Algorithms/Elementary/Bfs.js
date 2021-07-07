const { delay, getAdj } = require('../Extra/Common.js');

export async function Bfs(graphData, source, vizNode, vizEdge, setFocusCodeLine, delayTime) {
  const topNode = graphData.topNode;
  const edges = Object.values(graphData.edges);
  const isDirected = graphData.isDirected;
  const adj = getAdj(topNode, edges, isDirected);

  // BFS starts here
  const D = []; // Array of distances
  const Q = []; // Queue
  const P = []; // Parents
  for (let i = 0; i < topNode; i++) {
    D.push(Number.MAX_VALUE);
    P.push(-1);
    adj.push([]);
  }
  Q.push(source);
  D[source] = 0;
  setFocusCodeLine(4);
  await delay(delayTime);
  while (Q.length > 0) {
    const u = Q[0];
    Q.shift();

    // Visualization code
    vizNode(u, 2);
    setFocusCodeLine(6);
    await delay(delayTime);

    for (let i = 0; i < adj[u].length; i++) {
      const v = adj[u][i];
      if (P[u] === v) continue;

      if (D[v] === Number.MAX_VALUE) {
        D[v] = D[u] + 1;
        P[v] = Number(u);
        Q.push(v);

        // Visualization code
        vizEdge(u, v, 1);
        if (!isDirected) vizEdge(v, u, 1);
        vizNode(v, 1);
        setFocusCodeLine(9);
        await delay(delayTime);
        setFocusCodeLine();
        await delay(delayTime / 5);
      } else {
        // Visualization code
        vizEdge(u, v, 2);
        if (!isDirected) vizEdge(v, u, 2);
        setFocusCodeLine();
        await delay(delayTime);
        vizEdge(u, v, 0);
        if (!isDirected) vizEdge(v, u, 0);
      }
    }
    vizNode(u, 1);
    setFocusCodeLine();
    await delay(delayTime / 5);
  }
}
