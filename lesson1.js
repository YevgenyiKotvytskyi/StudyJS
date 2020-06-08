/*global
alert, confirm, console, prompt
*/

"use strict"

let money = 1500, 
   income = 900, 
   addExpenses = '250, 77, 128.5', 
   deposit = true, 
   mission = 10000, 
   period = 2;

//#region Lesson 02

console.log( typeof money );
console.log( typeof income );
console.log( typeof deposit );

console.log( addExpenses.length );
console.log( `Период равен ${period} месяцев` );
console.log('Цель заработать '+ mission 
    + ' рублей/долларов/гривен/юани');

let arrAddExpeses = addExpenses.toLowerCase().split(', ');
console.log( arrAddExpeses );

let budgetDay  = income / 30;    
console.log('budgetDay: ', budgetDay);

//#endregion Lesson 02


//#region Lesson 03

console.clear();

//document.querySelector('h1').innerHTML = "Lesson 3";

console.log("\n\nLesson 03");

// #1
money = parseFloat(prompt("Ваш месячный доход?"));
// #2
addExpenses = prompt("Перечислите возможные расходы за рассчитываемый период через запятую?");
// 3
let depositAnswer  = prompt("Есть ли у вас депозит в банке? (Да/Нет)");
console.log('depositAnswer: ', depositAnswer.trim().toLowerCase());

if (depositAnswer.trim().toLowerCase() === "да" ) {
    deposit = true;
} else if (depositAnswer.trim().toLowerCase() === "нет") {
    deposit = false;
} else {
    deposit = null;
}
console.log('deposit: ', deposit);

// #5
let 
    expenses1 = prompt("Введите обязательную статью расходов?"),
    amount1 = parseFloat(prompt("Во сколько это обойдется?")),
    expenses2 = prompt("Введите обязательную статью расходов?"),
    amount2 = parseFloat(prompt("Во сколько это обойдется?"));

// #6    

// let sumAddExpenses = 0;

// addExpenses.split(',').forEach(element => {
//     sumAddExpenses += parseFloat(element); 
// });

let obligatoryExpends = amount1 + amount2;

//#6
let budgetMonth = money - obligatoryExpends;
console.log('budgetMonth: ', budgetMonth);

//#7
let monthMission = Math.ceil( mission / budgetMonth  );
console.log('monthMission: ', monthMission);

//#8
budgetDay  = budgetMonth / 30; 
console.log('budgetDay: ', Math.floor( budgetDay) );

//#9

if ( budgetDay >= 1200) {
    console.log("У Вас высокий уровень дохода");
} else if ( budgetDay >= 600 ) {
    console.log("У вас средний уровень дохода");
} else if ( budgetDay >= 0 ) {
    console.log("К сожалению у вас уровень дохода ниже среднего");
} else {
    console.log("Что то пошло не так");
}

////#endregion Lesson 03