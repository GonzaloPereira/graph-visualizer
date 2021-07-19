const { delay } = require('../Extra/Extra.js');

export async function Kruskal(graphData, vizNode, vizEdge, setFocusCodeLine, delayTime, setIsPlaying, printLog) {
  const topNode = graphData.topNode;
  const isDirected = graphData.isDirected;
  const edges = Object.values(graphData.edges).map(({ u, v, w }) => {
    return { u: Number(u), v: Number(v), w: Number(w) };
  });

  // Kruskal starts here
  printLog('Kruskal: ');
  await delay(50);

  const size = []; //Sizes of components
  const P = []; //Parents of nodes

  for (let i = 0; i < topNode; i++) {
    P.push(i);
  }

  edges.sort((firstEdge, secondEdge) => firstEdge.w - secondEdge.w);
  let totalWeight = 0;
  let components = Object.keys(graphData.nodes).length;
  for (let i = 0; i < edges.length; i++) {
    const { u, v, w } = edges[i];

    if (find(u) === find(v)) {
      vizEdge(u, v, 'red', isDirected);
      printLog(`${u} and ${v} are already connected`);
      setFocusCodeLine();
      await delay(delayTime / 5);
      vizEdge(u, v, 'black', isDirected);
    } else {
      totalWeight += w;
      components--;

      //Visualization
      vizNode(u, 'blue');
      vizNode(v, 'blue');
      vizEdge(u, v, 'blue', isDirected);
      printLog(`Join ${u} and ${v}`);
      setFocusCodeLine();
      await delay(delayTime / 5);
      setFocusCodeLine(5);
    }
    union(find(u), find(v));

    await delay(delayTime);
  }
  if (components > 1) printLog(`Minimum spanning forest found: Total weight = ${totalWeight} -> Number of Trees = ${components}`);
  else printLog(`Minimum spanning tree found: Total weight = ${totalWeight}`);

  setIsPlaying(false);

  function find(u) {
    if (P[u] === u) return u;
    return (P[u] = find(P[u]));
  }
  function union(u, v) {
    if (P[u] === P[v]) return;
    if (size[u] < size[v]) [u, v] = [v, u];
    P[v] = u;
    size[u] += size[v];
  }
}
