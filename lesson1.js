'use strict';

/* jshint -W097 */
/*global
alert, confirm, console, prompt
*/

document.querySelector('h1').innerHTML = "Lesson 6";

let  money;


let isNumber = function (n) {
    return !isNaN(n) && isFinite(n);
};

start();


let appData = {
    budget: money,
    income: {},
    mission: 100000,
    expenses: {},
    addExpenses: [],
    period: 2,
    deposit: false,

    asking: function () {
        let addExpenses = prompt("Перечислите возможные расходы через запятую.","Кино, Поход");
        appData.addExpenses = addExpenses.toLowerCase().split(',');
        appData.deposit = confirm("Есть ли у вас депозит в банке?");
    },

    setExpensesMonth: function() {

        appData.expenses = {};
        let currentExpence;
        for (let i = 0; i < 2; i++) {
            currentExpence = prompt('Введите обязательную статью расходов?', `Статья ${i + 1}`);
            if ( !(( currentExpence.trim() == '') ||  (currentExpence == null))) {
                appData.expenses[currentExpence] = askNumber(`Во сколько это обойдется? (${currentExpence})`);
            }
        }
    },

    getExpensesMonth: function() {

        let sum = 0;

        for (const property in appData.expenses){
            sum += +appData.expenses[property];
        }
        return sum;
    },

    getAccumulatedMonth: function () {
        return appData.budget - appData.getExpensesMonth();
    },

    getTargetMonth: function () {
        return Math.ceil(appData.mission / appData.getAccumulatedMonth());
    },

    getStatusIncome: function () {
        let budgetDay = appData.getBudgetDay();
        if (budgetDay >= 1200) {
            return "У Вас высокий уровень дохода";
        } else if (budgetDay >= 600) {
            return "У вас средний уровень дохода";
        } else if (budgetDay >= 0) {
            return "К сожалению у вас уровень дохода ниже среднего";
        } else {
            return "Что то пошло не так";
        }
    },

    getBudgetDay : function() {
        return Math.floor(appData.getAccumulatedMonth() / 30);
    }

};

function askNumber(question) {
    let num;

    do {
        num = prompt(question);
    }
    while (!isNumber(num));

    return +num;
}

function start() {
    money = askNumber("Ваш месячный доход?");
}

appData.asking();

appData.setExpensesMonth();

console.log('Расходы за месяц (getExpensesMonth): ', appData.getExpensesMonth());

console.log('Вывод возможных расходов в виде массива (addExpenses): ', appData.addExpenses);


(appData.getTargetMonth() > 0) ?
    console.log(`Cрок достижения цели (${appData.mission}) в месяцах getTargetMonth(): (accumulatedMonth =  ${appData.getAccumulatedMonth()}) `, appData.getTargetMonth())
    : console.log('Цель не будет достигнута');

console.log(`Бюджет на день (money = ${appData.budget}): `, appData.getBudgetDay());

console.log('Статус дохода ( appData.getStatusIncome() ): ', appData.getStatusIncome());

