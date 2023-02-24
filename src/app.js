import { getPokemon } from "./pokemonService.js"
import { capitalizeText, removeNonNumericCharacters, formatCurrency } from "./util.js"

let sideMenu = document.querySelector('.menu') // The container of the side menu
let collapseButton = document.querySelector('.arrow') // The button that collapses the side menu
let sideMenuName = document.querySelector('.menu-name__label') // The name of the side menu
let buttonsContainer = document.querySelector('.navbar__buttons-container') // The container of the nav buttons in the side menu
let selectedButton = 'navbar-btn-1' // The id of the button that is currently selected
let pokemon = getPokemonData(22) // The currently displayed Pokemon
let auctionBid = document.querySelector('#auctionBid') // The input to the enter the bid on the auction card

const MENU_NAME = 'Coopang' // The name of the side menu
const MAX_POKEMON_ID = 1008 // The maximum value for id
const MIN_POKEMON_ID = 1 // The minimun value for id
const PREVIEW_LIST_UP_POKEMONS = 1 // Number of pokemon with a higher id that the chosen one
const PREVIEW_LIST_DOWN_POKEMONS = 2 // Number of pokemon with a lower id that the chosen one

function collapseSideMenu() {
    collapseButton.classList.toggle('arrow--right')
    sideMenu.classList.toggle('menu--collapsed')

    // Hides the name in the side menu
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
    const isButton = event.target.classList.contains('navbar-button') // Checks if the element that triggers the event is a button
    const parentIsButton = event.target.parentNode.classList.contains('navbar-button') // Checks if the parent of the element that triggers the event is a button

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
            getPokemonList(pokemonId)
        })
        .catch((e) => {
            console.log(e)
        })
}

function setPokemonDetails() {
    // Sets the pokemon attributes for the header in the main content
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

function setPokemonNameCard() {
    // Sets the pokemon attributes for the name card (the one on the top left) in the main content
    let nameCardPokemonImg = document.querySelector('#nameCardPokemonImg')
    let nameCardPokemonName = document.querySelector('#nameCardPokemonName')

    nameCardPokemonImg.src = pokemon.sprites.front_default
    nameCardPokemonName.textContent = capitalizeText(pokemon.name) + ' ' + capitalizeText(pokemon.types[0].type.name)
}

function setPokemonAttributesCard() {
    // Sets the pokemon attributes for the information card (the one on the bottom left) in the main content
    let attributesCardPokemonHeight = document.querySelector('#attributesCardPokemonHeight')
    let attributesCardPokemonAge = document.querySelector('#attributesCardPokemonAge')
    let attributesCardPokemonPrice = document.querySelector('#attributesCardPokemonPrice')

    attributesCardPokemonHeight.textContent = pokemon.height
    attributesCardPokemonAge.textContent = pokemon.height + 13
    attributesCardPokemonPrice.textContent = '$' + (pokemon.weight + 20)
}

function setPokemonAuctionCard() {
    // Sets the pokemon attributes for the actuion card (the one on the right) in the main content
    let auctionCardPokemonImg = document.querySelector('#auctionCardPokemonImg')

    auctionCardPokemonImg.src = pokemon.sprites.back_default
}

function setPokemonAttributes() {
    setPokemonDetails()
    setPokemonNameCard()
    setPokemonAttributesCard()
    setPokemonAuctionCard()
}

function resetPosition(element, actualPosition, max, min) {
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

function formatBid(event) {
    // Stores the pointer current position
    let value = event.target.value
    let valueInitialLength = value.length
    let pointerInitialPosition = event.target.selectionStart
    // Removes the characters after the "."
    let splitValue = value.split('.')
    // Removes any non-numeric characters from the value and zeros
    value = removeNonNumericCharacters(splitValue[0])
    let zeros = removeNonNumericCharacters(splitValue[1])
    // Checks if the key pressed is numeric
    const isNumber = /^[0-9]$/i.test(event.key)
    if (isNumber) {
        // Checks if the characters after the "." are only zeros
        const areZeros = /^[0]+$/i.test(zeros)
        if (zeros && !areZeros) {
            // Adds the non-zero numbers at the end of the value
            value += event.key
        }
    }
    // Format the value as a currency (0 -> $0.00)
    value = formatCurrency(value)
    // Resets the pointer position
    let newPosition = value.length - valueInitialLength + pointerInitialPosition
    // Excludes the ".00"
    let max = value.length - 3
    // Excludes the "$"
    let min = 1
    event.target.value = value
    resetPosition(event.target, newPosition, max, min)
}

function calculatePokemonListIndex(pokemonId) {
    let min = pokemonId - PREVIEW_LIST_DOWN_POKEMONS
    let max = pokemonId + PREVIEW_LIST_UP_POKEMONS

    if (min < MIN_POKEMON_ID) {
        min = MIN_POKEMON_ID
        max += PREVIEW_LIST_DOWN_POKEMONS - Math.abs(pokemonId - MIN_POKEMON_ID)
    }
    else if (max > MAX_POKEMON_ID) {
        max = MAX_POKEMON_ID
        min -= PREVIEW_LIST_UP_POKEMONS + Math.abs(pokemonId - MAX_POKEMON_ID)
    }

    return { min, max }
}

function createArrayRange(min, max, number) {
    let array = Array(max - min + 1).fill().map((value, i) => i + min);
    let index = array.indexOf(number)
    array.splice(index, 1)
    return array
}

function getPokemonList(pokemonId) {
    let limit = calculatePokemonListIndex(pokemonId)
    let pokemons = createArrayRange(limit.min, limit.max, pokemonId)
    let previewPokemonCards = document.querySelectorAll('.pokemon-preview-card') // The pokemon cards in the right side

    for (const [i, card] of previewPokemonCards.entries()) {
        getPokemon(pokemons[i])
            .then((data) => {
                setPokemonPreviewCard(card, data)
            })
            .catch((e) => {
                console.log(e)
            })
    }
}

function setPokemonPreviewCard(card, pokemon) {
    let newCard = card.cloneNode(true)
    let children = newCard.children
    let pokemonImg = children[0].firstElementChild
    let pokemonName = children[1]

    pokemonImg.src = pokemon.sprites.front_default
    pokemonName.textContent = capitalizeText(pokemon.name)
    newCard.addEventListener('click', () => getPokemonData(pokemon.id))
    card.replaceWith(newCard)
}

collapseButton.addEventListener('click', collapseSideMenu)
buttonsContainer.addEventListener('click', handleButtonSelect)
auctionBid.addEventListener('keyup', formatBid)