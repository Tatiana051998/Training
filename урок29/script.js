function delay(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

async function testDelay() {
    console.log('Начинаем задержку...');
    await delay(2000);
    console.log('Задержка завершена');
}

testDelay();

/*--------------------*/

async function fetchUserData() {
    try {
        console.log('Запрос к API...');
        const response = await fetch('https://jsonplaceholder.typicode.com/users/1');
        const user = await response.json();
        console.log('Данные получены:');
        console.log('Имя:', user.name);
        console.log('Email:', user.email);
        return user;
    } catch (error) {
        console.error('Ошибка:', error.message);
    }
}

fetchUserData();