const add = (a: number, b: number): number => a + b;
const subtract = (a: number, b: number): number => a - b;
const multiply = (a: number, b: number): number => a * b;
const divide = (a: number, b: number): number => b !== 0 ? a / b : NaN;
const power = (a: number, b: number): number => Math.pow(a, b);
const sqrt = (a: number): number => a >= 0 ? Math.sqrt(a) : NaN;
const sign = (a: number): number => a * (-1)

type Operation = 'add' | 'subtract' | 'multiply' | 'divide' | 'power' | 'sqrt' | 'sign';

let currentInput: string = '';
let previousInput: string = '';
let currentOperation: Operation | null = null;

const updateDisplay = (input: string): void => {
    const display = document.getElementById('display') as HTMLInputElement;
    display.value = input;
};

const updateOperationDisplay = (): void => {
    const operationDisplay = document.getElementById('operation-display') as HTMLElement;
    if (previousInput !== '' && currentOperation !== null) {
        const operationSymbol = getOperationSymbol(currentOperation);
        operationDisplay.textContent = `${previousInput} ${operationSymbol}`;
    } else {
        operationDisplay.textContent = '';
    }
};

const getOperationSymbol = (operation: Operation): string => {
    switch (operation) {
        case 'add': return '+';
        case 'subtract': return '-';
        case 'multiply': return '*';
        case 'divide': return '/';
        case 'power': return '^';
        case 'sqrt': return '√';
        default: return '';
    }
};

const handleButtonClick = (value: string): void => {
    currentInput += value;
    updateDisplay(currentInput);
    updateOperationDisplay();
};

const handleClear = (): void => {
    currentInput = '';
    previousInput = '';
    currentOperation = null;
    updateDisplay('');
    updateOperationDisplay();
};

const handleOperation = (operation: Operation): void => {
    if (currentInput === '') return;

    if (previousInput !== '') {
        handleEqual();
    }

    currentOperation = operation;
    previousInput = currentInput;
    currentInput = '';
    updateOperationDisplay();
};

const handleEqual = (): void => {
    if (previousInput === '' || currentInput === '') return;

    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);

    let result: number;

    switch (currentOperation) {
        case 'add':
            result = add(prev, current);
            break;
        case 'subtract':
            result = subtract(prev, current);
            break;
        case 'multiply':
            result = multiply(prev, current);
            break;
        case 'divide':
            result = divide(prev, current);
            break;
        case 'power':
            result = power(prev, current);
            break;
        case 'sqrt':
            result = sqrt(prev);
            break;
        default:
            return;
    }

    currentInput = result.toString();
    previousInput = '';
    currentOperation = null;
    updateDisplay(currentInput);
    updateOperationDisplay();
};

const handleSqrt = (): void => {
    if (currentInput === '') return;

    const num = parseFloat(currentInput);
    const result = sqrt(num);
    
    currentInput = result.toString();
    updateDisplay(currentInput);
    updateOperationDisplay();
};

const handleSignChange = (): void => {
    if (currentInput === '') return;

    let currentNumber = parseFloat(currentInput);
    currentNumber = -currentNumber;

    currentInput = currentNumber.toString();
    updateDisplay(currentInput);
};


