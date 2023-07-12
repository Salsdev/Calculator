const display = document.querySelector('input[name="display"]');
const buttons = document.querySelectorAll('input[type="button"]');
const operatorButtons = document.querySelectorAll('[data-operator]');

let currentNumber = '';
let currentOperation = null;
let lastNumber = null;

function updateDisplay() {
  display.value = currentNumber;
  console.log(currentNumber)

}

function clearCalculator() {
  currentNumber = '';
  currentOperation = null;
  lastNumber = null;
  updateDisplay();
}

function handleNumberClick(event) {
  const number = event.target.value;
  currentNumber += number;
  updateDisplay();
}

function handleOperatorClick(event) {
  const operator = event.target.value;
 
  if (currentOperation) {
    performOperation();
  } else {
    lastNumber = currentNumber;
    currentNumber += operator;
  }
  
  currentOperation = operator;
   updateDisplay();
}

function performOperation() {
  switch (currentOperation) {
    case '+':
      currentNumber = parseFloat(lastNumber) + parseFloat(currentNumber);
      break;
    case '-':
      currentNumber = parseFloat(lastNumber) - parseFloat(currentNumber);
      break;
    case '*':
      currentNumber = parseFloat(lastNumber) * parseFloat(currentNumber);
      break;
    case '/':
      currentNumber = parseFloat(lastNumber) / parseFloat(currentNumber);
      break;
  }
  currentNumber = currentNumber.toString();
  currentOperation = null;
  lastNumber = null;
  updateDisplay();
}

function handleEqualClick() {
  if (currentOperation) {
    performOperation();
  }
}

function handleDecimalClick() {
  if (!currentNumber.includes('.')) {
    currentNumber += '.';
    updateDisplay();
  }
}

function handleDeleteClick() {
  currentNumber = currentNumber.toString().slice(0, -1);
  updateDisplay();
}

// Event listeners to buttons
buttons.forEach((button) => {
  switch (button.value) {
    case '+':
    case '-':
    case '*':
    case '/':
      button.addEventListener('click', handleOperatorClick);
      break;
    case '=':
      button.addEventListener('click', handleEqualClick);
      break;
    case '.':
      button.addEventListener('click', handleDecimalClick);
      break;
    case 'AC':
      button.addEventListener('click', clearCalculator);
      break;
    default:
      button.addEventListener('click', handleNumberClick);
      break;
  }
});
