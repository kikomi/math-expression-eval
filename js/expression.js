/**
 * Math Expression Evaluator.
 */
module.exports = class Expression {

    constructor(expression) {
        this.expression = expression;
    }

    /**
     * Evaluate the expression passed into the constructor.
     * @returns {number} result of an expression
     */
    evaluate() {
        var sanitizedExp = this.expression.replace(/\s+/g, '');
        return this._eval(sanitizedExp);
    }

    /**
     * Evaluate an expression and return result.
     * @param {string} exp expression to evaluate
     * @returns {number} result of an expression
     */
    _eval(exp) {
        var operations = [];
        var cursorPos = 0;
        while (cursorPos < exp.length) {
            // if expression starts with '(' then evaluate enclosed expression first
            if (exp[cursorPos] === '(') {
                var enclosedExpEndPosition = this._getEnclosedExpression(exp, cursorPos);
                var enclosedExp = exp.substring(cursorPos + 1, enclosedExpEndPosition);
                var enclosedExpValue = this._eval(enclosedExp);
                operations.push(enclosedExpValue);
                cursorPos = enclosedExpEndPosition + 1;
            } else if (48 <= exp.charCodeAt(cursorPos) && exp.charCodeAt(cursorPos) <= 57) {
                var nextCursorPos = this._getNumberEndPosition(exp, cursorPos);
                operations.push(Number(exp.substring(cursorPos, nextCursorPos)));
                cursorPos = nextCursorPos;
            }

            if (cursorPos === exp.length)
                break;

            if (exp[cursorPos] === '*' || exp[cursorPos] === '/' || exp[cursorPos] === '^') {
                var result = operations.pop();
                var operator = exp[cursorPos];
                var value;

                if (exp[cursorPos + 1] === '(') {
                    var enclosedExpEndPosition = this._getEnclosedExpression(exp, cursorPos + 1);
                    var enclosedExp = exp.substring(cursorPos + 2, enclosedExpEndPosition);
                    value = this._eval(enclosedExp);
                    cursorPos = enclosedExpEndPosition + 1;
                } else {
                    var nextCursorPos = this._getNumberEndPosition(exp, cursorPos + 1);
                    value = Number(exp.substring(cursorPos + 1, nextCursorPos));
                    cursorPos = nextCursorPos;
                }

                switch (operator) {
                    case '*':
                        result *= value;
                        break;
                    case '/':
                        result /= value;
                        break;
                    case '^':
                        result = Math.pow(result, value);
                        break;
                    default:
                        break;
                }

                operations.push(result);
            } else {
                operations.push(exp[cursorPos]);
                cursorPos++;
            }
        }

        var result = 0;
        var operator = '';
        for (let i = 0; i < operations.length; i++) {
            var element = operations[i];
            if (!isNaN(element)) {
                switch (operator) {
                    case '+':
                        result += element;
                        break;
                    case '-':
                        result -= element;
                        break;
                    default:
                        result += element;
                        break;
                }
            } else {
                operator = element;
            }
        }

        return result;
    }

    /**
     * Gets an end index of a substring that contains a single number (might be decimal)
     * @param {string} exp expression to search in
     * @param {number} pos position from which substring with a number starts
     * @returns {number} end index of a substring that contains a single number
     */
    _getNumberEndPosition(exp, pos) {
        var i = pos;
        while (i < exp.length && (48 <= exp.charCodeAt(i) && exp.charCodeAt(i) <= 57) || exp.charCodeAt(i) === 46) {
            i++;
        }

        return i;
    }

    /**
     * Gets an end index of a substring that contains a single enclosed expression (e.g 4^(-0.5) from 3*(4^(-0.5))/5)
     * @param {string} exp expression to search in
     * @param {number} pos position from which substring with an enclosed expression
     * @returns {number} end index of a substring that contains a single enclosed expression
     */
    _getEnclosedExpression(exp, pos) {
        var stack = [true];
        var i = pos + 1;
        while (i < exp.length) {
            if (exp[i] === ')')
                stack.pop();
            else if (exp[i] === '(')
                stack.push(true);

            if (stack.length === 0)
                break;

            i++;
        }

        return i;
    }
};