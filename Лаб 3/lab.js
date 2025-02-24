// Функция, которая принимает массив чисел и возвращает новый массив, 
// содержащий только числа, кратные заданному числу.
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
function filter_multiples(array, multiple) {
    return array.filter(function (num) { return num % multiple === 0; });
}
// Функция, которая принимает массив строк и возвращает новую строку, 
// содержащую все строки, объединенные заданным разделителем.
function join_strs(array, sep) {
    return array.join(sep);
}
// Функция, которая принимает массив объектов и возвращает новый массив, 
// отсортированный по значению определенного свойства.
function array_sort(array, property) {
    return __spreadArray([], array, true).sort(function (a, b) { return a[property] > b[property] ? 1 : -1; });
}
// Создайте функцию, которая принимает другую функцию в качестве аргумента и возвращает новую функцию, 
// которая выполняет логирование перед вызовом исходной функции.
function logDecorator(func) {
    return (function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        console.log("Arguments: ".concat(JSON.stringify(args)));
        return func.apply(void 0, args);
    });
}
// Примеры
// Числа, кратные 3
var numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
var multiples = filter_multiples(numbers, 2);
console.log(multiples);
// Объединение строк
var strings = ['a', 'b', 'c'];
var joinedStrings = join_strs(strings, '^^^');
console.log(joinedStrings);
var yuras = [
    { name: 'Yura', age: 20 },
    { name: 'NeYura', age: 19 },
    { name: 'MegaYura', age: 22 }
];
var sorted = array_sort(yuras, 'age');
console.log(sorted[0], sorted[1], sorted[2]);
// Логирование перед вызовом функции
function add(a, b) {
    return a + b;
}
var loggedAdd = logDecorator(add);
console.log(loggedAdd(2, 3));
