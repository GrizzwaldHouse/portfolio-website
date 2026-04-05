'use client';

import { useState, useCallback, useEffect } from 'react';

// Calculator — web port of Marcus's C++ wxWidgets SWE_App project
// Original: d:\FSO\calculator-chris-GrizzwaldHouse-main\SWE_App
// Features: arithmetic ops, parentheses, trig, %, +/-, chained expressions

// --- Calculation engine (ported from CalculatorProcessor.cpp) ---

function isNumber(token: string): boolean {
    if (!token) return false;
    let hasDecimal = false;
    for (let i = 0; i < token.length; i++) {
        const c = token[i];
        if (c === '-' && i === 0) continue;
        if (c === '.') {
            if (hasDecimal) return false;
            hasDecimal = true;
        } else if (c < '0' || c > '9') {
            return false;
        }
    }
    return true;
}

function isOperator(token: string): boolean {
    return ['+', '-', '*', '/', '%'].includes(token);
}

function isUnaryOp(token: string): boolean {
    return ['sin', 'cos', 'tan', '+/-'].includes(token);
}

function getPrecedence(token: string): number {
    if (token === '+' || token === '-') return 1;
    if (token === '*' || token === '/' || token === '%') return 2;
    return 0;
}

function processOp(a: number, b: number, op: string): number {
    switch (op) {
        case '+': return a + b;
        case '-': return a - b;
        case '*': return a * b;
        case '/':
            if (b === 0) throw new Error('Division by zero');
            return a / b;
        case '%': return a % b;
        default: throw new Error('Unknown op');
    }
}

function processUnary(val: number, op: string): number {
    switch (op) {
        case 'sin': return Math.sin(val);
        case 'cos': return Math.cos(val);
        case 'tan': return Math.tan(val);
        case '+/-': return -val;
        default: throw new Error('Unknown unary');
    }
}

function tokenize(expr: string): string[] {
    const tokens: string[] = [];
    let current = '';
    for (let i = 0; i < expr.length; i++) {
        const c = expr[i];
        if (c === ' ') {
            if (current) { tokens.push(current); current = ''; }
            continue;
        }
        if ('+-*/%()'.includes(c)) {
            if (current) { tokens.push(current); current = ''; }
            // Handle negative numbers: '-' at start, after operator, or after '('
            if (c === '-' && (tokens.length === 0 || isOperator(tokens[tokens.length - 1]) || tokens[tokens.length - 1] === '(')) {
                current += c;
            } else {
                tokens.push(c);
            }
        } else {
            current += c;
        }
    }
    if (current) tokens.push(current);
    return tokens;
}

function calculate(expression: string): number {
    const tokens = tokenize(expression);
    const outputQueue: string[] = [];
    const opStack: string[] = [];

    for (const token of tokens) {
        if (isNumber(token)) {
            outputQueue.push(token);
        } else if (isOperator(token)) {
            while (
                opStack.length > 0 &&
                opStack[opStack.length - 1] !== '(' &&
                getPrecedence(token) <= getPrecedence(opStack[opStack.length - 1])
            ) {
                outputQueue.push(opStack.pop()!);
            }
            opStack.push(token);
        } else if (token === '(') {
            opStack.push(token);
        } else if (token === ')') {
            while (opStack.length > 0 && opStack[opStack.length - 1] !== '(') {
                outputQueue.push(opStack.pop()!);
            }
            if (opStack.length > 0) opStack.pop(); // remove '('
        }
    }
    while (opStack.length > 0) {
        outputQueue.push(opStack.pop()!);
    }

    // Evaluate RPN
    const evalStack: number[] = [];
    for (const token of outputQueue) {
        if (isNumber(token)) {
            evalStack.push(parseFloat(token));
        } else if (isOperator(token)) {
            if (evalStack.length < 2) throw new Error('Invalid expression');
            const b = evalStack.pop()!;
            const a = evalStack.pop()!;
            evalStack.push(processOp(a, b, token));
        }
    }
    if (evalStack.length !== 1) throw new Error('Invalid expression');
    return evalStack[0];
}

// --- UI Component ---

const BUTTONS = [
    ['C', 'Del', '(', ')', '/'],
    ['sin', 'cos', 'tan', '%', '*'],
    ['7', '8', '9', '+/-', '-'],
    ['4', '5', '6', '.', '+'],
    ['1', '2', '3', '', '='],
    ['', '0', '', '', ''],
];

