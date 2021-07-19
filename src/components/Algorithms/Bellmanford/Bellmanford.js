const { delay } = require('../Extra/Extra.js');

export async function Bellmanford(
  graphData,
  source,
  vizNode,
  vizEdge,
  setFocusCodeLine,
  delayTime,
  setIsPlaying,
  printLog,
  setTag,
  hasNegaCycle
) {
  const topNode = graphData.topNode;
  const isDirected = graphData.isDirected;
  const edges = Object.values(graphData.edges).map(({ u, v, w }) => {
    return { u: Number(u), v: Number(v), w: Number(w) };
  });

  // Bellmanford starts here
  printLog('Bellman-Ford:');
  await delay(50);

  const D = []; // Distance
  const P = []; // Parents
  const cntNodes = Object.keys(graphData.nodes).length; // Number of nodes

  for (let i = 0; i < topNode; i++) {
    D[i] = Number.MAX_VALUE;
    P[i] = null;

    //Visualization
    setTag(i, '∞');
  }

  D[source] = 0;
  setTag(source, '0');

  for (let i = 0; i < cntNodes - 1; i++) {
    for (let j = 0; j < edges.length; j++) {
      const { u, v, w } = edges[j];
      //Visualization
      vizEdge(u, v, 'red', isDirected);
      setFocusCodeLine();

      await checkEdge(u, v, w);
      if (!isDirected) await checkEdge(v, u, w);

      //Visualization
      await delay(delayTime);
      if (P[v] === u || (!isDirected && P[u] === v)) {
        vizNode(u, 'blue');
        vizNode(v, 'blue');
        vizEdge(u, v, 'blue', isDirected);
      } else vizEdge(u, v, 'black', isDirected);
    }
  }
  for (let i = 0; i < edges.length; i++) {
    const { u, v, w } = edges[i];
    if (D[u] + w < D[v] || (!isDirected && D[v] + w < D[u])) {
      hasNegaCycle();

      //Visualization
      setFocusCodeLine(9);
      printLog(`Graph has negative-weight cycle`);
      break;
    }
  }
  setIsPlaying(false);

  async function checkEdge(u, v, w) {
    if (D[u] + w < D[v]) {
      //Visualization
      vizEdge(P[v], v, 'black', isDirected);

      D[v] = D[u] + w;
      P[v] = u;

      //Visualization
      setTag(v, D[v]);
      vizNode(u, 'green');
      vizNode(v, 'green');
      vizEdge(u, v, 'green', isDirected);
      printLog(`Relaxed distance of node ${v} with edge ${u}->${v} : New distance D[${v}] = ${D[v]}`);
      setFocusCodeLine();
      await delay(delayTime / 5);
      setFocusCodeLine(6);
    }
  }
}
