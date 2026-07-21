let userName: string = "Sai";
let age: number = 22;
let isStudent: boolean = true;

console.log("Name:", userName);
console.log("Age:", age);
console.log("Student:", isStudent);

// Function
function add(a: number, b: number): number {
    return a + b;
}

console.log("Addition:", add(10, 20));

// Arrow Function
const multiply = (a: number, b: number): number => {
    return a * b;
};

console.log("Multiplication:", multiply(5, 6));

// Array
let subjects: string[] = [
    "HTML",
    "CSS",
    "JavaScript",
    "TypeScript"
];

console.log("Subjects:");
subjects.forEach((subject) => {
    console.log(subject);
});

// Object
let employee = {
    id: 101,
    empName: "Reddy",
    salary: 50000
};

console.log("Employee Details");
console.log(employee);

// Interface
interface Student {
    id: number;
    studentName: string;
    course: string;
}

let student: Student = {
    id: 1,
    studentName: "Sai",
    course: "TypeScript"
};

console.log("Student Details");
console.log(student);

// Union Type
let result: string | number;

result = "Pass";
console.log(result);

result = 95;
console.log(result);

// Enum
enum Days {
    Monday,
    Tuesday,
    Wednesday,
    Thursday,
    Friday
}

console.log("Enum Value:", Days.Wednesday);

// Class
class Person {

    personName: string;
    personAge: number;

    constructor(personName: string, personAge: number) {
        this.personName = personName;
        this.personAge = personAge;
    }

    display(): void {
        console.log("Person Name:", this.personName);
        console.log("Person Age:", this.personAge);
    }
}

let person1 = new Person("Sai", 22);

person1.display();

// Inheritance
class Animal {

    speak(): void {
        console.log("Animal speaks");
    }

}

class Dog extends Animal {

    bark(): void {
        console.log("Dog barks");
    }

}

let dog = new Dog();

dog.speak();
dog.bark();

// Optional Parameter
function greet(person: string, city?: string): void {

    console.log("Hello", person);

    if (city) {
        console.log("City:", city);
    }

}

greet("Sai");
greet("Reddy", "Hyderabad");

// Type Alias
type Product = {

    id: number;
    productName: string;
    price: number;

};

let product: Product = {

    id: 1001,
    productName: "Laptop",
    price: 55000

};

console.log("Product Details");
console.log(product);
