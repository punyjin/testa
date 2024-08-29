const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButtons = document.querySelector('[data-equals]');
const deleteButtons = document.querySelector('[data-delete]');
const allClearButtons = document.querySelector('[data-all-clear]');

const currentScreenTextElement = document.querySelector('[data-operand-current]');
const previousScreenTextElement = document.querySelector('[data-operand-previous]');

class Calculator {
    constructor(currentScreenTextElement, previousScreenTextElement) {
        this.currentScreenTextElement = currentScreenTextElement;
        this.previousScreenTextElement = previousScreenTextElement;
        this.clear();
    }

    clear() {
        this.currentOperand = "";
        this.previousOperand = "";
        this.operation = null;
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return;
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    chooseOperation(operation) {
        if (this.currentOperand === "") return;
        if (this.previousOperand !== "") {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = "";
    }

    compute() {
        let computation;
        const previous = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        
        if (isNaN(previous) || isNaN(current)) return;

        switch (this.operation) {
            case "+":
                computation = previous + current;
                break;
            case "-":
                computation = previous - current;
                break;
            case "X":
                computation = previous * current;
                break;
            case "➗":
                computation = previous / current;
                break;
            default:
                return;
        }

        this.currentOperand = computation;
        this.previousOperand = "";
        this.operation = undefined;
    }

    updateDisplay() {
        this.currentScreenTextElement.innerText = this.currentOperand;
        if (this.operation != null) {
            this.previousScreenTextElement.innerText = `${this.previousOperand} ${this.operation}`;
        } else {
            this.previousScreenTextElement.innerText = '';
        }
    }
}

const calculator = new Calculator(
    currentScreenTextElement,
    previousScreenTextElement
);

numberButtons.forEach((button) => {
    button.addEventListener("click", () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    });
});

operationButtons.forEach((button) => {
    button.addEventListener("click", () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    });
});

equalsButtons.addEventListener("click", button => {
    calculator.compute();
    calculator.updateDisplay();
});

allClearButtons.addEventListener("click", button => {
    calculator.clear();
    calculator.updateDisplay();
});

deleteButtons.addEventListener("click", button => {
    calculator.delete();
    calculator.updateDisplay();
});
