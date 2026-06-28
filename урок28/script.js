function getUserData() {
    return new Promise((resolve) => {
        console.log('Загрузка данных пользователя...');
        setTimeout(() => {
            const user = {
                id: 1,
                name: 'Татьяна',
                age: 28,
                city: 'Выборг'
            };
            console.log('Данные загружены');
            resolve(user);
        }, 2000);
    });
}

function processUserData(user) {
    return new Promise((resolve) => {
        console.log('Обработка данных...');
        setTimeout(() => {
            const processed = {
                ...user,
                description: `${user.name}, ${user.age} лет, из ${user.city}`,
                isAdult: user.age >= 18
            };
            resolve(processed);
        }, 1000);
    });
}

function displayUserData(data) {
    console.log('Результат:', data);
    return data;
}

const task1Btn = document.getElementById('task1Btn');
const task1Result = document.getElementById('task1Result');

task1Btn.addEventListener('click', function() {
    this.disabled = true;
    task1Result.textContent = 'Загрузка... (2 сек)';
    task1Result.className = 'display loading';
    
    getUserData()
        .then(processUserData)
        .then(displayUserData)
        .then((result) => {
            task1Result.innerHTML = `
                Данные обработаны!
                <br><br>
                ${result.description}
                <br>
                ${result.isAdult ? 'Взрослый' : 'Несовершеннолетний'}
                <div class="time">Выполнено</div>
            `;
            task1Result.className = 'display success';
            task1Btn.disabled = false;
            console.log('Задание 1 завершено');
        })
        .catch((error) => {
            task1Result.textContent = 'Ошибка: ' + error.message;
            task1Result.className = 'display error';
            task1Btn.disabled = false;
            console.error('Ошибка:', error);
        });
});

/*-----------------*/

function getData1() {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log('Данные 1 загружены (3 сек)');
            resolve({ id: 1, data: 'Данные из первого источника' });
        }, 3000);
    });
}

function getData2() {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log('Данные 2 загружены (5 сек)');
            resolve({ id: 2, data: 'Данные из второго источника' });
        }, 5000);
    });
}

const task2Btn = document.getElementById('task2Btn');
const task2Result = document.getElementById('task2Result');

task2Btn.addEventListener('click', function() {
    this.disabled = true;
    task2Result.innerHTML = `
        Ожидание данных...
        <div class="time">3 сек + 5 сек</div>
    `;
    task2Result.className = 'display loading';
    
    const startTime = Date.now();
    
    Promise.all([getData1(), getData2()])
        .then((results) => {
            const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
            console.log('Все данные получены:', results);
            
            task2Result.innerHTML = `
                Все данные загружены (${elapsed} сек)
                <br><br>
                Источник 1: ${results[0].data}
                <br>
                Источник 2: ${results[1].data}
                <div class="time">Оба промиса выполнены</div>
            `;
            task2Result.className = 'display success';
            task2Btn.disabled = false;
        })
        .catch((error) => {
            task2Result.textContent = 'Ошибка: ' + error.message;
            task2Result.className = 'display error';
            task2Btn.disabled = false;
            console.error('Ошибка:', error);
        });
});

/*---------------------*/

function getRandomData(name, min, max) {
    const delay = Math.floor(Math.random() * (max - min + 1)) + min;
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                name: name,
                delay: delay,
                data: `Результат от ${name} (через ${delay} сек)`
            });
        }, delay * 1000);
    });
}

const task3Btn = document.getElementById('task3Btn');
const task3Result = document.getElementById('task3Result');

task3Btn.addEventListener('click', function() {
    this.disabled = true;
    task3Result.innerHTML = `
        Гонка запущена...
        <div class="time">Каждый промис от 1 до 5 сек</div>
    `;
    task3Result.className = 'display loading';
    
    const startTime = Date.now();
    
    const promise1 = getRandomData('Промис 1', 1, 5);
    const promise2 = getRandomData('Промис 2', 1, 5);
    
    console.log('Гонка началась!');   // Логируем в консоль для наглядности
    console.log('Промис 1: от 1 до 5 сек');
    console.log('Промис 2: от 1 до 5 сек');
    
    Promise.race([promise1, promise2])
        .then((result) => {
            const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
            console.log(`Победитель: ${result.name} (${result.delay} сек)`);
            
            task3Result.innerHTML = `
                Победитель!
                <br><br>
                ${result.data}
                <br>
                Время: ${elapsed} сек
                <div class="time">Promise.race сработал</div>
            `;
            task3Result.className = 'display success';
            task3Btn.disabled = false;
            
            console.log('Второй промис: всё ещё выполняется...'); // Выводим, что произошло со вторым промисом
        })
        .catch((error) => {
            task3Result.textContent = 'Ошибка: ' + error.message;
            task3Result.className = 'display error';
            task3Btn.disabled = false;
            console.error('Ошибка:', error);
        });
});
