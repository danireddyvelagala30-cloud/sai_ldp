// 1. One-liner Arrow Function
const printName = name => `Hi ${name}`;
console.log(printName("Sai"));


// 2. Template Literals
const printBill = (name, bill) => `Hi ${name}, please pay: ${bill}`;
console.log(printBill("Sai", 500));


// 3. Object Destructuring
const person = {
    name: "Noam Chomsky",
    age: 92
};

const { name, age } = person;

console.log(name);
console.log(age);