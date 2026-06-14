const student = {  // Создаём объект
    name: 'Анна',
    age: 20,
    address: { city: 'Москва' },
    grades: [5, 4, 5]
};
        
const copy1 = { ...student };  // Делаем поверхностную копию
        
// Изменяем копию
copy1.age = 21;
copy1.address.city = 'СПб';
copy1.grades[0] = 3;
        
console.log('Копия после изменений:', copy1);
console.log('Оригинал после изменений:', student);
        
/*---------------------*/
        
// Создаём объект с методом
const user = {
    name: 'Коля',
    age: 15,
    sayHi: function() {
        console.log(`Привет, я ${this.name}`);
    }
};
        
console.log('Оригинал с методом:', user);
user.sayHi(); // Работает
        
// Копируем через JSON
const userCopy = JSON.parse(JSON.stringify(user));
        
console.log('Копия через JSON:', userCopy);
console.log('Метод sayHi есть в копии?', typeof userCopy.sayHi);
        
/*----------------*/
        
// Функция глубокого копирования
function deepCopy(obj) {
// Если это примитив или null - возвращаем как есть
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }
            
// Если это массив - копируем каждый элемент
    if (Array.isArray(obj)) {
        const arrCopy = [];
        for (let i = 0; i < obj.length; i++) {
            arrCopy[i] = deepCopy(obj[i]);
        }
        return arrCopy;
    }
            
// Если это объект - копируем все свойства
    const objCopy = {};
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            objCopy[key] = deepCopy(obj[key]);
        }
    }
    return objCopy;
}
        
// Тестируем глубокое копирование
const original = {
    name: 'Маша',
    age: 18,
    address: { city: 'Казань' },
    hobbies: ['рисование', 'музыка']
};
        
console.log('Оригинал:', original);
        
// Делаем глубокую копию
const deepCopyObj = deepCopy(original);
        
// Изменяем копию
deepCopyObj.address.city = 'Новосибирск';
deepCopyObj.hobbies[0] = 'танцы';
        
console.log('Глубокая копия после изменений:', deepCopyObj);
console.log('Оригинал после изменений:', original);
        