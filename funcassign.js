// Function to perform addition
function add(a, b) {
    return a + b;
}

// Higher-order function (accepts another function as a parameter)
function calculate(num1, num2, operation) {
    return operation(num1, num2);
}

// Passing the add function as an argument
let result = calculate(10, 20, add);

console.log("Result:", result);