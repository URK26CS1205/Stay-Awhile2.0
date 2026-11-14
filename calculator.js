
// =====================================
// STAY AWHILE - CALCULATOR
// =====================================

document.addEventListener("DOMContentLoaded", function () {

    const display = document.getElementById("calcDisplay");
    const buttons = document.querySelectorAll(".calc-grid button");

    if (!display || buttons.length === 0) return;

    let expression = "";
    let finished = false;

    function calculate(input) {

        const tokens = input.match(/\d*\.?\d+|[+\-*/]/g);

        if (!tokens || tokens.join("") !== input) {
            throw new Error("Invalid expression");
        }

        const values = [];
        const operators = [];

        const precedence = {
            "+": 1,
            "-": 1,
            "*": 2,
            "/": 2
        };

        function applyOperator() {

            const operator = operators.pop();
            const right = values.pop();
            const left = values.pop();

            if (left === undefined || right === undefined) {
                throw new Error("Invalid expression");
            }

            let result;

            switch (operator) {
                case "+":
                    result = left + right;
                    break;

                case "-":
                    result = left - right;
                    break;

                case "*":
                    result = left * right;
                    break;

                case "/":
                    if (right === 0) {
                        throw new Error("Cannot divide by zero");
                    }
                    result = left / right;
                    break;
            }

            values.push(result);
        }

        let expectNumber = true;

        tokens.forEach(function (token) {

            if (!isNaN(Number(token))) {

                if (!expectNumber) {
                    throw new Error("Invalid expression");
                }

                values.push(Number(token));
                expectNumber = false;

            } else {

                if (expectNumber) {
                    throw new Error("Invalid expression");
                }

                while (
                    operators.length &&
                    precedence[operators[operators.length - 1]] >= precedence[token]
                ) {
                    applyOperator();
                }

                operators.push(token);
                expectNumber = true;
            }

        });

        if (expectNumber) {
            throw new Error("Invalid expression");
        }

        while (operators.length) {
            applyOperator();
        }

        if (values.length !== 1 || !Number.isFinite(values[0])) {
            throw new Error("Invalid calculation");
        }

        return values[0];
    }

    function updateDisplay() {
        display.value = expression || "0";
    }

    buttons.forEach(function (button) {

        button.addEventListener("click", function () {

            const value = button.dataset.value;

            if (!value) return;

            if (value === "C") {
                expression = "";
                finished = false;
                updateDisplay();
                return;
            }

            if (value === "=") {

                try {
                    const result = calculate(expression);
                    expression = String(Number(result.toFixed(8)));
                    finished = true;
                    updateDisplay();
                } catch (error) {
                    display.value = "Error";
                    expression = "";
                    finished = true;
                }

                return;
            }

            if (finished) {

                if (/[0-9.]/.test(value)) {
                    expression = "";
                }

                finished = false;
            }

            if (/[+\-*/]/.test(value)) {

                if (!expression && value !== "-") return;

                if (/[+\-*/]$/.test(expression)) {
                    expression = expression.slice(0, -1);
                }

            }

            if (value === ".") {

                const currentNumber = expression.split(/[+\-*/]/).pop();

                if (currentNumber.includes(".")) return;
            }

            if (expression.length >= 30) return;

            expression += value;
            updateDisplay();

        });

    });

});
