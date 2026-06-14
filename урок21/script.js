const user = {
    name: 'Анна',
    age: 20,
    sayHi: function() {
        console.log(`Привет, меня зовут ${this.name}`);
    }
};

// Вызываем метод через объект - работает
console.log('Через объект:');
user.sayHi();

// Присваиваем метод другой переменной
const sayHiCopy = user.sayHi;

// Вызываем через новую переменную - не работает!
console.log('\nЧерез переменную:');
sayHiCopy();

/*--------------------*/

function introduce(age, hobby) {
    console.log(`Меня зовут ${this.name}, мне ${age} лет, люблю ${hobby}`);
}

// Объекты с разными именами
const userA = { name: 'Анна' };
const userB = { name: 'Коля' };
const userC = { name: 'Маша' };

// call - передаём аргументы через запятую
introduce.call(userA, 20, 'читать');
introduce.call(userB, 15, 'футбол');

// apply - передаём аргументы массивом
introduce.apply(userA, [20, 'читать']);
introduce.apply(userC, [18, 'рисовать']);

// bind - создаёт новую функцию
const introduceAnna = introduce.bind(userA, 20, 'читать');
const introduceKolya = introduce.bind(userB, 15, 'футбол');

introduceAnna();
introduceKolya();