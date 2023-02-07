let menu = document.querySelector('.menu')
let arrow = document.querySelector('.arrow')
let appName = document.querySelector('.menu__name__label')

const collapse = () => {
    arrow.classList.toggle('arrow--right')
    menu.classList.toggle('menu--collapsed')
    
    appName.classList.toggle('bx')
    appName.classList.toggle('bxs-ghost')

    if(appName.textContent.length > 0) {
        appName.textContent = ''
    }
    else {
        appName.textContent = 'Coopang'
    }
 }

arrow.addEventListener('click', collapse)