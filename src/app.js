import { getPokemon } from "./pokemonService.js"
import { capitalizeText, removeNonNumericCharacters, formatCurrency } from "./util.js"

let sideMenu = document.querySelector('.menu') // The container of the side menu
let collapseButton = document.querySelector('.arrow') // The button that collapses the side menu
let sideMenuName = document.querySelector('.menu-name__label') // The name of the side menu
let buttonsContainer = document.querySelector('.navbar__buttons-container') // The container of the nav buttons in the side menu
let selectedButton = 'navbar-btn-1' // The id of the button that is currently selected
let pokemon = fetchPokemon(22) // The currently displayed Pokemon
let auctionBid = document.querySelector('#auctionBid') // The input to enter the bid on the auction card

const MENU_NAME = 'Coopang' // The name of the side menu
const MAX_POKEMON_ID = 1008 // The maximum value for id
const MIN_POKEMON_ID = 1 // The minimun value for id
const NUMBER_OF_POKEMONS_UP = 1 // Number of pokemons with a higher id
const NUMBER_OF_POKEMONS_DOWN = 2 // Number of pokemons with a lower id

function collapseSideMenu() {
    toggleSideMenuSytle()
    toggleMenuName()
}

function toggleSideMenuSytle() {
    toggleStyle(collapseButton, 'arrow--right')
    toggleStyle(sideMenu, 'menu--collapsed')
    toggleStyle(sideMenuName, 'bx')
    toggleStyle(sideMenuName, 'bxs-ghost')
}

function toggleStyle(element, style) {
    element.classList.toggle(style)
}

function toggleMenuName() {
    if (!isEmpty(sideMenuName.textContent)) {
        clearName(sideMenuName)
    }
    else {
        setName(sideMenuName, MENU_NAME)
    }
}

function isEmpty(text) {
    return text.length === 0
}

function clearName(element) {
    element.textContent = ''
}

function setName(element, text) {
    element.textContent = text
}

function handleButtonSelect(event) {
    const button = event.target
    const parentOfButton = button.parentNode

    if (isButton(button) && isSelected(button)) {
        toggleButtonStyle(button)
    }
    else if (isButton(parentOfButton) && isSelected(parentOfButton)) {
        toggleButtonStyle(parentOfButton)
    }
}

function isButton(element) {
    return element.classList.contains('navbar-button')
}

function isSelected(element) {
    return selectedButton != element.id
}

function toggleButtonStyle(button) {
    toggleStyle(button, 'navbar-button--selected')
    toggleStyle(document.getElementById(selectedButton), 'navbar-button--selected')
    updateSelectedButton(button.id)
}

function updateSelectedButton(id) {
    selectedButton = id
}

function fetchPokemon(pokemonId) {
    getPokemon(pokemonId)
        .then((pokemonData) => {
            pokemon = pokemonData
            initializePokemonAttributes()
            fetchPokemonPreviewCards(pokemonId)
        })
        .catch((e) => {
            console.log(e)
        })
}

function initializePokemonAttributes() {
    initializePokemonDetails()
    initializePokemonNameCard()
    initializePokemonAttributesCard()
    initializePokemonAuctionCard()
}

function initializePokemonDetails() {
    let detailsPokemonName = document.querySelector('.pokemon-details__specie-info .pokemon-name')
    let detailsPokemonType = document.querySelector('.pokemon-details__specie-info .pokemon-type')
    let detailsPokemonAbility = document.querySelector('.pokemon-details__specie-info .pokemon-ability')
    let detailsPokemonHeight = document.querySelector('#detailsPokemonHeight')
    let detailsPokemonExperience = document.querySelector('#detailsPokemonExperience')

    detailsPokemonName.textContent = capitalizeText(pokemon.name)
    detailsPokemonType.textContent = pokemon.types[0].type.name.toUpperCase()
    detailsPokemonAbility.textContent = capitalizeText(pokemon.abilities[0].ability.name)
    detailsPokemonHeight.textContent = pokemon.height
    detailsPokemonExperience.textContent = pokemon.base_experience + ' Reviews'
}

