'use client';
import React from 'react';
import type { AlgoStep, NodeState, TreeNode, GraphNode, GraphEdge, HashBucket, DPCell } from './types';

const STATE_COLORS: Record<NodeState, string> = {
    default: 'var(--border-main)',
    visiting: 'var(--accent-primary)',
    visited: 'var(--color-warning)',
    swapped: 'var(--color-purple)',
    sorted: 'var(--color-success)',
    comparing: '#8BE9FD',
    pivot: 'var(--color-danger)',
    found: 'var(--color-success)',
    mst: 'var(--color-warning)',
    path: '#BD93F9',
};

const STATE_GLOW: Record<NodeState, string> = {
    default: 'none',
    visiting: '0 0 12px var(--accent-primary), 0 0 24px var(--accent-primary)44',
    visited: '0 0 10px var(--color-warning)',
    swapped: '0 0 12px var(--color-purple)',
    sorted: '0 0 10px var(--color-success)',
    comparing: '0 0 8px #8BE9FD',
    pivot: '0 0 14px var(--color-danger)',
    found: '0 0 16px var(--color-success), 0 0 32px var(--color-success)44',
    mst: '0 0 12px var(--color-warning)',
    path: '0 0 10px #BD93F9',
};

// ARRAY BARS

interface ArrayVizProps { step: AlgoStep; }

export function ArrayViz({ step }: ArrayVizProps) {
    const bars = step.bars ?? [];
    if (!bars.length) return <div style={{ color: 'var(--text-secondary)', textAlign: 'center', paddingTop: 80 }}>No array data.</div>;

    const maxVal = Math.max(...bars.map((b) => b.value), 1);
    const barW = Math.max(12, Math.min(48, 560 / bars.length));
    const gap = 4;
    const totalW = bars.length * (barW + gap);

    return (
        <svg width="100%" height="100%" viewBox={`0 0 ${totalW + 40} 320`} style={{ overflow: 'visible' }}>
            {bars.map((bar, i) => {
                const h = Math.max(8, (bar.value / maxVal) * 240);
                const x = 20 + i * (barW + gap);
                const y = 270 - h;
                const color = STATE_COLORS[bar.state];
                return (
                    <g key={i}>
                        <rect
                            x={x} y={y} width={barW} height={h}
                            rx={barW > 20 ? 4 : 2}
                            fill={color}
                            style={{ filter: bar.state !== 'default' ? `drop-shadow(0 0 6px ${color})` : undefined, transition: 'height 0.3s ease, y 0.3s ease, fill 0.2s ease' }}
                        />
                        {barW > 18 && (
                            <text x={x + barW / 2} y={y - 4} textAnchor="middle" fontSize="11" fill="var(--text-primary)" fontFamily="JetBrains Mono">
                                {bar.value}
                            </text>
                        )}
                        <text x={x + barW / 2} y={285} textAnchor="middle" fontSize="10" fill="var(--text-secondary)">
                            {i}
                        </text>
                    </g>
                );
            })}
        </svg>
    );
}

// TREE VIZ

interface TreeVizProps { step: AlgoStep; }

