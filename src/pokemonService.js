const BASE_URL = 'https://pokeapi.co/api/v2'

export const getPokemon = async (pokemonId) => {
    const response = await fetch(`${BASE_URL}/pokemon/${pokemonId}`)
    return response.json()
}