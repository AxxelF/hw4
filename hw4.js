// BFE

// 1
// https://bigfrontend.dev/quiz/var-vs-let
// What does the code snippet to the right output by console.log?

var a = 'BFE';
let b = 'bigfrontend';
console.log(this.a); // 'BFE'
console.log(this.b); // 'bigfrontend'

// Тут я помилився, console.log(this.b) виведе undefined
// Припускаю, що це пов'язане із взаємодією let та this
// Про this мені належить ще дізнатись багато цікавого:)

// Але на https://bigfrontend.dev/ відповідь undefined теж неправильна,
// хоча у консолі вивиодить undefined

// З'ясував про this таке:

// За межами функцій this посилається на глобальний об'єкт, тобто this === window

// У межах функцій this залежить від того, яким чином викликано функцію
// (незалежно від того, суворий режим чи ні)

// Якщо значення примітивне (7 або 'foo'), воно конвертується у Object
// відповідним конструктором - new Number(7) або new String('foo')

// Хм... все одно не зрозуміло, що відбувається

/////////////
/////////////
/////////////

// 2
// https://bigfrontend.dev/quiz/closure-1
// What does the code snippet to the right output by console.log?

let dev = 'bfe';

function a() {
  let dev = 'BFE';
  return function () {
    console.log(dev);
  };
}

dev = 'bigfrontend';

a()(); // 'BFE'

// Таке - a()() - ще не бачив (спойлер - бачив)
// Якщо говорити про звичайний виклик функції - a() - то гадаю, що
// виведе 'BFE', бо let dev всередині функції затіняє глобальний let dev,
// і навіть те, що його значення перезаписане перед викликом, не має сенсу

// Упс, я не помітив вкладену функцію))

// Ну, в принципі те саме повинно бути
// Чи ні - ми викликаємо функцію, а вона ж поверне нам тоді іншу функцію
// Здається, я починаю розуміти, чому такий дивний виклик - a()()
// Я вже вирішував такі завдання на javascript.info, але був невпевненний, що тут та сама ситуація
// Виходить, ми викликаємо зовнішню функцію, а потім внутрішню
// Тоді внутрішня функція візьме значення dev з ОВ зовнішньої і поверне 'BFE'
// Тобто результат той самий, але механізм інший

/////////////
/////////////
/////////////

// 3
// https://bigfrontend.dev/quiz/comparison
// What does the code snippet to the right output by console.log?

console.log(10 > 9); // true
console.log(10 > '9'); // true, бо відбудеться приведення до типу
console.log('10' > 9); // true, бо відбудеться приведення до типу
console.log('10' > '9'); // false, бо це різні строки

// Про всяк випадок додам, що в одному з випадків приведення до типу
// може не відбутись (або не так відбутись) і тоді буде false
// Але чому і який це буде випадок важко сказати
// Якщо припустити, що змінює тип завжди друге значення,
// тоді у передостанньому випадку теж буде false,
// бо у такому разі це фактично той самий вираз, що й останній

// Дарма вагався, вгадав з першого разу))

/////////////
/////////////
/////////////

// PRACTICE

// 1
// Implement a function setCancellableInterval, that acts like setInterval but
// instead of returning a timer ID, it returns a function that when called,
// cancels the interval. The setCancellableInterval function should have the
// exact same signature as setInterval:

// Example:

let i = 0;
// t = 0:

const cancel = setCancellableInterval(() => {
  i++;
}, 10);
// t = 10: i is 1
// t = 20: i is 2

cancel(); // Called at t = 25

// t = 30: i is still 2 because cancel() was called and
// the interval callback has stopped running.

//Якщо я правильно зрозумів умову, тоді так:

function setCancellableInterval() {
  return function clearInt() {
    clearInterval();
  };
}

// Але щось мені підказує, що я зрозумів неправильно

/////////////
/////////////
/////////////

// 2
// Таймер з замиканням
// Створи функцію createTimer, яка повертає об'єкт з методами start, та getTime .
// start розпочинає відлік часу.
// getTime повертає час у секундах від моменту запуску таймера.

// Я знову забув, як це все записати, хоча раніше і дивився в чат,
// і кодив подібне на позаминулому занятті
// Підглянув у hw2, там в мене вже було оце:

function createTimer() {
  let currentTime = Date.now();
  return {
    start: function () {
      return currentTime;
    },
    getTime: function () {
      return currentTime;
    },
  };
}

// Пару разів перебрав цей код, побачив, що обидва методи
// працюють ідентично, тож потрібно доробити getTime:

