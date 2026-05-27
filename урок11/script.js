const isPalindrome = (str) => {
    const cleanedStr = str.toLowerCase().replace(/\s/g, '');
    return cleanedStr === cleanedStr.split('').reverse().join('');
};

console.log(isPalindrome("казак"));
console.log(isPalindrome("привет"));

/*--------*/

const firstShortestWord = (sentence) => {
    const words = sentence.split(' '); //разбиваем строки на массив слов
    let shortestWord = words[0]; // инициализируем самое короткое слово, допускаем, что это первое слово из масива
    for (let i = 1; i < words.length; i++) {
        if (words[i].length < shortestWord.length) { //задаем цикл проверки всех слов
            shortestWord = words[i];
        }
    }
    
    return shortestWord;
};

console.log(firstShortestWord("Ищем самое короткое слово")); //самое короткое слово "Ищем"

/*--------*/

const createPhoneNumber = (numbers) => {
    const str = numbers.toString(); // преобразуем в строку
    const areaCode = str.slice(0, 3);      // первые 3 цифры
    const firstPart = str.slice(3, 6);     // следующие 3 цифры
    const secondPart = str.slice(6, 9);    // последние 3 цифры
    
    return `8 (${areaCode}) ${firstPart}-${secondPart}`;
};

console.log(createPhoneNumber(12346789));

/*--------*/

const findMinMax = (arr) => {
    const min = Math.min(...arr);
    const max = Math.max(...arr);
    return { min, max };
};

console.log(findMinMax([5, 2, 9, 1, 7, 3]));



const bubbleSort = (arr) => { //// Создаём копию массива, чтобы не изменять оригинал
    const sorted = [...arr];
    
    for (let i = 0; i < sorted.length - 1; i++) {
        for (let j = 0; j < sorted.length - 1 - i; j++) {// Если текущий элемент больше следующего - меняем их местами
            if (sorted[j] > sorted[j + 1]) { // Обмен значениями
                [sorted[j], sorted[j + 1]] = [sorted[j + 1], sorted[j]];
            }
        }
    }
    
    return sorted;
};

console.log(bubbleSort([5, 2, 9, 1, 7, 3])); // [1, 2, 3, 5, 7, 9]