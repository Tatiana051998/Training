function sumArray(arr) {
    if (arr.length === 0) {  // Если массив пустой, сумма = 0
        return 0;
    }
    
    return arr[0] + sumArray(arr.slice(1));  // Первый элемент + сумма оставшихся
}

const numbers = [1, 2, 3, 4, 5];
console.log(sumArray(numbers));

/*--------------*/

function findMax(arr) {
    if (arr.length === 1) {  // Если в массиве один элемент, он и есть максимальный
        return arr[0];
    }
    
    const maxOfRest = findMax(arr.slice(1));  // Сравниваем первый элемент с максимумом остальных
    return arr[0] > maxOfRest ? arr[0] : maxOfRest;
}

const total = [3, 8, 1, 10, 5, 7];
console.log(findMax(total));

/*----------------*/

const cache = {};

function fibonacci(n) {
    if (n === 0) return 0;
    if (n === 1) return 1;
    
    if (cache[n] !== undefined) return cache[n];
    
    cache[n] = fibonacci(n - 1) + fibonacci(n - 2);
    return cache[n];
}

console.log(fibonacci(5));
console.log(fibonacci(10));
console.log(fibonacci(20));