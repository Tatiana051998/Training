function safeDivide(a, b) {
    if (b === 0) {
        throw new Error('Деление на ноль невозможно');
    }
    return a / b;
}

try {
    console.log(safeDivide(10, 2)); // 5
    console.log(safeDivide(10, 0)); // Будет ошибка
    console.log(safeDivide(5, 0));  // Не выполнится
} catch (error) {
    console.log('Ошибка:', error.message);
}

/*-----------------------*/

function transformJSON(jsonString) {
    try {
        const obj = JSON.parse(jsonString);
        console.log('JSON успешно разобран');
        return obj;
    } catch (error) {
        console.log('Ошибка парсинга JSON:', error.message);
        return null;
    }
}

const validJSON = '{"name": "Анна", "age": 20}';
const invalidJSON = '{"name": "Анна", "age": 20'; 

console.log(transformJSON(validJSON));
console.log(transformJSON(invalidJSON));

/*-------------------*/

function checkAccess(age) {
    if (age < 18) {
        throw new Error('Доступ запрещен');
    }
    console.log('Доступ разрешен');
    return true;
}

try {
    checkAccess(20);
    checkAccess(15);
} catch (error) {
    console.log('Ошибка:', error.message);
}