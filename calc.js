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

// console.log(divide("3", "3", "2", "2", "1", "1"));
