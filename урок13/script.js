function hasEvenNumber(arr) {

  let foundEven = false;

  for (let i = 0; i < arr.length; i++) {

    if (arr[i] % 2 === 0) {

      foundEven = true;

    } /*else if (arr[i] % 2 !== 0) {

      foundEven = false;

    }*/
   // Лишний кусок, функция перезаписывает foundEven на каждом шаге цикла. 
   // Если после чётного числа встретится нечётное, то foundEven снова станет false

  }

  return foundEven;

}

console.log(hasEvenNumber([1, 3, 4, 5])); // Ожидается: true
// Функция только устанавливает true при нахождении чётного числа, 
// но никогда не сбрасывает обратно. Если хотя бы один раз встретилось чётное число, 
// foundEven останется true.
// 

/*------------------*/

function calculateAverage(numbers) {

    let sum = 0;

  for (let i = 0; i < numbers.length; i++) { // Ошибка была в знаке =

    /*debugger;*/
    sum += numbers[i];

  }

  return sum / numbers.length;

}

console.log(calculateAverage([2, 4, 6])); // Ожидается: 4
//Массив [2, 4, 6] имеет длину 3
//Индексы элементов: 0, 1, 2
//Цикл i <= 3 пытался взять numbers[3] (которого нет) → undefined
//sum + undefined даёт NaN


/*-------------*/

function findLargestNumber(arr) {
  let largest = arr[0];  // Заменяем 0 на arr[0], потому то largest = 0 не подходит для отрицательных чисел.
  
  for (let i = 0; i < arr.length; i++) {
    /*console.log(arr[i], largest, arr[i] > largest);*/
    // Вывод: -10 0 false, -20 0 false, -30 0 false
0
    if (arr[i] > largest) {
      largest = arr[i];
    }
  }
  
  return largest;
}

console.log(findLargestNumber([-10, -20, -30]));// Ожидается: -10