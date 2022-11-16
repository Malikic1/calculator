const calculator = document.querySelector('.calculator')
const display = document.querySelector('#result') //current value is 0
const keys = calculator.querySelector('.calc-keys')
const calculate = (n1, operator, n2) => {
  let result = ''

  if (operator === 'add') {
    result = parseFloat(n1) + parseFloat(n2)
  } else if (operator === 'subtract') {
    result = parseFloat(n1) - parseFloat(n2)
  } else if (operator === 'multiply') {
    result = parseFloat(n1) * parseFloat(n2)
  } else if (operator === 'divide') {
    result = parseFloat(n1) / parseFloat(n2)
  }

  return result
}
keys.addEventListener('click', (val) => {
 if (val.target.matches('button')) {
   const key = val.target //current button clicked
   const action = key.dataset.action
   const keyContent = key.textContent // get the text(number) in it
   console.log(keyContent)
   const displayedNum = display.textContent;
   const previousKeyType = calculator.dataset.previousKeyType
if (!action) {
  if (displayedNum === '0' || previousKeyType === 'operator') {
    display.textContent = keyContent
  } else {
    display.textContent = displayedNum + keyContent
  }
}

if ( action === 'add' ||
  action === 'subtract' ||
  action === 'multiply' || action === 'divide'){
   const firstValue = calculator.dataset.firstValue
const operator = calculator.dataset.operator
const secondValue = displayedNum
if (
  firstValue &&
  operator &&
  previousKeyType !== 'operator'
) {
  const calcValue = calculate(firstValue, operator, secondValue)
  display.textContent = calcValue
  
// Update calculated value as firstValue
  calculator.dataset.firstValue = calcValue
} else {
  // If there are no calculations, set displayedNum as the firstValue
  calculator.dataset.firstValue = displayedNum;
}

key.classList.add('is-depressed');
calculator.dataset.previousKeyType = 'operator'
calculator.dataset.operator = action
} 
if (action === 'decimal') {
  if (!displayedNum.includes('.')) {
    display.textContent = displayedNum + '.'
  } else if (previousKeyType === 'operator') {
    display.textContent = '0.'
  }
  display.textContent = displayedNum + '.'
}

if (action === 'clear') {
  console.log('clear key!')
    if (key.textContent === 'C') {
    calculator.dataset.firstValue = ''
    calculator.dataset.modValue = ''
    calculator.dataset.operator = ''
    calculator.dataset.previousKeyType = ''
  } else {
    key.textContent = 'AC'
  }
display.textContent = 0
  calculator.dataset.previousKeyType = 'clear'
}

if (action === 'calculate') {
  console.log('equal key!')
  let firstValue = calculator.dataset.firstValue
  const operator = calculator.dataset.operator
  const secondValue = displayedNum
  
if (firstValue) {
    if (previousKeyType === 'calculate') {
      firstValue = displayedNum
    }
    
display.textContent = calculate(firstValue, operator, secondValue)
  }
  
// Set modValue attribute
  calculator.dataset.modValue = secondValue
  calculator.dataset.previousKeyType = 'calculate'
}

Array.from(key.parentNode.children)
      .forEach( k => key.classList.remove('is-depressed'))
      
 }
})
