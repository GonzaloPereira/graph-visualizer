const { delay, getAdj } = require('../Extra/Extra.js');

export async function Topsort(
  graphData,
  vizNode,
  vizEdge,
  setFocusCodeLine,
  delayTime,
  setIsPlaying,
  printLog,
  setTag,
  isNotDag
) {
  const topNode = graphData.topNode;
  const edges = Object.values(graphData.edges);
  const isDirected = graphData.isDirected;
  const adj = getAdj(topNode, edges, isDirected, false);

  // Topsort starts here
  await delay(50);
  printLog('Topological sort:');

  const color = []; // Visited
  const topSort = [];
  let stop = false;
  let time = Object.keys(graphData.nodes).length - 1;
  for (let i = 0; i < topNode; i++) {
    color.push(0);
  }
  color[0] = 0;

  for (let i = 0; i < topNode; i++) {
    await DfsCall(i);
  }

  async function DfsCall(u, parent) {
    if (stop) return;
    if (color[u] === 2) {
      return;
    }
    if (color[u] === 1) {
      stop = true;

      //Visualization
      isNotDag();
      printLog('Graph is not a DAG');
      printLog('Topological sort not possible');
      vizEdge(parent, u, 2, isDirected);
      setFocusCodeLine(6);
      return;
    }
    color[u] = 1;

    //Visualization
    printLog(`Temporary mark on ${u}`);
    vizNode(u, 3);
    vizEdge(parent, u, 3, isDirected);
    setFocusCodeLine(8);
    await delay(delayTime);

    for (let i = 0; i < adj[u].length; i++) {
      const v = adj[u][i];

      if (color[v] === 2) {
        //Visualization
        vizEdge(u, v, 2, isDirected);
        setFocusCodeLine(4);
        await delay(delayTime);
        vizEdge(u, v, 0, isDirected);
      }
      //Visualization
      setFocusCodeLine(10);
      await delay(delayTime / 5);

      await DfsCall(v, u);
      if (stop) return;
    }
    color[u] = 2;
    topSort.unshift(u);

    //Visualization
    setTag(u, time--);
    printLog(`Permanent mark on ${u}`);
    printLog(`Current Topological sort: ${topSort}`);
    vizNode(u, 1);
    vizEdge(parent, u, 1, isDirected);
    setFocusCodeLine(11);
    await delay(delayTime);
    setFocusCodeLine();
    await delay(delayTime / 5);
  }
  if (!stop) {
    printLog(`Final topological sort: ${topSort} (One possible sort)`);
  }
  setIsPlaying(false);
}
