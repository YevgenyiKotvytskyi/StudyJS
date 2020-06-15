'use strict';

/* jshint -W097 */
/*global
alert, confirm, console, prompt
*/

document.querySelector('h1').innerHTML = "Lesson 6";

let money;


let isNumber = function (n) {
    return !isNaN(n) && isFinite(n) && n.trim() !== '';
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
    percentDeposit: 0,
    moneyDeposit: 0,

    asking: function () {

        if (confirm("У Вас есть дополнительный заработок?")) {
            const incomeName = askText('Какой вид дополнительного заработка вы имеете?', 'Консультирование');
            const amount = askNumber('Введите сумму заработка', '1500');
            appData.income[incomeName] = amount;
        }

        let addExpenses = askText("Перечислите возможные расходы через запятую.", "Кино, Поход");
        appData.addExpenses = addExpenses.toLowerCase().split(',');

        appData.deposit = confirm("Есть ли у вас депозит в банке?");
        appData.getInfoDeposit();
    },

    setExpensesMonth: function () {

        appData.expenses = {};
        let currentExpence;
        for (let i = 0; i < 2; i++) {
            currentExpence = prompt('Введите обязательную статью расходов?', `Статья ${i + 1}`);
            if (!((currentExpence.trim() == '') || (currentExpence == null))) {
                appData.expenses[currentExpence] = askNumber(`Во сколько это обойдется? (${currentExpence})`, (i + 1) * 1000);
            }
        }

        let sum = 0;

        for (const property in appData.expenses) {
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
    },

    getInfoDeposit() {
        if (appData.deposit) {
            appData.percentDeposit = askNumber('Какой годовой процент?', '10');
            appData.moneyDeposit = askNumber('Какая сумма депозита?', '15000');
        }
    },

    calcSavedMoney() {
        return appData.budgetMonth * appData.period;
    }

};

function askNumber(question, help = '') {
    let num;

    do {
        num = prompt(question, help);
    }
    while (!isNumber(num) || num === null);

    return +num;
}

function askText(question, help = 0) {
    let text;

    do {
        text = prompt(question, help);
    }
    while (isNumber(text) || text === null || text.trim() == '');
    return text;
}


function start() {
    money = askNumber("Ваш месячный доход?", 50000);
}

appData.asking();

appData.setExpensesMonth();

appData.getBudget();

console.log('Расходы за месяц (appData.expensesMonth): ', appData.expensesMonth);

(appData.getTargetMonth() > 0) ?
    console.log(`Cрок достижения цели (${appData.mission}) в месяцах getTargetMonth(): (accumulatedMonth =  ${appData.budgetMonth}) `, appData.getTargetMonth())
    : console.log('Цель не будет достигнута');

console.log(`Статус дохода ( appData.budgetDay = ${appData.budgetDay} ): `, appData.getStatusIncome());

(function () {
    let result = '';
    for (const item of appData.addExpenses) {
        result += ', ' + item.trim()[0].toUpperCase() + item.trim().slice(1);
    }
    result = result.slice(2);
    console.log(result);
}());