export function TreeViz({ step }: TreeVizProps) {
    const nodes = step.treeNodes ?? {};
    const root = step.treeRoot;
    if (!root) return <div style={{ color: 'var(--text-secondary)', textAlign: 'center', paddingTop: 80 }}>Empty tree.</div>;

    const nodesArr = Object.values(nodes);

    function renderEdges() {
        const edges: React.ReactNode[] = [];
        for (const node of nodesArr) {
            if (node.left && nodes[node.left]) {
                const child = nodes[node.left];
                edges.push(
                    <path key={`${node.id}-L`}
                        d={`M ${node.x} ${node.y} C ${node.x} ${(node.y + child.y) / 2}, ${child.x} ${(node.y + child.y) / 2}, ${child.x} ${child.y}`}
                        fill="none" stroke="var(--border-main)" strokeWidth="2"
                        style={{ transition: 'all 0.4s ease' }}
                    />
                );
            }
            if (node.right && nodes[node.right]) {
                const child = nodes[node.right];
                edges.push(
                    <path key={`${node.id}-R`}
                        d={`M ${node.x} ${node.y} C ${node.x} ${(node.y + child.y) / 2}, ${child.x} ${(node.y + child.y) / 2}, ${child.x} ${child.y}`}
                        fill="none" stroke="var(--border-main)" strokeWidth="2"
                        style={{ transition: 'all 0.4s ease' }}
                    />
                );
            }
        }
        return edges;
    }

    return (
        <svg width="100%" height="100%" viewBox="0 0 800 400" style={{ overflow: 'visible' }}>
            <defs>
                {Object.entries(STATE_GLOW).map(([state, glow]) =>
                    glow !== 'none' ? (
                        <filter key={state} id={`glow-${state}`}>
                            <feGaussianBlur stdDeviation="4" result="blur" />
                            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                        </filter>
                    ) : null
                )}
            </defs>
            {renderEdges()}
            {nodesArr.map((node) => {
                const color = STATE_COLORS[node.state];
                return (
                    <g key={node.id} style={{ transition: 'transform 0.4s cubic-bezier(0.34,1.56,0.64,1)' }}>
                        <circle
                            cx={node.x} cy={node.y} r={22}
                            fill={color} stroke="var(--bg-main)" strokeWidth="2"
                            style={{ filter: node.state !== 'default' ? `drop-shadow(0 0 8px ${color})` : undefined, transition: 'fill 0.3s ease' }}
                        />
                        <text x={node.x} y={node.y + 5} textAnchor="middle" fontSize="13" fontWeight="bold" fill="var(--bg-main)" fontFamily="JetBrains Mono">
                            {node.value}
                        </text>
                    </g>
                );
            })}
        </svg>
    );
}

// GRAPH VIZ

interface GraphVizProps { step: AlgoStep; directed?: boolean; }

export function GraphViz({ step, directed = false }: GraphVizProps) {
    const gnodes = step.graphNodes ?? [];
    const gedges = step.graphEdges ?? [];

    function getNode(id: string) { return gnodes.find((n) => n.id === id); }

    return (
        <svg width="100%" height="100%" viewBox="0 0 700 420" style={{ overflow: 'visible' }}>
            <defs>
                <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
                    <polygon points="0 0, 10 3.5, 0 7" fill="var(--border-main)" />
                </marker>
                <marker id="arrowhead-mst" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
                    <polygon points="0 0, 10 3.5, 0 7" fill="var(--color-warning)" />
                </marker>
            </defs>

            {gedges.map((edge, i) => {
                const from = getNode(edge.from);
                const to = getNode(edge.to);
                if (!from || !to) return null;
                const color = edge.state === 'mst' ? 'var(--color-warning)' : edge.state === 'path' ? '#BD93F9' : 'var(--border-main)';
                const dx = to.x - from.x, dy = to.y - from.y;
                const len = Math.sqrt(dx * dx + dy * dy);
                const nx = dx / len, ny = dy / len;
                const offset = 24;
                const x1 = from.x + nx * offset, y1 = from.y + ny * offset;
                const x2 = to.x - nx * offset, y2 = to.y - ny * offset;
                const mx = (x1 + x2) / 2, my = (y1 + y2) / 2 - 20;

                return (
                    <g key={i}>
                        <path
                            d={`M ${x1} ${y1} Q ${mx} ${my} ${x2} ${y2}`}
                            fill="none" stroke={color} strokeWidth={edge.state !== 'default' ? 3 : 1.5}
                            markerEnd={(directed || edge.directed) ? `url(#arrowhead${edge.state === 'mst' ? '-mst' : ''})` : undefined}
                            style={{ filter: edge.state === 'mst' ? 'drop-shadow(0 0 4px var(--color-warning))' : undefined, transition: 'stroke 0.3s, stroke-width 0.3s' }}
                        />
                        {edge.weight !== undefined && (
                            <text x={mx} y={my - 4} textAnchor="middle" fontSize="11" fill="var(--text-secondary)" fontFamily="JetBrains Mono">{edge.weight}</text>
                        )}
                    </g>
                );
            })}

            {gnodes.map((node) => {
                const color = STATE_COLORS[node.state];
                // Diamond shape for graph nodes
                const size = 22;
                const points = `${node.x},${node.y - size} ${node.x + size},${node.y} ${node.x},${node.y + size} ${node.x - size},${node.y}`;
                return (
                    <g key={node.id}>
                        <polygon
                            points={points} fill={color} stroke="var(--bg-main)" strokeWidth="2"
                            style={{ filter: node.state !== 'default' ? `drop-shadow(0 0 8px ${color})` : undefined, transition: 'fill 0.3s ease' }}
                        />
                        <text x={node.x} y={node.y + 5} textAnchor="middle" fontSize="13" fontWeight="bold" fill="var(--bg-main)" fontFamily="JetBrains Mono">
                            {node.label}
                        </text>
                    </g>
                );
            })}

            {/* Distance table */}
            {step.graphInfo && (
                <foreignObject x="10" y="10" width="160" height={Object.keys(step.graphInfo).length * 22 + 16}>
                    <div style={{ background: 'var(--bg-overlay)', borderRadius: 8, padding: '8px 12px', fontFamily: 'JetBrains Mono', fontSize: 11, color: 'var(--text-primary)', border: '1px solid var(--border-main)' }}>
                        {Object.entries(step.graphInfo).map(([k, v]) => (
                            <div key={k} style={{ color: typeof v === 'number' && v === 0 ? 'var(--color-success)' : 'var(--text-primary)' }}>
                                {k}: {v}
                            </div>
                        ))}
                    </div>
                </foreignObject>
            )}
        </svg>
    );
}

