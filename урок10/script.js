function getAverage(...numbers) {
    if (numbers.length === 0) return 0;

    const sum = numbers.reduce((acc, num) => acc + num, 0);
    return sum / numbers.length;
}

console.log(getAverage(1, 2, 3, 4, 5));
console.log(getAverage(10, 20));
console.log(getAverage());

/*---------------*/


function getUserInfo({ name, age, country }) {
    return `Имя: ${name}, Возраст: ${age}, Страна: ${country}`;
}

const user = {
    name: "Татьяна",
    age: 28,
    country: "Россия"
};

console.log(getUserInfo(user));

/*---------------*/

const book = {
    title: "Мастер и Маргарита",
    author: "Михаил Булгаков",
    publication: {
        year: 1966,
        publisher: "Москва"
    },
    genres: ["роман", "мистика", "сатира"],
    ratings: [4.8, 4.9, 4.7]
};

const {
    title,
    author,
    publication: { year },
    genres: [mainGenre],
    ratings: [firstRating]
} = book;

console.log("Название:", title);
console.log("Автор:", author);
console.log("Год издания:", year);
console.log("Основной жанр:", mainGenre);
console.log("Первый рейтинг:", firstRating); 

/*---------------*/

const fruits = ["яблоко", "банан"];
const extendedFruits = ["апельсин", ...fruits, "груша", "киви"];

console.log(extendedFruits);

/*---------------*/

function hideProductDetails(product) {
    const result = { ...product };
    delete result.price;
    return result;
}

const phone = {
    name: "Galaxy S24",
    category: "Смартфоны",
    price: 89990,
    color: "чёрный",
    specs: {
        ram: "12 ГБ",
        storage: "256 ГБ"
    },
    rating: 4.8
};

const publicPhone = hideProductDetails(phone);

console.log(phone);

console.log(publicPhone);