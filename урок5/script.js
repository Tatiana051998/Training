console.log (2*2+2)

const degToRad = (deg) => deg * Math.PI / 180; // формула перевода градусов в радианы
const sin54 = Math.sin(degToRad(54)); // синус 54 градусов в радианах
const cos16 = Math.cos(degToRad(16)); //косинус 16 градусов в радианах
const multi = sin54 * cos16; // перемножаем значения
const squaring = Math.pow(multi, 2); // возводим значение в квадрат
const result = Math.round(squaring) // округляем результат
console.log(result);


const resultUnderRoot = 13.2 * 71.90; // умножение под корнем
const sqrtResult = Math.sqrt(resultUnderRoot); // извлекаем корень из результата 1
const numerator = 16 * sqrtResult; // умножаем 16 на полученный результат 1
const sevenFive = Math.pow(7, 5); // возводим 7 в 5-ю степень
const denominator = 2.4 / sevenFive; //делим 2.4 на результат выше
const fraction = numerator / denominator; // делим значения большой дроби
const squareRoot49 = Math.sqrt(49); // находим корень из 49 (получается 7)
const rightPart = Math.pow(3, squareRoot49); //возводим 3 в 7-ю степень
const sumPart = fraction + rightPart; // складываем результат большой дроби и правой части
const twoSeven = Math.pow(2, 7); // возводим 2 в 7-ю степень
const multiResult = sumPart * twoSeven; // перемножаем 2 части примера
const finalResult = Math.round(multiResult) // округляем полученный результат

console.log(finalResult);


const num1 = 4;
const num2 = 7;
const num3 = 10;
const num4 = 15;

const isEven = (num) => {
  if (num % 2 === 0) {
    console.log(`${num} — чётное число`);
  } else {
    console.log(`${num} — нечётное число`);
  }
};


isEven(num1);
isEven(num2);
isEven(num3);
isEven(num4);


let name = "Татьяна";

if (name) {
  console.log(`Hello, ${name}!`);
} else {
  console.log("Hello, Guest!");
}