'use client';
import React, { useState, useRef, useEffect } from 'react';
import { QUIZ_QUESTIONS, getQuestionsForTopic } from './quizData';
import type { QuizQuestion } from './types';
import { ALGORITHMS } from './registry';
import { Circle, PartyPopper, BookOpen, RotateCcw, Lightbulb, Puzzle } from 'lucide-react';

const TOPICS = [
    { id: 'all', label: 'All Topics' },
    { id: 'bubble-sort', label: 'Bubble Sort' },
    { id: 'merge-sort', label: 'Merge Sort' },
    { id: 'quick-sort', label: 'Quick Sort' },
    { id: 'binary-search', label: 'Binary Search' },
    { id: 'bst', label: 'BST' },
    { id: 'bfs', label: 'BFS' },
    { id: 'dfs', label: 'DFS' },
    { id: 'dijkstra', label: 'Dijkstra' },
    { id: 'hash', label: 'Hash Table' },
    { id: 'stack', label: 'Stack' },
    { id: 'queue', label: 'Queue' },
    { id: 'fibonacci', label: 'Fibonacci DP' },
    { id: 'knapsack', label: 'Knapsack DP' },
];

const DIFFICULTIES = [
    { id: 'intro' as const, label: 'Intro', icon: <Circle size={12} fill="var(--color-success)" />, color: 'var(--color-success)' },
    { id: 'standard' as const, label: 'Standard', icon: <Circle size={12} fill="var(--color-warning)" />, color: 'var(--color-warning)' },
    { id: 'challenge' as const, label: 'Challenge', icon: <Circle size={12} fill="var(--color-danger)" />, color: 'var(--color-danger)' },
];

interface QuizState {
    questions: QuizQuestion[];
    currentIndex: number;
    selected: number | null;
    showResult: boolean;
    score: number;
    startTime: number;
    finished: boolean;
}

const glass: React.CSSProperties = {
    background: 'var(--bg-glass)',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    border: '1px solid var(--border-glass)',
    borderRadius: 12,
};

