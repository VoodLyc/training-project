let menu = document.querySelector('.menu')
let arrow = document.querySelector('.arrow')
let appName = document.querySelector('.menu__name__label')
let buttonsContainer = document.querySelector('.navbar__buttons-container')
let selectedButton = 'navbar-btn-1'


const collapse = () => {
    arrow.classList.toggle('arrow--right')
    menu.classList.toggle('menu--collapsed')

    appName.classList.toggle('bx')
    appName.classList.toggle('bxs-ghost')

    if (appName.textContent.length > 0)
        appName.textContent = ''
    else
        appName.textContent = 'Coopang'

}

const selectButton = (e) => {
    if (e.target.classList.contains('navbar-button')) {
        if (selectedButton != e.target.id) {
            e.target.classList.toggle('navbar-button--selected')
            document.getElementById(selectedButton).classList.toggle('navbar-button--selected')
            selectedButton = e.target.id
        }
    }
    else if (e.target.parentNode.classList.contains('navbar-button')) {
        if (selectedButton != e.target.parentNode.id) {
            e.target.parentNode.classList.toggle('navbar-button--selected')
            document.getElementById(selectedButton).classList.toggle('navbar-button--selected')
            selectedButton = e.target.parentNode.id
        }
    }
}

arrow.addEventListener('click', collapse)
buttonsContainer.addEventListener('click', selectButton)

