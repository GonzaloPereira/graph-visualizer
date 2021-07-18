class QElement {
  constructor(id, distance) {
    this.id = id;
    this.distance = distance;
  }
}
class PriorityQueue {
  constructor() {
    this.items = [];
  }
  enqueue(id, distance) {
    let qElement = new QElement(id, distance);
    let contain = false;

    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].distance > qElement.distance) {
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

export async function Dijkstra(graphData, source, vizNode, vizEdge, setFocusCodeLine, delayTime, setIsPlaying, printLog, setTag) {
  const topNode = graphData.topNode;
  const edges = Object.values(graphData.edges);
  const isDirected = graphData.isDirected;
  const isWeighted = graphData.isWeighted;
  const adj = getAdj(topNode, edges, isDirected, isWeighted);

  // Dijkstra starts here
  printLog('Dijkstra’s algorithm:');
  await delay(50);

  const D = []; // Array of distances
  const Q = new PriorityQueue(); // Priority queue
  const P = []; // Parents
  for (let i = 0; i < topNode; i++) {
    D.push(Number.MAX_VALUE);
    P.push(-1);

    //Visualization
    setTag(i, '∞');
  }

  Q.enqueue(source, 0);
  D[source] = 0;

  //Visualization
  setTag(source, 0);
  setFocusCodeLine(4);
  await delay(delayTime);

  while (!Q.isEmpty()) {
    const { id: u, distance: qDistance } = Q.front();
    Q.pop();
    if (qDistance > D[u]) continue;

    // Visualization
    printLog(`Found minimum distance from ${source} to ${u} ->  D[${u}] = ${D[u]}`);
    vizEdge(P[u], u, 1);
    vizNode(u, 4);
    setFocusCodeLine(6);
    await delay(delayTime);

    for (let i = 0; i < adj[u].length; i++) {
      const { v, w } = adj[u][i];

      if (P[u] === v) continue;

      if (D[u] + w < D[v]) {
        D[v] = D[u] + w;
        P[v] = u;
        Q.enqueue(v, D[v]);

        // Visualization code
        setTag(v, D[v]);
        printLog(`Relaxed distance of node ${v} with node ${u}: New distance ${D[v]}`);
        vizEdge(u, v, 3, isDirected);
        vizNode(v, 3);
        setFocusCodeLine(10);
        await delay(delayTime);
        vizNode(v, 0);
        setFocusCodeLine();
        await delay(delayTime / 5);
        vizEdge(u, v, 0, isDirected);
      } else {
        // Visualization code
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
