const printName = (name) => `Hi ${name}`;
console.log(printName("Sai"));
const printBill = (name, bill) => `Hi ${name}, please pay: ${bill}`;
console.log(printBill("Sai", 500));
const displayPerson = ({ name, age }) => {
    console.log(name);
    console.log(age);
};const person = {
    name: "Noam Chomsky",
    age: 92
};

displayPerson(person);