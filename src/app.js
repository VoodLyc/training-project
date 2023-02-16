let sideMenu = document.querySelector('.menu') // The container of the side menu
let collapseButton = document.querySelector('.arrow') // The button that collapses the side menu
let sideMenuName = document.querySelector('.menu-name__label') // The name of the side menu
let buttonsContainer = document.querySelector('.navbar__buttons-container') // The container of the nav buttons in the side menu
let selectedButton = 'navbar-btn-1' // The id of the button that is currently selected.

const MENU_NAME = 'Coopang' // The name of the side menu.

function collapseSideMenu() {
    collapseButton.classList.toggle('arrow--right')
    sideMenu.classList.toggle('menu--collapsed')

    // Hides the name in the side menu.
    sideMenuName.classList.toggle('bx')
    sideMenuName.classList.toggle('bxs-ghost')

    if (sideMenuName.textContent) {
        sideMenuName.textContent = ''
    }
    else {
        sideMenuName.textContent = MENU_NAME
    }
}

function handleButtonSelect(event) {
    const isButton = event.target.classList.contains('navbar-button') // Checks if the element that triggers the event is a button.
    const parentIsButton = event.target.parentNode.classList.contains('navbar-button') // Checks if the parent of the element that triggers the event is a button.
    
    if (isButton) { 
        if (selectedButton != event.target.id) {
            toggleButtonStyle(event.target)
        }
    }
    else if (parentIsButton) {
        if (selectedButton != event.target.parentNode.id) {
            toggleButtonStyle(event.target.parentNode)
        }
    }
}

function toggleButtonStyle(element) {
    element.classList.toggle('navbar-button--selected')
    document.getElementById(selectedButton).classList.toggle('navbar-button--selected')
    selectedButton = element.id
}

collapseButton.addEventListener('click', collapseSideMenu)
buttonsContainer.addEventListener('click', handleButtonSelect)