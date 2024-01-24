// npm install mathjs

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

function addNumber(button) {
  if (isButtonZero(button) && !isZeroAllowed()) return;
  expressionNumber += button.textContent;
  subExpression += button.textContent;
  fullExpression += `${button.textContent}`;
  updateExpDisplay();
}

function addOperator(button) {
  if (/\s[+\-×÷]\s/.test(subExpression)) {
    evaluateSubExpression();
  }
  if (fullExpression.slice(-1) != " ") {
    subExpression += ` ${button.textContent} `;
    fullExpression += ` ${button.textContent} `;
    updateExpDisplay();
    expressionNumber = "";
  }
}

function addDecimal(decimal) {
  if (!expressionNumber.includes(decimal)) {
    subExpression += decimal;
    fullExpression += decimal;
    expressionNumber += decimal;
    updateExpDisplay();
  }
}

function clearEntireDisplay() {
  expressionNumber = "";
  subExpression = "";
  fullExpression = " ";
  currentValue = 0;
  updateExpDisplay();
  resultDisplay.textContent = "";
}

function evaluateSubExpression() {
  const num1 = subExpression.split(" ")[0];
  const operation = subExpression.split(" ")[1];
  const num2 = subExpression.split(" ")[2];
  currentValue = operate(operation, num1, num2);
  subExpression = `${currentValue}`;
  updateResultDisplay();
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
