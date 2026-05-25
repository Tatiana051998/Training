const numbers = [5, 7, 3, 11]
const squares = numbers.map (num => num*num)

console.log(squares);

/*--------------*/

const arr = [1, 2, 2, 3, 4, 5, 5, 5, 6];
const unique = [...new Set(arr)];
console.log(unique);

/*--------------*/

const numeral = [1, 2, 3];
const sum = numeral.reduce((total, numeral) => total + numeral, 0);
console.log(sum);

/*--------------*/

const myArray = [1, 2, 3, 4, 5];

function reverseArray(arr) {
    for (let i = 0; i < arr.length / 2; i++) {
        [arr[i], arr[arr.length - i - 1]] = [arr[arr.length - i - 1], arr[i]];
    }
    return arr;
}

console.log(reverseArray(myArray)); 

/*--------------*/

let stringLet = "Первая строка";  // Переменная с let
stringLet = "Изменённая первая строка";

console.log(stringLet); // Изменилась успешно

let arrayLet = [1, 2, 3]; // Массив с let
arrayLet = [7, 8, 9];

console.log(arrayLet); // Изменился успешно


arrayLet.unshift(10); // Добавляем элемент в начало
arrayLet.pop();   // Удаляем последний элемент
console.log(arrayLet);

const stringConst = "Вторая строка"; // Переменная с const
stringConst = "Изменённая вторая строка"; 

console.log(stringConst);//Ошибка

const arrayConst = [4, 5, 6];// Массив с const
arrayConst = [10, 11, 12];

console.log(arrayConst);//Ошибка

arrayConst.unshift(10); // Добавляем элемент
arrayConst.pop();   // Удаляем последний элемент
console.log(arrayConst); //Должно сработать, но в консоли не отображается из-за первой ошибки