// HASH TABLE VIZ

interface HashVizProps { step: AlgoStep; }

export function HashViz({ step }: HashVizProps) {
    const buckets: HashBucket[] = step.hashBuckets ?? [];
    return (
        <div style={{ padding: '8px 16px', overflowY: 'auto', height: '100%' }}>
            {step.hashFormula && (
                <div style={{ fontFamily: 'JetBrains Mono', fontSize: 13, color: 'var(--accent-primary)', marginBottom: 12, padding: '6px 12px', background: 'var(--accent-primary-bg)', borderRadius: 6, border: '1px solid var(--accent-primary-border)' }}>
                    {step.hashFormula}
                </div>
            )}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                {buckets.map((bucket) => {
                    const color = STATE_COLORS[bucket.state];
                    const isActive = bucket.state !== 'default';
                    return (
                        <div key={bucket.index} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <div style={{ width: 32, textAlign: 'right', fontFamily: 'JetBrains Mono', fontSize: 12, color: 'var(--text-secondary)' }}>
                                [{bucket.index}]
                            </div>
                            <div style={{
                                minWidth: 48, height: 32, background: isActive ? color : 'var(--bg-panel)',
                                borderRadius: 6, border: `2px solid ${isActive ? color : 'var(--border-main)'}`,
                                boxShadow: isActive ? `0 0 12px ${color}44` : 'none',
                                transition: 'all 0.3s ease', animation: bucket.state === 'swapped' ? 'shake 0.3s ease' : undefined,
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                            }} />
                            {bucket.entries.map((entry, j) => (
                                <React.Fragment key={j}>
                                    <div style={{ color: 'var(--border-main)', fontSize: 18 }}>→</div>
                                    <div style={{
                                        padding: '4px 10px', background: entry.state === 'visiting' ? 'var(--accent-primary-bg)' : 'var(--bg-panel)',
                                        borderRadius: 6, border: `1px solid ${entry.state === 'visiting' ? 'var(--accent-primary)' : 'var(--border-main)'}`,
                                        fontFamily: 'JetBrains Mono', fontSize: 12, color: 'var(--text-primary)',
                                        transition: 'all 0.3s',
                                    }}>
                                        {entry.key}
                                    </div>
                                </React.Fragment>
                            ))}
                            {bucket.entries.length === 0 && (
                                <span style={{ fontFamily: 'JetBrains Mono', fontSize: 11, color: 'var(--text-muted)' }}>null</span>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

// DP GRID VIZ

interface DPVizProps { step: AlgoStep; }

export function DPViz({ step }: DPVizProps) {
    const grid: DPCell[][] = step.dpGrid ?? [];
    if (!grid.length) return <div style={{ color: 'var(--text-secondary)', textAlign: 'center', paddingTop: 80 }}>No DP data.</div>;

    const s1 = (step.dpInfo?.s1 as string) ?? '';
    const s2 = (step.dpInfo?.s2 as string) ?? '';
    const cellSize = grid[0].length <= 12 ? 44 : 32;

    return (
        <div style={{ padding: 16, overflowAuto: 'auto', height: '100%' } as React.CSSProperties}>
            {s1 && (
                <div style={{ fontFamily: 'JetBrains Mono', fontSize: 12, color: 'var(--text-secondary)', marginBottom: 8 }}>
                    s1: "{s1}" | s2: "{s2}"
                </div>
            )}
            <div style={{ overflowX: 'auto' }}>
                <table style={{ borderCollapse: 'separate', borderSpacing: 3 }}>
                    <tbody>
                        {grid.map((row, r) => (
                            <tr key={r}>
                                {row.map((cell, c) => {
                                    const color = STATE_COLORS[cell.state];
                                    const isActive = cell.state !== 'default';
                                    return (
                                        <td key={c} style={{
                                            width: cellSize, height: cellSize, textAlign: 'center',
                                            background: isActive ? color : 'var(--bg-panel)',
                                            borderRadius: 4, border: `1px solid ${isActive ? color : 'var(--border-main)'}`,
                                            boxShadow: isActive ? `0 0 8px ${color}66` : 'none',
                                            fontFamily: 'JetBrains Mono', fontSize: 13, color: isActive ? 'var(--bg-main)' : 'var(--text-primary)',
                                            fontWeight: isActive ? 700 : 400,
                                            transition: 'all 0.3s ease',
                                        }}>
                                            {cell.value}
                                        </td>
                                    );
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

// STACK VIZ

interface StackVizProps { step: AlgoStep; }

export function StackViz({ step }: StackVizProps) {
    const items = step.stackItems ?? [];
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', height: '100%', padding: 16, gap: 4 }}>
            <div style={{ fontFamily: 'system-ui, -apple-system, sans-serif', fontSize: 12, color: 'var(--text-secondary)', marginBottom: 8 }}>← TOP</div>
            {[...items].reverse().map((item, i) => {
                const color = STATE_COLORS[item.state];
                return (
                    <div key={i} style={{
                        width: 120, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center',
                        background: item.state !== 'default' ? color : 'var(--bg-panel)',
                        border: `2px solid ${item.state !== 'default' ? color : 'var(--border-main)'}`,
                        borderRadius: 4, fontFamily: 'JetBrains Mono', fontSize: 16, fontWeight: 700,
                        color: item.state !== 'default' ? 'var(--bg-main)' : 'var(--text-primary)',
                        boxShadow: item.state !== 'default' ? `0 0 12px ${color}88` : 'none',
                        transition: 'all 0.3s cubic-bezier(0.34,1.56,0.64,1)',
                    }}>
                        {item.value}
                    </div>
                );
            })}
            <div style={{ width: 124, height: 4, background: 'var(--border-main)', borderRadius: 2, marginTop: 4 }} />
            <div style={{ fontFamily: 'JetBrains Mono', fontSize: 11, color: 'var(--border-main)', marginTop: 4 }}>BOTTOM</div>
        </div>
    );
}

// QUEUE VIZ

interface QueueVizProps { step: AlgoStep; }

export function QueueViz({ step }: QueueVizProps) {
    const items = step.queueItems ?? [];
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <div style={{ fontFamily: 'system-ui, -apple-system, sans-serif', fontSize: 11, color: 'var(--text-secondary)', writingMode: 'vertical-lr', transform: 'rotate(180deg)', marginRight: 4 }}>FRONT ←</div>
                {items.length === 0 && (
                    <div style={{ padding: '8px 24px', border: '2px dashed var(--border-main)', borderRadius: 6, color: 'var(--text-muted)', fontFamily: 'JetBrains Mono', fontSize: 13 }}>empty</div>
                )}
                {items.map((item, i) => {
                    const color = STATE_COLORS[item.state];
                    return (
                        <React.Fragment key={i}>
                            <div style={{
                                width: 56, height: 56, display: 'flex', alignItems: 'center', justifyContent: 'center',
                                background: item.state !== 'default' ? color : 'var(--bg-panel)',
                                border: `2px solid ${item.state !== 'default' ? color : 'var(--border-main)'}`,
                                borderRadius: 8, fontFamily: 'JetBrains Mono', fontSize: 18, fontWeight: 700,
                                color: item.state !== 'default' ? 'var(--bg-main)' : 'var(--text-primary)',
                                boxShadow: item.state !== 'default' ? `0 0 14px ${color}88` : 'none',
                                transition: 'all 0.3s ease',
                            }}>
                                {item.value}
                            </div>
                            {i < items.length - 1 && <div style={{ color: 'var(--border-main)', fontSize: 16 }}>→</div>}
                        </React.Fragment>
                    );
                })}
                <div style={{ fontFamily: 'system-ui, -apple-system, sans-serif', fontSize: 11, color: 'var(--text-secondary)', writingMode: 'vertical-lr', marginLeft: 4 }}>→ REAR</div>
            </div>
        </div>
    );
}

// LIST VIZ (Linked List / Array)

interface ListVizProps { step: AlgoStep; label?: string; }

export function ListViz({ step, label = 'LIST' }: ListVizProps) {
    const items = step.listItems ?? [];
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: 16, padding: 16 }}>
            <div style={{ fontFamily: 'system-ui, -apple-system, sans-serif', fontSize: 12, color: 'var(--text-secondary)' }}>{label}</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 4, justifyContent: 'center' }}>
                {items.map((item, i) => {
                    const color = STATE_COLORS[item.state];
                    return (
                        <React.Fragment key={i}>
                            <div style={{
                                minWidth: 48, height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center',
                                background: item.state !== 'default' ? color : 'var(--bg-panel)',
                                border: `2px solid ${item.state !== 'default' ? color : 'var(--border-main)'}`,
                                borderRadius: 8, fontFamily: 'JetBrains Mono', fontSize: 14, fontWeight: 700,
                                color: item.state !== 'default' ? 'var(--bg-main)' : 'var(--text-primary)',
                                boxShadow: item.state !== 'default' ? `0 0 12px ${color}88` : 'none',
                                padding: '0 8px',
                                transition: 'all 0.3s cubic-bezier(0.34,1.56,0.64,1)',
                            }}>
                                {item.value}
                            </div>
                            {item.next && i < items.length - 1 && (
                                <div style={{ color: 'var(--border-main)', fontSize: 18 }}>→</div>
                            )}
                        </React.Fragment>
                    );
                })}
            </div>
        </div>
    );
}

// STATE LEGEND

export function StateLegend({ states }: { states: NodeState[] }) {
    const labels: Record<NodeState, string> = {
        default: 'Unvisited', visiting: 'Active / Visiting', visited: 'Visited',
        swapped: 'Swapped', sorted: 'Sorted / Final', comparing: 'Comparing',
        pivot: 'Pivot', found: 'Found', mst: 'MST / Highlighted', path: 'Shortest Path',
    };
    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, padding: '8px 0' }}>
            {states.map((s) => (
                <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <div style={{ width: 12, height: 12, borderRadius: 3, background: STATE_COLORS[s], boxShadow: STATE_GLOW[s] !== 'none' ? `0 0 6px ${STATE_COLORS[s]}` : 'none' }} />
                    <span style={{ fontFamily: 'JetBrains Mono', fontSize: 11, color: 'var(--text-secondary)' }}>{labels[s]}</span>
                </div>
            ))}
        </div>
    );
}
