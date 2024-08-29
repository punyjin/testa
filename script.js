const numberButtons = document.querySelectorAll('[data-number]');
const opperationButtons = document.querySelectorAll('[data-opperation]');
const equalsButtons = document.querySelector('[data-equals]');
const deleteButtons = document.querySelector('[data-delete]');
const allClearButtons = document.querySelector('[dara=all-clear]');

const currentScreenTextElement = document.querySelector('[data-operand-currnt]');
const previouScreenTextElement = document.querySelector('[data-operand-previou]');

class Calculator {
    constructor(currentScreenTextElement, previouScreenTextElement){
        this.currentScreenTextElement = currentScreenTextElement;
        this.previouScreenTextElement = previouScreenTextElement;
        this.clear();
    }

    clear() {
        this.currentOperand = "";
        this.previouOperand = "";
        this.operation = null;
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.'))return;
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    flushOperator(operation) {
        if (this.currentOperand === "") return;
        if (this.previouOperand !== ""){
            this.compute();
        }
        this.operation = this.operation;
        this.previouOperand = this.currentOperand;
        this.currentOperand = "";
    }

    compute() {
        let computation;
        const previou = parseFloat(this.previouOperand);
        const current = parseFloat(this.currentOperand);
        
        if(isNaN(previou) || isNaN(current)) return;
        switch(this.operation) {
        case "+":
            computation = previou + current ;
        break;
        case "-":
            computation = previou - current ;
        break;
        case "X":
            computation = previou * current ;
        break;
        case "➗":
            computation = previou / current ;
        break;
        
        default:
            return;
        }
        this.currentOperand = computation;
        this.previouOperand = "";
        this.operation = undefined;
    }

    updateDisplay() {
        this.currentScreenTextElement.innerHTML = this.currentOperand;
        if (this.operation != null) {
            this.previouScreenTextElement.innerHTML = `${this.previousOpetand} ${this.operation}`;
        }
    }
}

const calculator = new Calculator(
    currentScreenTextElement,
    previouScreenTextElement
);

numberButtons.forEach((button) => {
    button.addEventListener("click", () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    });
});
