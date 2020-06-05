let money = 1500, 
   income = 900, 
   addExpenses = '250, 77, 128.5', 
   deposit = true, 
   mission = 10000, 
   period = 2;

console.log( typeof money );
console.log( typeof income );
console.log( typeof deposit );

console.log( addExpenses.length );
console.log( `Период равен ${period} месяцев` );
console.log('Цель заработать '+ mission 
    + ' рублей/долларов/гривен/юани');

arrAddExpeses = addExpenses.toLowerCase().split(', ');
console.log( arrAddExpeses );

let budgetDay  = income / 30;    
console.log('budgetDay: ', budgetDay);