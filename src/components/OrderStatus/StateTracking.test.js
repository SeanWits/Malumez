import {
    add,
    subtract,
    multiply,
    divide,
    isEven,
    isOdd,
    factorial,
    fibonacci,
    reverseString,
    isPalindrome,
    findMax,
    findMin,
    average,
    convertToUpper,
    convertToLower,
    square,
    cube,
    power,
    sqrt,
    cbrt,
    abs,
    round,
    ceil,
    floor,
    sin,
    cos,
    tan,
    log,
    exp,
    addThreeNumbers,
    subtractThreeNumbers,
    multiplyThreeNumbers,
    divideThreeNumbers,
    maxOfThree,
    minOfThree,
    isPrime,
    gcd,
    lcm,
    isPositive,
    isNegative,
    addMultiple,
    multiplyMultiple,
    convertToCamelCase,
    convertToSnakeCase,
    getRandomInt,
    getRandomFloat
} from './StateTracking';

test('add function', () => {
    expect(add(1, 2)).toBe(3);
    expect(add(-1, -2)).toBe(-3);
    expect(add(0, 0)).toBe(0);
});

test('subtract function', () => {
    expect(subtract(2, 1)).toBe(1);
    expect(subtract(-1, -2)).toBe(1);
    expect(subtract(0, 0)).toBe(0);
});

test('multiply function', () => {
    expect(multiply(2, 3)).toBe(6);
    expect(multiply(-2, 3)).toBe(-6);
    expect(multiply(0, 3)).toBe(0);
});

test('divide function', () => {
    expect(divide(6, 3)).toBe(2);
    expect(() => divide(1, 0)).toThrow('Division by zero');
});

test('isEven function', () => {
    expect(isEven(2)).toBe(true);
    expect(isEven(3)).toBe(false);
});

test('isOdd function', () => {
    expect(isOdd(2)).toBe(false);
    expect(isOdd(3)).toBe(true);
});

test('factorial function', () => {
    expect(factorial(5)).toBe(120);
    expect(factorial(0)).toBe(1);
    expect(factorial(-1)).toBe(-1);
});

test('fibonacci function', () => {
    expect(fibonacci(5)).toBe(5);
    expect(fibonacci(0)).toBe(0);
    expect(fibonacci(-1)).toBe(-1);
});

test('reverseString function', () => {
    expect(reverseString('hello')).toBe('olleh');
    expect(reverseString('')).toBe('');
});

test('isPalindrome function', () => {
    expect(isPalindrome('racecar')).toBe(true);
    expect(isPalindrome('hello')).toBe(false);
});

test('findMax function', () => {
    expect(findMax([1, 2, 3, 4, 5])).toBe(5);
    expect(findMax([-1, -2, -3, -4, -5])).toBe(-1);
});

test('findMin function', () => {
    expect(findMin([1, 2, 3, 4, 5])).toBe(1);
    expect(findMin([-1, -2, -3, -4, -5])).toBe(-5);
});

test('average function', () => {
    expect(average([1, 2, 3, 4, 5])).toBe(3);
    expect(average([10, 20, 30, 40, 50])).toBe(30);
});

test('convertToUpper function', () => {
    expect(convertToUpper('hello')).toBe('HELLO');
    expect(convertToUpper('')).toBe('');
});

test('convertToLower function', () => {
    expect(convertToLower('HELLO')).toBe('hello');
    expect(convertToLower('')).toBe('');
});

test('square function', () => {
    expect(square(3)).toBe(9);
    expect(square(-3)).toBe(9);
});

test('cube function', () => {
    expect(cube(3)).toBe(27);
    expect(cube(-3)).toBe(-27);
});

test('power function', () => {
    expect(power(2, 3)).toBe(8);
    expect(power(3, 2)).toBe(9);
});

test('sqrt function', () => {
    expect(sqrt(9)).toBe(3);
    expect(sqrt(4)).toBe(2);
});

test('cbrt function', () => {
    expect(cbrt(27)).toBe(3);
    expect(cbrt(8)).toBe(2);
});

test('abs function', () => {
    expect(abs(-5)).toBe(5);
    expect(abs(5)).toBe(5);
});

