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

    mission = 100000,
    period = 2;
//#region Lesson 02

console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);
//#endregion Lesson 02


//#region Lesson 03

// #5
let
    expenses1 = prompt("Введите обязательную статью расходов?"),
    amount1 = parseFloat(prompt("Во сколько это обойдется?")),
    expenses2 = prompt("Введите обязательную статью расходов?"),
    amount2 = parseFloat(prompt("Во сколько это обойдется?"));


//#endregion Lesson 03

//#region Lesson 04
document.querySelector('h1').innerHTML = "Lesson 4";
console.log("\n\nLesson 04");


//#1
function getExpensesMonth() {
    return amount1 + amount2;
}
console.log('Расходы за месяц (getExpensesMonth): ', getExpensesMonth() );

//#2
function getAccumulatedMonth() {
    let sumAddExpenses = 0;
    addExpenses.split(',').forEach(element => {
        sumAddExpenses += +(element);
    });
    return money - getExpensesMonth() - sumAddExpenses;
}

console.log('Вывод возможных расходов в виде массива (addExpenses): ', addExpenses.split(','));

//#3
let accumulatedMonth = getAccumulatedMonth();

//#4
function getTargetMonth() {
    return Math.ceil( mission/accumulatedMonth );
}
console.log(`Cрок достижения цели (${mission}) в месяцах getTargetMonth(): (accumulatedMonth =  ${accumulatedMonth}) `, getTargetMonth());

//#6 
const budgetDay = accumulatedMonth / 30;
console.log(`Бюджет на день (money = ${money}): `, Math.floor(budgetDay));

//№7
function getStatusIncome(){
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

//#endregion Lesson 04
