const contactForm = document.getElementById('contactForm');
const contactName = document.getElementById('contactName');
const contactPhone = document.getElementById('contactPhone');
const contactEmail = document.getElementById('contactEmail');
const contactDisplay = document.getElementById('contactDisplay');

contactForm.addEventListener('submit', function(e) {  // Сохранение контакта
    e.preventDefault();
    
    const contact = {
        name: contactName.value.trim(),
        phone: contactPhone.value.trim(),
        email: contactEmail.value.trim()
    };
    
    localStorage.setItem('contact', JSON.stringify(contact));   // Сохраняем в LocalStorage
    
    displayContact(contact);
    console.log('Контакт сохранён:', contact);
    alert('Контакт сохранён!');
    
    contactForm.reset();
});

document.getElementById('loadContactBtn').addEventListener('click', function() {  // Загрузка контакта
    const data = localStorage.getItem('contact');
    
    if (data) {
        const contact = JSON.parse(data);
        displayContact(contact);
        console.log('Контакт загружен:', contact);
    } else {
        contactDisplay.innerHTML = '<span class="empty"> Нет сохранённого контакта</span>';
        console.log('Контакт не найден');
    }
});

document.getElementById('deleteContactBtn').addEventListener('click', function() { // Удаление контакта
    if (confirm('Удалить сохранённый контакт?')) {
        localStorage.removeItem('contact');
        contactDisplay.innerHTML = '<span class="empty">Контакт удалён</span>';
        console.log('Контакт удалён');
    }
});

function displayContact(contact) {
    contactDisplay.innerHTML = `
        <div class="contact-info">
            <strong>Имя:</strong> ${contact.name}<br>
            <strong>Телефон:</strong> ${contact.phone}<br>
            <strong>Email:</strong> ${contact.email}
        </div>
    `;
}

(function loadContactOnStart() {  // Автозагрузка контакта при открытии страницы
    const data = localStorage.getItem('contact');
    if (data) {
        displayContact(JSON.parse(data));
    }
})();


/*------------------*/

const expenseForm = document.getElementById('expenseForm');
const expenseDesc = document.getElementById('expenseDesc');
const expenseAmount = document.getElementById('expenseAmount');
const expenseDate = document.getElementById('expenseDate');
const expenseList = document.getElementById('expenseList');
const totalAmount = document.getElementById('totalAmount');

expenseDate.value = new Date().toISOString().split('T')[0];  // Устанавливаем сегодняшнюю дату по умолчанию

expenseForm.addEventListener('submit', function(e) {  // Добавление расхода
    e.preventDefault();
    
    const expense = {
        id: Date.now(),
        description: expenseDesc.value.trim(),
        amount: parseFloat(expenseAmount.value),
        date: expenseDate.value
    };
    
    let expenses = getExpenses();  // Получаем существующие расходы
    expenses.push(expense);
    
    localStorage.setItem('expenses', JSON.stringify(expenses));  // Сохраняем в LocalStorage
    
    renderExpenses();
    expenseForm.reset();
    expenseDate.value = new Date().toISOString().split('T')[0];
    console.log('Расход добавлен:', expense);
});

function getExpenses() {  // Получение расходов из LocalStorage
    const data = localStorage.getItem('expenses');
    return data ? JSON.parse(data) : [];
}

function deleteExpense(id) {  // Удаление расхода
    let expenses = getExpenses();
    expenses = expenses.filter(exp => exp.id !== id);
    localStorage.setItem('expenses', JSON.stringify(expenses));
    renderExpenses();
    console.log(`Расход с ID ${id} удалён`);
}

document.getElementById('clearExpensesBtn').addEventListener('click', function() {  // Очистка всех расходов
    if (confirm('Удалить все расходы?')) {
        localStorage.removeItem('expenses');
        renderExpenses();
        console.log('Все расходы удалены');
    }
});

function renderExpenses() {  // Отображение расходов
    const expenses = getExpenses();
    
    if (expenses.length === 0) {
        expenseList.innerHTML = '<p class="empty">Нет расходов</p>';
        totalAmount.textContent = '0';
        return;
    }
    
    let html = '';
    let total = 0;
    
    expenses.sort((a, b) => b.id - a.id);   // Сортируем по дате (новые сверху)
    
    expenses.forEach(exp => {
        total += exp.amount;
        html += `
            <div class="expense-item">
                <div class="info">
                    <span class="desc">${exp.description}</span>
                    <span class="amount">${exp.amount} руб.</span>
                    <span class="date">${exp.date}</span>
                </div>
                <button class="delete-btn" onclick="deleteExpense(${exp.id})">✕</button>
            </div>
        `;
    });
    
    expenseList.innerHTML = html;
    totalAmount.textContent = total.toFixed(2);
}

renderExpenses(); // Автозагрузка расходов при открытии страницы

/*-----------------*/

const timerDisplay = document.getElementById('timerDisplay');
let timerInterval;

function getSessionTime() {
    const data = sessionStorage.getItem('sessionTime');
    return data ? parseInt(data) : 0;
}

function saveSessionTime(seconds) {
    sessionStorage.setItem('sessionTime', seconds.toString());
}

function formatTime(seconds) {
    const h = String(Math.floor(seconds / 3600)).padStart(2, '0');
    const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
    const s = String(seconds % 60).padStart(2, '0');
    return `${h}:${m}:${s}`;
}

function updateTimer() {
    let seconds = getSessionTime();
    seconds++;
    saveSessionTime(seconds);
    timerDisplay.textContent = formatTime(seconds);
}

function startTimer() {
    if (timerInterval) clearInterval(timerInterval);
    timerDisplay.textContent = formatTime(getSessionTime());    // Обновляем сразу
    timerInterval = setInterval(updateTimer, 1000);
}

document.getElementById('resetTimerBtn').addEventListener('click', function() {  // Сброс таймера
    if (confirm('Сбросить таймер?')) {
        saveSessionTime(0);
        timerDisplay.textContent = '00:00:00';
        console.log('Таймер сброшен');
    }
});

document.getElementById('clearSessionBtn').addEventListener('click', function() {  // Очистка SessionStorage
    if (confirm('Очистить SessionStorage?')) {
        sessionStorage.clear();
        timerDisplay.textContent = '00:00:00';
        console.log('SessionStorage очищен');
    }
});

startTimer();  // Запускаем таймер