test('round function', () => {
    expect(round(4.5)).toBe(5);
    expect(round(4.4)).toBe(4);
});

test('ceil function', () => {
    expect(ceil(4.5)).toBe(5);
    expect(ceil(4.4)).toBe(5);
});

test('floor function', () => {
    expect(floor(4.5)).toBe(4);
    expect(floor(4.4)).toBe(4);
});

test('sin function', () => {
    expect(sin(0)).toBe(0);
    expect(sin(Math.PI / 2)).toBe(1);
});

test('cos function', () => {
    expect(cos(0)).toBe(1);
    expect(cos(Math.PI / 2)).toBeCloseTo(0);
});

test('tan function', () => {
    expect(tan(0)).toBe(0);
    expect(tan(Math.PI / 4)).toBeCloseTo(1);
});

test('log function', () => {
    expect(log(1)).toBe(0);
    expect(log(Math.E)).toBe(1);
});

test('exp function', () => {
    expect(exp(0)).toBe(1);
    expect(exp(1)).toBe(Math.E);
});

test('addThreeNumbers function', () => {
    expect(addThreeNumbers(1, 2, 3)).toBe(6);
    expect(addThreeNumbers(-1, -2, -3)).toBe(-6);
});

test('subtractThreeNumbers function', () => {
    expect(subtractThreeNumbers(3, 2, 1)).toBe(0);
    expect(subtractThreeNumbers(-1, -2, -3)).toBe(4);
});

test('multiplyThreeNumbers function', () => {
    expect(multiplyThreeNumbers(2, 3, 4)).toBe(24);
    expect(multiplyThreeNumbers(-2, 3, 4)).toBe(-24);
});

test('divideThreeNumbers function', () => {
    expect(divideThreeNumbers(8, 2, 2)).toBe(2);
    expect(() => divideThreeNumbers(8, 0, 2)).toThrow('Division by zero');
});

test('maxOfThree function', () => {
    expect(maxOfThree(1, 2, 3)).toBe(3);
    expect(maxOfThree(-1, -2, -3)).toBe(-1);
});

test('minOfThree function', () => {
    expect(minOfThree(1, 2, 3)).toBe(1);
    expect(minOfThree(-1, -2, -3)).toBe(-3);
});

test('isPrime function', () => {
    expect(isPrime(7)).toBe(true);
    expect(isPrime(4)).toBe(false);
});

test('gcd function', () => {
    expect(gcd(12, 8)).toBe(4);
    expect(gcd(7, 5)).toBe(1);
});

test('lcm function', () => {
    expect(lcm(12, 8)).toBe(24);
    expect(lcm(7, 5)).toBe(35);
});

test('isPositive function', () => {
    expect(isPositive(5)).toBe(true);
    expect(isPositive(-5)).toBe(false);
});

test('isNegative function', () => {
    expect(isNegative(5)).toBe(false);
    expect(isNegative(-5)).toBe(true);
});

test('addMultiple function', () => {
    expect(addMultiple(1, 2, 3, 4)).toBe(10);
    expect(addMultiple(-1, -2, -3, -4)).toBe(-10);
});

test('multiplyMultiple function', () => {
    expect(multiplyMultiple(1, 2, 3, 4)).toBe(24);
    expect(multiplyMultiple(-1, 2, 3, 4)).toBe(-24);
});

test('convertToCamelCase function', () => {
    expect(convertToCamelCase('hello world')).toBe('helloWorld');
    expect(convertToCamelCase('')).toBe('');
});

test('convertToSnakeCase function', () => {
    expect(convertToSnakeCase('Hello World')).toBe('hello_world');
    expect(convertToSnakeCase('')).toBe('');
});

test('getRandomInt function', () => {
    const max = 10;
    for (let i = 0; i < 100; i++) {
        const rand = getRandomInt(max);
        expect(rand).toBeGreaterThanOrEqual(0);
        expect(rand).toBeLessThan(max);
    }
});

test('getRandomFloat function', () => {
    const max = 10;
    for (let i = 0; i < 100; i++) {
        const rand = getRandomFloat(max);
        expect(rand).toBeGreaterThanOrEqual(0);
        expect(rand).toBeLessThan(max);
    }
});
