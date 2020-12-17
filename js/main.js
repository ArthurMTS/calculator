let firstValue = 0;
let secoundValue = 0;
let operator = '';

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
  const view = document.querySelector('#view');

  if (view.value.length > 7) return;

  if (view.value != 0) value = view.value + value;

  view.value = value;
}

function clear() {
  const view = document.querySelector('#view');
  view.value = 0;

  firstValue = 0;
  secoundValue = 0;
  operator = '';
}

const digits = document.querySelectorAll('.digits');
digits.forEach(digit => digit.addEventListener('click', ({ path }) => display(path[0].textContent)));

const ac = document.querySelector('#ac');
ac.addEventListener('click', clear);

const backspace = document.querySelector('#backspace');
backspace.addEventListener('click', () => {
  const view = document.querySelector('#view');

  if (view.value == 0) return;
  else if (view.value > 0 && view.value < 10) view.value = 0;
  else {
    const string = view.value.split('');
    string.pop();

    view.value = string.join('');
  }
});

const operators = document.querySelectorAll('.operator');
operators.forEach(op => op.addEventListener('click', () => {
  const view = document.querySelector('#view');
  
  if (firstValue != 0) {
    secoundValue = view.value;

    const result = operate(operator, firstValue, secoundValue);
    clear();
    display(result);

    firstValue = view.value;
    operator = op.textContent;
  } else {
    firstValue = view.value;
    operator = op.textContent;

    view.value = 0;
  }
}));

const equal = document.querySelector('#equal');
equal.addEventListener('click', () => {
  if  (firstValue == 0 || operator == 0) return;

  const view = document.querySelector('#view');

  secoundValue = view.value;

  const result = operate(operator, firstValue, secoundValue);
  clear();
  display(result);
});

const buttons = document.querySelectorAll('button');
buttons.forEach(button => button.addEventListener('click', () => {
  button.style.transform = 'scale(0.95)';
}));

buttons.forEach(button => button.addEventListener('transitionend', (e) => {
  if (e.propertyName !== 'transform') return;
  
  e.target.style.transform = 'scale(1)';
}));