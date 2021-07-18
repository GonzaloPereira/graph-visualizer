const { delay, getAdj } = require('../Extra/Extra.js');

export async function Dfs(graphData, source, vizNode, vizEdge, setFocusCodeLine, delayTime, setIsPlaying, printLog, setTag) {
  const topNode = graphData.topNode;
  const edges = Object.values(graphData.edges);
  const isDirected = graphData.isDirected;
  const adj = getAdj(topNode, edges, isDirected, false);

  // DFS starts here
  printLog('Depth-first search:');
  await delay(50);

  const visit = []; // Visited
  for (let i = 0; i < topNode; i++) {
    visit.push(false);
  }
  printLog(`Start at node ${source}`);
  DfsCall(source, -1);

  async function DfsCall(u, parent) {
    if (visit[u]) {
      return;
    }
    visit[u] = true;

    // Visualization
    printLog(`Node ${u} visited`);
    vizEdge(parent, u, 'blue', isDirected);
    vizNode(u, 'yellow');
    setFocusCodeLine(5);
    await delay(delayTime);
    vizNode(u, 'blue');
    setFocusCodeLine();
    await delay(delayTime / 5);

    for (let i = 0; i < adj[u].length; i++) {
      const v = adj[u][i];
      if (v === parent) continue;
      if (visit[v]) {
        //Visualization
        vizEdge(u, v, 'red', isDirected);
        setFocusCodeLine(3);
        await delay(delayTime);
        vizEdge(u, v, 'black', isDirected);
      }
      //Visualization
      setFocusCodeLine(7);
      await delay(delayTime / 5);

      await DfsCall(v, u);
    }
  }
  setIsPlaying(false);
}
