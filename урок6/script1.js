const numeral = prompt('Введите число:');

if (Number(numeral) > 0) {
    console.log('Число положительное');
} else if (Number(numeral) < 0) {
    console.log('Число отрицательное');
} else if (Number(numeral) === 0) {
    console.log('Число равно нулю');
}