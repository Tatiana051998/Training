
const height = +prompt("Введите ваш рост в метрах:");
const weight = +prompt("Введите ваш вес в килограммах:");

if (height <= 0 || weight <= 0 || !height || !weight) {
    alert("Ошибка: введите корректные положительные числа!");
} else {
    const bmi = (weight / (height ** 2)).toFixed(2);
    let category;

    switch (true) {
        case (bmi < 18.5):
            category = "Недостаточная масса тела";
            break;
        case (bmi < 25):
            category = "Нормальная масса тела";
            break;
        case (bmi < 30):
            category = "Избыточная масса тела (предожирение)";
            break;
        case (bmi < 35):
            category = "Ожирение I степени";
            break;
        case (bmi < 40):
            category = "Ожирение II степени";
            break;
        default:
            category = "Ожирение III степени (морбидное)";
    }

    alert(`ИМТ: ${bmi}\nКатегория: ${category}`);
}