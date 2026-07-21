
// JavaScript Operators Example

// Variables
let a = 20;
let b = 10;

console.log("Value of a:", a);
console.log("Value of b:", b);

// 1. Arithmetic Operators

console.log("\n--- Arithmetic Operators ---");
console.log("Addition:", a + b);
console.log("Subtraction:", a - b);
console.log("Multiplication:", a * b);
console.log("Division:", a / b);
console.log("Modulus:", a % b);
console.log("Power:", a ** 2);

// 2. Assignment Operators

console.log("\n--- Assignment Operators ---");

let x = 5;

x += 2;
console.log("x += 2 =", x);

x -= 1;
console.log("x -= 1 =", x);

x *= 3;
console.log("x *= 3 =", x);

x /= 2;
console.log("x /= 2 =", x);

// 3. Comparison Operators

console.log("\n--- Comparison Operators ---");

console.log("a == b :", a == b);
console.log("a === b :", a === b);
console.log("a != b :", a != b);
console.log("a > b :", a > b);
console.log("a < b :", a < b);
console.log("a >= b :", a >= b);
console.log("a <= b :", a <= b);

// 4. Logical Operators

console.log("\n--- Logical Operators ---");

let age = 22;
let hasID = true;

console.log(age >= 18 && hasID);
console.log(age < 18 || hasID);
console.log(!hasID);

// 5. Increment & Decrement

console.log("\n--- Increment & Decrement ---");

let count = 10;

count++;
console.log("After Increment:", count);

count--;
console.log("After Decrement:", count);

// 6. String Operator

console.log("\n--- String Operator ---");

let firstName = "Sai";
let lastName = "Reddy";

let fullName = firstName + " " + lastName;

console.log(fullName);

// 7. Ternary Operator

console.log("\n--- Ternary Operator ---");

let marks = 80;

let result = marks >= 35 ? "Pass" : "Fail";

console.log(result);

// 8. Type Operator

console.log("\n--- Type Operator ---");

console.log(typeof a);
console.log(typeof fullName);
console.log(typeof hasID);

let numbers = [1, 2, 3];

console.log(numbers instanceof Array);