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
    textInput = document.querySelectorAll('.data input[type=text]'),
    depositCheck = document.querySelector('#deposit-check');

let isNumber = function (n) {
    return !isNaN(n) && isFinite(n) && n.trim() !== '';
};

class AppData {

    constructor () {
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
    }

start () {

    this.budget = +salaryAmount.value;

    this.getExpenses();
    this.setExpensesMonth();

    this.getIncome();
    this.setIncomeMonth();

    this.getBudget();
    this.getAddIcomes();
    this.getAdditionalExpenses();

    this.showResult();
}

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
}

showResult () {
    const _this = this;
    expensesMonthValue.value = this.expensesMonth;
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = this.budgetDay;
    additionalExpensesValue.value = this.addExpenses.join(', ');
    additionalIncomeValue.value = this.addIncome.join(', ');
    targetMonthValue.value = this.getTargetMonth();
    incomePeriodValue.value = this.calcSavedMoney();

    periodSelect.addEventListener('pointermove', function caclSaveMoney() {
        incomePeriodValue.value = _this.calcSavedMoney();
    });

}

addExpensesBlock () {
    const cloneExpensisItem = expensesItems[0].cloneNode(true);
    cloneExpensisItem.querySelectorAll('input').forEach(element => element.value = '');
    expensesItems[0].parentNode.insertBefore(cloneExpensisItem, secondPlus);
    expensesItems = document.querySelectorAll('.expenses-items');
    if (expensesItems.length === 3) {
        secondPlus.style.display = 'none';
    }

}

addIncomeBlock () {
    const cloneIncomeItem = incomeItems[0].cloneNode(true);
    cloneIncomeItem.querySelectorAll('input').forEach(element => element.value = '');
    incomeItems[0].parentNode.insertBefore(cloneIncomeItem, firstPlus);
    incomeItems = document.querySelectorAll('.income-items');
    if (incomeItems.length === 3) {
        firstPlus.style.display = 'none';
    }

}

getExpenses () {
    expensesItems.forEach(element => {
        const expensesTitle = element.querySelector('.expenses-title').value;
        const expenesAmount = element.querySelector('.expenses-amount').value;
        this.expenses = [];
        if (expensesTitle.trim() !== '' && isNumber(expenesAmount)) {
            this.expenses[expensesTitle] = + expenesAmount;
        }
    });
}

getIncome () {
    incomeItems.forEach(element => {
        const expensesTitle = element.querySelector('.income-title').value;
        const expenesAmount = element.querySelector('.income-amount').value;
        this.income = [];
        if (expensesTitle.trim() !== '' && isNumber(expenesAmount)) {
            this.income[expensesTitle] = + expenesAmount;
        }
    });
}

getAdditionalExpenses () {
    this.addExpenses = [];
    additionalExpensesItem.value.split(',').forEach(element => {
        if (element.trim() !== '') {
            this.addExpenses.push(element);
        }
    });
}

getAddIcomes () {
    this.addIncome = [];
    additionalIncomeItems.forEach(element => {
        const value = element.value.trim();
        if (value !== '') this.addIncome.push(value);
    });
}

setIncomeMonth () {
    let sum = 0;
    for (const property in this.income) {
        sum += +this.income[property];
    }
    this.incomeMonth = sum;
}

setExpensesMonth () {
    let sum = 0;
    for (const property in this.expenses) {
        sum += +this.expenses[property];
    }
    this.expensesMonth = sum;
}

getBudget () {
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
    this.budgetDay = Math.floor(this.budgetMonth / 30);
}

getTargetMonth () {
    return Math.ceil(parseFloat(targetAmount.value) / this.budgetMonth);
}

getStatusIncome () {
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
}

calcSavedMoney () {
    return this.budgetMonth * periodSelect.value;
}

eventListener() {

    const _this = this;

    startButton.disabled = true;

    function canCalculate() {
        startButton.disabled = !isNumber(salaryAmount.value);
    }

    salaryAmount.addEventListener('input', canCalculate);

    document.querySelector('.data').addEventListener('keypress', function inputControl(event) {
        const
            key = event.key,
            placeholder = event.target.placeholder;
        let rigtKey = false;

        if (!(placeholder === 'Наименование' || placeholder === 'Сумма') ||
            (placeholder === 'Сумма' && key.match(/\d|\./)) ||
            (placeholder === 'Наименование' && key.match(/[а-яА-Я]|\s|\,|\=|\d|\./)))
            rigtKey = true;

        if (!rigtKey) event.preventDefault();
    });

    let startAppData = _this.start.bind(_this);

    calculate.addEventListener('click', (event) => {
        startAppData();
        startButton.style.display = 'none';
        cancelButton.style.display = 'inline-block';
        textInput.forEach((element) => {
            element.disabled = true;
        });
        depositCheck.disabled = true;
        periodSelect.disabled = true;
    });

    cancelButton.addEventListener('click', (event) => {
        startButton.style.display = 'inline-block';
        cancelButton.style.display = 'none';
        textInput.forEach((element) => {
            element.disabled = false;
        });
        resetData();
    });

    firstPlus.addEventListener('click', _this.addIncomeBlock);

    secondPlus.addEventListener('click', _this.addExpensesBlock);

    periodSelect.addEventListener('pointermove', function changeTitle(event) {
        periodAmount.textContent = periodSelect.value;
    });


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

        _this.reset.call(appData);
        periodSelect.value = 1;
        periodAmount.value = 1;
        canCalculate();
        depositCheck.disabled = false;
        periodSelect.disabled = false;

    }

}

}


const appData = new AppData();

appData.eventListener();

/* ======== Fill init data for a test ======== */


document.querySelector('h1').addEventListener('click', initData);


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

    startButton.disabled = !isNumber(salaryAmount.value);
}
