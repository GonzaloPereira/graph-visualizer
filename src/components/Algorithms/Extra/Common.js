exports.delay = async (ms) => new Promise((res) => setTimeout(res, ms));

exports.getAdj = (topNode, edges, isDirected) => {
  const adj = [];
  for (let i = 0; i < topNode; i++) {
    adj.push([]);
  }
  for (let i = 0; i < edges.length; i++) {
    adj[Number(edges[i].u)].push(Number(edges[i].v));
    if (!isDirected) adj[Number(edges[i].v)].push(Number(edges[i].u));
  }
  return adj;
};
