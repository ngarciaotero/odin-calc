function add(...numbers) {
  return [...numbers].reduce((sum, number) => +sum + +number);
}

function subtract(...numbers) {
  return [...numbers].reduce((result, number) => +result - +number);
}

function multiply(...numbers) {
  return [...numbers].reduce((product, number) => +product * +number);
}

function divide(...numbers) {
  return [...numbers].reduce((result, number) => +result / +number);
}

function operate(operator, num1, num2) {
  if (operator == "+") {
    return add(num1, num2);
  } else if (operator == "-") {
    return subtract(num1, num2);
  } else if (operator == "×") {
    return multiply(num1, num2);
  } else if (operator == "÷") {
    return divide(num1, num2);
  }
}

const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");
const decimalButton = document.querySelector(".decimal");
const clearButton = document.querySelector(".clear");
const expressionTxtDisplay = document.querySelector(".expression-text");
const resultDisplay = document.querySelector(".result");

let expressionNumber = "";
let subExpression = "";
let fullExpression = " ";
let currentValue = 0;

function addNumberToDisplay(button) {
  currentInputNum += button.textContent;
  currentExpression += `${button.textContent}`;
  displayExpression.textContent = currentExpression;
}

function addOperatorToDisplay(button) {
  if (currentExpression.slice(-1) != " ") {
    currentExpression += ` ${button.textContent} `;
    displayExpression.textContent = currentExpression;
    currentInputNum = "";
  }
}

function addDecimalToDisplay() {
  console.log(currentInputNum);
  if (!currentInputNum.split("").includes(".")) {
    currentExpression += ".";
    currentInputNum += ".";
    displayExpression.textContent = currentExpression;
  }
}

function clearDisplay() {
  currentExpression = "";
  currentResult = "";
  displayExpression.textContent = currentExpression;
  displayResult.textContent = currentResult;
}

numberButtons.forEach((button) => {
  button.addEventListener("click", () => addNumberToDisplay(button));
});

operatorButtons.forEach((button) => {
  button.addEventListener("click", () => addOperatorToDisplay(button));
});

decimalButton.addEventListener("click", () => addDecimalToDisplay());

clearButton.addEventListener("click", clearDisplay);
