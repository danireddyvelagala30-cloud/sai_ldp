const add = (a, b) => a + b;

const calculate = (num1, num2, operation) => operation(num1, num2);

const result = calculate(10, 20, add);

console.log("Result:", result);