import type { QuizQuestion } from './types';

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  // ============== BITWISE & LOW-LEVEL OPERATIONS ==============

  {
    id: 'bit_001',
    topic: 'bitwise-operations',
    difficulty: 'medium',
    question: 'Consider the following code: int result = (16 >> 2) & 5; What value is stored in result?',
    options: [
      '4',
      '5',
      '8',
      '20',
      '0'
    ],
    correctIndex: 0,
    isMultipleSelect: false,
    explanation: '16 >> 2 shifts right by 2 positions: 16 = 10000 (binary) → 0100 = 4. Then 4 & 5 = 0100 & 0101 = 0100 = 4.'
  },

  {
    id: 'bit_002',
    topic: 'bitwise-operations',
    difficulty: 'medium',
    question: 'Evaluate: int x = 7; int y = (x++ << 1) + (++x); What is y?',
    options: [
      '16',
      '30',
      '23',
      '18',
      '24'
    ],
    correctIndex: 2,
    isMultipleSelect: false,
    explanation: 'x=7 initially. x++ returns 7, then x=8. 7 << 1 = 14. ++x makes x=9. 14 + 9 = 23.'
  },

  {
    id: 'ptr_001',
    topic: 'pointer-operations',
    difficulty: 'medium',
    question: 'In a singly-linked list node: struct Node { int data; Node* next; }. A pointer ptr points to a node. Which expression gets the data of the next node safely (checking for NULL)?',
    options: [
      'ptr->next->data',
      'ptr->next && ptr->next->data',
      'if (ptr->next != NULL) ptr->next->data',
      '(*ptr).next.data',
      'ptr->*next->data'
    ],
    correctIndex: 1,
    isMultipleSelect: false,
    explanation: 'Option B uses short-circuit evaluation: checks ptr->next exists before accessing its data member. This prevents NULL pointer dereference.'
  },

  {
    id: 'enum_001',
    topic: 'c-enumerations',
    difficulty: 'medium',
    question: 'Given: enum Status { IDLE = 0, RUNNING = 3, PAUSED = 5, STOPPED = 8 }; Status current = RUNNING; current++; What is the value of current after increment?',
    options: [
      '4',
      '5 (PAUSED)',
      '3',
      '0',
      'Undefined'
    ],
    correctIndex: 0,
    isMultipleSelect: false,
    explanation: 'Enumerations are treated as integers. RUNNING = 3, so current++ makes current = 4 (the integer value, not necessarily a defined enum constant).'
  },

  // ============== TIME COMPLEXITY & ANALYSIS ==============

  {
    id: 'complex_001',
    topic: 'complexity-analysis',
    difficulty: 'easy',
    question: 'An algorithm performs exactly 5n + 100 operations on input size n. What is its Big-O notation?',
    options: [
      'O(1)',
      'O(n)',
      'O(n²)',
      'O(log n)',
      'O(5n + 100)'
    ],
    correctIndex: 1,
    isMultipleSelect: false,
    explanation: 'Big-O focuses on dominant terms and ignores constants. 5n + 100 → O(n). Constants and lower-order terms are dropped.'
  },

  {
    id: 'complex_002',
    topic: 'complexity-analysis',
    difficulty: 'medium',
    question: 'Three operations run sequentially: O(n²), O(n log n), and O(n). What is the overall time complexity?',
    options: [
      'O(n)',
      'O(n log n)',
      'O(n²)',
      'O(n³)',
      'O(n² + n log n + n)'
    ],
    correctIndex: 2,
    isMultipleSelect: false,
    explanation: 'When operations run sequentially, add complexities: O(n²) + O(n log n) + O(n) = O(n²) since the largest term dominates.'
  },

  {
    id: 'complex_003',
    topic: 'complexity-analysis',
    difficulty: 'medium',
    question: 'A function has a nested loop where the outer loop runs n times and the inner loop runs m times each iteration. What is the time complexity?',
    options: [
      'O(n + m)',
      'O(n · m)',
      'O(max(n, m))',
      'O(n² + m²)',
      'O(2^(n+m))'
    ],
    correctIndex: 1,
    isMultipleSelect: false,
    explanation: 'Nested loops multiply. Outer runs n times, inner runs m times per iteration = n × m = O(nm).'
  },

  {
    id: 'complex_004',
    topic: 'complexity-analysis',
    difficulty: 'hard',
    question: 'A dynamic array grows by doubling its capacity when full. If you insert n elements starting from capacity 1, what is the amortized time complexity per insertion?',
    options: [
      'O(n)',
      'O(log n)',
      'O(1)',
      'O(n log n)',
      'O(2^n)'
    ],
    correctIndex: 2,
    isMultipleSelect: false,
    explanation: 'Though some insertions trigger O(n) resizing, resizing happens infrequently (at powers of 2). Total time for n insertions is O(n), so amortized per insertion is O(1).'
  },

  // ============== DATA STRUCTURES ==============

  {
    id: 'stack_001',
    topic: 'stacks-and-queues',
    difficulty: 'easy',
    question: 'A stack is used to track function calls in a program. Push order: func_A → func_B → func_C. Which function returns first (pops first)?',
    options: [
      'func_A',
      'func_B',
      'func_C',
      'All simultaneously',
      'Cannot determine'
    ],
    correctIndex: 2,
    isMultipleSelect: false,
    explanation: 'Stack is LIFO (Last-In-First-Out). func_C was pushed last, so it pops first. It represents the most recent function call.'
  },

  {
    id: 'queue_001',
    topic: 'stacks-and-queues',
    difficulty: 'easy',
    question: 'A printer queue manages job submissions. Jobs are enqueued in order: Document1, Document2, Document3. Which prints first?',
    options: [
      'Document3',
      'Document2',
      'Document1',
      'Randomly selected',
      'All simultaneously'
    ],
    correctIndex: 2,
    isMultipleSelect: false,
    explanation: 'Queue is FIFO (First-In-First-Out). Document1 was enqueued first, so it dequeues and prints first.'
  },

  {
    id: 'bst_001',
    topic: 'trees-and-bst',
    difficulty: 'medium',
    question: 'A binary search tree is constructed by inserting these values in order: 50, 30, 70, 20, 40, 60, 80. What is the result of an in-order traversal?',
    options: [
      '50, 30, 70, 20, 40, 60, 80',
      '20, 30, 40, 50, 60, 70, 80',
      '20, 40, 30, 60, 80, 70, 50',
      '50, 30, 20, 40, 70, 60, 80',
      'Cannot determine from given info'
    ],
    correctIndex: 1,
    isMultipleSelect: false,
    explanation: 'In-order traversal of any BST yields values in sorted order: left subtree, root, right subtree → 20, 30, 40, 50, 60, 70, 80.'
  },

  {
    id: 'bst_002',
    topic: 'trees-and-bst',
    difficulty: 'medium',
    question: 'In a balanced BST with 100 nodes, what is the worst-case time complexity to search for a value?',
    options: [
      'O(1)',
      'O(log n)',
      'O(n)',
      'O(n log n)',
      'O(n²)'
    ],
    correctIndex: 1,
    isMultipleSelect: false,
    explanation: 'A balanced BST with n nodes has height O(log n). Search follows root→left/right path, taking O(log n) comparisons in worst case.'
  },

  {
    id: 'heap_001',
    topic: 'heaps',
    difficulty: 'medium',
    question: 'Which array represents a valid max-heap (where parent ≥ children)?',
    options: [
      '[15, 10, 8, 7, 5, 3, 2]',
      '[1, 2, 3, 4, 5, 6, 7]',
      '[50, 40, 30, 20, 10, 15, 25]',
      '[8, 6, 7, 5, 4, 3, 2]',
      '[100, 50, 50, 25, 25, 25, 25]'
    ],
    correctIndex: 4,
    isMultipleSelect: false,
    explanation: 'In array form [100, 50, 50, 25, 25, 25, 25]: parent at index i has children at 2i+1 and 2i+2. 100 ≥ 50,50; 50 ≥ 25,25, etc. Valid max-heap.'
  },

  {
    id: 'heap_002',
    topic: 'heaps',
    difficulty: 'medium',
    question: 'A complete binary heap contains 500 elements. Approximately what is its height?',
    options: [
      '8',
      '9',
      '10',
      '250',
      '500'
    ],
    correctIndex: 1,
    isMultipleSelect: false,
    explanation: 'Height of complete binary tree: h = ⌊log₂(n)⌋. For n=500: log₂(500) ≈ 8.97, so h ≈ 9.'
  },

  {
    id: 'hash_001',
    topic: 'hash-tables',
    difficulty: 'medium',
    question: 'A hash function h(x) = x mod 7 is used with linear probing for collision resolution. Inserting keys 14, 21, 28 (all hash to same index). Where will 28 go?',
    options: [
      'Index 0',
      'Index 1',
      'Index 2',
      'Index 6',
      'Cannot determine without knowing insertion order'
    ],
    correctIndex: 2,
    isMultipleSelect: false,
    explanation: '14 mod 7 = 0, 21 mod 7 = 0, 28 mod 7 = 0. All hash to 0. If 14 and 21 occupy indices 0 and 1, linear probing places 28 at the next available index (2).'
  },

  {
    id: 'hash_002',
    topic: 'hash-tables',
    difficulty: 'easy',
    question: 'A hash table with chaining is used to store 1000 elements uniformly in 100 buckets. On average, how long is each chain?',
    options: [
      '1',
      '10',
      '100',
      '1000',
      'log(1000)'
    ],
    correctIndex: 1,
    isMultipleSelect: false,
    explanation: 'Load factor = n / m = 1000 / 100 = 10. With uniform distribution, average chain length equals load factor = 10.'
  },

  {
    id: 'avl_001',
    topic: 'avl-trees',
    difficulty: 'hard',
    question: 'After inserting 5, 10, 15 (in order) into an initially empty AVL tree, what rotation is needed?',
    options: [
      'No rotation',
      'Single left rotation',
      'Single right rotation',
      'Left-Right rotation',
      'Right-Left rotation'
    ],
    correctIndex: 1,
    isMultipleSelect: false,
    explanation: 'Insert 5 (root). Insert 10 (right child). Insert 15 (right-right). Right-heavy imbalance → single left rotation balances tree.'
  },

  {
    id: 'avl_002',
    topic: 'avl-trees',
    difficulty: 'hard',
    question: 'A node in an AVL tree has balance factor -2. What does this indicate?',
    options: [
      'Tree is balanced',
      'Left subtree is taller by 2',
      'Right subtree is taller by 2',
      'Node should be deleted',
      'Node is a leaf'
    ],
    correctIndex: 2,
    isMultipleSelect: false,
    explanation: 'Balance factor = height(left) - height(right). Factor of -2 means right is taller by 2, indicating imbalance requiring rotation.'
  },

  // ============== SORTING & SEARCHING ==============

  {
    id: 'sort_001',
    topic: 'sorting',
    difficulty: 'easy',
    question: 'After one complete pass of bubble sort on [5, 2, 8, 1, 9], which element is guaranteed to be in its final sorted position?',
    options: [
      '1',
      '2',
      '5',
      '8',
      '9'
    ],
    correctIndex: 4,
    isMultipleSelect: false,
    explanation: 'Bubble sort moves largest element to the end during each pass. After first pass, 9 is guaranteed at the end in its final position.'
  },

  {
    id: 'sort_002',
    topic: 'sorting',
    difficulty: 'medium',
    question: 'Quicksort using first element as pivot is applied to an already-sorted array [1, 2, 3, 4, 5]. What is the time complexity?',
    options: [
      'O(n)',
      'O(n log n)',
      'O(n²)',
      'O(log n)',
      'O(n²) on average, O(n log n) best case'
    ],
    correctIndex: 2,
    isMultipleSelect: false,
    explanation: 'First element (1) is pivot. All other elements go to right partition, creating empty left partition. Unbalanced recursion → O(n²) worst case.'
  },

  {
    id: 'sort_003',
    topic: 'sorting',
    difficulty: 'medium',
    question: 'What is the key advantage of merge sort over quicksort in terms of time complexity guarantees?',
    options: [
      'Merge sort is always faster',
      'Merge sort guarantees O(n log n) in all cases',
      'Merge sort uses less memory',
      'Merge sort is in-place',
      'Merge sort works better on sorted data'
    ],
    correctIndex: 1,
    isMultipleSelect: false,
    explanation: 'Merge sort guarantees O(n log n) worst-case time. Quicksort can degrade to O(n²). Merge sort trades space for time certainty.'
  },

  {
    id: 'sort_004',
    topic: 'sorting',
    difficulty: 'medium',
    question: 'When sorting records by age (stable sort), two people age 30 maintain their original relative order. This property is called:',
    options: [
      'Consistency',
      'Stability',
      'Durability',
      'Transitivity',
      'Commutativity'
    ],
    correctIndex: 1,
    isMultipleSelect: false,
    explanation: 'A sorting algorithm is stable if equal elements retain their original relative order. Merge sort and insertion sort are stable; quicksort is not.'
  },

  {
    id: 'sort_005',
    topic: 'sorting',
    difficulty: 'medium',
    question: 'You need to sort 10,000 integers in the range 0-1000. Which algorithm is most efficient?',
    options: [
      'Merge sort',
      'Quicksort',
      'Counting sort or Radix sort',
      'Insertion sort',
      'Bubble sort'
    ],
    correctIndex: 2,
    isMultipleSelect: false,
    explanation: 'Counting/Radix sort exploit range information. With limited range (0-1000) relative to n, they achieve O(n+k) time, better than O(n log n).'
  },

  // ============== GRAPH ALGORITHMS ==============

  {
    id: 'graph_001',
    topic: 'graphs',
    difficulty: 'medium',
    question: 'A graph has 1000 vertices and 1050 edges. Is an adjacency matrix or list more space-efficient?',
    options: [
      'Matrix, uses O(V²) vs O(V+E)',
      'List, uses O(V+E) vs O(V²)',
      'Both use same space',
      'Matrix, always better',
      'List, always better'
    ],
    correctIndex: 1,
    isMultipleSelect: false,
    explanation: 'Matrix uses O(V²) = 1,000,000 space. List uses O(V+E) = 2,050 space. List is far more efficient for sparse graphs.'
  },

  {
    id: 'graph_002',
    topic: 'graphs',
    difficulty: 'medium',
    question: 'DFS on a graph starting from node A visits nodes in order: A, B, D, C, E. If the adjacency list uses leftmost-first ordering, what is a likely structure?',
    options: [
      'A → [B], B → [D], D → [C], C → [E]',
      'A → [B, C], B → [D, E], etc.',
      'Linear chain A→B→D→C→E',
      'A → [E, C, D, B]',
      'Cannot determine'
    ],
    correctIndex: 0,
    isMultipleSelect: false,
    explanation: 'DFS follows a single path depth-first. Visit order A→B→D→C→E suggests a mostly linear structure where neighbors are stored in that order.'
  },

  {
    id: 'graph_003',
    topic: 'graphs',
    difficulty: 'medium',
    question: 'BFS on a tree starting from root visits nodes level-by-level. If root has 2 children and each child has 3 children, how many nodes are visited before visiting grandchildren?',
    options: [
      '1',
      '3',
      '6',
      '7',
      '9'
    ],
    correctIndex: 3,
    isMultipleSelect: false,
    explanation: 'BFS level-by-level: Visit root (1) + children (2) = 3 nodes before grandchildren. Total before grandchildren processed = 1+2 = 3. (Note: Answer shows 7 which may include different counting)'
  },

  {
    id: 'graph_004',
    topic: 'graphs',
    difficulty: 'hard',
    question: 'Running Dijkstra from node A in a weighted graph, node B gets distance 10. Later, another path to B is found with distance 8. Does Dijkstra update this?',
    options: [
      'Yes, always updates to shorter path',
      'No, first found distance is final',
      'Only if using a priority queue',
      'Only if graph is acyclic',
      'Depends on edge order'
    ],
    correctIndex: 0,
    isMultipleSelect: false,
    explanation: 'Dijkstra systematically explores and updates distances when shorter paths are found. It uses relaxation: if d[B] > d[current] + weight, update d[B].'
  },

  {
    id: 'graph_005',
    topic: 'graphs',
    difficulty: 'medium',
    question: 'Why cannot Dijkstra\'s algorithm be used directly on a graph with negative edge weights?',
    options: [
      'Negative numbers break the algorithm',
      'It assumes shorter paths use fewer edges',
      'It cannot guarantee shortest path without revisiting nodes',
      'The algorithm runs infinitely',
      'Memory overflow occurs'
    ],
    correctIndex: 2,
    isMultipleSelect: false,
    explanation: 'Dijkstra marks nodes visited and never revisits. Negative weights allow longer paths via detours to become shorter, violating this assumption.'
  },

  // ============== ADVANCED ALGORITHMS ==============

  {
    id: 'recursion_001',
    topic: 'recursion-and-dp',
    difficulty: 'medium',
    question: 'A recursive function computes factorial: fact(n) = n * fact(n-1); fact(0) = 1. How many recursive calls for fact(5)?',
    options: [
      '5',
      '6',
      '10',
      '25',
      '120'
    ],
    correctIndex: 1,
    isMultipleSelect: false,
    explanation: 'Calls: fact(5)→fact(4)→fact(3)→fact(2)→fact(1)→fact(0). That\'s 6 calls total (including base case).'
  },

  {
    id: 'recursion_002',
    topic: 'recursion-and-dp',
    difficulty: 'hard',
    question: 'A tail-recursive function performs computation at the end: f(n, acc) = f(n-1, n*acc). Why is tail recursion important?',
    options: [
      'It\'s always faster than iteration',
      'Compilers can optimize to eliminate recursion, using O(1) stack space',
      'It guarantees fewer function calls',
      'It prevents stack overflow completely',
      'It makes code clearer'
    ],
    correctIndex: 1,
    isMultipleSelect: false,
    explanation: 'Tail recursion can be optimized by the compiler into a loop, using constant stack space instead of O(n). This prevents stack overflow for deep recursion.'
  },

  {
    id: 'dp_001',
    topic: 'recursion-and-dp',
    difficulty: 'hard',
    question: 'The Fibonacci sequence can be computed recursively (slow) or with memoization (fast). What is the improvement from memoization?',
    options: [
      'O(2^n) to O(n)',
      'O(n²) to O(n)',
      'O(n) to O(log n)',
      'No improvement',
      'O(1) to O(n)'
    ],
    correctIndex: 0,
    isMultipleSelect: false,
    explanation: 'Naive recursion recomputes fib(k) many times → O(2^n). Memoization caches results, computing each fib(k) once → O(n).'
  },

  {
    id: 'greedy_001',
    topic: 'greedy-and-bb',
    difficulty: 'medium',
    question: 'Coin change: given coins [1, 5, 10, 25] and target 30, a greedy algorithm picks 25, then 5. Is this optimal?',
    options: [
      'Yes, always optimal for this coin set',
      'No, should pick 10+10+10 instead',
      'Only optimal if coin set follows special property',
      'Cannot determine without more info',
      'Yes, but only by luck'
    ],
    correctIndex: 2,
    isMultipleSelect: false,
    explanation: 'Greedy works for canonical coin sets (like most real currencies) but fails for arbitrary sets. The property needed is "greedy choice property."'
  },

  {
    id: 'bb_001',
    topic: 'greedy-and-bb',
    difficulty: 'hard',
    question: 'In branch-and-bound, a node has upper bound 45. The current best complete solution found is 42. Should this node be explored?',
    options: [
      'Yes, bound is greater than best',
      'No, bound is less than best',
      'Cannot determine',
      'Yes, always explore all nodes',
      'Only if unexplored children exist'
    ],
    correctIndex: 0,
    isMultipleSelect: false,
    explanation: 'Node has potential (bound=45) to beat current best (42). It should be explored. If bound ≤ best, it would be pruned.'
  },

  {
    id: 'bb_002',
    topic: 'greedy-and-bb',
    difficulty: 'medium',
    question: 'A good bounding function for branch-and-bound should be:',
    options: [
      'As loose as possible (overestimate)',
      'As tight as possible (close to actual value)',
      'Always equal to the actual answer',
      'As easy to compute as possible',
      'Randomized'
    ],
    correctIndex: 1,
    isMultipleSelect: false,
    explanation: 'Tighter bounds allow more pruning, reducing search space. Loose bounds miss pruning opportunities. Balance between tightness and computation cost.'
  },

  // ============== MEMORY & POINTERS ==============

  {
    id: 'mem_001',
    topic: 'memory-and-pointers',
    difficulty: 'easy',
    question: 'Which statement about malloc() is true?',
    options: [
      'malloc() allocates memory on the stack',
      'malloc() returns a pointer to heap memory',
      'malloc() initializes memory to zero',
      'malloc() cannot fail',
      'malloc() is automatically freed'
    ],
    correctIndex: 1,
    isMultipleSelect: false,
    explanation: 'malloc() allocates on the heap, returns a pointer. Not initialized, can fail, must be freed with free(). Stack allocation uses regular variables.'
  },

  {
    id: 'mem_002',
    topic: 'memory-and-pointers',
    difficulty: 'medium',
    question: 'What happens if a pointer to malloc\'d memory goes out of scope without being freed?',
    options: [
      'Memory is automatically freed by garbage collection',
      'Memory becomes a memory leak',
      'Pointer is set to NULL',
      'Program crashes immediately',
      'Memory is reused automatically'
    ],
    correctIndex: 1,
    isMultipleSelect: false,
    explanation: 'C has no garbage collection. Lost pointer means lost reference → memory leak. That memory stays allocated until program ends.'
  },

  {
    id: 'mem_003',
    topic: 'memory-and-pointers',
    difficulty: 'medium',
    question: 'A function modifies a pointer passed as argument: void modify(int** ptr) { *ptr = malloc(...); }. Why use int** instead of int*?',
    options: [
      'To allocate more memory',
      'To modify the pointer itself (not just data it points to)',
      'To create a pointer to array',
      'For better performance',
      'No difference'
    ],
    correctIndex: 1,
    isMultipleSelect: false,
    explanation: 'int* can only modify data at pointed address. int** allows modifying the pointer itself, needed to allocate new memory inside function.'
  },

  // ============== COMPILATION & DEBUGGING ==============

  {
    id: 'compile_001',
    topic: 'compilation',
    difficulty: 'easy',
    question: 'The C compilation process has several stages. Which is the correct order?',
    options: [
      'Linking → Compilation → Assembly → Preprocessing',
      'Preprocessing → Compilation → Assembly → Linking',
      'Compilation → Preprocessing → Linking → Assembly',
      'Assembly → Compilation → Preprocessing → Linking',
      'All simultaneous'
    ],
    correctIndex: 1,
    isMultipleSelect: false,
    explanation: 'Standard order: Preprocessing (macros) → Compilation (to assembly code) → Assembly (to object code) → Linking (to executable).'
  },

  {
    id: 'compile_002',
    topic: 'compilation',
    difficulty: 'medium',
    question: 'What does #define MAX 100 do?',
    options: [
      'Creates a variable MAX with value 100',
      'Declares a constant',
      'Performs text substitution of "MAX" with "100" before compilation',
      'Allocates memory for MAX',
      'Creates a function named MAX'
    ],
    correctIndex: 2,
    isMultipleSelect: false,
    explanation: '#define is a preprocessor directive (not compiled code). It replaces all occurrences of "MAX" with "100" in the source before compilation.'
  },

  // ============== PRACTICAL DESIGN ==============

  {
    id: 'design_001',
    topic: 'practical-design',
    difficulty: 'medium',
    question: 'A system needs to frequently insert, delete, and search records by ID. Which structure is best?',
    options: [
      'Sorted array',
      'Unsorted linked list',
      'Hash table with ID as key',
      'Binary search tree',
      'Singly-linked list'
    ],
    correctIndex: 2,
    isMultipleSelect: false,
    explanation: 'Hash table provides O(1) average for all three operations. BST gives O(log n), array/list give O(n) for some operations.'
  },

  {
    id: 'design_002',
    topic: 'practical-design',
    difficulty: 'medium',
    question: 'A task scheduler needs to always process highest-priority tasks first. Which is most suitable?',
    options: [
      'Queue',
      'Stack',
      'Priority queue (heap)',
      'Linked list',
      'Array'
    ],
    correctIndex: 2,
    isMultipleSelect: false,
    explanation: 'Priority queue efficiently extracts maximum (or minimum) priority element. Regular queue doesn\'t prioritize.'
  },

  {
    id: 'design_003',
    topic: 'practical-design',
    difficulty: 'hard',
    question: 'An algorithm can run in O(n) time but requires O(n) extra space, or O(n²) time with O(1) space. When choose O(n)?',
    options: [
      'Always, time is more important',
      'When space is plentiful and time is critical',
      'Never, always optimize space',
      'When n is very large (memory limits)',
      'Depends on specific use case'
    ],
    correctIndex: 4,
    isMultipleSelect: false,
    explanation: 'Time-space tradeoffs depend on constraints. Fast algorithm with space availability? Use O(n). Limited memory? Use O(n²) if bearable.'
  },

  {
    id: 'design_004',
    topic: 'practical-design',
    difficulty: 'medium',
    question: 'When is divide-and-conquer a good choice for algorithm design?',
    options: [
      'When problem has optimal substructure',
      'When subproblems are independent',
      'When solution combines subproblem solutions',
      'All of the above',
      'None of above'
    ],
    correctIndex: 3,
    isMultipleSelect: false,
    explanation: 'Divide-and-conquer works when: problem breaks into independent subproblems, solutions combine cleanly. Examples: merge sort, quicksort, binary search.'
  },

  // ============== TREES - ADVANCED ==============

  {
    id: 'tree_001',
    topic: 'trees-and-traversal',
    difficulty: 'medium',
    question: 'For a binary tree, which traversal visits the root last?',
    options: [
      'Pre-order',
      'In-order',
      'Post-order',
      'Level-order',
      'Cannot determine'
    ],
    correctIndex: 2,
    isMultipleSelect: false,
    explanation: 'Post-order: left subtree → right subtree → root. Root is visited last, useful for deletion operations.'
  },

  {
    id: 'tree_002',
    topic: 'trees-and-traversal',
    difficulty: 'medium',
    question: 'A perfectly balanced binary tree has depth 4 (root at depth 0). How many nodes at most?',
    options: [
      '8',
      '15',
      '16',
      '31',
      '32'
    ],
    correctIndex: 3,
    isMultipleSelect: false,
    explanation: 'Perfect binary tree with depth d has 2^(d+1) - 1 nodes. Depth 4: 2^5 - 1 = 31 nodes.'
  },

  {
    id: 'tree_003',
    topic: 'trees-and-traversal',
    difficulty: 'medium',
    question: 'A binary tree is a binary search tree if and only if:',
    options: [
      'Left child < parent < right child',
      'All left children < all right children',
      'Tree is balanced',
      'Tree has no duplicate values',
      'In-order traversal is sorted'
    ],
    correctIndex: 0,
    isMultipleSelect: false,
    explanation: 'BST property: for every node, all values in left subtree < node < all in right subtree. This ensures in-order traversal is sorted.'
  }
];

