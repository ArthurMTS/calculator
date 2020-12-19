const view = document.querySelector('#view');
let firstValue = 0;
let secoundValue = 0;
let operator = '';
let clearView = false;

const add = (num1, num2) => num1 + num2;

const subtract = (num1, num2) => num1 - num2;

const multiply = (num1, num2) => num1 * num2;

const divide = (num1, num2) => num1 / num2;

function operate(operator, num1, num2) {
  num1 = Number(num1);
  num2 = Number(num2);

  switch (operator) {
    case '+':
      return add(num1, num2);
    case '-':
      return subtract(num1, num2);
    case 'x':
      return multiply(num1, num2);
    case '/':
      return divide(num1, num2);
  }
}

function display(value) {
  if (value - Math.floor(value) != 0 && `${value}`.length > 9)
    value = value.toFixed(8);

  view.value = value;
}

function digitFunc(digit) {

  if (view.value.length > 9) {
    alert('To many digits');
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
  operator = '';
  clearView = false;
}

function backspaceFunc() {

  if (view.value == 0) return;
  else if (view.value > 0 && view.value < 10) view.value = 0;
  else {
    const string = view.value.split('');
    string.pop();

    display(string.join(''));
  }
}

function operatorFunc(op) {
  
  if (firstValue != 0) equalFunc();

  firstValue = view.value;
  operator = op.textContent;
}

function equalFunc() {
  if (firstValue == 0 && secoundValue == 0 && operator == 0) return;

  secoundValue = view.value;

  if (operator == '/' && secoundValue == 0) {
    acFunc();
    view.value = 'Not today!';
    return;
  }

  const result = operate(operator, firstValue, secoundValue);
  acFunc();
  display(result);
}

const digits = document.querySelectorAll('.digits');
digits.forEach(digit => digit.addEventListener('click', ({ path }) => digitFunc(path[0].textContent)));

const ac = document.querySelector('#ac');
ac.addEventListener('click', acFunc);

const backspace = document.querySelector('#backspace');
backspace.addEventListener('click', backspaceFunc);

const operators = document.querySelectorAll('.operator');
operators.forEach(op => op.addEventListener('click', () => operatorFunc(op)));

const equal = document.querySelector('#equal');
equal.addEventListener('click', equalFunc);

const buttons = document.querySelectorAll('button');
buttons.forEach(button => button.addEventListener('click', () => {
  button.style.transform = 'scale(0.95)';
}));

buttons.forEach(button => button.addEventListener('transitionend', (e) => {
  if (e.propertyName !== 'transform') return;
  
  e.target.style.transform = 'scale(1)';
}));