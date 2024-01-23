function add(...numbers) {
  return console.log([...numbers].reduce((sum, number) => +sum + +number));
}

function substract(...numbers) {
  return console.log(
    [...numbers].reduce((result, number) => +result - +number)
  );
}

function multiply(...numbers) {
  return console.log(
    [...numbers].reduce((product, number) => +product * +number)
  );
}

function divide(...numbers) {
  return console.log(
    [...numbers].reduce((result, number) => +result / +number)
  );
}

function operate(operator, num1, num2) {
  if (operator == "+") {
    add(num1, num2);
  } else if (operator == "-") {
    substract(num1, num2);
  } else if (operator == "*") {
    multiply(num1, num2);
  } else if (operator == "/") {
    divide(num1, num2);
  }
}

const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");
const decimalButton = document.querySelector(".decimal");
const clearButton = document.querySelector(".clear");
const displayExpression = document.querySelector(".expression-text");
const displayResult = document.querySelector(".result");

let currentInputNum = "";
let currentExpression = "";
let currentResult = "";

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
