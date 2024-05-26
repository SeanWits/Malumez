export function add(a, b) {
    return a + b;
}

export function subtract(a, b) {
    return a - b;
}

export function multiply(a, b) {
    return a * b;
}

export function divide(a, b) {
    if (b === 0) {
        throw new Error('Division by zero');
    }
    return a / b;
}

export function isEven(num) {
    return num % 2 === 0;
}

export function isOdd(num) {
    return num % 2 !== 0;
}

export function factorial(n) {
    if (n < 0) return -1;
    if (n === 0) return 1;
    return n * factorial(n - 1);
}

export function fibonacci(n) {
    if (n < 0) return -1;
    if (n === 0) return 0;
    if (n === 1) return 1;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

export function reverseString(str) {
    return str.split('').reverse().join('');
}

export function isPalindrome(str) {
    const reversed = reverseString(str);
    return str === reversed;
}

export function findMax(arr) {
    return Math.max(...arr);
}

export function findMin(arr) {
    return Math.min(...arr);
}

export function average(arr) {
    const sum = arr.reduce((acc, val) => acc + val, 0);
    return sum / arr.length;
}

export function convertToUpper(str) {
    return str.toUpperCase();
}

export function convertToLower(str) {
    return str.toLowerCase();
}

export function square(num) {
    return num * num;
}

export function cube(num) {
    return num * num * num;
}

export function power(base, exponent) {
    return Math.pow(base, exponent);
}

export function sqrt(num) {
    return Math.sqrt(num);
}

export function cbrt(num) {
    return Math.cbrt(num);
}

export function abs(num) {
    return Math.abs(num);
}

export function round(num) {
    return Math.round(num);
}

export function ceil(num) {
    return Math.ceil(num);
}

export function floor(num) {
    return Math.floor(num);
}

export function sin(angle) {
    return Math.sin(angle);
}

export function cos(angle) {
    return Math.cos(angle);
}

export function tan(angle) {
    return Math.tan(angle);
}

export function log(num) {
    return Math.log(num);
}

export function exp(num) {
    return Math.exp(num);
}

export function addThreeNumbers(a, b, c) {
    return a + b + c;
}

export function subtractThreeNumbers(a, b, c) {
    return a - b - c;
}

export function multiplyThreeNumbers(a, b, c) {
    return a * b * c;
}

export function divideThreeNumbers(a, b, c) {
    if (b === 0 || c === 0) {
        throw new Error('Division by zero');
    }
    return a / b / c;
}

export function maxOfThree(a, b, c) {
    return Math.max(a, b, c);
}

export function minOfThree(a, b, c) {
    return Math.min(a, b, c);
}

export function isPrime(num) {
    if (num <= 1) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) return false;
    }
    return true;
}

export function gcd(a, b) {
    if (b === 0) {
        return a;
    }
    return gcd(b, a % b);
}

export function lcm(a, b) {
    return (a * b) / gcd(a, b);
}

export function isPositive(num) {
    return num > 0;
}

export function isNegative(num) {
    return num < 0;
}

export function addMultiple(...args) {
    return args.reduce((acc, val) => acc + val, 0);
}

export function multiplyMultiple(...args) {
    return args.reduce((acc, val) => acc * val, 1);
}

export function convertToCamelCase(str) {
    return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match, index) => 
        index === 0 ? match.toLowerCase() : match.toUpperCase()).replace(/\s+/g, '');
}

export function convertToSnakeCase(str) {
    return str.toLowerCase().replace(/\s+/g, '_');
}

export function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

export function getRandomFloat(max) {
    return Math.random() * max;
}
