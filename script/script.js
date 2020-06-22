'use strict';

/* jshint -W097 */
/*global
alert, confirm, console, prompt
*/

const mission = 100000;

let

    calculate = document.getElementById('start'),
    plusButtons = document.querySelectorAll('button.btn_plus'),
    firstPlus = plusButtons[0],
    secondPlus = plusButtons[1],
    checkboxDeposit = document.querySelector('#deposit-check'),
    budgetMonthValue = document.querySelector('.budget_month-value'),
    budgetDayValue = document.querySelector('.budget_day-value'),
    expensesMonthValue = document.querySelector('.expenses_month-value'),
    additionalIncomeItems = document.querySelectorAll('input.additional_income-item'),
    additionalIncomeValue = document.querySelector('.additional_income-value'),
    additionalExpensesItem = document.querySelector('.additional_expenses-item'),
    additionalExpensesValue = document.querySelector('.additional_expenses-value'),
    incomePeriodValue = document.querySelector('.income_period-value'),
    salaryAmount = document.querySelector('.salary-amount'),
    incomeTitle = document.querySelector('.income-title'),
    incomeItems = document.querySelectorAll('.income-items'),
    expensesTitle = document.querySelector('.expenses-title'),
    expensesItems = document.querySelectorAll('.expenses-items'),
    targetAmount = document.querySelector('.target-amount'),
    targetMonthValue = document.querySelector('.target_month-value'),
    periodAmount = document.querySelector('.period-amount'),
    periodSelect = document.querySelector('.period-select'),
    startButton = document.getElementById('start'),
    cancelButton = document.getElementById('cancel'),
    result = document.querySelectorAll('.result input'),
    textInput = document.querySelectorAll('.data input[type=text]');


