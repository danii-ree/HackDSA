export interface ReferenceDoc {
    id: string;
    title: string;
    description: string;
    howItWorks: string[];
    timeComplexity: { best: string; avg: string; worst: string };
    spaceComplexity: string;
    pros: string[];
    cons: string[];
    codeSnippet: string;
}

export const REFERENCE_DOCS: Record<string, ReferenceDoc> = {
    'hash-table': {
        id: 'hash-table',
        title: 'Hash Table',
        description: 'A data structure that implements an associative array abstract data type, mapping keys to values using a hash function.',
        howItWorks: [
            'A hash function computes an index (or "hash code") from the input key.',
            'The key-value pair is stored in an array at the computed index.',
            'If multiple keys hash to the same index (a collision), a resolution strategy like chaining or open addressing is used to store both items.'
        ],
        timeComplexity: { best: 'O(1)', avg: 'O(1)', worst: 'O(n)' },
        spaceComplexity: 'O(n)',
        pros: ['Extremely fast average-case lookups, insertions, and deletions.', 'Flexible keys (strings, objects, integers).'],
        cons: ['Unordered structure; iterating over items does not guarantee a specific order.', 'Worst-case lookup is O(n) if many collisions occur.', 'High overhead for small amounts of data.'],
        codeSnippet: `// Example: Hash Table (Map in JS/TS)
const map = new Map<string, number>();

// Insertion O(1)
map.set('Apple', 5);
map.set('Banana', 10);

// Lookup O(1)
if (map.has('Apple')) {
    console.log('Apples left:', map.get('Apple'));
}

// Deletion O(1)
map.delete('Banana');`
    },
    'bst-avl': {
        id: 'bst-avl',
        title: 'Binary Search Tree & AVL Tree',
        description: 'Node-based binary tree data structures where the left subtree contains nodes with keys lesser than the node\'s key, and the right subtree contains greater keys. AVL Trees are self-balancing variants.',
        howItWorks: [
            'Starts comparing the target value with the root node.',
            'If the target is smaller, moves to the left child.',
            'If the target is larger, moves to the right child.',
            'In an AVL Tree, rotations (Left, Right, Left-Right, Right-Left) are performed on insertion/deletion to keep height balanced.'
        ],
        timeComplexity: { best: 'O(log n)', avg: 'O(log n)', worst: 'O(n) [O(log n) for AVL]' },
        spaceComplexity: 'O(n)',
        pros: ['Maintains sorted data autonomously.', 'Efficient searching, minimum, and maximum operations.', 'AVL guarantees O(log n) even in worst-case scenarios.'],
        cons: ['Standard BST can degrade to a linked list O(n) if data is inserted sorted.', 'AVL requires extra memory for balance factors and processing overhead for rotations.'],
        codeSnippet: `// Simple BST Search Concept
class Node {
    value: number;
    left: Node | null = null;
    right: Node | null = null;
    constructor(val: number) { this.value = val; }
}

function searchBST(root: Node | null, target: number): boolean {
    if (!root) return false;
    if (root.value === target) return true;
    
    // Traverse based on value
    if (target < root.value) return searchBST(root.left, target);
    return searchBST(root.right, target);
}`
    },
    'queue': {
        id: 'queue',
        title: 'Queue',
        description: 'A linear data structure that follows a particular order in which the operations are performed: First In First Out (FIFO).',
        howItWorks: [
            'Elements are added to the back (Enqueue).',
            'Elements are removed from the front (Dequeue).',
            'Can be implemented using Arrays, Linked Lists, or Circular Buffers.'
        ],
        timeComplexity: { best: 'O(1)', avg: 'O(1)', worst: 'O(1)' },
        spaceComplexity: 'O(n)',
        pros: ['Naturally handles tasks in order (fairness).', 'Constant time O(1) for adding and removing elements.', 'Excellent for buffering and scheduling (e.g. printer queues, thread pools).'],
        cons: ['Accessing elements in the middle is O(n).', 'Simple array implementations may cause memory shifting overhead.'],
        codeSnippet: `// Array-based Queue Example
const queue: number[] = [];

// Enqueue elements O(1) amortized
queue.push(10);
queue.push(20);
queue.push(30);

// Dequeue elements (O(n) in native JS arrays, but conceptually O(1))
const first = queue.shift(); 
console.log('Processed:', first); // 10`
    },
    'stack': {
        id: 'stack',
        title: 'Stack',
        description: 'A linear data structure serving as a collection of elements, with two principal operations: push and pop following Last In First Out (LIFO).',
        howItWorks: [
            'Elements are added to the top (Push).',
            'Elements are removed from the top (Pop).',
            'The last element added is the first one removed.'
        ],
        timeComplexity: { best: 'O(1)', avg: 'O(1)', worst: 'O(1)' },
        spaceComplexity: 'O(n)',
        pros: ['Constant time O(1) adding and removing.', 'Naturally models backtracking, undo operations, and recursion.', 'Low memory overhead.'],
        cons: ['Accessing elements at the bottom or middle is O(n).', 'Limited access pattern.'],
        codeSnippet: `// Array-based Stack Example
const stack: string[] = [];

// Push elements O(1)
stack.push('A');
stack.push('B');
stack.push('C');

// Pop elements O(1)
const lastIn = stack.pop(); 
console.log('Popped:', lastIn); // 'C'`
    },
    'dijkstra': {
        id: 'dijkstra',
        title: "Dijkstra's Algorithm",
        description: 'An algorithm for finding the shortest paths between nodes in a graph with non-negative edge weights.',
        howItWorks: [
            'Sets the initial node distance to 0, and all other nodes to infinity.',
            'Visits the unvisited node with the smallest known distance.',
            'For the current node, calculates the distance to its unvisited neighbors.',
            'If the calculated distance is smaller than the known distance, updates the shortest distance.',
            'Marks the current node as visited, and repeats.'
        ],
        timeComplexity: { best: 'O(E log V)', avg: 'O(E log V)', worst: 'O(V²)' },
        spaceComplexity: 'O(V)',
        pros: ['Guarantees finding the absolute shortest path if weights are non-negative.', 'Highly efficient when implemented with a Min-Priority Queue (Fibonacci Heap / Binary Heap).'],
        cons: ['Fails if negative weight edges exist (can loop infinitely or give wrong shortest path).', 'Visits many nodes before finding the target in dense graphs compared to A* search.'],
        codeSnippet: `function dijkstra(graph, start) {
    const distances = {};
    const pq = new PriorityQueue(); // Min-heap conceptually
    
    // Initialization
    for (let node in graph) distances[node] = Infinity;
    distances[start] = 0;
    pq.enqueue(start, 0);
    
    while (!pq.isEmpty()) {
        const { id, weight } = pq.dequeue();
        
        // Update neighbors
        for (let neighbor in graph[id]) {
            let newDist = distances[id] + graph[id][neighbor];
            if (newDist < distances[neighbor]) {
                distances[neighbor] = newDist;
                pq.enqueue(neighbor, newDist);
            }
        }
    }
    return distances;
}`
    },
    'bellman-ford': {
        id: 'bellman-ford',
        title: 'Bellman-Ford Algorithm',
        description: 'An algorithm that computes shortest paths from a single source vertex to all of the other vertices in a weighted digraph, accommodating negative weights.',
        howItWorks: [
            'Initializes distances from the source to all vertices as infinite and distance to the source itself as 0.',
            'Relaxes all edges (V-1) times, where V is the number of vertices.',
            'Iterates through all edges to verify if a shorter path exists—if so, a negative weight cycle is present.'
        ],
        timeComplexity: { best: 'O(VE)', avg: 'O(VE)', worst: 'O(VE)' },
        spaceComplexity: 'O(V)',
        pros: ['Handles graphs with negative edge weights.', 'Can detect negative weight cycles and report them autonomously.'],
        cons: ['Much slower than Dijkstra\'s algorithm due to iterating through every edge multiple times.', 'O(VE) is too slow for very dense graphs.'],
        codeSnippet: `function bellmanFord(vertices, edges, source) {
    let distance = new Array(vertices).fill(Infinity);
    distance[source] = 0;
    
    // Relax edges V-1 times
    for (let i = 1; i < vertices; i++) {
        for (let {u, v, weight} of edges) {
            if (distance[u] + weight < distance[v]) {
                distance[v] = distance[u] + weight;
            }
        }
    }
    
    // Check for negative-weight cycles
    for (let {u, v, weight} of edges) {
        if (distance[u] + weight < distance[v]) {
            throw new Error("Graph contains negative weight cycle");
        }
    }
    return distance;
}`
    },
    'mst': {
        id: 'mst',
        title: "Prim's & Kruskal's MST",
        description: 'Minimum Spanning Tree (MST) algorithms that find a subset of edges connecting all vertices together, without cycles, with the minimum possible total edge weight.',
        howItWorks: [
            'Kruskal\'s: Sorts all edges by weight. Iterates through the sorted edges, adding them to the MST if they don\'t form a cycle (using a Disjoint Set/Union-Find array).',
            'Prim\'s: Starts from an arbitrary node. Always picks the smallest edge connecting the currently grown MST to an unvisited node, similar to Dijkstra.'
        ],
        timeComplexity: { best: 'O(E log E) or O(E log V)', avg: 'O(E log V)', worst: 'O(E log V) or O(V²)' },
        spaceComplexity: 'O(V)',
        pros: ['Fundamental for network design (routing, circuit design, pipeline layout).', 'Both algorithms are easy to implement (Greedy approach).', 'Prim is faster for dense graphs, Kruskal for sparse graphs.'],
        cons: ['Not suitable for directed graphs unconditionally.', 'Requires auxiliary data structures (Min-Heap for Prim, Union-Find for Kruskal).'],
        codeSnippet: `// Concept: Kruskal's Algorithm
function kruskalMST(vertices, edges) {
    // 1. Sort edges by weight
    edges.sort((a, b) => a.weight - b.weight);
    
    const mst = [];
    const ds = new DisjointSet(vertices);
    
    // 2. Add edges preventing cycles
    for (let edge of edges) {
        if (ds.find(edge.u) !== ds.find(edge.v)) {
            mst.push(edge);
            ds.union(edge.u, edge.v);
        }
    }
    
    return mst;
}`
    },
    'quick-merge': {
        id: 'quick-merge',
        title: 'Quick Sort & Merge Sort',
        description: 'Fast, Divide and Conquer sorting algorithms designed for general purpose large system sorts.',
        howItWorks: [
            'Quick Sort: Picks a "pivot" element. Partitions the array so smaller elements are on the left and larger on the right. Recursively sorts both sides.',
            'Merge Sort: Recursively divides the array in half until single elements remain. Then merges the sorted halves back together sequentially.'
        ],
        timeComplexity: { best: 'O(n log n)', avg: 'O(n log n)', worst: 'O(n²)[Quick] / O(n log n)[Merge]' },
        spaceComplexity: 'O(log n) [Quick] / O(n) [Merge]',
        pros: ['Merge Sort is stable and guarantees O(n log n) even in worst-case.', 'Quick Sort is highly cache-efficient and sorts in-place, making it often the fastest in practice.'],
        cons: ['Quick Sort can degrade to O(n²) if not handled well (bad pivots).', 'Merge Sort requires O(n) auxiliary memory space, poor for embedded environments.'],
        codeSnippet: `// Quick Sort Partitioning concept
function quickSort(arr, low = 0, high = arr.length - 1) {
    if (low < high) {
        let pivotIndex = partition(arr, low, high);
        
        // Sort elements before and after pivot
        quickSort(arr, low, pivotIndex - 1);
        quickSort(arr, pivotIndex + 1, high);
    }
    return arr;
}`
    },
    'counting-radix': {
        id: 'counting-radix',
        title: 'Counting Sort & Radix Sort',
        description: 'Non-comparison based integer sorting algorithms that sort data by grouping keys or counting occurrences, achieving linear time complexity for bounded integers.',
        howItWorks: [
            'Counting Sort: Counts occurrences of each integer, computes prefix sums to determine the final position of each element in the output array.',
            'Radix Sort: Processes elements digit by digit (usually from least significant to most significant), heavily utilizing a stable version of Counting Sort as a subroutine.'
        ],
        timeComplexity: { best: 'O(n + k)', avg: 'O(n + k)', worst: 'O(n + k)' },
        spaceComplexity: 'O(n + k)',
        pros: ['Can break the theoretical O(n log n) lower bound for comparison roots, achieving linear time O(n).', 'Highly efficient for sorting large arrays of small integers (like dates or fixed-length formats).'],
        cons: ['Strictly limits to integers or specific formats.', 'Requires O(n + k) memory, making it highly impractical for ranges that cover a wide span (e.g., millions of distinct values).'],
        codeSnippet: `// Counting Sort Subroutine
function countingSort(arr, k) {
    let count = new Array(k + 1).fill(0);
    let output = new Array(arr.length);
    
    // Store counts
    for (let i = 0; i < arr.length; i++) count[arr[i]]++;
    
    // Cumulative sum
    for (let i = 1; i <= k; i++) count[i] += count[i - 1];
    
    // Build output array
    for (let i = arr.length - 1; i >= 0; i--) {
        output[count[arr[i]] - 1] = arr[i];
        count[arr[i]]--;
    }
    return output;
}`
    },
    'binary-search': {
        id: 'binary-search',
        title: 'Binary Search',
        description: 'A search algorithm that finds the position of a target value within a sorted array by repeatedly dividing the search interval in half.',
        howItWorks: [
            'Requires the array to be strictly sorted.',
            'Compares the target to the middle element: if equal, return the index.',
            'If the target is smaller, repeat the process on the left half.',
            'If the target is larger, repeat the process on the right half.'
        ],
        timeComplexity: { best: 'O(1)', avg: 'O(log n)', worst: 'O(log n)' },
        spaceComplexity: 'O(1) [Iterative] / O(log n) [Recursive]',
        pros: ['Logarithmic time complexity makes it unimaginably fast for large datasets (e.g. 50 lookups for 1 quadrillion elements).', 'Extremely minimal memory footprint.'],
        cons: ['Absolutely requires a sorted array; sorting overhead may not be worth it for single lookups.', 'Performance degrades if implemented over Linked Lists.'],
        codeSnippet: `function binarySearch(arr, target) {
    let left = 0;
    let right = arr.length - 1;
    
    while (left <= right) {
        let mid = Math.floor((left + right) / 2);
        
        if (arr[mid] === target) return mid;
        if (arr[mid] < target) {
            left = mid + 1; // Discard left half
        } else {
            right = mid - 1; // Discard right half
        }
    }
    
    return -1; // Not found
}`
    },
    'topological-sort': {
        id: 'topological-sort',
        title: 'Topological Sort',
        description: 'A linear ordering of vertices in a Directed Acyclic Graph (DAG) such that for every directed edge U → V, vertex U comes before V in the ordering.',
        howItWorks: [
            'Can be performed using DFS by pushing nodes pointing to nothing onto a stack upon completion.',
            'Alternatively, Kahn\'s Algorithm uses BFS: calculates "in-degrees" of all nodes, adding nodes with 0 in-degree to a queue, resolving dependencies iteratively.'
        ],
        timeComplexity: { best: 'O(V + E)', avg: 'O(V + E)', worst: 'O(V + E)' },
        spaceComplexity: 'O(V)',
        pros: ['Perfect for resolving dependencies (e.g. Build tools like Webpack, Package Managers, Course Prerequisites).', 'Linear time component makes it very fast in practice.'],
        cons: ['Strictly fails and becomes undefined if there are any cycles in the graph (e.g., A depends on B implies B depends on A).'],
        codeSnippet: `// Kahn's Algorithm
function topoSort(vertices, graph) {
    let inDegree = new Array(vertices).fill(0);
    for (let u = 0; u < vertices; u++) {
        for (let v of graph[u]) inDegree[v]++;
    }
    
    let queue = [], result = [];
    for (let i = 0; i < vertices; i++) {
        if (inDegree[i] === 0) queue.push(i);
    }
    
    while (queue.length > 0) {
        let u = queue.shift();
        result.push(u);
        
        for (let v of graph[u]) {
            inDegree[v]--;
            if (inDegree[v] === 0) queue.push(v);
        }
    }
    return result.length === vertices ? result : "Cycle detected!";
}`
    },
    'dp': {
        id: 'dp',
        title: 'Dynamic Programming',
        description: 'An algorithmic paradigm that solves complex problems by breaking them down into simpler overlapping subproblems, and storing the results to avoid redundant computations (Memoization/Tabulation).',
        howItWorks: [
            'Top-Down (Memoization): Uses recursion to break down problems, saving calculated answers in a hash map to avoid recounting.',
            'Bottom-Up (Tabulation): Uses a loop to evaluate subproblems iteratively from the ground up, storing answers in an array table.'
        ],
        timeComplexity: { best: 'O(n) [Fibonacci]', avg: 'O(n²)', worst: 'Problem Dependent (Usually Polynomial vs Exponential)' },
        spaceComplexity: 'Problem Dependent (Usually O(n) or O(n²))',
        pros: ['Drastically reduces exponential time complexities O(2ⁿ) down to polynomial complexities O(n²).', 'Solves advanced optimization problems strictly and gracefully.'],
        cons: ['Requires the problem to have "Optimal Substructure" and "Overlapping Subproblems".', 'Tabulation can require large amounts of memory allocations (O(n²) matrix grids for problems like LCS).'],
        codeSnippet: `// 0/1 Knapsack using DP Tabulation
function knapsack(weights, values, capacity) {
    const n = weights.length;
    // Create (n+1) x (capacity+1) matrix
    const dp = Array.from({length: n + 1}, () => new Array(capacity + 1).fill(0));
    
    for (let i = 1; i <= n; i++) {
        for (let w = 1; w <= capacity; w++) {
            if (weights[i-1] <= w) {
                // Max of including vs excluding the item
                dp[i][w] = Math.max(
                    values[i-1] + dp[i-1][w - weights[i-1]],
                    dp[i-1][w]
                );
            } else {
                dp[i][w] = dp[i-1][w];
            }
        }
    }
    return dp[n][capacity];
}`
    }
};
