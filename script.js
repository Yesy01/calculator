// script.js

let number1 = '';
let number2 = '';
let operator = '';
let result = null;
const screen = document.querySelector('.current');
const buttons = document.querySelectorAll('.btn');
let calculation = [];
const decimalbutton = document.querySelector('.decimal');




function populateDisplay(button) {
    const value = button.textContent;
    if (value === 'C') {
        // we want to clear everything
        calculation = [];
        number1 = '';
        number2 = '';
        operator = '';
        result = null;
        screen.textContent = '';
        return;
    } if (value === '=') {
        // we want to operate
        if (number1 && operator && number2) {
            // we have everything we need to operate
            result = operate();
            // display result by calling the operate function on the 3 values
            screen.textContent = result;
            calculation = [result];
            // reset everything and set number1 to result to continue calculations
            number1 = result;
            number2 = '';
            operator = '';
        }
        return;

    } if (['+', '-', '*', '/'].includes(value)) {
        // we want to set the operator
        // only set the operator if we have a number1 and no operator yet
        if (number1 && operator && number2) {
            result = operate();
            number1 = result.toString();
            number2 = '';
            screen.textContent = number1;
        }

        operator = value;
        // // put the operator in calculation array
        // calculation.push(value);

        return;
    }


    if (!operator) {
        // if we don't have an operator yet, we are still populating number1, thus we update number1
        number1 += value;
        // and then we push the value to the calculation array
        calculation.push(value);
        screen.textContent = number1;
    } else {
        // else we are populating number2
        number2 += value;
        calculation.push(value);
        screen.textContent = number2;
    }
    console.log({ number1, operator, number2, result });
}

// event listeners

buttons.forEach(button => {
    button.addEventListener('click', () => populateDisplay(button));
});


//DECIMAL BUTTON HANDLING

decimalbutton.addEventListener('click', () => {
    if (!operator) {
        if (!number1.includes('.')) number1 += '.';
        screen.textContent = number1;
    } else {
        if (!number2.includes('.')) number2 += '.';
        screen.textContent = number2;
    }

});




// math logic

function add(a, b) {
    return a + b;
}
function subtract(a, b) {
    return a - b;
}
function multiply(a, b) {
    return a * b;
}
function divide(a, b) {
    if (b === 0) {
        alert("Cannot divide by zero");
        throw new Error("Cannot divide by zero");

    }
    return a / b;

}

// calculator logic

function operate() {
    const num1 = parseFloat(number1);
    const num2 = parseFloat(number2);

    try {
        let result;
        switch (operator) {
            case '+':
                result = add(num1, num2);
                break;
            case '-':
                result = subtract(num1, num2);
                break;
            case '*':
                result = multiply(num1, num2);
                break;
            case '/':
                result = divide(num1, num2);
                break;
            default:
                return null;
        }

        return parseFloat(result.toFixed(6));

    } catch (err) {
        // Show alert only once (from here, not inside divide)
        alert(err.message);
        return null; // Prevents app crash
    }

}



document.addEventListener('keydown', (e) => {
    if (e.key >= '0' && e.key <= '9') {
        populateDisplay({ textContent: e.key });
    } else if (['+', '-', '*', '/'].includes(e.key)) {
        populateDisplay({ textContent: e.key });
    } else if (e.key === 'Enter' || e.key === '=') {
        populateDisplay({ textContent: '=' });
    } else if (e.key === '.') {
        decimalbutton.click();
    } else if (e.key === 'Backspace') {
        backspaceButton.click();
    } else if (e.key.toLowerCase() === 'c') {
        populateDisplay({ textContent: 'C' });
    }
});