'use client';
import React, { useState } from 'react';
import { ALGORITHMS } from './registry';
import { BookOpen, Search, Compass, Hash, Trees, Box, Layers, Map, AlertTriangle, Network, ArrowUp, Binary, ClipboardList, Lightbulb, Check, X, Minus } from 'lucide-react';
import { REFERENCE_DOCS } from './referenceDocs';
import SyntaxHighlight from './SyntaxHighlight';

const REFERENCE_DATA = [
    // Sorting
    { name: 'Bubble Sort', best: 'O(n)', avg: 'O(n²)', worst: 'O(n²)', space: 'O(1)', stable: '✓', inPlace: '✓', recursive: '✗', category: 'Sorting', useWhen: 'Very small n or nearly sorted data' },
    { name: 'Selection Sort', best: 'O(n²)', avg: 'O(n²)', worst: 'O(n²)', space: 'O(1)', stable: '✗', inPlace: '✓', recursive: '✗', category: 'Sorting', useWhen: 'Min memory writes needed' },
    { name: 'Insertion Sort', best: 'O(n)', avg: 'O(n²)', worst: 'O(n²)', space: 'O(1)', stable: '✓', inPlace: '✓', recursive: '✗', category: 'Sorting', useWhen: 'Small or nearly sorted arrays' },
    { name: 'Merge Sort', best: 'O(n log n)', avg: 'O(n log n)', worst: 'O(n log n)', space: 'O(n)', stable: '✓', inPlace: '✗', recursive: '✓', category: 'Sorting', useWhen: 'Guaranteed performance, linked lists, external sort' },
    { name: 'Quick Sort', best: 'O(n log n)', avg: 'O(n log n)', worst: 'O(n²)', space: 'O(log n)', stable: '✗', inPlace: '✓', recursive: '✓', category: 'Sorting', useWhen: 'General purpose, cache-friendly, in-place' },
    { name: 'Heap Sort', best: 'O(n log n)', avg: 'O(n log n)', worst: 'O(n log n)', space: 'O(1)', stable: '✗', inPlace: '✓', recursive: '✗', category: 'Sorting', useWhen: 'In-place with guaranteed O(n log n)' },
    { name: 'Counting Sort', best: 'O(n+k)', avg: 'O(n+k)', worst: 'O(n+k)', space: 'O(k)', stable: '✓', inPlace: '✗', recursive: '✗', category: 'Sorting', useWhen: 'Integer keys in bounded small range [0..k]' },
    { name: 'Radix Sort', best: 'O(nk)', avg: 'O(nk)', worst: 'O(nk)', space: 'O(n+k)', stable: '✓', inPlace: '✗', recursive: '✗', category: 'Sorting', useWhen: 'Large integers or fixed-length strings' },
    // Searching
    { name: 'Linear Search', best: 'O(1)', avg: 'O(n)', worst: 'O(n)', space: 'O(1)', stable: '–', inPlace: '–', recursive: '✗', category: 'Searching', useWhen: 'Unsorted array or single search' },
    { name: 'Binary Search', best: 'O(1)', avg: 'O(log n)', worst: 'O(log n)', space: 'O(1)', stable: '–', inPlace: '–', recursive: '✗', category: 'Searching', useWhen: 'Sorted array with repeated queries' },
    { name: 'Jump Search', best: 'O(1)', avg: 'O(√n)', worst: 'O(√n)', space: 'O(1)', stable: '–', inPlace: '–', recursive: '✗', category: 'Searching', useWhen: 'Sorted array, jumping is cheaper than random access' },
    { name: 'Interpolation', best: 'O(1)', avg: 'O(log log n)', worst: 'O(n)', space: 'O(1)', stable: '–', inPlace: '–', recursive: '✗', category: 'Searching', useWhen: 'Uniformly distributed sorted data' },
    // Trees
    { name: 'BST Search/Insert', best: 'O(log n)', avg: 'O(log n)', worst: 'O(n)', space: 'O(n)', stable: '–', inPlace: '–', recursive: '✓', category: 'Trees', useWhen: 'Dynamic ordered data, frequent insert/delete' },
    { name: 'AVL Tree', best: 'O(log n)', avg: 'O(log n)', worst: 'O(log n)', space: 'O(n)', stable: '–', inPlace: '–', recursive: '✓', category: 'Trees', useWhen: 'Balanced BST needed for guaranteed O(log n)' },
    { name: 'Heap (Min/Max)', best: 'O(1)', avg: 'O(log n)', worst: 'O(log n)', space: 'O(n)', stable: '–', inPlace: '✓', recursive: '✗', category: 'Trees', useWhen: 'Priority queue, heap sort, graph algorithms' },
    { name: 'Tree Traversals', best: 'O(n)', avg: 'O(n)', worst: 'O(n)', space: 'O(h)', stable: '–', inPlace: '–', recursive: '✓', category: 'Trees', useWhen: 'Print/process all nodes; in-order for sorted output' },
    // Graphs
    { name: 'BFS', best: 'O(V+E)', avg: 'O(V+E)', worst: 'O(V+E)', space: 'O(V)', stable: '–', inPlace: '–', recursive: '✗', category: 'Graphs', useWhen: 'Shortest path (unweighted), level-order problems' },
    { name: 'DFS', best: 'O(V+E)', avg: 'O(V+E)', worst: 'O(V+E)', space: 'O(V)', stable: '–', inPlace: '–', recursive: '✓', category: 'Graphs', useWhen: 'Cycle detection, topological sort, connectivity' },
    { name: "Dijkstra's", best: 'O(E log V)', avg: 'O(E log V)', worst: 'O(V²)', space: 'O(V)', stable: '–', inPlace: '–', recursive: '✗', category: 'Graphs', useWhen: 'SSSP with non-negative weights' },
    { name: 'Bellman-Ford', best: 'O(VE)', avg: 'O(VE)', worst: 'O(VE)', space: 'O(V)', stable: '–', inPlace: '–', recursive: '✗', category: 'Graphs', useWhen: 'SSSP with negative weights; detects negative cycles' },
    { name: "Prim's MST", best: 'O(E log V)', avg: 'O(E log V)', worst: 'O(V²)', space: 'O(V)', stable: '–', inPlace: '–', recursive: '✗', category: 'Graphs', useWhen: 'Dense graphs (adjacency matrix)' },
    { name: "Kruskal's MST", best: 'O(E log E)', avg: 'O(E log E)', worst: 'O(E log E)', space: 'O(V)', stable: '–', inPlace: '–', recursive: '✗', category: 'Graphs', useWhen: 'Sparse graphs (edge list)' },
    { name: 'Topological Sort', best: 'O(V+E)', avg: 'O(V+E)', worst: 'O(V+E)', space: 'O(V)', stable: '–', inPlace: '–', recursive: '✗', category: 'Graphs', useWhen: 'Dependency resolution, scheduling on DAGs' },
    // Data Structures
    { name: 'Array', best: 'O(1)', avg: 'O(n)', worst: 'O(n)', space: 'O(n)', stable: '–', inPlace: '✓', recursive: '✗', category: 'Structures', useWhen: 'Random access, cache locality, fixed-size data' },
    { name: 'Stack', best: 'O(1)', avg: 'O(1)', worst: 'O(1)', space: 'O(n)', stable: '–', inPlace: '✗', recursive: '✗', category: 'Structures', useWhen: 'Function calls, undo, DFS, expression parsing' },
    { name: 'Queue', best: 'O(1)', avg: 'O(1)', worst: 'O(1)', space: 'O(n)', stable: '–', inPlace: '✗', recursive: '✗', category: 'Structures', useWhen: 'BFS, scheduling, buffering, FIFO processing' },
    { name: 'Linked List', best: 'O(1)', avg: 'O(n)', worst: 'O(n)', space: 'O(n)', stable: '–', inPlace: '–', recursive: '✗', category: 'Structures', useWhen: 'Frequent insert/delete at ends, unknown size' },
    { name: 'Hash Table', best: 'O(1)', avg: 'O(1)', worst: 'O(n)', space: 'O(n)', stable: '–', inPlace: '–', recursive: '✗', category: 'Structures', useWhen: 'Fast lookup, counting, indexing by arbitrary keys' },
    // DP
    { name: 'Fibonacci (DP)', best: 'O(n)', avg: 'O(n)', worst: 'O(n)', space: 'O(n)', stable: '–', inPlace: '–', recursive: '✓', category: 'DP', useWhen: 'Overlapping subproblems pattern' },
    { name: 'LCS', best: 'O(mn)', avg: 'O(mn)', worst: 'O(mn)', space: 'O(mn)', stable: '–', inPlace: '–', recursive: '✓', category: 'DP', useWhen: 'Diff tools, bioinformatics, sequence matching' },
    { name: '0/1 Knapsack', best: 'O(nW)', avg: 'O(nW)', worst: 'O(nW)', space: 'O(nW)', stable: '–', inPlace: '–', recursive: '✓', category: 'DP', useWhen: 'Resource allocation, subset selection with weights' },
];

