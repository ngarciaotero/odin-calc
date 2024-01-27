function add(...numbers) {
  return [...numbers].reduce(
    (sum, number) => parseFloat(sum) + parseFloat(number)
  );
}

function subtract(...numbers) {
  return [...numbers].reduce(
    (result, number) => parseFloat(result) - parseFloat(number)
  );
}

function multiply(...numbers) {
  return [...numbers].reduce(
    (product, number) => parseFloat(product) * parseFloat(number)
  );
}

function divide(...numbers) {
  return [...numbers].reduce(
    (result, number) => parseFloat(result) / parseFloat(number)
  );
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

function addNumber(buttonNumber) {
  if (isEqualButtonClicked && isLastItemAddedADigit()) return;
  if (isButtonZero(buttonNumber) && !isZeroAllowed()) return;

  expressionNumber += buttonNumber;
  subExpression += buttonNumber;
  fullExpression += `${buttonNumber}`;
  updateExpDisplay();
}

function addOperator(buttonOperator) {
  if (isOperatorPresent()) {
    evaluateSubExpression();
  }

  if (fullExpression.slice(-1) !== " " && expressionNumber !== ".") {
    subExpression += ` ${buttonOperator} `;
    fullExpression += ` ${buttonOperator} `;
    updateExpDisplay();
    expressionNumber = "";
    isEqualButtonClicked = false;
  }
}

function addDecimal(decimal) {
  if (isEqualButtonClicked && isLastItemAddedADigit()) return;

  if (!expressionNumber.includes(decimal)) {
    subExpression += decimal;
    fullExpression += decimal;
    expressionNumber += decimal;
    updateExpDisplay();
  }
}

function addEqual() {
  if (subExprValid()) {
    evaluateSubExpression();
    isEqualButtonClicked = true;
  }
}

function clearEntireDisplay() {
  expressionNumber = "";
  subExpression = "";
  fullExpression = " ";
  currentValue = 0;
  updateExpDisplay();
  resultDisplay.textContent = "";
  isEqualButtonClicked = false;
}

function evaluateSubExpression() {
  if (subExprValid()) {
    const [num1, operation, num2] = subExpression.split(" ");
    currentValue = operate(operation, num1, num2);
    subExpression = `${currentValue}`;
    updateResultDisplay();
  }
}

function subExprValid() {
  const subExprParts = subExpression.split(" ");
  return (
    subExprParts.length === 3 &&
    !dividingByZero(subExprParts) &&
    isOperandValid(subExprParts[2])
  );
}

function dividingByZero(subExprParts) {
  if (subExprParts[1] === "÷" && subExprParts[2] === "0") {
    expressionNumber = `${subExprParts[0]}`;
    subExpression = subExpression.slice(0, -1);
    fullExpression = fullExpression.slice(0, -1);
    updateExpDisplay();
    alert("Oops! You've stumbled into the mathematical abyss.");
    return true;
  }
  return false;
}

function isZeroAllowed() {
  if (expressionNumber.length === 0) return true;

  const lastItemInExp = expressionNumber.charAt(expressionNumber.length - 1);
  return expressionNumber.length === 1 ? lastItemInExp !== "0" : true;
}

function isButtonZero(buttonNumber) {
  return buttonNumber === "0";
}

function isLastItemAddedADigit() {
  return /[0-9]|\./.test(fullExpression.slice(-1));
}

function isOperatorPresent() {
  return /\s[+\-×÷]\s/.test(subExpression);
}

function isOperandValid(operand) {
  return /^\d+\.?\d*|\d*\.?\d+$/.test(operand);
}

function updateExpDisplay() {
  expressionTxtDisplay.textContent = fullExpression;
}

function updateResultDisplay() {
  resultDisplay.textContent = currentValue;
}

function handleKeyDown(e) {
  console.log(e.key);
  const key = e.key;
  if (/^[0-9]$/.test(key)) {
    addNumber(key);
  } else if (/^[+\-*/]$/.test(key)) {
    let operator = key;
    if (key === "*") {
      operator = "×";
    } else if (key === "/") {
      operator = "÷";
    }

    addOperator(operator);
  } else if (/^[.]$/.test(key)) {
    addDecimal(key);
  } else if (key === "Enter") {
    addEqual();
  } else if (key === "Backspace") {
    clearEntireDisplay();
  }
}

numberButtons.forEach((button) => {
  button.addEventListener("click", () => addNumber(button.textContent));
});

operatorButtons.forEach((button) => {
  button.addEventListener("click", () => addOperator(button.textContent));
});

decimalButton.addEventListener("click", () =>
  addDecimal(decimalButton.textContent)
);

clearButton.addEventListener("click", clearEntireDisplay);

equalButton.addEventListener("click", addEqual);

document.addEventListener("keydown", handleKeyDown);
