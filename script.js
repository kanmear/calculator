const C = 'C'
const AC = 'AC'
const MULTIPLY = '×'
const DIVIDE = '÷'
const ADD = '+'
const SUBTRACT = '-'
const EQUALS = '='
const POINT = '.'
const POWER = 'x<sup>y</sup>'
const POWER_CHAR = '^'

const upperDisplay = document.querySelector('.upper-part')
const lowerDisplay = document.querySelector('.lower-part')

const buttonsContainer = document.querySelector('.buttons')

let activeDisplay = lowerDisplay

let currentOperation = null
let currentValue = null

buttonsContainer.addEventListener('click', (e) => {
    if (e.target.tagName != 'BUTTON')
        return

    let lowerDisplayValue = lowerDisplay.innerHTML
    let elementValue = e.target.innerHTML
    console.log(elementValue)
    switch(elementValue) {
        case C:
            lowerDisplay.innerHTML = lowerDisplayValue.slice(0, -1)
            break
        case AC:
            reset()
            break
        case MULTIPLY:
            operate(multiply, lowerDisplayValue, MULTIPLY)
            break
        case DIVIDE:
            operate(divide, lowerDisplayValue, DIVIDE)
            break
        case SUBTRACT:
            operate(subtract, lowerDisplayValue, SUBTRACT)
            break
        case ADD:
            operate(add, lowerDisplayValue, ADD)
            break
        case POINT:
            point(lowerDisplayValue)
            break
        case EQUALS:
            equals(lowerDisplayValue)
            break
        case POWER:
            operate(toPowerOf, lowerDisplayValue, POWER_CHAR)
            break
        default:
            addNumber(element.innerHTML)
    }
})

function add(a, b) {
    console.log(`adding ${a} and ${b}`)
    return +(Math.round((Number(a) + Number(b)) + 'e+2') + 'e-2')
}

function subtract(a, b) {
    console.log(`subtracting ${b} from ${a}`)
    return +(Math.round((Number(a) - Number(b)) + 'e+2') + 'e-2')
}

function multiply(a, b) {
    console.log(`multiplying ${a} and ${b}`)
    return +(Math.round((Number(a) * Number(b)) + 'e+2') + 'e-2')
}

function divide(a, b) {
    console.log(`dividing ${a} by ${b}`)
    return +(Math.round((Number(a) / Number(b)) + 'e+2') + 'e-2')
}

function toPowerOf(a, b) {
    console.log(`raising ${a} to power of ${b}`)
    let result = a
    for (; b > 1; b--)
      result *= a
    return +(Math.round(result + 'e+2') + 'e-2')
}

function point(a) {
    let isLowerDisplayEmptyOrZero = a == '' || a == '0' || a == null
    let isAlreadyDelimitered = lowerDisplay.innerHTML.includes('.')
    if (!isLowerDisplayEmptyOrZero && !isAlreadyDelimitered) {
        console.log(`delimitering ${a}`)
        lowerDisplay.innerHTML += '.'
    }
}

function equals(value) {
    upperDisplay.innerHTML = ''
    if (currentOperation)
        lowerDisplay.innerHTML = currentOperation(currentValue, value)
    else
        lowerDisplay.innerHTML = currentValue 
    currentValue = null
    currentOperation = null
}

function operate(operator, value, char) {
    let isUpperDisplayEmpty = upperDisplay.innerHTML == '' || upperDisplay.innerHTML == null
    let isLowerDisplayEmptyOrZero = value == '' || value == '0' || value == null
    if (isUpperDisplayEmpty && isLowerDisplayEmptyOrZero) {
        console.log('nothing to work with')
        return
    }
    if (isUpperDisplayEmpty && !isLowerDisplayEmptyOrZero) {
        console.log('only upper is empty')
        upperDisplay.innerHTML = `${value} ${char} `
        lowerDisplay.innerHTML = ''
        currentOperation = operator
        currentValue = value
    } else if (!isUpperDisplayEmpty && isLowerDisplayEmptyOrZero) {
        console.log('only lower is empty')
        upperDisplay.innerHTML = `${currentValue} ${char} `
        lowerDisplay.innerHTML = ''
        currentOperation = operator
    } else if (!isUpperDisplayEmpty && !isLowerDisplayEmptyOrZero) {
        console.log('both are filled')
        if (operator != currentOperation) {
            let previousOperationResult = currentOperation(currentValue, value)
            upperDisplay.innerHTML = `${previousOperationResult} ${char} `
            lowerDisplay.innerHTML = ''
            currentOperation = operator
            currentValue = previousOperationResult
        } else {
            return
        }
    }
}

function addNumber(n) {
    activeDisplay.innerHTML = activeDisplay.innerHTML == '0'
        ? n
        : (activeDisplay.innerHTML + n)
}

function reset() {
    lowerDisplay.innerHTML = '0'
    upperDisplay.innerHTML = ''
    currentValue = null
    currentOperation = null
}