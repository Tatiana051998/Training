// 1 задание
// Возьмите следующий код и приведите его в соответствие с общепринятым стандартом форматирования,
// соблюдая отступы, выравнивание и правила расстановки пробелов:
/*function multiply(a,b){
  return a*b;
}
const person ={name:'Alice',age:30};
if(person.age>18){console.log('Adult');}
else{console.log('Minor');}*/

function multiply(a, b) {
	return a * b;
}

/*----------*/

const person = { name: 'Alice', age: 30 };
if (person.age > 18) {
	console.log('Adult');
} else {
	console.log('Minor');
}
// 2 задание
// Представьте, что вы работаете в команде, и вам нужно сделать код понятным для всех участников.
// Перепишите следующий код, используя понятные и логичные имена переменных и функций:
/*function x(a, b) {
  let c = a * b;
  return c;
}
let d = x(5, 10);*/


function multiplyNumbers(firstNumber, secondNumber) {
  const product = firstNumber * secondNumber;
  return product;
}

const result = multiplyNumbers(5, 10);

// 3 задание
// Убедитесь, что в коде используется единый стиль оформления. В следующем коде присутствуют смешанные стили кавычек,
// разное использование var, let, и const, а также различное форматирование объектов и массивов. Исправьте код:
/* let items = ["apple", 'banana', "orange"];
let price = {apple: 1, banana: 2, orange:3 };
const total = price['apple'] + price["banana"] + price.orange;

function calculateTotal(items) {
  return items.reduce(function(total, item) {return total + item.price; }, 0); }*/

const items = ['apple', 'banana', 'orange'];
const prices = {
  apple: 1,
  banana: 2,
  orange: 3
};
const total = prices.apple + prices.banana + prices.orange;

function calculateTotal(items) {
  return items.reduce((total, item) => {
    return total + item.price;
  }, 0);
}

// 4 задание
// Создайте функцию validateForm, которая принимает объект формы с полями name, email и password.
// Она должна выполнять проверки для каждого поля. Если какое-то поле не заполнено или содержит неверные данные,
// функция должна сразу возвращать ошибку, используя guard expressions. Если все данные верны,
// функция должна возвращать сообщение "Форма успешно отправлена".

function validateForm(formData) {
  if (!formData.name) return 'Ошибка: имя не заполнено';
  if (!formData.email) return 'Ошибка: email не заполнен';
  if (!formData.email.includes('@')) return 'Ошибка: email должен содержать @';
  if (!formData.password) return 'Ошибка: пароль не заполнен';
  if (formData.password.length < 3) return 'Ошибка: пароль слишком короткий';
  
  return 'Форма успешно отправлена';
}