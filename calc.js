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
  if (operator === "+") {
    return add(num1, num2);
  } else if (operator === "-") {
    return subtract(num1, num2);
  } else if (operator === "×") {
    return multiply(num1, num2);
  } else if (operator === "÷") {
    return divide(num1, num2);
  }
}

const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");
const decimalButton = document.querySelector(".decimal");
const equalButton = document.querySelector(".equal");
const clearButton = document.querySelector(".clear");
const expressionTxtDisplay = document.querySelector(".expression-text");
const resultDisplay = document.querySelector(".result");

let expressionNumber = "";
let subExpression = "";
let fullExpression = " ";
let currentValue = 0;

let isEqualButtonClicked = false;

function addNumber(button) {
  if (isEqualButtonClicked && isLastCharacterADigit()) return;
  
  if (isButtonZero(button) && !isZeroAllowed()) return;

  expressionNumber += button.textContent;
  subExpression += button.textContent;
  fullExpression += `${button.textContent}`;
  updateExpDisplay();
}

function addOperator(button) {
  if (isOperatorPresent()) {
    evaluateSubExpression();
  }
  if (fullExpression.slice(-1) != " ") {
    subExpression += ` ${button.textContent} `;
    fullExpression += ` ${button.textContent} `;
    updateExpDisplay();
    expressionNumber = "";
    isEqualButtonClicked = false;
  }
}

function addDecimal(decimal) {
  if (isEqualButtonClicked && isLastCharacterADigit()) return;

  if (!expressionNumber.includes(decimal)) {
    subExpression += decimal;
    fullExpression += decimal;
    expressionNumber += decimal;
    updateExpDisplay();
  }
}

function addEqual() {
  evaluateSubExpression();
  updateResultDisplay();
  isEqualButtonClicked = true;
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
  const subExprParts = subExpression.split(" ");

  if (subExprParts.length === 3 && subExprParts[2] != "") {
    const [num1, operation, num2] = subExprParts;
    currentValue = operate(operation, num1, num2);
    subExpression = `${currentValue}`;
    updateResultDisplay();
  }
}

function isZeroAllowed() {
  if (expressionNumber.length === 0) return true;

  const lastItemInExp = expressionNumber.charAt(expressionNumber.length - 1);
  return expressionNumber.length === 1 ? lastItemInExp !== "0" : true;
}

function isButtonZero(button) {
  return button.textContent === "0";
}

function isLastCharacterADigit() {
  return /[0-9]/.test(subExpression.slice(-1));
}

function isOperatorPresent() {
  return /\s[+\-×÷]\s/.test(subExpression);
}

function updateExpDisplay() {
  expressionTxtDisplay.textContent = fullExpression;
}

function updateResultDisplay() {
  resultDisplay.textContent = currentValue;
}

numberButtons.forEach((button) => {
  button.addEventListener("click", () => addNumber(button));
});

operatorButtons.forEach((button) => {
  button.addEventListener("click", () => addOperator(button));
});

decimalButton.addEventListener("click", () =>
  addDecimal(decimalButton.textContent)
);

clearButton.addEventListener("click", clearEntireDisplay);

equalButton.addEventListener("click", addEqual);
