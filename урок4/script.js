const age = 25; // number

console.log('age:', age, typeof age);


const name = "Анна"; // string

console.log('name:', name, typeof name);


let isStudent = true; // boolean

console.log('isStudent:', isStudent, typeof isStudent);


let y = null; // null 

console.log('y:', y, typeof y);


let a; // Undefined

console.log('a:', a, typeof a);


let person = { name: "Татьяна", age: 28 }; // object

console.log('person:', person, typeof person);


let colors = ["красный", "синий", "зелёный"]; // Массив 
console.log('colors:', colors, typeof colors);


let greet = function() { return "Привет!"; }; // function
console.log('greet:', greet, typeof greet);


let book1 = {
  name: "Война и мир",
  author: "Лев Толстой"
};

let book2 = book1; // book2 получает ссылку на тот же объект
book2.name = "Гарри Поттер"; // меняем через book2

console.log(book1.name); 