export default function Calculator() {
    const [display, setDisplay] = useState('0');
    const [hasResult, setHasResult] = useState(false);

    const handleButton = useCallback(
        (label: string) => {
            if (!label) return;

            if (label === 'C') {
                setDisplay('0');
                setHasResult(false);
                return;
            }

            if (label === 'Del') {
                setDisplay((d) => (d.length <= 1 ? '0' : d.slice(0, -1)));
                return;
            }

            if (label === '=') {
                try {
                    const result = calculate(display);
                    const formatted =
                        Math.abs(result) < 1e-10
                            ? '0'
                            : parseFloat(result.toFixed(8)).toString();
                    setDisplay(formatted);
                    setHasResult(true);
                } catch {
                    setDisplay('Error');
                    setHasResult(true);
                }
                return;
            }

            if (label === '+/-') {
                setDisplay((d) => {
                    if (d === '0' || d === 'Error') return d;
                    return d.startsWith('-') ? d.slice(1) : '-' + d;
                });
                return;
            }

            if (label === '%') {
                try {
                    const val = parseFloat(display);
                    setDisplay((val / 100).toString());
                    setHasResult(true);
                } catch {
                    setDisplay('Error');
                    setHasResult(true);
                }
                return;
            }

            if (['sin', 'cos', 'tan'].includes(label)) {
                try {
                    const val = parseFloat(display);
                    const rad = (val * Math.PI) / 180;
                    const result = processUnary(rad, label);
                    setDisplay(parseFloat(result.toFixed(8)).toString());
                    setHasResult(true);
                } catch {
                    setDisplay('Error');
                    setHasResult(true);
                }
                return;
            }

            // Number or operator input
            setDisplay((d) => {
                if (d === 'Error') return label;
                if (hasResult && !isOperator(label) && label !== '(' && label !== ')') {
                    setHasResult(false);
                    return label;
                }
                setHasResult(false);
                if (d === '0' && !isOperator(label) && label !== '.' && label !== '(' && label !== ')') {
                    return label;
                }
                return d + label;
            });
        },
        [display, hasResult]
    );

    // Keyboard support
    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === 'Enter' || e.key === '=') handleButton('=');
            else if (e.key === 'Escape') handleButton('C');
            else if (e.key === 'Backspace') handleButton('Del');
            else if ('0123456789+-*/%().'.includes(e.key)) handleButton(e.key);
        };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [handleButton]);

    const getButtonStyle = (label: string) => {
        if (label === '=')
            return 'bg-gradient-to-r from-[#FFCC00] to-[#D50032] text-slate-900 font-bold hover:scale-105';
        if (label === 'C')
            return 'bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30';
        if (label === 'Del')
            return 'bg-orange-500/20 text-orange-400 border border-orange-500/30 hover:bg-orange-500/30';
        if (['sin', 'cos', 'tan', '%', '+/-'].includes(label))
            return 'bg-[#FFCC00]/10 text-[#FFCC00]/80 border border-[#FFCC00]/30 hover:bg-[#FFCC00]/20';
        if (['+', '-', '*', '/', '(', ')'].includes(label))
            return 'bg-[#FFCC00]/10 text-[#FFCC00] border border-[#FFCC00]/30 hover:bg-[#FFCC00]/20';
        return 'bg-slate-700 text-gray-200 border border-slate-600 hover:bg-slate-600';
    };

    return (
        <div className="max-w-sm mx-auto" id="calculator-demo">
            {/* Display */}
            <div
                className="bg-slate-900 border border-slate-700 rounded-xl p-4 mb-3 text-right font-mono text-2xl text-[#FFCC00] overflow-x-auto whitespace-nowrap min-h-[60px] flex items-center justify-end"
                id="calc-display"
            >
                {display}
            </div>

            {/* Button grid */}
            <div className="grid grid-cols-5 gap-2">
                {BUTTONS.flat().map((label, i) => (
                    <button
                        key={i}
                        onClick={() => handleButton(label)}
                        disabled={!label}
                        className={`h-12 rounded-lg text-sm font-semibold transition-all duration-150 ${label
                                ? getButtonStyle(label)
                                : 'invisible'
                            }`}
                        id={label ? `calc-btn-${label.replace(/[^a-z0-9]/gi, '')}` : undefined}
                    >
                        {label}
                    </button>
                ))}
            </div>

            <p className="text-xs text-gray-500 mt-3 text-center">
                Keyboard supported — type numbers, operators, Enter to evaluate, Esc to clear.
            </p>
        </div>
    );
}
