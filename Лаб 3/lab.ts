// Функция, которая принимает массив чисел и возвращает новый массив, 
// содержащий только числа, кратные заданному числу.

function filter_multiples<T extends number>(array: T[], multiple: T): T[] {
    return array.filter(number => number % multiple === 0)
}

// Функция, которая принимает массив строк и возвращает новую строку, 
// содержащую все строки, объединенные заданным разделителем.

function join_strs<T extends string>(array: T[], separator: T): string {
    return array.join(separator)
}

// Функция, которая принимает массив объектов и возвращает новый массив, 
// отсортированный по значению определенного свойства.

function array_sort<T extends Record<string, any>>(array: T[], property: keyof T): T[] {
    return [...array].sort((a, b) => {
        if(a[property] > b[property]) return 1;
        if(a[property] < b[property]) return -1;
        return 0;
    })
}

// Создайте функцию, которая принимает другую функцию в качестве аргумента и возвращает новую функцию, 
// которая выполняет логирование перед вызовом исходной функции.

function logDecorator<T extends (...args: any[]) => any>(func: T): T {
    return ((...args: Parameters<T>) => {
        console.log(`Arguments: ${JSON.stringify(args)}`);
        return func(...args);
    }) as T
}

// Примеры

// Числа, кратные 3
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const multiples = filter_multiples(numbers, 2);
console.log(multiples);

// Объединение строк
const strings = ['a', 'b', 'c'];
const joinedStrings = join_strs(strings, '^^^');
console.log(joinedStrings);

// Сортировка объектов по свойству
interface Person {
    name: string;
    age: number;
}

const yuras: Person[] = [
    { name: 'Yura', age: 20 },
    { name: 'NeYura', age: 19 },
    { name: 'MegaYura', age: 22 }
];

const sorted = array_sort(yuras, 'name');
console.log(sorted)

// Логирование перед вызовом функции
function add(a: number, b: number): number {
    return a + b;
}

const loggedAdd = logDecorator(add);
console.log(loggedAdd(2, 3));