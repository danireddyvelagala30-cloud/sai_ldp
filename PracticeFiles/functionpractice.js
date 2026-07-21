
// JavaScript Functions Example

// 1. Function Declaration
function greet(name) {
    return "Hello, " + name;
}

console.log("Function Declaration:");
console.log(greet("Sai Reddy"));


// 2. Function Expression
const add = function(a, b) {
    return a + b;
};

console.log("\nFunction Expression:");
console.log("Addition:", add(10, 20));


// 3. Anonymous Function
setTimeout(function() {
    console.log("\nAnonymous Function:");
    console.log("This message appears after 2 seconds.");
}, 2000);


// 4. Arrow Function
const multiply = (a, b) => a * b;

console.log("\nArrow Function:");
console.log("Multiplication:", multiply(5, 6));


// 5. Immediately Invoked Function Expression (IIFE)
(function() {
    console.log("\nIIFE:");
    console.log("This function runs immediately.");
})();


// 6. Callback Function
function calculate(num1, num2, operation) {
    return operation(num1, num2);
}

function subtract(a, b) {
    return a - b;
}

console.log("\nCallback Function:");
console.log("Subtraction:", calculate(20, 5, subtract));


// 7. Constructor Function
function Student(name, age) {
    this.name = name;
    this.age = age;
}

const student1 = new Student("Sai", 22);

console.log("\nConstructor Function:");
console.log(student1);


// 8. Recursive Function
function countdown(n) {
    if (n === 0) {
        console.log("Done!");
        return;
    }

    console.log(n);
    countdown(n - 1);
}

console.log("\nRecursive Function:");
countdown(5);