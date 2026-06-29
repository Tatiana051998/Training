'use strict';

class Counter {    // Приватное свойство count (доступно только внутри класса)
    #count = 0;

    increment() {    // Метод для увеличения счётчика
        this.#count++;
        console.log(`Увеличено: ${this.#count}`);
        return this.#count;
    }

    decrement() {    // Метод для уменьшения счётчика
        this.#count--;
        console.log(`Уменьшено: ${this.#count}`);
        return this.#count;
    }

    getValue() {    // Метод для отображения значения счётчика
        console.log(`Текущее значение: ${this.#count}`);
        return this.#count;
    }

    reset() {    // Метод для сброса счётчика
        this.#count = 0;
        console.log(`Сброшено: ${this.#count}`);
        return this.#count;
    }
}

const counter = new Counter();  // Создаём экземпляр Counter

console.log('Тестирование Counter:');
counter.increment(); // 1
counter.increment(); // 2
counter.getValue();  // 2
counter.decrement(); // 1
counter.decrement(); // 0
counter.decrement(); // -1
counter.getValue();  // -1
counter.reset();     // 0
counter.getValue();  // 0

console.log('Попытка доступа к приватному свойству:');  // Попытка доступа к приватному свойству (вызовет ошибку)
try {
    console.log('Ошибка: приватное свойство недоступно снаружи');
} catch (error) {
    console.log('Ошибка поймана: приватное свойство защищено');
}
console.log('');

/*-----------------*/

class EmailValidator {
    static isValid(email) {    // Статический метод для проверки email
        if (typeof email !== 'string') return false;  // Простая проверка: есть @ и точка после @
        
        const atIndex = email.indexOf('@');
        if (atIndex === -1) return false;
        
        const dotIndex = email.indexOf('.', atIndex);
        if (dotIndex === -1) return false;
        
        if (atIndex === 0) return false;  // Проверяем, что есть символы до @, между @ и ., и после .
        if (dotIndex === atIndex + 1) return false;
        if (dotIndex === email.length - 1) return false;
        
        return true;
    }
}

// Тестируем статический метод
console.log('Тестирование EmailValidator.isValid():');

const emails = [
    'user@example.com',
    'test@gmail.com',
    'hello@mail.ru',
    'invalid-email',
    'user@',
    '@example.com',
    'user@.com',
    'user@domain.',
    'user@domain.c',
    ''
];

emails.forEach(email => {
    const result = EmailValidator.isValid(email);
    const status = result ? '✅' : '❌';
    console.log(`   ${status} "${email}" → ${result}`);
});

console.log('');

// Попытка создать экземпляр и вызвать метод (не нужно)
console.log('Статический метод вызывается без создания экземпляра:');
console.log('EmailValidator.isValid("test@mail.com"):', EmailValidator.isValid('test@mail.com'));
console.log('');

/*--------------------*/


class Order {
    #items = [];   // Приватное поле для товаров

    constructor(items) {
        if (Array.isArray(items)) {
            this.#items = items;
        }
    }

    #calculateTotal() {    // Приватный метод для расчёта общей стоимости
        let total = 0;
        for (let i = 0; i < this.#items.length; i++) {
            total += this.#items[i].price * this.#items[i].quantity;
        }
        return total;
    }

    getTotal() {    // Публичный метод для получения общей стоимости
        return this.#calculateTotal();
    }

    displayOrder() {    // Метод для отображения информации о заказе
        console.log('Заказ:');
        for (let i = 0; i < this.#items.length; i++) {
            const item = this.#items[i];
            console.log(`   ${item.name} × ${item.quantity} = ${item.price * item.quantity} руб.`);
        }
        console.log(`Итого: ${this.getTotal()} руб.`);
    }
}

const items = [   // Создаём заказ
    { name: 'Ноутбук', price: 50000, quantity: 1 },
    { name: 'Мышь', price: 1500, quantity: 2 },
    { name: 'Коврик', price: 800, quantity: 1 }
];

const order = new Order(items);

console.log('Тестирование Order:');
order.displayOrder();

console.log('Вызов публичного метода getTotal():');
console.log(`Общая стоимость: ${order.getTotal()} руб.`);

// Попытка вызвать приватный метод (вызовет ошибку)
console.log('Попытка вызвать приватный метод #calculateTotal():');
try {
    console.log('Ошибка: приватный метод недоступен снаружи');
} catch (error) {
    console.log('Ошибка поймана: приватный метод защищён');
}

// Попытка доступа к приватному полю
console.log('Попытка доступа к приватному полю #items:');
try {
    console.log('Ошибка: приватное поле недоступно снаружи');
} catch (error) {
    console.log('Ошибка поймана: приватное поле защищено');
}
console.log('');
