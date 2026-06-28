const outer = document.getElementById('outer');
const middle = document.getElementById('middle');
const inner = document.getElementById('inner');

outer.addEventListener('click', function() { // Добавляем обработчики на все три элемента
    console.log('Клик по ВНЕШНЕМУ элементу (красный)');
});

middle.addEventListener('click', function() {
    console.log('Клик по СРЕДНЕМУ элементу (жёлтый)');
});

inner.addEventListener('click', function() {
    console.log('Клик по ВНУТРЕННЕМУ элементу (зелёный)');
});

console.log('Кликни на зелёный блок, чтобы увидеть всплытие');

/*----------------*/

const outer2 = document.getElementById('outer2');
const middle2 = document.getElementById('middle2');
const inner2 = document.getElementById('inner2');

outer2.addEventListener('click', function() {
    console.log('Клик по ВНЕШНЕМУ элементу (красный) - задание 2');
});

middle2.addEventListener('click', function(e) {
    e.stopPropagation(); // ОСТАНАВЛИВАЕМ ВСПЛЫТИЕ!
    console.log('Клик по СРЕДНЕМУ элементу (жёлтый) - задание 2');
});

inner2.addEventListener('click', function() {
    console.log('Клик по ВНУТРЕННЕМУ элементу (зелёный) - задание 2');
});

console.log('Кликни на зелёный блок - всплытие остановлено на жёлтом');

/*-----------------------*/

document.getElementById('task1ResetBtn').addEventListener('click', function() {
    console.clear();
    console.log('Консоль очищена (задание 1)');
});

document.getElementById('task2ResetBtn').addEventListener('click', function() {
    console.clear();
    console.log('Консоль очищена (задание 2)');
});

/*-------------------*/

const form = document.getElementById('testForm');
const formStatus = document.getElementById('formStatus');

form.addEventListener('input', function(e) { // ИСПОЛЬЗУЕМ ДЕЛЕГИРОВАНИЕ - один обработчик на всю форму!
    if (e.target && e.target.classList.contains('form-input')) { // Проверяем, что событие пришло от поля ввода
        const input = e.target;
        const value = input.value;
        const isValid = value.length <= 20;
        
        if (isValid) { // Меняем стиль
            input.classList.remove('invalid');
            input.classList.add('valid');
        } else {
            input.classList.remove('valid');
            input.classList.add('invalid');
        }
        
        const messageSpan = input.nextElementSibling;  // Показываем сообщение
        if (messageSpan && messageSpan.classList.contains('validation-message')) {
            if (!isValid) {
                messageSpan.textContent = `Слишком длинно! (${value.length}/20)`;
                messageSpan.style.color = '#e74c3c';
            } else {
                messageSpan.textContent = `Допустимая длина (${value.length}/20)`;
                messageSpan.style.color = '#2ecc71';
            }
        }
        
        updateFormStatus(); // Обновляем статус
    }
});

form.addEventListener('submit', function(e) { // Валидация при отправке
    e.preventDefault();
    
    const inputs = form.querySelectorAll('.form-input');
    let allValid = true;
    
    inputs.forEach(input => {
        if (input.value.length > 20) {
            allValid = false;
            input.classList.add('invalid');
        }
    });
    
    if (allValid) {
        formStatus.textContent = 'Форма отправлена успешно!';
        formStatus.className = 'display success';
        console.log('Форма отправлена');
    } else {
        formStatus.textContent = 'Есть поля с ошибками! Исправьте их.';
        formStatus.className = 'display error';
        console.log('Отправка отменена - есть ошибки');
    }
});

function updateFormStatus() { // Обновление статуса формы
    const inputs = form.querySelectorAll('.form-input');
    let allValid = true;
    let emptyFields = 0;
    
    inputs.forEach(input => {
        if (input.value.length > 20) allValid = false;
        if (input.value === '') emptyFields++;
    });
    
    if (emptyFields === inputs.length) {
        formStatus.textContent = 'Заполните поля (максимум 20 символов)';
        formStatus.className = 'display';
    } else if (allValid) {
        formStatus.textContent = 'Все поля заполнены корректно! Можно отправлять.';
        formStatus.className = 'display success';
    } else {
        formStatus.textContent = 'Некоторые поля превышают 20 символов';
        formStatus.className = 'display error';
    }
}

console.log('Форма с делегированием событий готова');