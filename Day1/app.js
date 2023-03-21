var calculator = require('./module1');
  
console.log(calculator.add(10,20));
console.log(calculator.sub(50,10));
console.log(calculator.mult(5,2));


var AgeCalculator = require('./module2');

console.log(AgeCalculator.getAge("moeen", new Date(1960,1,1)));
console.log(AgeCalculator.getAge("moeen", new Date(2023,4,4)));