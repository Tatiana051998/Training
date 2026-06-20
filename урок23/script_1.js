function createCounter() {
    let count = 0; // Переменная внешней функции
    
    return function() { // Внутренняя функция (замыкание)
        count++; // Имеет доступ к переменной count
        console.log('Счётчик:', count);
        return count;
    };
}

const counter = createCounter(); // Создаём счётчик

counter(); // Вызываем внутреннюю функцию
counter();
counter();

console.log(count); // Переменная count НЕ доступна снаружи

