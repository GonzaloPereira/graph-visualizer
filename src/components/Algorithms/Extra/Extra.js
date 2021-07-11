export async function delay(ms) {
  return new Promise((res) => setTimeout(res, ms));
}

export function getAdj(topNode, edges, isDirected, isWeighted) {
  const adj = [];
  for (let i = 0; i < topNode; i++) {
    adj.push([]);
  }
  if (isWeighted) {
    edges.forEach(({ u, v, w }) => {
      adj[Number(u)].push({ v: Number(v), w: Number(w) });
      if (!isDirected) adj[Number(v)].push({ v: Number(u), w: Number(w) });
    });
  } else {
    edges.forEach(({ u, v }) => {
      adj[Number(u)].push(Number(v));
      if (!isDirected) adj[Number(v)].push(Number(u));
    });
  }
  return adj;
}
