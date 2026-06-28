
let countdownId = null;
let isCountdownRunning = false;

const countdownBtn = document.getElementById('startCountdownBtn');
const countdownSeconds = document.getElementById('countdownSeconds');
const countdownDisplay = document.getElementById('countdownDisplay');

countdownBtn.addEventListener('click', function() {
    if (isCountdownRunning) { // Останавливаем текущий отсчёт
        clearTimeout(countdownId);
        isCountdownRunning = false;
        countdownDisplay.textContent = 'Отсчёт остановлен';
        countdownDisplay.className = 'display stopped';
        countdownBtn.textContent = 'Запустить отсчёт';
        console.log('Отсчёт остановлен');
        return;
    }
    
    let seconds = parseInt(countdownSeconds.value) || 10;
    if (seconds < 1) seconds = 1;
    if (seconds > 60) seconds = 60;
    countdownSeconds.value = seconds;
    
    startCountdown(seconds);
});

function startCountdown(seconds) {
    let remaining = seconds;
    isCountdownRunning = true;
    countdownBtn.textContent = 'Остановить';
    countdownDisplay.textContent = `Осталось: ${remaining} сек.`;
    countdownDisplay.className = 'display running';
    console.log(`Отсчёт запущен! Осталось: ${remaining} сек.`);
    
    function tick() {
        remaining--;
        
        if (remaining > 0) {
            countdownDisplay.textContent = `Осталось: ${remaining} сек.`;
            console.log(`Осталось: ${remaining} сек.`);
            countdownId = setTimeout(tick, 1000);
        } else {
            countdownDisplay.textContent = 'ВРЕМЯ ВЫШЛО!';
            countdownDisplay.className = 'display finished';
            console.log('ВРЕМЯ ВЫШЛО!');
            isCountdownRunning = false;
            countdownBtn.textContent = 'Запустить отсчёт';
            countdownId = null;
        }
    }
    
    countdownId = setTimeout(tick, 1000);
}

/*-----------------*/

let waterIntervalId = null;
let waterCount = 0;

const startWaterBtn = document.getElementById('startWaterBtn');
const stopWaterBtn = document.getElementById('stopWaterBtn');
const waterDisplay = document.getElementById('waterDisplay');

startWaterBtn.addEventListener('click', function() {
    if (waterIntervalId) {
        console.log('Напоминание уже запущено');
        return;
    }
    
    waterCount = 0;
    waterIntervalId = setInterval(() => {
        waterCount++;
        const message = `Не забудь выпить воды! (Напоминание #${waterCount})`;
        console.log(message);
        waterDisplay.textContent = message;
        waterDisplay.className = 'display water';
        
        setTimeout(() => {  // Мигание (для эффекта)
            if (waterIntervalId) {
                waterDisplay.textContent = `Напоминание активно (${waterCount} раз)`;
            }
        }, 2000);
    }, 30 * 1000); // Для наглядности установила таймер на 30 секунд (для 30 минут было бы 30 * 60 * 1000)
    
    
    waterDisplay.textContent = 'Напоминание запущено! (каждые 30 минут)';
    waterDisplay.className = 'display running';
    console.log('Напоминание о воде запущено (каждые 30 минут)');
});

stopWaterBtn.addEventListener('click', function() {
    if (waterIntervalId) {
        clearInterval(waterIntervalId);
        waterIntervalId = null;
        waterDisplay.textContent = `Напоминание остановлено. Было ${waterCount} напоминаний.`;
        waterDisplay.className = 'display stopped';
        console.log(`Напоминание остановлено. Всего напоминаний: ${waterCount}`);
    } else {
        console.log('Напоминание не запущено');
        waterDisplay.textContent = 'Напоминание не запущено';
        waterDisplay.className = 'display stopped';
    }
});

/*-----------------*/

let timerIntervalId = null;
let isTimerRunning = false;

const delayInput = document.getElementById('delayInput');
const textInput = document.getElementById('textInput');
const toggleTimerBtn = document.getElementById('toggleTimerBtn');
const clearConsoleBtn = document.getElementById('clearConsoleBtn');
const timerStatus = document.getElementById('timerStatus');

toggleTimerBtn.addEventListener('click', function() {
    if (isTimerRunning) {
        stopTimer();
    } else {
        startTimer();
    }
});

function startTimer() {
    let delay = parseFloat(delayInput.value);
    if (isNaN(delay) || delay <= 0) {
        delay = 1;
        delayInput.value = 1;
    }
    const delayMs = delay * 1000;
    const text = textInput.value || 'Привет, мир!';
    
    // Сразу выводим текст
    console.log(`${text}`);
    
    // Запускаем интервал
    timerIntervalId = setInterval(() => {
        console.log(`${text}`);
    }, delayMs);
    
    isTimerRunning = true;
    toggleTimerBtn.textContent = 'Остановить';
    timerStatus.textContent = `Запущен (каждые ${delay} сек.)`;
    timerStatus.className = 'display running';
    console.log(`Таймер запущен (интервал: ${delay} сек.)`);
}

function stopTimer() {
    if (timerIntervalId) {
        clearInterval(timerIntervalId);
        timerIntervalId = null;
    }
    isTimerRunning = false;
    toggleTimerBtn.textContent = 'Начать вывод';
    timerStatus.textContent = 'Остановлен';
    timerStatus.className = 'display stopped';
    console.log('Таймер остановлен');
}

clearConsoleBtn.addEventListener('click', function() {
    console.clear();
    console.log('Консоль очищена');
});

delayInput.addEventListener('change', function() {  // Если меняется задержка во время работы — перезапускаем
    if (isTimerRunning) {
        console.log('Задержка изменена, перезапуск...');
        stopTimer();
        startTimer();
    }
});