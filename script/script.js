'use strict';

/* jshint -W097 */
/*global
alert, confirm, console, prompt
*/

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
    salaryAmount= document.querySelector('.salary-amount'),
    incomeTitle = document.querySelector('.income-title'),
    incomeItems = document.querySelectorAll('.income-items'),
    expensesTitle= document.querySelector('.expenses-title'),
    expensesItems = document.querySelectorAll('.expenses-items'),
    targetAmount= document.querySelector('.target-amount'),
    targetMonthValue = document.querySelector('.target_month-value'),
    periodAmount = document.querySelector('.period-amount'),
    periodSelect= document.querySelector('.period-select'),
    startButton = document.getElementById('start');

    
let appData = {
    budget: 0,
    income: {},
    mission: 100000,
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
        
        appData.budget = +salaryAmount.value;

        appData.getExpenses();
        appData.setExpensesMonth();

        appData.getIncome();
        appData.setIncomeMonth();

        appData.getBudget();
        appData.getAddIcomes();
        appData.getAdditionalExpenses();
        
        appData.showResult();
    },

    showResult() {
        expensesMonthValue.value = appData.expensesMonth;
        budgetMonthValue.value = appData.budgetMonth;
        budgetDayValue.value = appData.budgetDay;
        additionalExpensesValue.value = appData.addExpenses.join(', ');
        additionalIncomeValue.value = appData.addIncome.join(', ');
        targetMonthValue.value = appData.getTargetMonth();
        incomePeriodValue.value = appData.calcSavedMoney();

        periodSelect.addEventListener('pointermove', function caclSaveMoney() {
            incomePeriodValue.value = appData.calcSavedMoney();
        });

    },

    addExpensesBlock () {
        const cloneExpensisItem = expensesItems[0].cloneNode(true);
        cloneExpensisItem.querySelectorAll('input').forEach( element => element.value = '');
        expensesItems[0].parentNode.insertBefore(cloneExpensisItem,secondPlus);
        expensesItems = document.querySelectorAll('.expenses-items');
        if (expensesItems.length === 3) {
            secondPlus.style.display = 'none';
        }

    },

    addIncomeBlock () {
        const cloneIncomeItem = incomeItems[0].cloneNode(true);
        cloneIncomeItem.querySelectorAll('input').forEach( element => element.value = '');
        incomeItems[0].parentNode.insertBefore(cloneIncomeItem,firstPlus);
        incomeItems = document.querySelectorAll('.income-items');
        if (incomeItems.length === 3) {
            firstPlus.style.display = 'none';
        }

    },

    getExpenses() {
        expensesItems.forEach( element => {
            const expensesTitle = element.querySelector('.expenses-title').value;
            const expenesAmount = element.querySelector('.expenses-amount').value;
            appData.expenses = [];
            if (expensesTitle.trim() !== '' && isNumber(expenesAmount)) {
                appData.expenses[expensesTitle] = + expenesAmount;
            }
        });
    },

    getIncome() {
        incomeItems.forEach( element => {
            const expensesTitle = element.querySelector('.income-title').value;
            const expenesAmount = element.querySelector('.income-amount').value;
            appData.income = [];
            if (expensesTitle.trim() !== '' && isNumber(expenesAmount)) {
                appData.income[expensesTitle] = + expenesAmount;
            }
        });
    },


    getAdditionalExpenses() {
        appData.addExpenses = [];
        additionalExpensesItem.value.split(',').forEach( element => {
            if (element.trim() !== '') {
                appData.addExpenses.push(element);
            }
        });
    },

    getAddIcomes(){
        appData.addIncome = [];
        additionalIncomeItems.forEach (element => {
            const value = element.value.trim();
            if (value !== '') appData.addIncome.push(value);
        });
    },

    setIncomeMonth: function () {
        let sum = 0;
        for (const property in appData.income) {
            sum += +appData.income[property];
        }
        appData.incomeMonth = sum;
    },

    setExpensesMonth: function () {
        let sum = 0;
        for (const property in appData.expenses) {
            sum += +appData.expenses[property];
        }
        appData.expensesMonth = sum;
    },

    getBudget: function () {
        appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth;
        appData.budgetDay = Math.floor(appData.budgetMonth / 30);
    },

    getTargetMonth: function () {
        return Math.ceil ( parseFloat(targetAmount.value) / appData.budgetMonth);
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

    calcSavedMoney() {
        return appData.budgetMonth * periodSelect.value;
    }

};

startButton.disabled = true;

function canCalculate () {
    startButton.disabled = !isNumber(salaryAmount.value);   
}

salaryAmount.addEventListener('input',canCalculate);
                                                    
document.querySelector('.data').addEventListener('keypress', function inputControl(event){
    let charCode = (event.which) ? event.which : event.keyCode;
    let rigtKey = false;
    const punctuationMarks = [32,44,46,58,59,63];

    if ( event.target.placeholder === 'Сумма' && (charCode > 48 && charCode < 57 || charCode == 46 ) )
        rigtKey  = true;

    if ( event.target.placeholder === 'Наименование' && (charCode > 1039 && charCode < 1106 || 
        punctuationMarks.includes(charCode) ) )
        rigtKey  = true;

    if ( !rigtKey ) event.preventDefault();
});

calculate.addEventListener('click', appData.start );

firstPlus.addEventListener('click',appData.addIncomeBlock);

secondPlus.addEventListener('click',appData.addExpensesBlock);

periodSelect.addEventListener('pointermove', function changeTitle(event) {
    periodAmount.textContent = periodSelect.value;
} );
    
let isNumber = function (n) {
    return !isNaN(n) && isFinite(n) && n.trim() !== '';
};

/* ======== Fill init data for a test ======== */

document.querySelector('h1').addEventListener('click',initData);

function initData(){
    salaryAmount.value = 25000;
    incomeItems = document.querySelectorAll('.income-items');
    for (let i = 0; i < incomeItems.length; i++) {
        incomeItems[i].querySelector('.income-title').value = `Статья доп. дохода ${i + 1}`;
        incomeItems[i].querySelector('.income-amount').value = `${i * 1000  + 500}`;

    }

    expensesItems = document.querySelectorAll('.expenses-items');
    for (let i = 0; i < expensesItems.length; i++) {
        expensesItems[i].querySelector('.expenses-title').value = `Статья расхода ${i + 1}`;
        expensesItems[i].querySelector('.expenses-amount').value = `${(i + 1)* 1000 }`;

    }

    additionalExpensesItem.value = 'кино, походы, ,';

    for (let i = 0; i < additionalIncomeItems.length; i++ ) {
        additionalIncomeItems[i].value = `возможный доход ${i + 1}`;
    }

    targetAmount.value = 150000;
    
    canCalculate ();
}
