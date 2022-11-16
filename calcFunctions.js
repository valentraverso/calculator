const buttons = document.querySelector('.numbersContainer');
buttons.addEventListener('click', resultCalculator);
let visor = document.querySelector("#numberVisor");
// let totalOperator = document.querySelector("#totalOperator");

let useNumber = 0;
let operator;
let newNumber = 0;

let result = [];

let operatories = [];

let touchsDelete = 0;
function resultCalculator(event) {
  let check = event.target.innerHTML;

  // Clear All
  if (check === 'C') {
    useNumber = 0;
    operator = undefined;
    newNumber = 0;

    operationMethod = undefined;

    check = 0;

    touchsDelete += 1;

    if (touchsDelete === 3) {
      let result = 0;
      touchsDelete = 0;
    }
  }

  // Number = False & Operator = True
  let numberOperator = event.target.matches('.operator');

  // Number = true
  let numberBoolean = event.target.matches('.numbers');

  let idEqual = event.target.matches('#equal');

  if (idEqual === true) {
    if(operator !== undefined){
    total();
    const totalLength = result.length - 1;
    totalOperator.innerText = result[totalLength];
  }
  } else {
    // Check if we are using a number
    if (numberOperator === false) {
      // Only get the number
      if (numberBoolean === true) {
        // Check if we are already have an operator
        if (operator === undefined) {
          if (check === '±') {
            useNumber *= -1;
          } else if (check === '.') {
            let searchDot = useNumber.includes(".");
            if (searchDot === false) {
              useNumber += check;
            }
          } else if (useNumber === 0) {
            // First Number To Operate
            useNumber = check;
          } else {
            useNumber = useNumber + check;
          }
        } else {
          if (check === '±') {
            newNumber *= -1;
          } else if (check === '.') {
            let searchDot = newNumber.includes(".");
            if (searchDot === false) {
              newNumber += check;
            }
          } else if (newNumber === 0) {
            // Second Number To Operate
            newNumber = check;
          } else {
            newNumber = newNumber + check;
          }
        }
      }
    } else if (numberOperator === true) {
      let operatorId = event.target.id;
      if (operator === undefined) {
        operator = check;
        operationMethod = operatorId;
      }
    }

    // Display Visor
    if (operator === undefined) {
      // First Number
      visor.innerText = useNumber;
    } else if (operator !== undefined) {
      // First Number + operator
      visor.innerText = useNumber + operator + newNumber;
    }
  }
}

function sum() {
  resultLast = +useNumber + +newNumber;
  return result.push(resultLast);
}

function rest() {
  resultLast = +useNumber - +newNumber;
  return result.push(resultLast);
}

function multiply() {
  resultLast = +useNumber * +newNumber;
  return result.push(resultLast);
}

function divide() {
  resultLast = +useNumber / +newNumber;
  return result.push(resultLast);
}

function remainder() {
  resultLast = +useNumber % +newNumber;
  return result.push(resultLast);
}

function total(resultLast) {
  operatories.push(useNumber + operator + newNumber + ' =');

  if (operationMethod === 'plus') {
    sum();
  } else if (operationMethod === 'less') {
    rest();
  } else if (operationMethod === 'rest') {
    remainder();
  } else if (operationMethod === 'divide') {
    divide();
  } else if (operationMethod === 'multiple') {
    multiply();
  }

  let totalLengthLog = result.length - 1;

  useNumber = result[totalLengthLog];
  operator = undefined;
  newNumber = 0;
  operationMethod;
  check = 0;

  totalLengthLog = result.length;
  // Logs
  if (totalLengthLog > 0) {
    let logs = '';
    for (let i = 0; i < totalLengthLog; i++) {
      logs += `${operatories[i]} ${result[i]}<br>`
      oldResults.innerHTML = logs;
    }
  }
}

const timeline = document.querySelector('#logs');
timeline.addEventListener('click', showTimeline);

function showTimeline() {
  const oldResults = document.getElementById('oldResults');
  oldResults.classList.toggle('hide');

  const totalLengthLog = result.length;

  if (totalLengthLog === 0) {
    oldResults.innerText = 'Do a math problem!'
  }
}

const switchDark = document.querySelector('.slider');
switchDark.addEventListener('click', switchToDark);

let saveClicksChange = 0;

function switchToDark(){
  const bodyChange = document.querySelector('body');
  bodyChange.classList.toggle('darkMode');
  document.querySelector('.calculatorBody').classList.toggle('darkMode');
  let butonChange = document.querySelectorAll('button');
  for(let i = 0; i < butonChange.length; i++){
    butonChange[i].classList.toggle('darkMode');
  }
  saveClicksChange += 1;

  console.log(saveClicksChange);
  if(saveClicksChange === 10){
    bodyChange.classList.toggle('party');
  }else if(saveClicksChange === 14){
    bodyChange.classList.toggle('party');
  }else if(saveClicksChange === 30){
    bodyChange.innerHTML = '<img src="./img/explosion.gif" alt="exploto el codigo" style="witdh:100%;height:100%;">';
    setTimeout(byeCode, 3000)
  }
}

function byeCode(){
  const bodyChange = document.querySelector('body');
  bodyChange.innerHTML = '<h1>FELICIDADES! Has destruido la calculadora<h1><a onclick="location.reload();">Volver a empezar?</a>';
}