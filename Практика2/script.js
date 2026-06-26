// ============================================
// 1. ДАННЫЕ ВРАГОВ
// ============================================

const enemies = {
    goblin: {
        name: 'Гоблин',
        hp: 30,
        maxHp: 30,
        strength: 8,
        defense: 2,
        exp: 15,
        gold: 10,
        emoji: '👺'
    },
    orc: {
        name: 'Орк',
        hp: 50,
        maxHp: 50,
        strength: 14,
        defense: 4,
        exp: 30,
        gold: 25,
        emoji: '👹'
    },
    dragon: {
        name: 'Дракон',
        hp: 80,
        maxHp: 80,
        strength: 22,
        defense: 8,
        exp: 60,
        gold: 80,
        emoji: '🐉'
    },
    skeleton: {
        name: 'Скелет',
        hp: 25,
        maxHp: 25,
        strength: 10,
        defense: 3,
        exp: 18,
        gold: 12,
        emoji: '💀'
    }
};

// ============================================
// 2. СОСТОЯНИЕ ИГРЫ
// ============================================

let player = {
    name: 'Герой',
    hp: 100,
    maxHp: 100,
    strength: 10,
    defense: 5,
    level: 1,
    exp: 0,
    expNext: 50,
    gold: 0,
    inventory: ['Зелье', 'Зелье']
};

let currentLocation = 'village';
let enemy = null;
let inBattle = false;
let isDefending = false;

// Враги по локациям
const locationEnemies = {
    forest: ['goblin', 'wolf'],
    dungeon: ['orc', 'skeleton'],
    castle: ['dragon']
};

// ============================================
// 3. ФУНКЦИИ ИГРЫ
// ============================================

function addLog(message, type = 'info') {
    const log = document.getElementById('log');
    const div = document.createElement('div');
    div.className = type;
    div.textContent = message;
    log.appendChild(div);
    log.scrollTop = log.scrollHeight;
}

function updateUI() {
    // Статистика
    document.getElementById('name').textContent = player.name;
    document.getElementById('hp').textContent = player.hp;
    document.getElementById('maxHp').textContent = player.maxHp;
    document.getElementById('strength').textContent = player.strength;
    document.getElementById('defense').textContent = player.defense;
    document.getElementById('level').textContent = player.level;
    document.getElementById('gold').textContent = player.gold;
    
    // Локация
    const locationNames = {
        village: 'Деревня',
        forest: 'Лес',
        dungeon: 'Подземелье',
        castle: 'Замок'
    };
    document.getElementById('locationName').textContent = locationNames[currentLocation];
    
    // Инвентарь
    const inv = document.getElementById('inventory');
    if (player.inventory.length === 0) {
        inv.innerHTML = 'Пусто';
    } else {
        let html = '';
        player.inventory.forEach((item, index) => {
            html += `<span class="inventory-item" onclick="useItemByIndex(${index})">${item}</span>`;
        });
        inv.innerHTML = html;
    }
}

function updateActions() {
    const actionsDiv = document.getElementById('actions');
    
    if (inBattle && enemy) {
        actionsDiv.innerHTML = `
            <button onclick="playerAttack()">⚔️ Атаковать</button>
            <button onclick="playerDefend()">🛡️ Защищаться</button>
            <button onclick="useItem()">💊 Использовать предмет</button>
            <button onclick="tryRun()">🏃 Сбежать</button>
        `;
    } else {
        actionsDiv.innerHTML = `
            <button onclick="playerAttack()" disabled>⚔️ Атаковать</button>
            <button onclick="playerDefend()" disabled>🛡️ Защищаться</button>
            <button onclick="useItem()">💊 Использовать предмет</button>
        `;
    }
    
    // Путешествия
    const travelDiv = document.getElementById('travelButtons');
    if (inBattle) {
        travelDiv.innerHTML = '<p style="color: #ff6b6b;">⚔️ Идёт бой! Нельзя уйти.</p>';
        return;
    }
    
    let html = '';
    if (currentLocation !== 'village') {
        html += `<button onclick="goTo('village')">🏘️ Вернуться в деревню</button>`;
    }
    if (currentLocation !== 'forest') {
        html += `<button onclick="goTo('forest')">🌲 Идти в лес</button>`;
    }
    if (currentLocation !== 'dungeon') {
        html += `<button onclick="goTo('dungeon')">🏚️ Идти в подземелье</button>`;
    }
    if (currentLocation !== 'castle') {
        html += `<button onclick="goTo('castle')">🏰 Идти в замок</button>`;
    }
    travelDiv.innerHTML = html;
}

// ============================================
// 4. ПЕРЕМЕЩЕНИЕ
// ============================================

function goTo(location) {
    if (inBattle) {
        addLog('❌ Нельзя уйти во время боя!', 'danger');
        return;
    }
    
    currentLocation = location;
    const locationNames = {
        village: 'Деревню',
        forest: 'Лес',
        dungeon: 'Подземелье',
        castle: 'Замок'
    };
    addLog(`📍 Перешёл в ${locationNames[location]}`, 'info');
    updateUI();
    updateActions();
    
    // Случайная встреча
    if (location !== 'village' && Math.random() < 0.4) {
        const enemiesList = locationEnemies[location] || [];
        if (enemiesList.length > 0) {
            const enemyKey = enemiesList[Math.floor(Math.random() * enemiesList.length)];
            setTimeout(() => startBattle(enemyKey), 500);
        }
    }
}

