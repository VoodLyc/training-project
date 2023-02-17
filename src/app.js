import { getPokemon } from "./pokemonService.js"

let sideMenu = document.querySelector('.menu') // The container of the side menu
let collapseButton = document.querySelector('.arrow') // The button that collapses the side menu
let sideMenuName = document.querySelector('.menu-name__label') // The name of the side menu
let buttonsContainer = document.querySelector('.navbar__buttons-container') // The container of the nav buttons in the side menu
let selectedButton = 'navbar-btn-1' // The id of the button that is currently selected.
let pokemon = getPokemonData(11) // The currently displayed Pokemon.
let pokemonName = document.querySelector('#pokemonName')
let pokemonType = document.querySelector('#pokemonType')
let pokemonAbility = document.querySelector('#pokemonAbility')
let pokemonHeight = document.querySelector('#pokemonHeight')
let pokemonExperience = document.querySelector('#pokemonExperience')

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

function getPokemonData(pokemonId) {
    getPokemon(pokemonId)
        .then((data) => {
            pokemon = data
            setPokemonAttributes()
        })
        .catch((e) => {
            console.log(e)
        })
}

function setPokemonAttributes() {
    pokemonName.textContent = CapitalizeText(pokemon.name)
    pokemonType.textContent = pokemon.types[0].type.name.toUpperCase()
    pokemonAbility.textContent = CapitalizeText(pokemon.abilities[0].ability.name)
    pokemonHeight.textContent = pokemon.height
    pokemonExperience.textContent = pokemon.base_experience + ' Reviews'
}

function CapitalizeText(text) {
    // Returns a text with every first letter of each word capitalized.
    return text.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.substring(1)).join(' ')
}
collapseButton.addEventListener('click', collapseSideMenu)
buttonsContainer.addEventListener('click', handleButtonSelect)