export default function QuizMode() {
    const [mode, setMode] = useState<'concept' | 'trace'>('concept');
    const [topic, setTopic] = useState('all');
    const [difficulty, setDifficulty] = useState<'intro' | 'standard' | 'challenge'>('intro');
    const [quiz, setQuiz] = useState<QuizState | null>(null);
    const [shake, setShake] = useState(false);
    const [wrongIndex, setWrongIndex] = useState<number | null>(null);

    function startQuiz() {
        const qs = getQuestionsForTopic(topic, difficulty);
        if (!qs.length) return;
        setQuiz({ questions: qs, currentIndex: 0, selected: null, showResult: false, score: 0, startTime: Date.now(), finished: false });
        setShake(false); setWrongIndex(null);
    }

    function selectAnswer(i: number) {
        if (!quiz || quiz.showResult) return;
        const correct = quiz.questions[quiz.currentIndex].correctIndex;
        const isCorrect = i === correct;
        if (!isCorrect) {
            setShake(true);
            setWrongIndex(i);
            setTimeout(() => setShake(false), 500);
        }
        setQuiz((q) => q ? { ...q, selected: i, showResult: true, score: isCorrect ? q.score + 1 : q.score } : q);
    }

    function nextQuestion() {
        if (!quiz) return;
        setWrongIndex(null);
        if (quiz.currentIndex + 1 >= quiz.questions.length) {
            setQuiz((q) => q ? { ...q, finished: true } : q);
        } else {
            setQuiz((q) => q ? { ...q, currentIndex: q.currentIndex + 1, selected: null, showResult: false } : q);
        }
    }

    if (quiz?.finished) {
        const elapsed = Math.round((Date.now() - quiz.startTime) / 1000);
        const pct = Math.round((quiz.score / quiz.questions.length) * 100);
        return (
            <div style={{ padding: 32, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24 }}>
                <div style={{ ...glass, padding: '40px 48px', textAlign: 'center', maxWidth: 500, width: '100%' }}>
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 12 }}>
                        {pct >= 80 ? <PartyPopper size={64} color="var(--color-success)" /> : pct >= 50 ? <BookOpen size={64} color="var(--color-warning)" /> : <RotateCcw size={64} color="var(--color-danger)" />}
                    </div>
                    <div style={{ fontFamily: 'system-ui, -apple-system, sans-serif', fontSize: 28, fontWeight: 800, color: 'var(--text-primary)', margin: '12px 0 4px' }}>
                        Quiz Complete!
                    </div>
                    <div style={{ fontFamily: 'system-ui, -apple-system, sans-serif', color: 'var(--text-secondary)', marginBottom: 24 }}>
                        {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)} — {topic === 'all' ? 'All Topics' : topic}
                    </div>
                    <div style={{ fontSize: 48, fontFamily: 'system-ui, -apple-system, sans-serif', fontWeight: 800, color: pct >= 80 ? 'var(--color-success)' : pct >= 50 ? 'var(--color-warning)' : 'var(--color-danger)', margin: '8px 0' }}>
                        {quiz.score}/{quiz.questions.length}
                    </div>
                    <div style={{ background: 'var(--bg-main)', borderRadius: 8, height: 12, margin: '12px 0', overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: `${pct}%`, background: pct >= 80 ? 'var(--color-success)' : pct >= 50 ? 'var(--color-warning)' : 'var(--color-danger)', transition: 'width 1s ease', boxShadow: pct >= 80 ? '0 0 12px var(--color-success)' : undefined }} />
                    </div>
                    <div style={{ fontFamily: 'system-ui, -apple-system, sans-serif', color: 'var(--text-secondary)', fontSize: 14 }}>
                        Time taken: {elapsed}s · Accuracy: {pct}%
                    </div>
                    {pct < 80 && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 20, padding: '12px 16px', background: 'var(--color-danger-bg)', border: '1px solid var(--color-danger)44', borderRadius: 8, fontFamily: 'system-ui, -apple-system, sans-serif', fontSize: 13, color: 'var(--color-danger)' }}>
                            <Lightbulb size={16} /> Review these topics in the Visualizer for practice.
                        </div>
                    )}
                    <button onClick={startQuiz} style={{ marginTop: 24, padding: '12px 28px', background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-alt))', border: 'none', borderRadius: 8, color: 'var(--bg-main)', fontFamily: 'system-ui, -apple-system, sans-serif', fontWeight: 700, fontSize: 15, cursor: 'pointer' }}>
                        Try Again
                    </button>
                    <button onClick={() => setQuiz(null)} style={{ marginTop: 12, marginLeft: 12, padding: '12px 28px', background: 'transparent', border: '1px solid var(--border-main)', borderRadius: 8, color: 'var(--text-primary)', fontFamily: 'system-ui, -apple-system, sans-serif', fontWeight: 600, fontSize: 15, cursor: 'pointer' }}>
                        New Quiz
                    </button>
                </div>
            </div>
        );
    }

    if (quiz && !quiz.finished) {
        const q = quiz.questions[quiz.currentIndex];
        const progress = ((quiz.currentIndex) / quiz.questions.length) * 100;
        return (
            <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 720, margin: '0 auto' }}>
                {/* Progress */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ flex: 1, background: 'var(--bg-main)', borderRadius: 8, height: 8, overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: `${progress}%`, background: 'linear-gradient(90deg, var(--accent-primary), var(--color-warning))', transition: 'width 0.4s ease' }} />
                    </div>
                    <span style={{ fontFamily: 'JetBrains Mono', fontSize: 13, color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>
                        {quiz.currentIndex + 1} / {quiz.questions.length} · Score: {quiz.score}
                    </span>
                </div>

                {/* Question */}
                <div style={{ ...glass, padding: 28 }}>
                    <div style={{ fontFamily: 'system-ui, -apple-system, sans-serif', fontSize: 18, fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.5, marginBottom: 24 }}>
                        {q.question}
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                        {q.options.map((opt, i) => {
                            let bg = 'var(--bg-panel-trans)', border = 'var(--border-main)', color = 'var(--text-primary)', glow = 'none';
                            if (quiz.showResult) {
                                if (i === q.correctIndex) { bg = 'var(--color-success-bg)'; border = 'var(--color-success)'; color = 'var(--color-success)'; glow = '0 0 12px var(--color-success)44'; }
                                else if (i === quiz.selected && i !== q.correctIndex) { bg = 'var(--color-danger-bg)'; border = 'var(--color-danger)'; color = 'var(--color-danger)'; }
                            }
                            return (
                                <button key={i} onClick={() => selectAnswer(i)}
                                    style={{
                                        padding: '14px 20px', background: bg, border: `2px solid ${border}`, borderRadius: 10,
                                        color, textAlign: 'left', fontFamily: 'system-ui, -apple-system, sans-serif', fontSize: 15, cursor: quiz.showResult ? 'default' : 'pointer',
                                        boxShadow: glow, transition: 'all 0.2s',
                                        animation: shake && i === wrongIndex ? 'shake 0.3s ease' : undefined,
                                    }}>
                                    <span style={{ fontFamily: 'JetBrains Mono', color: 'var(--text-secondary)', marginRight: 10 }}>{String.fromCharCode(65 + i)}.</span>
                                    {opt}
                                    {quiz.showResult && i === q.correctIndex && ' ✓'}
                                    {quiz.showResult && i === quiz.selected && i !== q.correctIndex && ' ✗'}
                                </button>
                            );
                        })}
                    </div>

                    {quiz.showResult && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 20, padding: '14px 18px', background: 'var(--accent-primary-bg)', border: '1px solid var(--accent-primary-border)', borderRadius: 8, fontFamily: 'system-ui, -apple-system, sans-serif', fontSize: 14, color: 'var(--text-primary)', lineHeight: 1.6 }}>
                            <Lightbulb size={16} color="var(--accent-primary)" /> {q.explanation}
                        </div>
                    )}
                </div>

                <div style={{ display: 'flex', gap: 12 }}>
                    {quiz.showResult && (
                        <button onClick={nextQuestion} style={{ flex: 1, padding: '12px 24px', background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-alt))', border: 'none', borderRadius: 8, color: 'var(--bg-main)', fontFamily: 'system-ui, -apple-system, sans-serif', fontWeight: 700, fontSize: 15, cursor: 'pointer' }}>
                            {quiz.currentIndex + 1 >= quiz.questions.length ? 'See Results →' : 'Next Question →'}
                        </button>
                    )}
                    <button onClick={() => setQuiz(null)} style={{ padding: '12px 20px', background: 'transparent', border: '1px solid var(--border-main)', borderRadius: 8, color: 'var(--text-secondary)', fontFamily: 'system-ui, -apple-system, sans-serif', fontSize: 14, cursor: 'pointer' }}>
                        Quit
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div style={{ padding: 32, display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 800, margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: 'system-ui, -apple-system, sans-serif', fontSize: 22, fontWeight: 800, color: 'var(--text-primary)' }}><Puzzle size={24} /> Quiz Mode</div>

            {/* Mode tabs */}
            <div style={{ display: 'flex', gap: 8 }}>
                {(['concept', 'trace'] as const).map((m) => (
                    <button key={m} onClick={() => setMode(m)} style={{
                        padding: '8px 20px', borderRadius: 8, border: 'none', cursor: 'pointer',
                        background: mode === m ? 'linear-gradient(135deg, var(--accent-primary)22, var(--accent-primary)11)' : 'transparent',
                        color: mode === m ? 'var(--accent-primary)' : 'var(--text-secondary)',
                        fontFamily: 'system-ui, -apple-system, sans-serif', fontWeight: 700, fontSize: 14,
                        boxShadow: mode === m ? '0 0 0 1px var(--accent-primary)55' : '0 0 0 1px var(--border-main)',
                    }}>
                        {m === 'concept' ? '[A] Concept Quiz' : '[B] Trace Quiz'}
                    </button>
                ))}
            </div>

            <div style={{ ...glass, padding: 28, display: 'flex', flexDirection: 'column', gap: 20 }}>
                {/* Difficulty */}
                <div>
                    <div style={{ fontFamily: 'system-ui, -apple-system, sans-serif', fontSize: 12, color: 'var(--text-secondary)', marginBottom: 10, letterSpacing: 1 }}>DIFFICULTY</div>
                    <div style={{ display: 'flex', gap: 8 }}>
                        {DIFFICULTIES.map((d) => (
                            <button key={d.id} onClick={() => setDifficulty(d.id)} style={{
                                display: 'flex', alignItems: 'center', gap: 6,
                                padding: '8px 16px', borderRadius: 8, border: `2px solid ${difficulty === d.id ? d.color : 'var(--border-main)'}`,
                                background: difficulty === d.id ? `${d.color}22` : 'transparent', color: difficulty === d.id ? d.color : 'var(--text-secondary)',
                                fontFamily: 'system-ui, -apple-system, sans-serif', fontWeight: 600, fontSize: 13, cursor: 'pointer',
                                boxShadow: difficulty === d.id ? `0 0 10px ${d.color}44` : 'none', transition: 'all 0.2s',
                            }}>
                                {d.icon} {d.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Topic */}
                <div>
                    <div style={{ fontFamily: 'system-ui, -apple-system, sans-serif', fontSize: 12, color: 'var(--text-secondary)', marginBottom: 10, letterSpacing: 1 }}>TOPIC</div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                        {TOPICS.map((t) => (
                            <button key={t.id} onClick={() => setTopic(t.id)} style={{
                                padding: '6px 14px', borderRadius: 6, border: `1px solid ${topic === t.id ? 'var(--accent-primary)' : 'var(--border-main)'}`,
                                background: topic === t.id ? 'var(--accent-primary-bg)' : 'transparent', color: topic === t.id ? 'var(--accent-primary)' : 'var(--text-secondary)',
                                fontFamily: 'system-ui, -apple-system, sans-serif', fontSize: 13, cursor: 'pointer', transition: 'all 0.15s',
                            }}>
                                {t.label}
                            </button>
                        ))}
                    </div>
                </div>

                {mode === 'concept' ? (
                    <>
                        <div style={{ fontFamily: 'system-ui, -apple-system, sans-serif', fontSize: 14, color: 'var(--text-secondary)' }}>
                            {getQuestionsForTopic(topic, difficulty).length} questions available · Multiple choice · Instant feedback
                        </div>
                        <button onClick={startQuiz} disabled={!getQuestionsForTopic(topic, difficulty).length}
                            style={{
                                padding: '14px 32px', background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-alt))',
                                border: 'none', borderRadius: 10, color: 'var(--bg-main)', fontFamily: 'system-ui, -apple-system, sans-serif',
                                fontWeight: 800, fontSize: 16, cursor: 'pointer', alignSelf: 'flex-start',
                                boxShadow: '0 0 20px var(--accent-primary)44',
                            }}>
                            Start Quiz →
                        </button>
                    </>
                ) : (
                    <div style={{ fontFamily: 'system-ui, -apple-system, sans-serif', fontSize: 14, color: 'var(--text-secondary)' }}>
                        <strong style={{ color: 'var(--color-warning)' }}>Trace Quiz</strong>: Given a partially-completed visualization snapshot, answer questions about the next step, final value, or algorithm behavior. Select a topic and difficulty above, then start!<br /><br />
                        <em>Tip: Use the Visualizer section to practice tracing algorithms step by step before taking the Trace Quiz.</em>
                    </div>
                )}
            </div>

            {/* Quick stats */}
            <div style={{ ...glass, padding: '16px 24px', display: 'flex', gap: 32, flexWrap: 'wrap' }}>
                <div>
                    <div style={{ fontFamily: 'JetBrains Mono', fontSize: 28, fontWeight: 700, color: 'var(--accent-primary)' }}>{QUIZ_QUESTIONS.length}</div>
                    <div style={{ fontFamily: 'system-ui, -apple-system, sans-serif', fontSize: 13, color: 'var(--text-secondary)' }}>Total Questions</div>
                </div>
                <div>
                    <div style={{ fontFamily: 'JetBrains Mono', fontSize: 28, fontWeight: 700, color: 'var(--color-success)' }}>{TOPICS.length - 1}</div>
                    <div style={{ fontFamily: 'system-ui, -apple-system, sans-serif', fontSize: 13, color: 'var(--text-secondary)' }}>Topics Covered</div>
                </div>
                <div>
                    <div style={{ fontFamily: 'JetBrains Mono', fontSize: 28, fontWeight: 700, color: 'var(--color-warning)' }}>3</div>
                    <div style={{ fontFamily: 'system-ui, -apple-system, sans-serif', fontSize: 13, color: 'var(--text-secondary)' }}>Difficulty Levels</div>
                </div>
            </div>
        </div>
    );
}
