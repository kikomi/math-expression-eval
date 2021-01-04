var Expression = require('./expression');

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

readline.question(`Enter expression: `, exp => {
    var expression = new Expression(exp);
    console.log('Result: ' + expression.evaluate());
    readline.close();
});

// Examples:
// 15 + (344 - 12 * 3) * (2 + 90 / 45) / 7
// 3*(4^(-0.5))/5
// ((4+7)*((3-1)^2) - (4*6/2) + 4) / ((36/2)/3)
// (16 + (16-3*4))/((6+9)/(7-4))
// 5-(2^2)*(7-9*(5-1))*(3^3)-4
// ((4-3)+(1+2)^2)/(6+(7-5))
// (43 - (-77))/(37^(-94)) + (-66*67)^(-24*49)
// ((-91)*(-4)*45*(-55))^(((-9)^2)/(82 - (-53))) -> "Number" overflow