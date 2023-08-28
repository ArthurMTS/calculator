const view = document.querySelector("#view");
let firstValue = 0;
let secoundValue = 0;
let operator = "";
let clearView = false;

const add = (x, y) => x + y;

const subtract = (x, y) => x - y;

const multiply = (x, y) => x * y;

const divide = (x, y) => {
  if (y === 0) {
    acFunc();
    view.value = "Don't think so!";
    return;
  }
  return x / y;
};

function operate(operator, x, y) {
  x = Number(x);
  y = Number(y);

  switch (operator) {
    case "+":
      return add(x, y);
    case "-":
      return subtract(x, y);
    case "x":
      return multiply(x, y);
    case "/":
      return divide(x, y);
  }
}

function display(value) {
  if (value - Math.floor(value) != 0 && `${value}`.length > 9)
    value = value.toFixed(8);

  view.value = value;
}

function digitFunc(digit) {
  if (view.value.length > 9) {
    alert("To many digits");
    return;
  }

  if (firstValue != 0 && !clearView) {
    view.value = 0;
    clearView = !clearView;
  } else if (view.value != 0) digit = view.value + digit;

  display(digit);
}

function acFunc() {
  display(0);

  firstValue = 0;
  secoundValue = 0;
  operator = "";
  clearView = false;
}

function backspaceFunc() {
  if (view.value == 0) return;
  else if (view.value < 10) view.value = 0;
  else display(view.value.slice(0, -1));
}

function operatorFunc(op) {
  if (firstValue != 0) equalFunc();

  firstValue = view.value;
  operator = op.textContent;
}

function equalFunc() {
  if (firstValue == 0 && secoundValue == 0 && operator == 0) return;

  secoundValue = view.value;

  const result = operate(operator, firstValue, secoundValue);
  acFunc();
  display(result);
}

const digits = document.querySelectorAll(".digit");
digits.forEach((digit) =>
  digit.addEventListener("click", ({ target }) => digitFunc(target.textContent))
);

const ac = document.querySelector("#ac");
ac.addEventListener("click", acFunc);

const backspace = document.querySelector("#backspace");
backspace.addEventListener("click", backspaceFunc);

const operators = document.querySelectorAll(".operator");
operators.forEach((op) => op.addEventListener("click", () => operatorFunc(op)));

const equal = document.querySelector("#equal");
equal.addEventListener("click", equalFunc);
