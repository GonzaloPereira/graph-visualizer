const delay = async (ms) => new Promise((res) => setTimeout(res, ms));
export async function BFS(graphData, source, vizNode, vizEdge) {
  const nodes = Object.keys(graphData.nodes);
  const edges = Object.values(graphData.edges);
  const isDirected = graphData.isDirected;
  const adj = []; // Adjacency list
  // Initialize adjancency list
  for (let i = 0; i < nodes.length; i++) {
    adj.push([]);
  }
  for (let i = 0; i < edges.length; i++) {
    adj[Number(edges[i].u)].push(Number(edges[i].v));
    if (!isDirected) adj[Number(edges[i].v)].push(Number(edges[i].u));
  }

  // BFS starts here
  const D = []; // Array of distances
  const Q = []; // Queue
  for (let i = 0; i < nodes.length; i++) {
    D.push(Number.MAX_VALUE);
    adj.push([]);
  }
  Q.push(source);
  D[source] = 0;
  await delay(500);
  while (Q.length > 0) {
    const u = Q[0];
    Q.shift();
    vizNode(u, 1);
    await delay(200);
    for (let i = 0; i < adj[u].length; i++) {
      const v = adj[u][i];
      if (D[u] + 1 < D[v]) {
        D[v] = D[u] + 1;
        Q.push(v);
        vizEdge(u, v, 1);
        if (!isDirected) vizEdge(v, u, 1);
        vizNode(v, 1);
        await delay(500);
      }
    }
  }
}
