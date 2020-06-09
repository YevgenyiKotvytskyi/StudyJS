'use strict';

/* jshint -W097 */
/*global
alert, confirm, console, prompt
*/

let
    // #2.1
    money = +(prompt("Ваш месячный доход?")),
    //# 2.2
    addExpenses = prompt("Перечислите возможные расходы за рассчитываемый период через запятую?"),
    //# 2.3
    deposit = confirm("Есть ли у вас депозит в банке? (Да/Нет)"),
    income = 900,

    mission = 10000,
    period = 2;

//#region Lesson 03

console.log("\n\nLesson 03");


(deposit) ? console.log('Есть депозит в банке.') : console.log('Нет депозита в банке.');

// #5
let
    expenses1 = prompt("Введите обязательную статью расходов?"),
    amount1 = parseFloat(prompt("Во сколько это обойдется?")),
    expenses2 = prompt("Введите обязательную статью расходов?"),
    amount2 = parseFloat(prompt("Во сколько это обойдется?"));

// #6    


console.log('addExpenses: ', addExpenses.split(','));

let obligatoryExpends = amount1 + amount2;

//#6
let budgetMonth = money - obligatoryExpends;
console.log('Бюджет на месяц: ', budgetMonth);

//#7
let monthMission = Math.ceil(mission / budgetMonth);
console.log(`Цель заработать ${mission} рублей/долларов/гривень.`);
console.log('Цель будет достигнута за, мес.: ', monthMission);

//#8
let budgetDay = budgetMonth / 30;
console.log('Бюджет на день: ', Math.floor(budgetDay));

//#9

if (budgetDay >= 1200) {
    console.log("У Вас высокий уровень дохода");
} else if (budgetDay >= 600) {
    console.log("У вас средний уровень дохода");
} else if (budgetDay >= 0) {
    console.log("К сожалению у вас уровень дохода ниже среднего");
} else {
    console.log("Что то пошло не так");
}

//#endregion Lesson 03