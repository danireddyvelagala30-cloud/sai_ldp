// ES6 Features Example

// 1. let and const
let firstName = "Sai";
const country = "India";

console.log("Name:", firstName);
console.log("Country:", country);


// 2. Arrow Function
const add = (a, b) => a + b;

console.log("Addition:", add(10, 20));


// 3. Template Literals
console.log(`Welcome ${firstName} from ${country}`);


// 4. Default Parameters
function greet(name = "Guest") {
    console.log(`Hello ${name}`);
}

greet();
greet("Reddy");


// 5. Destructuring (Object)
const student = {
    name: "Sai",
    age: 22,
    course: "JavaScript"
};

const { name, age, course } = student;

console.log(name);
console.log(age);
console.log(course);


// 6. Spread Operator
const numbers1 = [10, 20, 30];
const numbers2 = [40, 50];

const allNumbers = [...numbers1, ...numbers2];

console.log("Spread Operator:", allNumbers);


// 7. Rest Parameter
function total(...marks) {
    let sum = 0;

    for (let mark of marks) {
        sum += mark;
    }

    return sum;
}

console.log("Total Marks:", total(80, 90, 70, 60));


// 8. Class
class Employee {
    constructor(name, salary) {
        this.name = name;
        this.salary = salary;
    }

    display() {
        console.log(`Employee: ${this.name}`);
        console.log(`Salary: ${this.salary}`);
    }
}

const emp1 = new Employee("Sai", 50000);

emp1.display();


// 9. Promise
const promise = new Promise((resolve) => {
    resolve("Promise Executed Successfully");
});

promise.then((message) => {
    console.log(message);
});


// 10. Async / Await
function fetchData() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("Student Data Loaded");
        }, 2000);
    });
}

async function showData() {
    console.log("Loading...");

    const result = await fetchData();

    console.log(result);
}

showData();
