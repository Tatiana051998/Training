'use strict';


/*
function addNumbers(a, b) {  // ОШИБКА: в строгом режиме нельзя объявить переменную без var/let/const
    result = a + b;
    console.log(result);
}
*/

function addNumbersFixed(a, b) { // ИСПРАВЛЕНИЕ: используем let/const/var
    let result = a + b;
    console.log(`${a} + ${b} = ${result}`);
    return result;
}

addNumbersFixed(5, 3);

/*--------------------*/

/*
function multiply(x, x) { // ОШИБКА: одинаковые имена параметров
    return x * x;
}
*/

function multiplyFixed(a, b) { // ИСПРАВЛЕНИЕ: разные имена параметров
    return a * b;
}

/*------------------------*/

function showThis() {  // В строгом режиме this в глобальной области = undefined
    console.log('this внутри обычной функции:', this);
    return this;
}

showThis();  // В строгом режиме this = undefined

const user = {  // this в методе объекта = сам объект
    name: 'Анна',
    greet: function() {
        console.log(`this в методе объекта:`, this);
        console.log(`Привет, ${this.name}!`);
        return this;
    }
};

user.greet();

const arrowUser = {
    name: 'Коля',
    greet: function() {
        console.log('this в обычной функции:', this);
        console.log('this.name =', this.name);
    }
};

user.greet(); 


/*-----------------*/

const obj = {
    name: 'Тестовый объект',
    value: 42
};

console.log('Объект до попытки удаления:');
console.log('obj:', obj);
console.log('obj.toString:', obj.toString);

/*
delete obj.toString; // ОШИБКА: нельзя удалить встроенное свойство в строгом режиме
*/

delete obj.value;  // МОЖНО: удалить собственное свойство объекта
console.log('После удаления собственного свойства obj.value:');
console.log('obj:', obj);

obj.toString = function() {  // МОЖНО: переопределить метод
    return `[Объект: ${this.name}]`;
};
console.log('   obj.toString (переопределённый):', obj.toString());


if (obj.hasOwnProperty('value')) {
    delete obj.value;
    console.log('Безопасное удаление через hasOwnProperty');
} else {
    console.log('Свойство не принадлежит объекту');
}