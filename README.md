# Math Expression Evaluator

Currently supports the following operators:
1. `()` - parentheses;
1. `^` - exponentiation, i.e. `(2^4) = 16`;
All exponentiation expressions should be enclosed in parentheses. See the example below.
1. `*`, `/` - multiplication, division;
1. `+`, `-` - addition, subtraction.

*Note:* Each operation should be defined explicitly. Expressions `2(3+8)8` are not allowed.

## Prerequisites
* Install [NodeJS](https://nodejs.org/en/download/) and make sure you can run `node` from a console.

## Executing
Run `node ./js/index.js` in the project folder and enter you expression. 
*Note:* The evaluator disregards whitespace characters, so expressions `(27 - 9 / 3) + (4 * 3 - 9)` and `(27-9/3)+(4*3-9)` are equal.

Refer to `js/index.js` for usage in your JS projects.

## Examples: 
* Enter expression: `5-(2^2)*(7-9*(5-1))*(3^3)-4`
Result: `3133`
* Enter expression: `(16+(16-3*4)) / ((6+9)/(7-4))`
Result: `4`
* Enter expression: `(4 + 100) * 41 / 46 - 31 - 18 - (2 ^ (-83))`
Result: `43.69565217391305`