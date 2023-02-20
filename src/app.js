import { getPokemon } from "./pokemonService.js"

let sideMenu = document.querySelector('.menu') // The container of the side menu
let collapseButton = document.querySelector('.arrow') // The button that collapses the side menu
let sideMenuName = document.querySelector('.menu-name__label') // The name of the side menu
let buttonsContainer = document.querySelector('.navbar__buttons-container') // The container of the nav buttons in the side menu
let selectedButton = 'navbar-btn-1' // The id of the button that is currently selected.
let pokemon = getPokemonData(12) // The currently displayed Pokemon.

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

function setPokemonDetails() {
    let detailsPokemonName = document.querySelector('.pokemon-details__specie-info .pokemon-name')
    let detailsPokemonType = document.querySelector('.pokemon-details__specie-info .pokemon-type')
    let detailsPokemonAbility = document.querySelector('.pokemon-details__specie-info .pokemon-ability')
    let detailsPokemonHeight = document.querySelector('#detailsPokemonHeight')
    let detailsPokemonExperience = document.querySelector('#detailsPokemonExperience')

    detailsPokemonName.textContent = CapitalizeText(pokemon.name)
    detailsPokemonType.textContent = pokemon.types[0].type.name.toUpperCase()
    detailsPokemonAbility.textContent = CapitalizeText(pokemon.abilities[0].ability.name)
    detailsPokemonHeight.textContent = pokemon.height
    detailsPokemonExperience.textContent = pokemon.base_experience + ' Reviews'
}

function setPokemonNameCard() {
    let nameCardPokemonImg = document.querySelector('#nameCardPokemonImg')
    let nameCardPokemonName = document.querySelector('#nameCardPokemonName')

    nameCardPokemonImg.src = pokemon.sprites.front_default
    nameCardPokemonName.textContent = CapitalizeText(pokemon.name) + ' ' + CapitalizeText(pokemon.types[0].type.name)
}

function setPokemonAttributesCard() {
    let attributesCardPokemonHeight = document.querySelector('#attributesCardPokemonHeight')
    let attributesCardPokemonAge = document.querySelector('#attributesCardPokemonAge')
    let attributesCardPokemonPrice = document.querySelector('#attributesCardPokemonPrice')
    attributesCardPokemonHeight.textContent = pokemon.height
    attributesCardPokemonAge.textContent = pokemon.height + 13
    attributesCardPokemonPrice.textContent = '$' + (pokemon.weight + 20)
}

function setPokemonAuctionCard() {
    let auctionCardPokemonImg = document.querySelector('#auctionCardPokemonImg')

    auctionCardPokemonImg.src = pokemon.sprites.back_default
}

function setPokemonAttributes() {
    setPokemonDetails()
    setPokemonNameCard()
    setPokemonAttributesCard()
    setPokemonAuctionCard()
}

function CapitalizeText(text) {
    // Returns a text with every first letter of each word capitalized.
    return text.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.substring(1)).join(' ')
}
collapseButton.addEventListener('click', collapseSideMenu)
buttonsContainer.addEventListener('click', handleButtonSelect)