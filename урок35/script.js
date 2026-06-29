'use strict';

function Person(name) {  // Конструктор Person
    this.name = name;
}

Person.prototype.introduce = function() {  // Метод introduce в прототипе Person
    return 'Привет, меня зовут ' + this.name;
};

function Student(name, course) {  // Конструктор Student
    Person.call(this, name);      // Наследуем свойства Person
    this.course = course;
}

Student.prototype = Object.create(Person.prototype);  // Наследуем прототип Person
Student.prototype.constructor = Student;  // Исправляем constructor (теперь он указывает на Student)

Student.prototype.introduce = function() {  // Переопределяем метод introduce
    return 'Привет, меня зовут ' + this.name + ', и я учусь на ' + this.course + ' курсе';
};

var person = new Person('Анна');  // Создаём экземпляры
var student = new Student('Коля', 3);

console.log('Созданные объекты:');
console.log('Person:', person);
console.log('Student:', student);
console.log('');

console.log('Вызов методов:');
console.log('person.introduce():', person.introduce());
console.log('student.introduce():', student.introduce());
console.log('');

console.log('Проверка наследования:');
console.log('student instanceof Person:', student instanceof Person);
console.log('student instanceof Student:', student instanceof Student);
console.log('Student.prototype.__proto__ === Person.prototype:', Student.prototype.__proto__ === Person.prototype);
console.log('');

// Исследуем цепочку прототипов
console.log('Цепочка прототипов Student:');
console.log('student → Student.prototype → Person.prototype → Object.prototype → null');
console.log('');

console.log('Student.prototype:', Student.prototype);
console.log('Student.prototype.__proto__:', Student.prototype.__proto__);
console.log('Student.prototype.__proto__ === Person.prototype:', Student.prototype.__proto__ === Person.prototype);
console.log('Person.prototype:', Person.prototype);
console.log('Person.prototype.__proto__:', Person.prototype.__proto__);
console.log('Person.prototype.__proto__ === Object.prototype:', Person.prototype.__proto__ === Object.prototype);
console.log('Object.prototype:', Object.prototype);
console.log('Object.prototype.__proto__:', Object.prototype.__proto__); // null
console.log('');

/*-----------------------------*/

function Employee(name, position) {  // Конструктор Employee
    Person.call(this, name);    // Наследуем свойства Person
    this.position = position;
}

Employee.prototype = Object.create(Person.prototype);  // Наследуем прототип Person
// Исправляем constructor
Employee.prototype.constructor = Employee;

Employee.prototype.work = function() {  // Добавляем метод work
    return 'Я работаю на позиции ' + this.position;
};

Employee.prototype.introduce = function() {  // Переопределяем метод introduce
    return 'Привет, меня зовут ' + this.name + ', я работаю на позиции ' + this.position;
};

var employee = new Employee('Маша', 'разработчик');  // Создаём экземпляр

console.log('Созданный объект:');
console.log('Employee:', employee);
console.log('');

console.log('Вызов методов:');
console.log('employee.introduce():', employee.introduce());
console.log('employee.work():', employee.work());
console.log('');

console.log('Проверка наследования:');
console.log('employee instanceof Person:', employee instanceof Person);
console.log('employee instanceof Employee:', employee instanceof Employee);
console.log('Employee.prototype.__proto__ === Person.prototype:', Employee.prototype.__proto__ === Person.prototype);
console.log('');

console.log('Цепочка прототипов Employee:');
console.log('employee → Employee.prototype → Person.prototype → Object.prototype → null');
console.log('');

/*----------------------------------*/


var Vehicle = {  // Создаём объект Vehicle
    type: 'transport',
    move: function() {
        return this.type + ' движется';
    }
};

var Car = Object.create(Vehicle);  // Создаём объект Car, который наследует от Vehicle

Car.type = 'автомобиль';  // Добавляем свойства и методы Car
Car.brand = 'Toyota';

Car.drive = function() {
    return this.brand + ' едет по дороге';
};

Car.move = function() {  // Переопределяем метод move
    return this.brand + ' (' + this.type + ') движется вперёд';
};

var myCar = Object.create(Car); // Создаём экземпляр
myCar.brand = 'BMW';

console.log('Созданные объекты:');
console.log('Vehicle:', Vehicle);
console.log('Car:', Car);
console.log('myCar:', myCar);
console.log('');

console.log('Вызов методов:');
console.log('Vehicle.move():', Vehicle.move());
console.log('Car.drive():', Car.drive());
console.log('Car.move():', Car.move());
console.log('myCar.drive():', myCar.drive());
console.log('myCar.move():', myCar.move());
console.log('');

console.log('Проверка наследования:');
console.log('myCar.__proto__ === Car:', myCar.__proto__ === Car);
console.log('Car.__proto__ === Vehicle:', Car.__proto__ === Vehicle);
console.log('Vehicle.__proto__ === Object.prototype:', Vehicle.__proto__ === Object.prototype);
console.log('Object.prototype.__proto__:', Object.prototype.__proto__); // null
console.log('');

console.log('Цепочка прототипов (Object.create):');
console.log('myCar → Car → Vehicle → Object.prototype → null');
console.log('');
