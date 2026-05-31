const me = {
    name: 'Татьяна',
    age: 28,
    hobbies: ['чтение', 'вязание', 'кино'],
    greet: function() {
        console.log('Hello!');
    }
};

// Вывод
console.log(me);
console.log(me.name, me.age);
console.log(me['hobbies']);
me.greet();

// Добавление
me.city = 'Выборг';
me.job = 'программист';
console.log(me);

// Изменение
me.age = 29;
me.hobbies.push('спорт');
me.greet = function() {
    console.log(`Привет, я ${me.name}`);
};
console.log(me);
me.greet();

// Удаление
delete me.job;
delete me.city;
console.log(me);