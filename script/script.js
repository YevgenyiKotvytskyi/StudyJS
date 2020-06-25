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
    additionalExpensesItems = document.querySelectorAll('input.additional_expenses-item'),
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
    depositBank = document.querySelector('.deposit-bank'),
    depositAmount = document.querySelector('.deposit-amount'),
    depositPercent = document.querySelector('.deposit-percent'),
    depositCalc = document.querySelectorAll('.deposit-calc input');
    
let isNumber = function (n) {
    return !isNaN(n) && isFinite(n) && n.trim() !== '';
};

class AppData {

    constructor() {
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

    start() {

        this.budget = +salaryAmount.value;


        this.getCashFlow();

        this.setExpensesMonth();
        this.setIncomeMonth();

        this.getInfoDeposit();
        this.getBudget();
        this.getAdditionnalItems();

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

    showResult() {
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

    addBlock(event) {

        const button = event.target;
        const classPart = event.target.className.split(' ')[1].split('_')[0];
        const items = document.querySelectorAll(`.${classPart}-items`);
        const cloneChildrenItem = items[0].cloneNode(true);
        cloneChildrenItem.querySelectorAll('input').forEach(element => element.value = '');
        items[0].parentNode.insertBefore(cloneChildrenItem, button);
        expensesItems = document.querySelectorAll(`.${classPart}-items`);
        if (items.length === 2) {
            button.style.display = 'none';
        }
    }

    getCashFlow() {

        const count = (element) => {
            const item = element.className.split('-')[0];
            const title = element.querySelector(`.${item}-title`).value;
            const amount = element.querySelector(`.${item}-amount`).value;
            if (title.trim() !== '' && isNumber(amount)) {
                this[item][title] = + amount;
            }
        };

        incomeItems.forEach(count);
        expensesItems.forEach(count);

    }

    getAdditionnalItems() {

        let arrayName;
        let namePart;

        const count = (element) => {
            const value = element.value.trim();

            if (value !== '') {
                value.split(',').forEach(element => {
                    if (element.trim() !== '') this[arrayName].push(element);
                });
            }
        };

        const getName = (items) => {
            let namePart = items[0].className.split('_')[1].split('-')[0];
            return 'add' + namePart[0].toUpperCase() + namePart.substring(1);
        };

        arrayName = getName(additionalIncomeItems);
        additionalIncomeItems.forEach(count);

        arrayName = getName(additionalExpensesItems);
        additionalExpensesItems.forEach(count);

    }

    getAddIcomes() {
        this.addIncome = [];
        additionalIncomeItems.forEach(element => {
            const value = element.value.trim();
            if (value !== '') this.addIncome.push(value);
        });
    }

    setIncomeMonth() {
        let sum = 0;
        for (const property in this.income) {
            sum += +this.income[property];
        }
        this.incomeMonth = sum;
    }

    setExpensesMonth() {
        let sum = 0;
        for (const property in this.expenses) {
            sum += +this.expenses[property];
        }
        this.expensesMonth = sum;
    }

    getBudget() {
        this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
        this.budgetDay = Math.floor(this.budgetMonth / 30) + this.depositAmount * this.depositPercent / 100;
    }

    getTargetMonth() {
        return Math.ceil(parseFloat(targetAmount.value) / this.budgetMonth);
    }

    getStatusIncome() {
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

    calcSavedMoney() {
        return this.budgetMonth * periodSelect.value;
    }

    getInfoDeposit() {
        if (this.deposit) {
            this.depositPercent = depositPercent.value;
            this.depositAmount = depositAmount.value;
        }
    }

    selectHandler(){
        const persent = this.value;
        if ( persent === 'other' ) {
            depositPercent.style.display = 'inline-block';
            depositPercent.disabled = false;
            depositPercent.value = 0;
        } else {
            depositPercent.style.display = 'none';
            depositPercent.disabled = false;
            depositPercent.value = depositBank.value;
        }
    }

    depositHandler(){

        if (checkboxDeposit.checked) {
            this.deposit = true;
            depositBank.style.display = 'inline-block';
            depositAmount.style.display = 'inline-block';
            depositBank.addEventListener('change', this.selectHandler);
            console.log('this: ', this);
        } else {
            this.deposit = false;
            depositBank.style.display = 'none';
            depositAmount.style.display = 'none';
            depositPercent.style.display = 'none';
            depositBank.removeEventListener('change', this.selectHandler);
        }
    }

    eventListener() {

        //const _this = this;

        checkboxDeposit.addEventListener('click',this.depositHandler.bind(this));
        
        startButton.disabled = true;

        salaryAmount.addEventListener('input', this.canCalculate);

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

        //let startAppData = this.start.bind(this);

        calculate.addEventListener('click', (event) => {
            this.start();
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
            this.resetData();
        });

        firstPlus.addEventListener('click', this.addBlock);

        secondPlus.addEventListener('click', this.addBlock);

        periodSelect.addEventListener('pointermove', function changeTitle(event) {
            periodAmount.textContent = periodSelect.value;
        });

    }

    resetData() {

        salaryAmount.value = '';
        incomeItems = document.querySelectorAll('.income-items');
        for (let i = 1; i < incomeItems.length; i++) incomeItems[i].remove();
        incomeItems[0].querySelectorAll('input').forEach(element => element.value = '');

        expensesItems = document.querySelectorAll('.expenses-items');

        for (let i = 1; i < expensesItems.length; i++) expensesItems[i].remove();
        expensesItems[0].querySelectorAll('input').forEach(element => element.value = '');

        additionalExpensesItems[0].value = '';

        for (let i = 0; i < additionalIncomeItems.length; i++) {
            additionalIncomeItems[i].value = '';
        }

        targetAmount.value = '';
        firstPlus.style.display = 'inline-block';
        secondPlus.style.display = 'inline-block';

        result.forEach(element => element.value = '');

        this.reset();
        this.canCalculate();
    }

    canCalculate() {
        startButton.disabled = !isNumber(salaryAmount.value);
    }
}



const appData = new AppData();

appData.eventListener();
appData.start();


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

    additionalExpensesItems[0].value = 'кино, походы, ,';

    for (let i = 0; i < additionalIncomeItems.length; i++) {
        additionalIncomeItems[i].value = `возможный доход ${i + 1}`;
    }

    targetAmount.value = 150000;

    startButton.disabled = !isNumber(salaryAmount.value);
}
