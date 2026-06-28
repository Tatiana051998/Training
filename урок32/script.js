const API_URL = 'https://jsonplaceholder.typicode.com';


const postForm = document.getElementById('postForm');
const postUserId = document.getElementById('postUserId');
const postTitle = document.getElementById('postTitle');
const postBody = document.getElementById('postBody');
const postResponse = document.getElementById('postResponse');

postForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const newPost = {
        userId: parseInt(postUserId.value),
        title: postTitle.value.trim(),
        body: postBody.value.trim()
    };
    
    postResponse.innerHTML = 'Отправка данных...';
    postResponse.className = 'display';
    
    try {
        const response = await fetch(`${API_URL}/posts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newPost)
        });
        
        const data = await response.json();
        
        postResponse.innerHTML = `
            Пост создан!
            <br><br>
            <strong>ID:</strong> ${data.id}<br>
            <strong>User ID:</strong> ${data.userId}<br>
            <strong>Заголовок:</strong> ${data.title}<br>
            <strong>Текст:</strong> ${data.body}
        `;
        postResponse.className = 'display success';
        console.log('POST запрос выполнен:', data);
        
        postForm.reset();
        postUserId.value = 1;
        
    } catch (error) {
        postResponse.innerHTML = `Ошибка: ${error.message}`;
        postResponse.className = 'display error';
        console.error('Ошибка POST:', error);
    }
});


/*--------------------*/

const postsList = document.getElementById('postsList');
const loadPostsBtn = document.getElementById('loadPostsBtn');
const clearPostsBtn = document.getElementById('clearPostsBtn');

loadPostsBtn.addEventListener('click', async function() {
    postsList.innerHTML = '<p class="empty">Загрузка постов...</p>';
    
    try {
        const response = await fetch(`${API_URL}/posts?_limit=10`);
        const posts = await response.json();
        
        if (posts.length === 0) {
            postsList.innerHTML = '<p class="empty">Посты не найдены</p>';
            return;
        }
        
        let html = '';
        posts.forEach(post => {
            html += `
                <div class="post-item" data-post-id="${post.id}">
                    <div class="post-title">${post.title}</div>
                    <div class="post-body">${post.body}</div>
                    <div class="post-meta">ID: ${post.id} | 👤 User ID: ${post.userId}</div>
                </div>
            `;
        });
        
        postsList.innerHTML = html;
        console.log(`Загружено ${posts.length} постов`);
        
    } catch (error) {
        postsList.innerHTML = `<p class="empty">Ошибка: ${error.message}</p>`;
        console.error('Ошибка GET:', error);
    }
});

clearPostsBtn.addEventListener('click', function() {
    postsList.innerHTML = '<p class="empty">Список очищен</p>';
    console.log('Список постов очищен');
});

/*-------------------*/

const deletePostId = document.getElementById('deletePostId');
const deletePostBtn = document.getElementById('deletePostBtn');
const deleteResponse = document.getElementById('deleteResponse');

deletePostBtn.addEventListener('click', async function() {
    const id = parseInt(deletePostId.value);
    
    if (!id || id < 1) {
        deleteResponse.innerHTML = 'Введите корректный ID поста (число > 0)';
        deleteResponse.className = 'display error';
        return;
    }
    
    deleteResponse.innerHTML = `Удаление поста с ID ${id}...`;
    deleteResponse.className = 'display';
    
    try {
        const response = await fetch(`${API_URL}/posts/${id}`, {
            method: 'DELETE'
        });
        
        if (response.ok) {
            deleteResponse.innerHTML = `
                Пост с ID ${id} успешно удалён!
                <br>
                <span style="color: #888; font-size: 12px;">Статус: ${response.status}</span>
            `;
            deleteResponse.className = 'display success';
            console.log(`DELETE запрос выполнен для поста ${id}`);
            
            const postElement = document.querySelector(`.post-item[data-post-id="${id}"]`);// Удаляем пост из списка на странице
            if (postElement) {
                postElement.style.opacity = '0.3';
                postElement.style.textDecoration = 'line-through';
                setTimeout(() => postElement.remove(), 500);
            }
            
            deletePostId.value = '';
        } else {
            deleteResponse.innerHTML = `Ошибка: пост с ID ${id} не найден (статус: ${response.status})`;
            deleteResponse.className = 'display error';
        }
        
    } catch (error) {
        deleteResponse.innerHTML = `Ошибка: ${error.message}`;
        deleteResponse.className = 'display error';
        console.error('Ошибка DELETE:', error);
    }
});

/*-------------------*/

const userForm = document.getElementById('userForm');
const userId = document.getElementById('userId');
const userName = document.getElementById('userName');
const userEmail = document.getElementById('userEmail');
const userResponse = document.getElementById('userResponse');
const loadUserBtn = document.getElementById('loadUserBtn');

loadUserBtn.addEventListener('click', async function() {  // Загрузка пользователя
    const id = parseInt(userId.value);
    
    if (!id || id < 1) {
        userResponse.innerHTML = 'Введите корректный ID пользователя';
        userResponse.className = 'display error';
        return;
    }
    
    userResponse.innerHTML = `Загрузка пользователя с ID ${id}...`;
    userResponse.className = 'display';
    
    try {
        const response = await fetch(`${API_URL}/users/${id}`);
        
        if (!response.ok) {
            throw new Error(`Пользователь с ID ${id} не найден`);
        }
        
        const user = await response.json();
        
        userName.value = user.name || '';
        userEmail.value = user.email || '';
        
        userResponse.innerHTML = `
            Пользователь загружен!
            <br><br>
            <strong>ID:</strong> ${user.id}<br>
            <strong>Имя:</strong> ${user.name}<br>
            <strong>mail:</strong> ${user.email}<br>
            <strong>Телефон:</strong> ${user.phone || 'не указан'}<br>
            <strong>Компания:</strong> ${user.company?.name || 'не указана'}
        `;
        userResponse.className = 'display success';
        console.log('Пользователь загружен:', user);
        
    } catch (error) {
        userResponse.innerHTML = `${error.message}`;
        userResponse.className = 'display error';
        console.error('Ошибка загрузки:', error);
    }
});

userForm.addEventListener('submit', async function(e) {  // Обновление пользователя (PUT)
    e.preventDefault();
    
    const id = parseInt(userId.value);
    const name = userName.value.trim();
    const email = userEmail.value.trim();
    
    if (!id || id < 1) {
        userResponse.innerHTML = 'Введите корректный ID пользователя';
        userResponse.className = 'display error';
        return;
    }
    
    if (!name || !email) {
        userResponse.innerHTML = 'Заполните все поля';
        userResponse.className = 'display error';
        return;
    }
    
    const updatedUser = {
        id: id,
        name: name,
        email: email,
        // PUT заменяет ВЕСЬ объект, поэтому добавляем остальные поля
        username: 'updated_user',
        phone: '8-800-555-35-35',
        website: 'example.com',
        address: {
            street: 'Updated Street',
            suite: 'Apt. 123',
            city: 'Updated City',
            zipcode: '12345'
        },
        company: {
            name: 'Updated Company',
            catchPhrase: 'Updated catch phrase',
            bs: 'updated bs'
        }
    };
    
    userResponse.innerHTML = `Отправка PUT запроса для пользователя ${id}...`;
    userResponse.className = 'display';
    
    try {
        const response = await fetch(`${API_URL}/users/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedUser)
        });
        
        const data = await response.json();
        
        userResponse.innerHTML = `
            Пользователь обновлён!
            <br><br>
            <strong>ID:</strong> ${data.id}<br>
            <strong>Имя:</strong> ${data.name}<br>
            <strong>Email:</strong> ${data.email}<br>
            <strong>Телефон:</strong> ${data.phone}<br>
            <span style="color: #888; font-size: 12px;">Метод: PUT (полная замена)</span>
        `;
        userResponse.className = 'display success';
        console.log('PUT запрос выполнен:', data);
        
    } catch (error) {
        userResponse.innerHTML = `Ошибка: ${error.message}`;
        userResponse.className = 'display error';
        console.error('Ошибка PUT:', error);
    }
});
