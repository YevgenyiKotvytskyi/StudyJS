'use strict';

/* jshint -W097 */
/*global
alert, confirm, console, prompt
*/

document.querySelector('h1').innerHTML = "Lesson 5";

let
    money,
    addExpenses = prompt("Перечислите возможные расходы за рассчитываемый период через запятую?", "Кино, Ресторан, поход"),
    deposit = confirm("Есть ли у вас депозит в банке?"),
    income = 900,
    mission = 100000,
    period = 2;


let isNumber = function (n) {
    return !isNaN(n) && isFinite(n);
};

let askNumber = function (question) {
    let num;

    do {
        num = prompt(question);
    }
    while (!isNumber(num));

    return +num;
}

let start = function () {
    money = askNumber("Ваш месячный доход?");
};

start();

console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);

let
    expenses = [];

function getExpensesMonth() {

    let sum = 0;

    for (let i = 0; i < 2; i++) {
        expenses[i] = prompt('Введите обязательную статью расходов?', `Статья ${i + 1}`);
        sum += askNumber(`Во сколько это обойдется? (${expenses[i]})`);
    }
    console.log('expenses: ', expenses);
    return sum;
}

let expensesAmount = getExpensesMonth();

console.log('Расходы за месяц (getExpensesMonth): ', expensesAmount);

function getAccumulatedMonth() {
    return money - expensesAmount;
}

console.log('Вывод возможных расходов в виде массива (addExpenses): ', addExpenses.toLowerCase().split(','));

let accumulatedMonth = getAccumulatedMonth();

function getTargetMonth() {
    return Math.ceil(mission / accumulatedMonth);
}
(getTargetMonth() > 0) ?
    console.log(`Cрок достижения цели (${mission}) в месяцах getTargetMonth(): (accumulatedMonth =  ${accumulatedMonth}) `, getTargetMonth())
    : console.log('Цель не будет достигнута');

const budgetDay = accumulatedMonth / 30;
console.log(`Бюджет на день (money = ${money}): `, Math.floor(budgetDay));

function getStatusIncome() {
    if (budgetDay >= 1200) {
        return "У Вас высокий уровень дохода";
    } else if (budgetDay >= 600) {
        return "У вас средний уровень дохода";
    } else if (budgetDay >= 0) {
        return "К сожалению у вас уровень дохода ниже среднего";
    } else {
        return "Что то пошло не так";
    }
}

console.log('Статус дохода ( getStatusIncome() ): ', getStatusIncome());