let appData = {
    budget: 0,
    income: {},
    mission: mission,
    expenses: {},
    addIncome: [],
    addExpenses: [],
    incomeMonth: 0,
    expensesMonth: 0,
    budgetMonth: 0,
    budgetDay: 0,
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,

    start() {

        this.budget = +salaryAmount.value;

        this.getExpenses();
        this.setExpensesMonth();

        this.getIncome();
        this.setIncomeMonth();

        this.getBudget();
        this.getAddIcomes();
        this.getAdditionalExpenses();

        this.showResult();

    },

    reset() {
        this.budget = 0;
        this.income = {};
        this.mission = mission;
        this.expenses = {};
        this.addIncome = [];
        this.addExpenses = [];
        this.incomeMonth = 0;
        this.expensesMonth = 0;
        this.budgetMonth = 0;
        this.budgetDay = 0;
        this.deposit = false;
        this.percentDeposit = 0;
        this.moneyDeposit = 0;
    },

    showResult() {
        expensesMonthValue.value = this.expensesMonth;
        budgetMonthValue.value = this.budgetMonth;
        budgetDayValue.value = this.budgetDay;
        additionalExpensesValue.value = this.addExpenses.join(', ');
        additionalIncomeValue.value = this.addIncome.join(', ');
        targetMonthValue.value = this.getTargetMonth();
        incomePeriodValue.value = this.calcSavedMoney();

        periodSelect.addEventListener('pointermove', function caclSaveMoney() {
            incomePeriodValue.value = appData.calcSavedMoney();
        });

    },

    addExpensesBlock() {
        const cloneExpensisItem = expensesItems[0].cloneNode(true);
        cloneExpensisItem.querySelectorAll('input').forEach(element => element.value = '');
        expensesItems[0].parentNode.insertBefore(cloneExpensisItem, secondPlus);
        expensesItems = document.querySelectorAll('.expenses-items');
        if (expensesItems.length === 3) {
            secondPlus.style.display = 'none';
        }

    },

    addIncomeBlock() {
        const cloneIncomeItem = incomeItems[0].cloneNode(true);
        cloneIncomeItem.querySelectorAll('input').forEach(element => element.value = '');
        incomeItems[0].parentNode.insertBefore(cloneIncomeItem, firstPlus);
        incomeItems = document.querySelectorAll('.income-items');
        if (incomeItems.length === 3) {
            firstPlus.style.display = 'none';
        }

    },

    getExpenses() {
        expensesItems.forEach(element => {
            const expensesTitle = element.querySelector('.expenses-title').value;
            const expenesAmount = element.querySelector('.expenses-amount').value;
            this.expenses = [];
            if (expensesTitle.trim() !== '' && isNumber(expenesAmount)) {
                this.expenses[expensesTitle] = + expenesAmount;
            }
        });
    },

    getIncome() {
        incomeItems.forEach(element => {
            const expensesTitle = element.querySelector('.income-title').value;
            const expenesAmount = element.querySelector('.income-amount').value;
            this.income = [];
            if (expensesTitle.trim() !== '' && isNumber(expenesAmount)) {
                this.income[expensesTitle] = + expenesAmount;
            }
        });
    },


    getAdditionalExpenses() {
        this.addExpenses = [];
        additionalExpensesItem.value.split(',').forEach(element => {
            if (element.trim() !== '') {
                this.addExpenses.push(element);
            }
        });
    },

    getAddIcomes() {
        this.addIncome = [];
        additionalIncomeItems.forEach(element => {
            const value = element.value.trim();
            if (value !== '') this.addIncome.push(value);
        });
    },

    setIncomeMonth: function () {
        let sum = 0;
        for (const property in this.income) {
            sum += +this.income[property];
        }
        this.incomeMonth = sum;
    },

    setExpensesMonth: function () {
        let sum = 0;
        for (const property in this.expenses) {
            sum += +this.expenses[property];
        }
        this.expensesMonth = sum;
    },

    getBudget: function () {
        this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
        this.budgetDay = Math.floor(this.budgetMonth / 30);
    },

    getTargetMonth: function () {
        return Math.ceil(parseFloat(targetAmount.value) / this.budgetMonth);
    },

    getStatusIncome: function () {
        let budgetDay = this.budgetDay;
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

    calcSavedMoney() {
        return this.budgetMonth * periodSelect.value;
    }

};

startButton.disabled = true;

function canCalculate() {
    startButton.disabled = !isNumber(salaryAmount.value);
}

salaryAmount.addEventListener('input', canCalculate);

document.querySelector('.data').addEventListener('keypress', function inputControl(event) {
    let charCode = (event.which) ? event.which : event.keyCode;
    let rigtKey = false;
    const punctuationMarks = [32, 44, 46, 58, 59, 63];

    if (event.target.placeholder === 'Сумма' && (charCode > 48 && charCode < 57 || charCode == 46))
        rigtKey = true;

    if (event.target.placeholder === 'Наименование' && (charCode > 1039 && charCode < 1106 ||
        punctuationMarks.includes(charCode)))
        rigtKey = true;

    if (!rigtKey) event.preventDefault();
});

calculate.addEventListener('click', (event) => {
    appData.start();
    startButton.style.display = 'none';
    cancelButton.style.display = 'inline-block';
    textInput.forEach((element) => {
        element.disabled = true;
    });
});

cancelButton.addEventListener('click', (event) => {
    startButton.style.display = 'inline-block';
    cancelButton.style.display = 'none';
    textInput.forEach((element) => {
        element.disabled = false;
    });
    resetData();
});

firstPlus.addEventListener('click', appData.addIncomeBlock);

secondPlus.addEventListener('click', appData.addExpensesBlock);

periodSelect.addEventListener('pointermove', function changeTitle(event) {
    periodAmount.textContent = periodSelect.value;
});

let isNumber = function (n) {
    return !isNaN(n) && isFinite(n) && n.trim() !== '';
};

/* ======== Fill init data for a test ======== */

document.querySelector('h1').addEventListener('click', initData);


function resetData() {

    salaryAmount.value = '';
    incomeItems = document.querySelectorAll('.income-items');
    for (let i = 1; i < incomeItems.length; i++) incomeItems[i].remove();
    incomeItems[0].querySelectorAll('input').forEach(element => element.value = '');

    expensesItems = document.querySelectorAll('.expenses-items');

    for (let i = 1; i < expensesItems.length; i++) expensesItems[i].remove();
    expensesItems[0].querySelectorAll('input').forEach(element => element.value = '');

    additionalExpensesItem.value = '';

    for (let i = 0; i < additionalIncomeItems.length; i++) {
        additionalIncomeItems[i].value = '';
    }

    targetAmount.value = '';
    firstPlus.style.display = 'inline-block';
    secondPlus.style.display = 'inline-block';

    result.forEach(element => element.value = '');

    appData.reset.call(appData);
    canCalculate();

}

function initData() {

    salaryAmount.value = 25000;
    incomeItems = document.querySelectorAll('.income-items');
    for (let i = 0; i < incomeItems.length; i++) {
        incomeItems[i].querySelector('.income-title').value = `Статья доп. дохода ${i + 1}`;
        incomeItems[i].querySelector('.income-amount').value = `${i * 1000 + 500}`;

    }

    expensesItems = document.querySelectorAll('.expenses-items');
    for (let i = 0; i < expensesItems.length; i++) {
        expensesItems[i].querySelector('.expenses-title').value = `Статья расхода ${i + 1}`;
        expensesItems[i].querySelector('.expenses-amount').value = `${(i + 1) * 1000}`;

    }

    additionalExpensesItem.value = 'кино, походы, ,';

    for (let i = 0; i < additionalIncomeItems.length; i++) {
        additionalIncomeItems[i].value = `возможный доход ${i + 1}`;
    }

    targetAmount.value = 150000;

    canCalculate();
}
