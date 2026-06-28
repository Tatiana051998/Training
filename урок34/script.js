class Book {
    constructor(title, author, pages) {
        this.title = title;
        this.author = author;
        this.pages = pages;
    }

    getInfo() {
        console.log(`Книга: "${this.title}"`);
        console.log(`Автор: ${this.author}`);
        console.log(`Страниц: ${this.pages}`);
    }

    getShortInfo() {
        return `"${this.title}" - ${this.author} (${this.pages} стр.)`;
    }
}

const books = [  // Создаём книги
    new Book('Война и мир', 'Лев Толстой', 1225),
    new Book('Преступление и наказание', 'Фёдор Достоевский', 671),
    new Book('Мастер и Маргарита', 'Михаил Булгаков', 480),
    new Book('Евгений Онегин', 'Александр Пушкин', 368)
];

function renderBooks() {  // Выводим книги на страницу
    const container = document.getElementById('bookList');
    let html = '<ul class="book-list">';
    books.forEach(book => {
        html += `
            <li>
                <span class="title">${book.title}</span>
                <span class="author">— ${book.author}</span>
                <span class="pages">(${book.pages} стр.)</span>
            </li>
        `;
    });
    html += '</ul>';
    container.innerHTML = html;
}

function showBookInfo() {  // Показать книги в консоли
    books.forEach(book => book.getInfo());
    console.log('Кратко:');
    books.forEach(book => console.log('   ' + book.getShortInfo()));
}

/*-----------------*/

class User {
    constructor(name, email) {
        this.name = name;
        this.email = email;
    }

    displayInfo() {
        console.log(`Пользователь: ${this.name}`);
        console.log(`Email: ${this.email}`);
    }

    greet() {
        console.log(`Привет, ${this.name}! Рады тебя видеть.`);
    }
}

const users = [  // Создаём пользователей
    new User('Анна', 'anna@mail.ru'),
    new User('Коля', 'kolya@gmail.com'),
    new User('Маша', 'masha@yandex.ru'),
    new User('Петя', 'petya@outlook.com'),
    new User('Оля', 'olya@inbox.ru')
];

function renderUsers() {  // Выводим пользователей на страницу
    const container = document.getElementById('userList');
    let html = '<ul class="user-list">';
    users.forEach(user => {
        html += `
            <li>
                <span class="name">${user.name}</span>
                <span class="email">${user.email}</span>
            </li>
        `;
    });
    html += '</ul>';
    container.innerHTML = html;
}

function showUserInfo() {  // Показать пользователей в консоли
    users.forEach(user => {
        user.displayInfo();
        user.greet();
        console.log('');
    });
}

/*----------------------*/

class Rectangle {
    constructor(width, height) {
        this._width = width;
        this._height = height;
    }

    get width() {
        return this._width;
    }

    set width(value) {
        if (value > 0) {
            this._width = value;
        } else {
            console.log('Ошибка: ширина должна быть больше 0');
        }
    }

    get height() {
        return this._height;
    }

    set height(value) {
        if (value > 0) {
            this._height = value;
        } else {
            console.log('Ошибка: высота должна быть больше 0');
        }
    }

    get area() {
        return this._width * this._height;
    }

    get perimeter() {
        return 2 * (this._width + this._height);
    }

    displayInfo() {
        console.log(`Прямоугольник:`);
        console.log(`Ширина: ${this._width}`);
        console.log(`Высота: ${this._height}`);
        console.log(`Площадь: ${this.area}`);
        console.log(`Периметр: ${this.perimeter}`);
    }

    getData() {      // Метод для получения копии данных
        return {
            width: this._width,
            height: this._height,
            area: this.area,
            perimeter: this.perimeter
        };
    }
}

//Тестируем прямоугольник
function testRectangle() {
    const rect = new Rectangle(10, 5);   // Создаём новый прямоугольник для тестов
    const results = [];

    function addTest(title, isSuccess, data, error = null) {   // Функция для добавления результата теста
        results.push({ title, success: isSuccess, data, error });
    }

    addTest('Начальные значения', true, rect.getData());   // Начальные значения

    rect.height = 8;      // Сеттер height = 8 (валидное)
    addTest('Сеттер height = 8 (валидное)', true, rect.getData());

    rect.height = -3;    // Сеттер height = -3 (невалидное)
    addTest('Сеттер height = -3 (невалидное)', false, rect.getData(), 'высота должна быть больше 0');

    return results;
}

const rectTests = testRectangle();  // Получаем результаты тестов

function renderRectangleTests() {  // Выводим тесты на страницу
    const container = document.getElementById('rectangleResults');
    let html = '';
    
    rectTests.forEach((test, index) => {
        const status = test.success ? 'success' : 'error';
        const data = test.data;
        html += `
            <div class="rect-test ${status}">
                <div class="title ${status}">${index + 1}. ${test.title}</div>
                <div class="rect-info">
                    <span><span class="label">Ширина:</span> <span class="value">${data.width}</span></span>
                    <span><span class="label">Высота:</span> <span class="value">${data.height}</span></span>
                    <span><span class="label">Площадь:</span> <span class="value green">${data.area}</span></span>
                    <span><span class="label">Периметр:</span> <span class="value green">${data.perimeter}</span></span>
                </div>
                ${test.error ? `<div class="message error">❌ ${test.error}</div>` : ''}
            </div>
        `;
    });
    
    container.innerHTML = html;
}

// Показать тесты прямоугольника в консоли
function showRectangleInfo() {
    
    const testRect = new Rectangle(10, 5);    // Создаём новый прямоугольник для чистого теста
    
    console.log('Начальные значения:');
    testRect.displayInfo();
    
    console.log('Сеттер height = 8 (валидное):');
    testRect.height = 8;
    testRect.displayInfo();
    
    console.log('Сеттер height = -3 (невалидное):');
    testRect.height = -3;
    testRect.displayInfo();
    
    console.log('Проверка всех геттеров:');
    console.log(`Ширина: ${testRect.width}`);
    console.log(`Высота: ${testRect.height}`);
    console.log(`Площадь: ${testRect.area}`);
    console.log(`Периметр: ${testRect.perimeter}`);
    

}

// Рендерим всё на страницу
renderBooks();
renderUsers();
renderRectangleTests();

// Автоматический вывод в консоль при загрузке
showBookInfo();
showUserInfo();
showRectangleInfo();
