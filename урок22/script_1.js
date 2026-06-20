function showMessage() {   // Создаём функцию с локальной переменной
    let message = 'Привет, я локальная переменная!';
    console.log(message);
}

showMessage(); // Вызываем функцию - работает

console.log(message); // Пытаемся получить доступ к переменной снаружи (ошибка)

