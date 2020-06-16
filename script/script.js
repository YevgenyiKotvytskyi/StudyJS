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
    additionalIncomeItems = document.querySelectorAll('input.additional_income-item'),
    budgetMonthValue = document.querySelector('.budget_month-value'),
    budgetDayValue = document.querySelector('.budget_day-value'),
    expensesMonthValue = document.querySelector('.expenses_month-value'),
    additionalIncomeValue = document.querySelector('.additional_income-value'),
    additionalExpensesValue = document.querySelector('.additional_expenses-value'),
    incomePeriodValue = document.querySelector('.income_period-value'),
    targetMonthValue = document.querySelector('.target_month-value'),
    salaryAmount= document.querySelector('.salary-amount'),
    incomeTitle = document.querySelector('.income-title'),
    incomeAmount= document.querySelector('.income-amount'),
    expensesTitle= document.querySelector('.expenses-title'),
    expensesAmount = document.querySelector('.expenses-amount'),
    targetAmount= document.querySelector('.target-amount'),
    periodSelect= document.querySelector('.period-select');
    

    
