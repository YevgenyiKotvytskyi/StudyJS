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
    expensesMonth: 0,
    budgetMonth: 0,
    budgetDay: 0,
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

        let sum = 0;

        for (const property in appData.expenses){
            sum += +appData.expenses[property];
        }
        appData.expensesMonth = sum;
    },

    getBudget: function () {
        appData.budgetMonth = appData.budget - appData.expensesMonth;
        appData.budgetDay = Math.floor(appData.budgetMonth / 30);
    },

    getTargetMonth: function () {
        return Math.ceil(appData.mission / appData.budgetMonth);
    },

    getStatusIncome: function () {
        let budgetDay = appData.budgetDay;
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

appData.getBudget();

console.log('Расходы за месяц (appData.expensesMonth): ', appData.expensesMonth);

(appData.getTargetMonth() > 0) ?
    console.log(`Cрок достижения цели (${appData.mission}) в месяцах getTargetMonth(): (accumulatedMonth =  ${appData.budgetMonth}) `, appData.getTargetMonth())
    : console.log('Цель не будет достигнута');

console.log(`Статус дохода ( appData.budgetDay = ${appData.budgetDay} ): `, appData.getStatusIncome());

