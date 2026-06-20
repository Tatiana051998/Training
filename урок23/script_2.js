// Внешняя функция (уровень 1)
function outerFunction() {
    let outerVar = 'Я из внешней функции';
    
    // Внутренняя функция (уровень 2)
    function middleFunction() {
        let middleVar = 'Я из средней функции';
        
        // Самая внутренняя функция (уровень 3)
        function innerFunction() {
            let innerVar = 'Я из внутренней функции';
            
            // Используем переменные со всех уровней
            console.log(outerVar);   // Из внешней
            console.log(middleVar);  // Из средней
            console.log(innerVar);   // Из внутренней
        }
        
        return innerFunction;
    }
    
    return middleFunction;
}

// Создаём цепочку функций
const middle = outerFunction();
const inner = middle();
inner();