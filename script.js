const upperDisplay = document.querySelector('.upper-part')
const lowerDisplay = document.querySelector('.lower-part')

const buttonsContainer = document.querySelector('.buttons')

let activeDisplay = lowerDisplay
let currentOperation = null
let prevVal = null

buttonsContainer.addEventListener('click', (e) => {
    if (e.target.tagName != 'BUTTON')
        return

    let element = e.target
    console.log(element.innerHTML)
    switch(element.innerHTML) {
        case 'C':
            lowerDisplay.innerHTML = lowerDisplay.innerHTML.slice(0, -1)
            break
        case 'AC':
            reset()
            break
        case '×':
            break
        case '÷':
            break
        case '-':
            break
        case '+':
            operate(add, lowerDisplay.innerHTML)
            break
        case '.':
            break
        case '=':
            break
        case 'x<sup>y</sup>':
            break
        default:
            addNumber(element.innerHTML)
    }
})

const add = {
    operate(a, b) {
        console.log(`adding ${a} and ${b}`)
        return Number(a) + Number(b)
    },
    operatorChar: '+'
}

function operate(operator, value) {
    currentOperation = currentOperation == null
        ? operator.operate
        : currentOperation
    upperDisplay.innerHTML += lowerDisplay.innerHTML + ` ${operator.operatorChar} `
    activeDisplay.innerHTML = ''

    if (prevVal) {
        console.log(`prevVal: ${prevVal}`)
        let result = currentOperation(value, prevVal)
        lowerDisplay.innerHTML = result
        prevVal = result
    } else {
        prevVal = value
    }
    // b = b.split(' ').at(-1)
    currentOperation = null
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
}