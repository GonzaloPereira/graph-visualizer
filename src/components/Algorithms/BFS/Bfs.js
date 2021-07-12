const { delay, getAdj } = require('../Extra/Extra.js');

export async function Bfs(graphData, source, vizNode, vizEdge, setFocusCodeLine, delayTime, setIsPlaying, printLog, setTag) {
  const topNode = graphData.topNode;
  const edges = Object.values(graphData.edges);
  const isDirected = graphData.isDirected;
  const isWeighted = graphData.isWeighted;
  const adj = getAdj(topNode, edges, isDirected, isWeighted);

  // BFS starts here
  printLog('Breadth-first search:');
  await delay(50);

  const D = []; // Array of distances
  const Q = []; // Queue
  const P = []; // Parents
  for (let i = 0; i < topNode; i++) {
    D.push(Number.MAX_VALUE);
    P.push(-1);

    //Visualization
    setTag(i, '∞');
  }
  Q.push(source);
  D[source] = 0;
  console.log(adj);

  //Visualization
  setTag(source, 0);
  printLog(`Minimum distance from ${source} to ${source} ->  D[${source}] = ${D[source]}`);
  setFocusCodeLine(4);
  await delay(delayTime);

  while (Q.length > 0) {
    const u = Q[0];
    Q.shift();

    // Visualization
    vizNode(u, 4);
    setFocusCodeLine(6);
    await delay(delayTime);

    for (let i = 0; i < adj[u].length; i++) {
      const v = adj[u][i];
      if (P[u] === v) continue;

      if (D[v] === Number.MAX_VALUE) {
        D[v] = D[u] + 1;
        P[v] = Number(u);
        Q.push(v);

        // Visualization
        setTag(v, D[v]);
        printLog(`Minimum distance from ${source} to ${v} ->  D[${v}] = ${D[v]}`);
        vizEdge(u, v, 1, isDirected);
        vizNode(v, 1);
        setFocusCodeLine(9);
        await delay(delayTime);
        setFocusCodeLine();
        await delay(delayTime / 5);
      } else {
        // Visualization
        vizEdge(u, v, 2, isDirected);
        setFocusCodeLine();
        await delay(delayTime);
        vizEdge(u, v, 0, isDirected);
      }
    }
    vizNode(u, 1);
    setFocusCodeLine();
    await delay(delayTime / 5);
  }
  setIsPlaying(false);
}
