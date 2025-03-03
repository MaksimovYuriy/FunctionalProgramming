var add = function (a, b) { return a + b; };
var subtract = function (a, b) { return a - b; };
var multiply = function (a, b) { return a * b; };
var divide = function (a, b) { return b !== 0 ? a / b : NaN; };
var power = function (a, b) { return Math.pow(a, b); };
var sqrt = function (a) { return a >= 0 ? Math.sqrt(a) : NaN; };
var sign = function (a) { return a * (-1); };
var currentInput = '';
var previousInput = '';
var currentOperation = null;
var updateDisplay = function (input) {
    var display = document.getElementById('display');
    display.value = input;
};
var updateOperationDisplay = function () {
    var operationDisplay = document.getElementById('operation-display');
    if (previousInput !== '' && currentOperation !== null) {
        var operationSymbol = getOperationSymbol(currentOperation);
        operationDisplay.textContent = "".concat(previousInput, " ").concat(operationSymbol);
    }
    else {
        operationDisplay.textContent = '';
    }
};
var getOperationSymbol = function (operation) {
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
var handleButtonClick = function (value) {
    currentInput += value;
    updateDisplay(currentInput);
    updateOperationDisplay();
};
var handleClear = function () {
    currentInput = '';
    previousInput = '';
    currentOperation = null;
    updateDisplay('');
    updateOperationDisplay();
};
var handleOperation = function (operation) {
    if (currentInput === '')
        return;
    if (previousInput !== '') {
        handleEqual();
    }
    currentOperation = operation;
    previousInput = currentInput;
    currentInput = '';
    updateOperationDisplay();
};
var handleEqual = function () {
    if (previousInput === '' || currentInput === '')
        return;
    var prev = parseFloat(previousInput);
    var current = parseFloat(currentInput);
    var result;
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
var handleSqrt = function () {
    if (currentInput === '')
        return;
    var num = parseFloat(currentInput);
    var result = sqrt(num);
    currentInput = result.toString();
    updateDisplay(currentInput);
    updateOperationDisplay();
};
var handleSignChange = function () {
    if (currentInput === '')
        return;
    var currentNumber = parseFloat(currentInput);
    currentNumber = -currentNumber;
    currentInput = currentNumber.toString();
    updateDisplay(currentInput);
};
