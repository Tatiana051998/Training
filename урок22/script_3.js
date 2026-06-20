//Hoisting с var
console.log(x); // undefined
var x = 5;
console.log(x); // 5

/*--------*/

//Hoisting с let 
console.log(y); // Ошибка
let y = 10;

/*------------*/

//Обычная функция
sayHello();

function sayHello() {
    console.log('Привет!');
}

/*--------------*/

//Функциональное выражение
sayHi(); 

const sayHi = function() {
    console.log('Привет!');
};

/*------------*/

// Ошибка с var внутри функции
var name = 'Анна';

function show() {
    console.log(name); // undefined 
    var name = 'Маша';
}

show();