// ============================================
// 5. БОЕВАЯ СИСТЕМА
// ============================================

function startBattle(enemyKey) {
    if (inBattle) return;
    
    const data = enemies[enemyKey];
    enemy = {
        key: enemyKey,
        name: data.name,
        hp: data.hp,
        maxHp: data.maxHp,
        strength: data.strength,
        defense: data.defense,
        exp: data.exp,
        gold: data.gold,
        emoji: data.emoji
    };
    inBattle = true;
    isDefending = false;
    addLog(`⚔️ ${enemy.emoji} ${enemy.name} напал на тебя!`, 'fight');
    updateUI();
    updateActions();
}

function playerAttack() {
    if (!inBattle || !enemy) return;
    
    // Урон игрока
    const damage = Math.max(1, player.strength - enemy.defense + Math.floor(Math.random() * 5));
    enemy.hp -= damage;
    addLog(`⚔️ Ты нанёс ${damage} урона ${enemy.emoji} ${enemy.name}`, 'fight');
    
    if (enemy.hp <= 0) {
        defeatEnemy();
        return;
    }
    
    enemyAttack();
    updateUI();
}

function playerDefend() {
    if (!inBattle || !enemy) return;
    isDefending = true;
    addLog(`🛡️ Ты готовишься защищаться!`, 'defend');
    updateUI();
}

function enemyAttack() {
    if (!inBattle || !enemy) return;
    if (player.hp <= 0) return;
    
    // Урон врага с учётом защиты
    let damage = Math.max(1, enemy.strength - player.defense + Math.floor(Math.random() * 3));
    let message = `💢 ${enemy.emoji} ${enemy.name} нанёс ${damage} урона`;
    
    if (isDefending) {
        damage = Math.floor(damage / 2);
        message = `🛡️ ${enemy.emoji} ${enemy.name} нанёс ${damage} урона (защита снизила урон)`;
        isDefending = false;
    }
    
    player.hp -= damage;
    addLog(message, 'fight');
    
    if (player.hp <= 0) {
        player.hp = 0;
        addLog('💀 Ты погиб! Игра окончена.', 'danger');
        inBattle = false;
        enemy = null;
        updateUI();
        updateActions();
        return;
    }
    
    updateUI();
}

function defeatEnemy() {
    if (!enemy) return;
    
    enemy.hp = 0;
    addLog(`🎉 ${enemy.emoji} ${enemy.name} повержен!`, 'success');
    
    // Награда
    player.exp += enemy.exp;
    player.gold += enemy.gold;
    addLog(`💰 +${enemy.gold} золота, +${enemy.exp} опыта`, 'loot');
    
    // Шанс выпадения предмета
    if (Math.random() < 0.25) {
        const items = ['Зелье', 'Зелье', 'Эликсир'];
        const item = items[Math.floor(Math.random() * items.length)];
        player.inventory.push(item);
        addLog(`🎒 Найдено: ${item}!`, 'loot');
    }
    
    // Проверка уровня
    while (player.exp >= player.expNext) {
        player.exp -= player.expNext;
        player.level++;
        player.maxHp += 20;
        player.hp = player.maxHp;
        player.strength += 3;
        player.defense += 2;
        player.expNext = Math.floor(player.expNext * 1.5);
        addLog(`🎉 Уровень ${player.level}! Характеристики повышены!`, 'success');
    }
    
    inBattle = false;
    enemy = null;
    isDefending = false;
    updateUI();
    updateActions();
}

function tryRun() {
    if (!inBattle) return;
    
    if (Math.random() < 0.4) {
        addLog('🏃 Ты сбежал!', 'info');
        inBattle = false;
        enemy = null;
        isDefending = false;
        updateUI();
        updateActions();
    } else {
        addLog('❌ Не удалось сбежать!', 'danger');
        enemyAttack();
    }
}

// ============================================
// 6. ИНВЕНТАРЬ
// ============================================

function useItem() {
    if (player.inventory.length === 0) {
        addLog('❌ Инвентарь пуст!', 'danger');
        return;
    }
    
    // Используем первый предмет в инвентаре
    const item = player.inventory[0];
    useItemByIndex(0);
}

function useItemByIndex(index) {
    if (index < 0 || index >= player.inventory.length) {
        addLog('❌ Предмет не найден', 'danger');
        return;
    }
    
    const item = player.inventory[index];
    player.inventory.splice(index, 1);
    
    if (item === 'Зелье') {
        const heal = 30;
        player.hp = Math.min(player.hp + heal, player.maxHp);
        addLog(`💚 Выпил зелье! +${heal} HP`, 'success');
    } else if (item === 'Эликсир') {
        player.hp = player.maxHp;
        addLog(`💚 Выпил эликсир! Полное восстановление!`, 'success');
    } else {
        addLog(`❌ Неизвестный предмет: ${item}`, 'danger');
    }
    
    updateUI();
}

// ============================================
// 7. ЗАПУСК ИГРЫ
// ============================================

addLog('🐉 Добро пожаловать в мир приключений!', 'info');
addLog('👋 Исследуй локации и сражайся с врагами!', 'info');
addLog('💡 Совет: сначала сходи в лес, там слабые враги', 'info');
updateUI();
updateActions();