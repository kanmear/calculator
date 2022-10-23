const C = 'C'
const AC = 'AC'
const MULTIPLY = '×'
const DIVIDE = '÷'
const ADD = '+'
const SUBTRACT = '-'
const EQUALS = '='

const upperDisplay = document.querySelector('.upper-part')
const lowerDisplay = document.querySelector('.lower-part')

const buttonsContainer = document.querySelector('.buttons')

let activeDisplay = lowerDisplay
let currentOperation = null
let prevVal = null
let prevOper = null

buttonsContainer.addEventListener('click', (e) => {
    if (e.target.tagName != 'BUTTON')
        return

    let element = e.target
    console.log(element.innerHTML)
    switch(element.innerHTML) {
        case C:
            lowerDisplay.innerHTML = lowerDisplay.innerHTML.slice(0, -1)
            break
        case AC:
            reset()
            break
        case MULTIPLY:
            operate(multiply, lowerDisplay.innerHTML, MULTIPLY)
            break
        case DIVIDE:
            break
        case SUBTRACT:
            break
        case ADD:
            operate(add, lowerDisplay.innerHTML, ADD)
            break
        case '.':
            break
        case EQUALS:
            equals(lowerDisplay.innerHTML)
            break
        case 'x<sup>y</sup>':
            break
        default:
            addNumber(element.innerHTML)
    }
})

function add(a, b) {
    console.log(`adding ${a} and ${b}`)
    return Number(a) + Number(b)
}

function multiply(a, b) {
    console.log(`multiplying ${a} and ${b}`)
    return Number(a) * Number(b)
}

function equals(value) {
    upperDisplay.innerHTML = ''
    if (prevOper)
        lowerDisplay.innerHTML = prevOper(prevVal, value)
    else
        lowerDisplay.innerHTML = prevVal 
    prevVal = null
    prevOper = null
}

function operate(operator, value, char) {
    upperDisplay.innerHTML += lowerDisplay.innerHTML + ` ${char} `
    activeDisplay.innerHTML = ''

    if (prevVal) {
        if (operator == prevOper) {
            console.log(`prevVal: ${prevVal}`)
            let result = operator(value, prevVal)
            lowerDisplay.innerHTML = result
            prevVal = result
        } else {
            console.log(`prevVal: ${prevVal}`)
            let result = prevOper(value, prevVal)
            upperDisplay.innerHTML = result + ` ${char} `

            prevVal = result
        }
    } else {
        prevVal = value
    }
    prevOper = operator
    // b = b.split(' ').at(-1)
}

function addNumber(n) {
    activeDisplay.innerHTML = activeDisplay.innerHTML == '0'
        ? n
        : (activeDisplay.innerHTML + n)
}

function reset() {
    lowerDisplay.innerHTML = '0'
    upperDisplay.innerHTML = ''
    prevVal = null
    prevOper = null
}