const mathOperation = (arr) => arr.map(num => num * 2);

console.log(mathOperation([1, 2, 3, 4, 5]));

/*------------------*/

const user = {
    name: 'Анна',
    age: 20,
    sayHi: function() {
        setTimeout(() => {
            console.log(`Привет, меня зовут ${this.name}`);
        }, 1000);
    }
};

user.sayHi();

/*-------------------*/

const applyToAll = (arr, func) => arr.map(func);

const numbers = [1, 2, 3, 4, 5];

console.log(applyToAll(numbers, n => n * 2));
console.log(applyToAll(numbers, n => n + 10));
console.log(applyToAll(numbers, n => n % 2));