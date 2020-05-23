class ValuePair {
    constructor(key, value) {
        this.key = key;
        this.value = value;
    }

    toString() {
        return `[#${key}:${value}]`;
    }
}

class Dictionary {
    constructor() {
        this.table = {};
    }

    hasKey(key) {
        return this.table[key] != null;
    }

    set(key, value) {
        if (key != null && value != null) {
            this.table[key] = new ValuePair(key, value);
            return true;
        }

        return false;
    }

    remove(key) {
        if (this.hasKey(key)) {
            delete this.table[key];
            return true;
        }

        return false;
    }

    get(key) {
        const valuePair = this.table[key];
        return valuePair == null ? undefined : valuePair.value;
    }

    keyValues() {
        return Object.values(this.table);
    }

    keys() {
        return this.keyValues().map(valuePair => valuePair.key);
    }

    values() {
        return this.keyValues.map(valuePair => valuePair.value);
    }

    forEach(callbackFn) {
        const valuePairs = this.keyValues();
        for (let i = 0; i < valuePairs.length; i++) {
            const result = callbackFn(valuePairs[i].key, valuePairs[i].value);
            if (result === false) {
                break;
            }
        }
    }

    size() {
        return Object.keys(this.table).length;
    }

    isEmpty() {
        return this.size() === 0;
    }

    clear() {
        this.table = {};
    }

    toString() {
        if (this.isEmpty()) {
            return '';
        }

        const valuePairs = this.keyValues();
        let objString = valuePairs[0].toString();
        for (let i = 1; i < valuePairs.length; i++) {
            objString = `${objString},${valuePairs[i].toString()}`;
        }
        return objString;
    }
}

class Graph {
    constructor(isDirected = false) {
        this.isDirected = isDirected;
        this.vertices = [];
        this.adjList = new Dictionary();
    }

    addVertex(v) {
        if (!this.vertices.includes(v)) {
            this.vertices.push(v);
            this.adjList.set(v, []);
        }
    }

    addEdge(v, w) {
        if (!this.adjList.hasKey(v)) {
            this.addVertex(v);
        }

        if (!this.adjList.hasKey(w)) {
            this.addVertex(w);
        }

        this.adjList.get(v).push(w);
        if (!this.isDirected) {
            this.adjList.get(w).push(v);
        }
    }

    getVertices() {
        return this.vertices;
    }

    getAdjList() {
        return this.adjList;
    }

    toString() {
        return this.vertices.map(v => {
            return `${v} -> ${this.adjList.get(v).join(' ')}`
        }).join('\n');
    }
}

const graph = new Graph();
const myVertices = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];

myVertices.forEach(v => graph.addVertex(v));
graph.addEdge('A', 'B');
graph.addEdge('A', 'C');
graph.addEdge('A', 'D');
graph.addEdge('B', 'E');
graph.addEdge('B', 'F');
graph.addEdge('C', 'D');
graph.addEdge('C', 'G');
graph.addEdge('D', 'G');
graph.addEdge('D', 'H');
graph.addEdge('E', 'I');

// console.log(graph.toString());

class Queue {
    constructor() {
        this.count = 0;
        this.lowestCount = 0;
        this.items = {};
    }

    isEmpty() {
        return this.count - this.lowestCount === 0;
    }

    size() {
        return this.count - this.lowestCount;
    }

    clear() {
        this.count = 0;
        this.lowestCount = 0;
        this.items = {};
    }

    enqueue(element) {
        this.items[this.count] = element;
        this.count++;
    }

    dequeue() {
        if (this.isEmpty()) {
            return undefined;
        }

        const result = this.items[this.lowestCount];
        delete this.items[this.lowestCount];
        this.lowestCount++;
        return result;
    }

    peek() {
        if (this.isEmpty()) {
            return undefined;
        }

        return this.items[this.lowestCount];
    }

    toString() {
        if (this.isEmpty()) {
            return '';
        }

        let objString = `${this.items[this.lowestCount]}`;
        for (let i = this.lowestCount + 1; i < this.count; i++) {
            objString = `${objString},${this.items[i]}`;
        }
        return objString;
    }
}

class Stack {
    constructor() {
        this.items = [];
    }

    push(element) {
        this.items.push(element);
    }

    pop() {
        return this.items.pop();
    }

    peek() {
        return this.items[this.items.length - 1];
    }

    isEmpty() {
        return this.items.length === 0;
    }

    size() {
        return this.items.length;
    }

    clear() {
        this.items = [];
    }
}

const Colors = {
    WHITE: 0,
    GREY: 1,
    BLACK: 2
};

const initializeColor = vertices => {
    const colors = {};
    vertices.forEach(v => colors[v] = Colors.WHITE);
    return colors;
}

function breadthFirstSearch(graph, startVertex, cb) {
    const vertices = graph.getVertices();
    const adjList = graph.getAdjList();
    const color = initializeColor(vertices);
    const queue = new Queue();

    queue.enqueue(startVertex);

    while(!queue.isEmpty()) {
        const u = queue.dequeue();
        const neighbors = adjList.get(u);
        color[u] = Colors.GREY;
        neighbors.forEach(w => {
            if (color[w] === Colors.WHITE) {
                color[w] = Colors.GREY;
                queue.enqueue(w);
            }
        });
        color[u] = Colors.BLACK;
        if (cb) {
            cb(u);
        }
    }
}

function printVertex(v) {
    console.log(`Visited vertex: ${v}`);
}

// breadthFirstSearch(graph, myVertices[0], printVertex);

function BFS(graph, startVertex) {
    const vertices = graph.getVertices();
    const adjList = graph.getAdjList();
    const color = initializeColor(vertices);
    const queue = new Queue();
    const distances = {};
    const predecessors = {};

    queue.enqueue(startVertex);

    vertices.forEach(v => {
        distances[v] = 0;
        predecessors[v] = null;
    });

    while(!queue.isEmpty()) {
        const u = queue.dequeue();
        const neighbors = adjList.get(u);
        color[u] = Colors.GREY;
        neighbors.forEach(w => {
            if (color[w] === Colors.WHITE) {
                color[w] = Colors.GREY;
                distances[w] = distances[u] + 1;
                predecessors[w] = u;
                queue.enqueue(w);
            }
        });
        color[u] = Colors.BLACK;
    }

    return {
        distances,
        predecessors
    }
}