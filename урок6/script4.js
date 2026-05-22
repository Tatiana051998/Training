const hour = +prompt("Введите час (0–23):");

let message;

switch (true) {
    case (hour >= 0 && hour <= 5):
        message = "Сейчас ночь.";
        break;
    case (hour >= 6 && hour <= 11):
        message = "Сейчас утро.";
        break;
    case (hour >= 12 && hour <= 17):
        message = "Сейчас день.";
        break;
    case (hour >= 18 && hour <= 23):
        message = "Сейчас вечер.";
        break;
    default:
        message = "Ошибка: введите число от 0 до 23.";
}

alert(message);