const CATEGORIES = ['Sorting', 'Searching', 'Trees', 'Graphs', 'Structures', 'DP'];

const glass: React.CSSProperties = { background: 'var(--bg-glass)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', border: '1px solid var(--border-glass)', borderRadius: 12 };

function complexity(str: string): string {
    if (str.includes('n²') || str.includes('n²')) return 'var(--color-danger)';
    if (str.includes('n log n') || str.includes('nW') || str.includes('nk') || str.includes('n+k') || str.includes('VE') || str.includes('mn')) return 'var(--color-warning)';
    if (str.includes('log n') || str.includes('V+E') || str.includes('E log')) return 'var(--accent-primary)';
    if (str === 'O(1)' || str === 'O(n)') return 'var(--color-success)';
    return 'var(--text-primary)';
}

export default function Reference() {
    const [search, setSearch] = useState('');
    const [selectedCat, setSelectedCat] = useState<string | null>(null);
    const [selectedDoc, setSelectedDoc] = useState<string | null>(null);

    const filtered = REFERENCE_DATA.filter((row) => {
        const matchesCat = !selectedCat || row.category === selectedCat;
        const matchesSearch = !search || Object.values(row).some((v) => String(v).toLowerCase().includes(search.toLowerCase()));
        return matchesCat && matchesSearch;
    });

    const thStyle: React.CSSProperties = { padding: '10px 12px', textAlign: 'left', fontFamily: 'system-ui, -apple-system, sans-serif', fontSize: 11, fontWeight: 700, color: 'var(--text-secondary)', letterSpacing: 1, borderBottom: '1px solid var(--bg-panel-hover)', whiteSpace: 'nowrap' };
    const tdStyle: React.CSSProperties = { padding: '10px 12px', borderBottom: '1px solid var(--bg-panel-hover)', fontFamily: 'JetBrains Mono', fontSize: 12 };

    return (
        <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 20, height: '100%', overflowY: 'auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'system-ui, -apple-system, sans-serif', fontSize: 22, fontWeight: 800, color: 'var(--text-primary)', flex: '0 0 auto' }}><BookOpen size={24} /> Reference Sheet</div>
                <div style={{ flex: 1, minWidth: 200, position: 'relative' }}>
                    <Search size={16} color="var(--text-secondary)" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)' }} />
                    <input
                        value={search} onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search algorithms..."
                        style={{ width: '100%', padding: '10px 16px 10px 36px', background: 'var(--bg-panel)', border: '1px solid var(--border-main)', borderRadius: 8, color: 'var(--text-primary)', fontFamily: 'system-ui, -apple-system, sans-serif', fontSize: 14, outline: 'none' }}
                    />
                </div>
            </div>

            {/* Category filter */}
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                <button onClick={() => setSelectedCat(null)}
                    style={{ padding: '6px 14px', borderRadius: 6, border: `1px solid ${!selectedCat ? 'var(--accent-primary)' : 'var(--border-main)'}`, background: !selectedCat ? 'var(--accent-primary-bg)' : 'transparent', color: !selectedCat ? 'var(--accent-primary)' : 'var(--text-secondary)', fontFamily: 'system-ui, -apple-system, sans-serif', fontSize: 13, cursor: 'pointer' }}>
                    All
                </button>
                {CATEGORIES.map((cat) => (
                    <button key={cat} onClick={() => setSelectedCat(selectedCat === cat ? null : cat)}
                        style={{ padding: '6px 14px', borderRadius: 6, border: `1px solid ${selectedCat === cat ? 'var(--color-warning)' : 'var(--border-main)'}`, background: selectedCat === cat ? 'var(--color-warning-bg)' : 'transparent', color: selectedCat === cat ? 'var(--color-warning)' : 'var(--text-secondary)', fontFamily: 'system-ui, -apple-system, sans-serif', fontSize: 13, cursor: 'pointer' }}>
                        {cat}
                    </button>
                ))}
            </div>

            {/* Table */}
            <div style={{ ...glass, overflow: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 900 }}>
                    <thead>
                        <tr style={{ background: 'var(--bg-main)' }}>
                            <th style={thStyle}>ALGORITHM</th>
                            <th style={thStyle}>CATEGORY</th>
                            <th style={thStyle}>BEST</th>
                            <th style={thStyle}>AVERAGE</th>
                            <th style={thStyle}>WORST</th>
                            <th style={thStyle}>SPACE</th>
                            <th style={thStyle}>STABLE</th>
                            <th style={thStyle}>IN-PLACE</th>
                            <th style={thStyle}>RECURSIVE</th>
                            <th style={{ ...thStyle, minWidth: 220 }}>WHEN TO USE</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.map((row, i) => (
                            <tr key={i} style={{ background: i % 2 === 0 ? 'var(--bg-panel)' : 'var(--bg-panel-hover)', transition: 'background 0.15s' }}>
                                <td style={{ ...tdStyle, color: 'var(--text-primary)', fontWeight: 700 }}>{row.name}</td>
                                <td style={{ ...tdStyle, color: 'var(--text-secondary)', fontSize: 11 }}>{row.category}</td>
                                <td style={{ ...tdStyle, color: complexity(row.best) }}>{row.best}</td>
                                <td style={{ ...tdStyle, color: complexity(row.avg) }}>{row.avg}</td>
                                <td style={{ ...tdStyle, color: complexity(row.worst) }}>{row.worst}</td>
                                <td style={{ ...tdStyle, color: 'var(--text-secondary)' }}>{row.space}</td>
                                <td style={{ ...tdStyle, color: row.stable === '✓' ? 'var(--color-success)' : row.stable === '✗' ? 'var(--color-danger)' : 'var(--text-muted)', textAlign: 'center' }}>
                                    {row.stable === '✓' ? <Check size={14} /> : row.stable === '✗' ? <X size={14} /> : <Minus size={14} />}
                                </td>
                                <td style={{ ...tdStyle, color: row.inPlace === '✓' ? 'var(--color-success)' : row.inPlace === '✗' ? 'var(--color-danger)' : 'var(--text-muted)', textAlign: 'center' }}>
                                    {row.inPlace === '✓' ? <Check size={14} /> : row.inPlace === '✗' ? <X size={14} /> : <Minus size={14} />}
                                </td>
                                <td style={{ ...tdStyle, color: row.recursive === '✓' ? 'var(--accent-primary)' : row.recursive === '✗' ? 'var(--text-muted)' : 'var(--text-muted)', textAlign: 'center' }}>
                                    {row.recursive === '✓' ? <Check size={14} /> : row.recursive === '✗' ? <X size={14} /> : <Minus size={14} />}
                                </td>
                                <td style={{ ...tdStyle, color: 'var(--text-secondary)', fontFamily: 'system-ui, -apple-system, sans-serif', fontSize: 12 }}>{row.useWhen}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {filtered.length === 0 && (
                    <div style={{ padding: 40, textAlign: 'center', color: 'var(--text-muted)', fontFamily: 'system-ui, -apple-system, sans-serif' }}>No matching algorithms found.</div>
                )}
            </div>

            {/* Color legend */}
            <div style={{ ...glass, padding: '16px 24px' }}>
                <div style={{ fontFamily: 'system-ui, -apple-system, sans-serif', fontSize: 12, color: 'var(--text-secondary)', marginBottom: 12, letterSpacing: 1 }}>COMPLEXITY LEGEND</div>
                <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
                    {[
                        { label: 'Excellent (O(1), O(n))', color: 'var(--color-success)' },
                        { label: 'Good (O(log n), O(n log n))', color: 'var(--accent-primary)' },
                        { label: 'Moderate (O(nk), O(VE), O(mn))', color: 'var(--color-warning)' },
                        { label: 'Slow (O(n²))', color: 'var(--color-danger)' },
                    ].map((item) => (
                        <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <div style={{ width: 12, height: 12, borderRadius: 3, background: item.color }} />
                            <span style={{ fontFamily: 'JetBrains Mono', fontSize: 12, color: 'var(--text-secondary)' }}>{item.label}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Decision guide */}
            <style>{`
                .doc-card { transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1); border: 1px solid var(--bg-panel-hover); }
                .doc-card:hover { border-color: var(--accent-primary); transform: translateY(-2px); box-shadow: 0 4px 12px var(--accent-primary-bg); }
            `}</style>
            <div style={{ ...glass, padding: 24 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'system-ui, -apple-system, sans-serif', fontSize: 16, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 16 }}><Compass size={20} /> When to Use What</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 12 }}>
                    {[
                        { id: 'hash-table', q: 'Need fast lookup by key?', a: 'Hash Table — O(1) average', icon: <Hash size={16} /> },
                        { id: 'bst-avl', q: 'Need sorted dynamic data?', a: 'BST or AVL Tree — O(log n)', icon: <Trees size={16} /> },
                        { id: 'queue', q: 'FIFO processing?', a: 'Queue', icon: <Box size={16} /> },
                        { id: 'stack', q: 'LIFO / undo / backtracking?', a: 'Stack', icon: <Layers size={16} /> },
                        { id: 'dijkstra', q: 'Shortest path, no neg. weights?', a: "Dijkstra's Algorithm", icon: <Map size={16} /> },
                        { id: 'bellman-ford', q: 'Shortest path with neg. weights?', a: 'Bellman-Ford', icon: <AlertTriangle size={16} /> },
                        { id: 'mst', q: 'Connect all nodes cheaply?', a: "Prim's or Kruskal's MST", icon: <Network size={16} /> },
                        { id: 'quick-merge', q: 'Sort large general data?', a: 'Quick Sort (avg) / Merge Sort (stable)', icon: <ArrowUp size={16} /> },
                        { id: 'counting-radix', q: 'Sort integers in small range?', a: 'Counting Sort or Radix Sort', icon: <Binary size={16} /> },
                        { id: 'binary-search', q: 'Search sorted array?', a: 'Binary Search — O(log n)', icon: <Search size={16} /> },
                        { id: 'topological-sort', q: 'Task ordering with deps?', a: 'Topological Sort (DAG)', icon: <ClipboardList size={16} /> },
                        { id: 'dp', q: 'Optimal substructure problem?', a: 'Dynamic Programming', icon: <Lightbulb size={16} /> },
                    ].map((item, i) => (
                        <button key={i} onClick={() => setSelectedDoc(item.id)} className="doc-card" style={{ padding: '12px 16px', background: 'var(--bg-main)', borderRadius: 8, textAlign: 'left', cursor: 'pointer' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontFamily: 'system-ui, -apple-system, sans-serif', fontSize: 13, color: 'var(--text-secondary)', marginBottom: 4 }}>
                                {item.icon} {item.q}
                            </div>
                            <div style={{ fontFamily: 'system-ui, -apple-system, sans-serif', fontSize: 13, fontWeight: 700, color: 'var(--accent-primary)' }}>→ {item.a}</div>
                        </button>
                    ))}
                </div>
            </div>

            {/* Documentation ModalOverlay */}
            {selectedDoc && REFERENCE_DOCS[selectedDoc] && (
                <div style={{ position: 'fixed', inset: 0, background: 'var(--bg-overlay)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: 24 }} onClick={() => setSelectedDoc(null)}>
                    <div onClick={(e) => e.stopPropagation()} style={{ ...glass, maxWidth: 800, width: '100%', maxHeight: '90vh', display: 'flex', flexDirection: 'column', animation: 'slideIn 0.3s ease', position: 'relative' }}>
                        
                        {/* Header */}
                        <div style={{ padding: '24px 32px', borderBottom: '1px solid var(--border-glass)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
                            <div style={{ fontFamily: 'system-ui, -apple-system, sans-serif', fontSize: 24, fontWeight: 800, color: 'var(--accent-primary)' }}>
                                {REFERENCE_DOCS[selectedDoc].title}
                            </div>
                            <button onClick={() => setSelectedDoc(null)} style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', padding: 8 }}>
                                <X size={24} />
                            </button>
                        </div>
                        
                        {/* Content */}
                        <div style={{ padding: '32px', overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column', gap: 32 }}>
                            <div style={{ fontFamily: 'system-ui, -apple-system, sans-serif', fontSize: 16, color: 'var(--text-primary)', lineHeight: 1.6 }}>
                                {REFERENCE_DOCS[selectedDoc].description}
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(200px, 1fr) 240px', gap: 24 }}>
                                <div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'system-ui, -apple-system, sans-serif', fontSize: 16, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 16 }}><Compass size={18}/> How it Works</div>
                                    <ul style={{ paddingLeft: 20, margin: 0, fontFamily: 'system-ui, -apple-system, sans-serif', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                                        {REFERENCE_DOCS[selectedDoc].howItWorks.map((step, idx) => <li key={idx} style={{ marginBottom: 8 }}>{step}</li>)}
                                    </ul>
                                </div>
                                <div style={{ background: 'var(--bg-main)', padding: 20, borderRadius: 12, border: '1px solid var(--bg-panel-hover)', height: 'fit-content' }}>
                                    <div style={{ fontFamily: 'system-ui, -apple-system, sans-serif', fontSize: 12, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 12, letterSpacing: 1 }}>COMPLEXITY</div>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px 4px', fontFamily: 'JetBrains Mono', fontSize: 13 }}>
                                        <div style={{ color: 'var(--text-secondary)' }}>Best</div>
                                        <div style={{ color: 'var(--color-success)' }}>{REFERENCE_DOCS[selectedDoc].timeComplexity.best}</div>
                                        <div style={{ color: 'var(--text-secondary)' }}>Avg</div>
                                        <div style={{ color: 'var(--color-warning)' }}>{REFERENCE_DOCS[selectedDoc].timeComplexity.avg}</div>
                                        <div style={{ color: 'var(--text-secondary)' }}>Worst</div>
                                        <div style={{ color: 'var(--color-danger)' }}>{REFERENCE_DOCS[selectedDoc].timeComplexity.worst}</div>
                                        <div style={{ color: 'var(--text-secondary)', marginTop: 8 }}>Space</div>
                                        <div style={{ color: 'var(--accent-primary)', marginTop: 8 }}>{REFERENCE_DOCS[selectedDoc].spaceComplexity}</div>
                                    </div>
                                </div>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
                                <div style={{ background: 'var(--color-success-bg)', padding: 20, borderRadius: 12, border: '1px solid var(--color-success-bg)' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'system-ui, -apple-system, sans-serif', fontSize: 15, fontWeight: 700, color: 'var(--color-success)', marginBottom: 12 }}><Check size={18}/> Pros</div>
                                    <ul style={{ paddingLeft: 20, margin: 0, fontFamily: 'system-ui, -apple-system, sans-serif', fontSize: 14, color: 'var(--text-primary)', lineHeight: 1.6 }}>
                                        {REFERENCE_DOCS[selectedDoc].pros.map((p, idx) => <li key={idx} style={{ marginBottom: 6 }}>{p}</li>)}
                                    </ul>
                                </div>
                                <div style={{ background: 'var(--color-danger-bg)', padding: 20, borderRadius: 12, border: '1px solid var(--color-danger-bg)' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'system-ui, -apple-system, sans-serif', fontSize: 15, fontWeight: 700, color: 'var(--color-danger)', marginBottom: 12 }}><X size={18}/> Cons</div>
                                    <ul style={{ paddingLeft: 20, margin: 0, fontFamily: 'system-ui, -apple-system, sans-serif', fontSize: 14, color: 'var(--text-primary)', lineHeight: 1.6 }}>
                                        {REFERENCE_DOCS[selectedDoc].cons.map((c, idx) => <li key={idx} style={{ marginBottom: 6 }}>{c}</li>)}
                                    </ul>
                                </div>
                            </div>

                            <div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'system-ui, -apple-system, sans-serif', fontSize: 16, fontWeight: 700, color: 'var(--text-primary)', 'marginBottom': 16 }}><BookOpen size={18}/> Code Example</div>
                                <div style={{ background: 'var(--bg-main)', padding: 20, borderRadius: 12, border: '1px solid var(--border-main)', overflowX: 'auto', fontFamily: 'JetBrains Mono', fontSize: 13, color: 'var(--text-primary)' }}>
                                    <code style={{ whiteSpace: 'pre' }}><SyntaxHighlight code={REFERENCE_DOCS[selectedDoc].codeSnippet} /></code>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
