let pokemonList = [
    { 
        name: 'Pikachu',
        height: 0.4,
        types: 'electric'
    },

    { 
        name: 'Charizard',
        height: 1.7,
        types: ['fire', 'flying']
    },

    { name: 
        'Mewtwo',
        height: 2,
        types: 'psychic'
    }
]

for (let i = 0; i < pokemonList.length; i++) {
    document.write(`${pokemonList[i].name} (height: ${pokemonList[i].height}) `);

    if (pokemonList[i].height > 1.8) {
        document.write(`- Wow, that is a big Pokemon!`);

    } else {
        document.write(` `);
    }

    document.write(`<br>`); // line break for formatting
}