function initializePokemonNameCard() {
    let nameCardPokemonImg = document.querySelector('#nameCardPokemonImg')
    let nameCardPokemonName = document.querySelector('#nameCardPokemonName')

    nameCardPokemonImg.src = pokemon.sprites.front_default
    nameCardPokemonName.textContent = capitalizeText(pokemon.name) + ' ' + capitalizeText(pokemon.types[0].type.name)
}

function initializePokemonAttributesCard() {
    let attributesCardPokemonHeight = document.querySelector('#attributesCardPokemonHeight')
    let attributesCardPokemonAge = document.querySelector('#attributesCardPokemonAge')
    let attributesCardPokemonPrice = document.querySelector('#attributesCardPokemonPrice')

    attributesCardPokemonHeight.textContent = pokemon.height
    attributesCardPokemonAge.textContent = pokemon.height + 13
    attributesCardPokemonPrice.textContent = '$' + (pokemon.weight + 20)
}

function initializePokemonAuctionCard() {
    let auctionCardPokemonImg = document.querySelector('#auctionCardPokemonImg')

    auctionCardPokemonImg.src = pokemon.sprites.back_default
}

function formatBid(event) {
    let value = event.target.value
    let initialLength = value.length
    let pointerInitialPosition = event.target.selectionStart
    let numericValue = fromCurrencyToNumber(value, event.key)
    let formattedValue = formatCurrency(numericValue)
    let newPosition = formattedValue.length - initialLength + pointerInitialPosition
    let max = formattedValue.length
    let min = 1
    event.target.value = formattedValue
    resetPointerPosition(event.target, newPosition, max, min)
}

function resetPointerPosition(element, actualPosition, max, min) {
    let position = actualPosition

    if (actualPosition > max) {
        position = max
    }
    else if (actualPosition < min) {
        position = min
    }

    element.selectionStart = position
    element.selectionEnd = position
}

function fromCurrencyToNumber(value) {
    let splitValue = value.split('.')
    let integerPart = removeNonNumericCharacters(splitValue[0])
    let decimalPart = removeNonNumericCharacters(splitValue[1])

    let newValue = integerPart + '.' + decimalPart

    return newValue
}

function generatePokemonIndexRange(pokemonId) {
    let min = pokemonId - NUMBER_OF_POKEMONS_DOWN
    let max = pokemonId + NUMBER_OF_POKEMONS_UP

    if (min < MIN_POKEMON_ID) {
        min = MIN_POKEMON_ID
        max += NUMBER_OF_POKEMONS_DOWN - Math.abs(pokemonId - MIN_POKEMON_ID)
    }
    else if (max > MAX_POKEMON_ID) {
        max = MAX_POKEMON_ID
        min -= NUMBER_OF_POKEMONS_UP + Math.abs(pokemonId - MAX_POKEMON_ID)
    }

    return { min, max }
}

function generateArrayRange(min, max) {
    // Creates an array of numbers from min to max
    return Array(max - min + 1).fill().map((value, i) => i + min);
}

function getPokemonIndicesList(pokemonId) {
    let limit = generatePokemonIndexRange(pokemonId)
    let pokemonIndexArray = generateArrayRange(limit.min, limit.max)
    let index = pokemonIndexArray.indexOf(pokemonId)
    pokemonIndexArray.splice(index, 1)
    return pokemonIndexArray
}

function fetchPokemonPreviewCards(pokemonId) {
    let pokemonIndices = getPokemonIndicesList(pokemonId)
    let previewPokemonCards = document.querySelectorAll('.pokemon-preview-card')

    for (const [i, card] of previewPokemonCards.entries()) {
        getPokemon(pokemonIndices[i])
            .then((pokemon) => {
                initializePokemonPreviewCard(card, pokemon)
            })
            .catch((e) => {
                console.log(e)
            })
    }
}

function initializePokemonPreviewCard(card, pokemon) {
    let newCard = card.cloneNode(true)
    let children = newCard.children
    let pokemonImg = children[0].firstElementChild
    let pokemonName = children[1]

    pokemonImg.src = pokemon.sprites.front_default
    pokemonName.textContent = capitalizeText(pokemon.name)
    newCard.addEventListener('click', () => fetchPokemon(pokemon.id))
    card.replaceWith(newCard)
}

collapseButton.addEventListener('click', collapseSideMenu)
buttonsContainer.addEventListener('click', handleButtonSelect)
auctionBid.addEventListener('keyup', formatBid)