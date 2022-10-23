const upperDisplay = document.querySelector('.upper-part')
const lowerDisplay = document.querySelector('.lower-part')

const buttonsContainer = document.querySelector('.buttons')

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
            lowerDisplay.innerHTML = ''
            upperDisplay.innerHTML = ''
            break
        case '×':
            break
        case '÷':
            break
        case '-':
            break
        case '+':
            break
        case '.':
            break
        case '=':
            break
        case 'x<sup>y</sup>':
            break
        default:
            lowerDisplay.innerHTML += element.innerHTML
    }
})