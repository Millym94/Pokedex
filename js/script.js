let pokemonList = [
    { name: 'Pikachu', height: 0.4, types: 'electric' },
    { name: 'Charizard', height: 1.7, types: ['fire', 'flying'] },
    { name: 'Mewtwo', height: 2, types: 'psychic' }
]

for (let i = 0; 1 < pokemonList.length; i++) {
    document.write('${pokemonList[I].name} (height: ${pokemonList[i].height}) ')

    if (pokemonList[i].height > 1.8) {
        document.write('${pokemonList[i].name} (height:${pokemonList[i].height}) - Wow, That is a big Pokemon!')

    } else {
        document.write(' ${pokemonList[i].name} (height: ${pokemonList[i].height}) ')
    }
}