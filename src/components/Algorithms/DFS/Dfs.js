const { delay, getAdj } = require('../Extra/Extra.js');

export async function Dfs(graphData, source, vizNode, vizEdge, setFocusCodeLine, delayTime, setIsPlaying, printLog, setTag) {
  const topNode = graphData.topNode;
  const edges = Object.values(graphData.edges);
  const isDirected = graphData.isDirected;
  const isWeighted = graphData.isWeighted;
  const adj = getAdj(topNode, edges, isDirected, isWeighted);

  // DFS starts here
  await delay(50);
  printLog('Depth-first search:');

  const visit = []; // Visited
  const P = []; // Parents
  for (let i = 0; i < topNode; i++) {
    P.push(-1);
    visit.push(false);
  }
  printLog(`Start at node ${source}`);
  visit[0] = true;
  DfsCall(source);

  async function DfsCall(u) {
    for (let i = 0; i < adj[u].length; i++) {
      const v = adj[u][i];
      if (visit[v] === false) {
        //Visualization
        printLog(`Node ${v} visited`);
        vizNode(u, 1);
        vizNode(v, 4);
        vizEdge(u, v, 1, isDirected);
        await delay(delayTime);
        vizNode(v, 1);

        visit[v] = true;
        await DfsCall(v);
      }
    }
  }
  setIsPlaying(false);
}
