class QElement {
  constructor(id, cost) {
    this.id = id;
    this.cost = cost;
  }
}
class PriorityQueue {
  constructor() {
    this.items = [];
  }
  enqueue(id, cost) {
    let qElement = new QElement(id, cost);
    let contain = false;

    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].cost > qElement.cost) {
        this.items.splice(i, 0, qElement);
        contain = true;
        break;
      }
    }

    if (!contain) {
      this.items.push(qElement);
    }
  }
  pop() {
    return this.items.shift();
  }
  front() {
    // returns the lowest distance element
    return this.items[0];
  }
  isEmpty() {
    return this.items.length === 0;
  }
}
const { delay, getAdj } = require('../Extra/Extra.js');

export async function Prim(graphData, source, vizNode, vizEdge, setFocusCodeLine, delayTime, setIsPlaying, printLog, setTag) {
  const topNode = graphData.topNode;
  const edges = Object.values(graphData.edges);
  const isDirected = graphData.isDirected;
  const isWeighted = graphData.isWeighted;
  const adj = getAdj(topNode, edges, isDirected, isWeighted);

  // Prim starts here
  printLog('Prim algorithm:');
  await delay(50);

  const cost = []; // Array of distances
  const Q = new PriorityQueue(); // Priority queue
  const P = []; // Parents
  const contains = [];
  let totalWeight = 0;
  for (let i = 0; i < topNode; i++) {
    cost.push(Number.MAX_VALUE);
    P.push(null);
    contains.push(false);
  }

  Q.enqueue(source, 0);
  cost[source] = 0;

  while (!Q.isEmpty()) {
    const { id: u, cost: currentCost } = Q.front();
    Q.pop();
    if (contains[u]) continue;
    contains[u] = true;
    totalWeight += currentCost;

    //Visualization
    setFocusCodeLine();
    await delay(delayTime / 5);
    vizNode(u, 'blue');
    vizEdge(P[u], u, 'blue');
    printLog(`Add ${u} to spanning tree`);
    setFocusCodeLine(9);
    await delay(delayTime);

    for (let i = 0; i < adj[u].length; i++) {
      const { v, w } = adj[u][i];
      if (!contains[v] && cost[v] > w) {
        cost[v] = w;
        P[v] = u;
        Q.enqueue(v, w);
      }
    }
  }

  printLog(`Minimum spanning tree found: Total weight = ${totalWeight}`);
  setIsPlaying(false);
}