function createTimer() {
  let currentTime = Date.now();
  let elapsedTime = Date.now() - currentTime * 1000;
  return {
    start: function () {
      return currentTime;
    },
    getTime: function () {
      return elapsedTime;
    },
  };
}

// Щоб отримати результат у секундах, помножуємо його на 1000

// Хаха. Тут відбулася дивна річ. Виявляється, таке рішення теж було у hw2, 
// тільки там нема множення на 1000. Але я помітив тільки перше, що трапилось на очі.
// І навіть таку саму назву для elapsedTime "придумав". Що це, самоплагіат?

/////////////
/////////////
/////////////

// 3
// Функція Clamp
// Implement a function clamp (number, lower, upper) to restrict a number within
// the inclusive lower and upper bounds.

// Function arguments:
// 1. value (number): The number to clamp.
// 2. lower (number): The lower bound.
// 3. upper (number): The upper bound.

// Returns:
// function must return the clumped number

// Examples:
// Тобто функція повинна повернути число, якщо воно входить в діапазон від
// lower до upper, або повернути lower або upper в інших випадках. Дивись
// на приклади.

// Within the bounds, return as-is.
clamp(3, 0, 5); // => 3
// Smaller than the lower bound.
clamp(-10, -3, 5); // => -3
// Bigger than the upper bound.
clamp(10, -5, 5); // => 5

// Зрозуміло:

function clamp(value, lower, upper) {
  if (value <= upper || value >= lower) {
    return value;
  } else if (value < lower) {
    return lower;
  }
  return upper;
}

// Чомусь так не працює
// Ну звичайно, я помилився з вибором оператора ||
// Замінимо його на &&

function clamp(value, lower, upper) {
  if (value <= upper && value >= lower) {
    return value;
  } else if (value < lower) {
    return lower;
  }
  return upper;
}

// Працює!
// Але зробимо ще простіший варіант, без операторів:

function clamp(value, lower, upper) {
  if (value < lower) {
    return lower;
  } else if (value > upper) {
    return upper;
  }
  return value;
}

/////////////
/////////////
/////////////

// 4
// Функція mean
// Implement a function mean(array) that returns the mean (also known as average)
// of the values inside array , which is an array of numbers.

// Examples:
mean([4, 2, 8, 6]); // => 5
mean([1, 2, 3, 4]); // => 2.5
mean([1, 2, 2]); // => 1.6666666666666667

// Спроба 1

function mean(array) {
  let sum = 0;
  for (let i = 0; i < array.length; i++) {
    sum += i; // повинно бути array[i];
  }
  return sum / (array.length + 1);
}

mean([4, 2, 8, 6]); // 1.2

// Спроба 2

function mean(array) {
  let sum = 0;
  for (let i = 0; i < array.length; i++) {
    sum += array[i];
  }
  return sum / (array.length + 1);
}

mean([4, 2, 8, 6]); // 4 (повинно бути 5)

// Спроба 3

function mean(array) {
  let sum = 0;
  for (let i = 0; i < array.length; i++) {
    sum += array[i];
  }
  return sum / array.length + 1;
}

mean([4, 2, 8, 6]); // 6 (повинно бути 5)

// Схоже, не треба до довжини масиву додавати 1,
// бо 0, 1, 2, 3 - це чотири цифри, тобто довжина такого масиву = 4

// Спроба 4

function mean(array) {
  let sum = 0;
  for (let i = 0; i < array.length; i++) {
    sum += array[i];
  }
  return sum / array.length;
}

mean([4, 2, 8, 6]); // 5

// Так все працює!

// Можна ще зробити редьюсом:

function mean(array) {
  let sum = array.reduce();
  return sum / array.length;
}

// Або ще лаконічніше:

const mean = (array) => array.reduce() / array.length;

// Щось не так я зробив з редьюсом:)

// Почитав, подивився приклади, поекспериментував, згадав та переробив як треба:

function mean(array) {
  let sum = array.reduce((sum, elem) => sum + elem);
  return sum / array.length;
}

// Треба було всередині дужок reduce() написати колбек-функцію,
// яка приймає два параметри - акумулятор та елемент
// Таким чином, в акумулятор додаються всі елементи масиву

// Скорочена версія:

function mean(array) {
  return array.reduce((sum, elem) => sum + elem) / array.length;
}

// Однорядкова версія:

const mean = (array) => array.reduce((sum, elem) => sum + elem) / array.length;

// Ура! Я впорався без чату!!!