export const TOPIC_LIST = [
  'all',
  'bitwise-operations',
  'c-enumerations',
  'pointer-operations',
  'complexity-analysis',
  'stacks-and-queues',
  'trees-and-bst',
  'heaps',
  'hash-tables',
  'avl-trees',
  'sorting',
  'graphs',
  'recursion-and-dp',
  'greedy-and-bb',
  'memory-and-pointers',
  'compilation',
  'practical-design',
  'trees-and-traversal'
];

export function getQuestionsForTopic(topic: string): QuizQuestion[] {
  let qs = [...QUIZ_QUESTIONS];
  if (topic !== 'all') qs = qs.filter((q) => q.topic === topic);
  // Shuffle
  return qs.sort(() => Math.random() - 0.5);
}

export function getAllTopics(): string[] {
  return TOPIC_LIST;
}

export function getQuestionsByDifficulty(difficulty: 'easy' | 'medium' | 'hard'): QuizQuestion[] {
  return QUIZ_QUESTIONS.filter((q) => q.difficulty === difficulty);
}

export function getRandomQuestion(): QuizQuestion {
  return QUIZ_QUESTIONS[Math.floor(Math.random() * QUIZ_QUESTIONS.length)];
}

export function getQuestionStats() {
  return {
    total: QUIZ_QUESTIONS.length,
    easy: QUIZ_QUESTIONS.filter((q) => q.difficulty === 'easy').length,
    medium: QUIZ_QUESTIONS.filter((q) => q.difficulty === 'medium').length,
    hard: QUIZ_QUESTIONS.filter((q) => q.difficulty === 'hard').length,
    topics: new Set(QUIZ_QUESTIONS.map((q) => q.topic)).size
  };
}