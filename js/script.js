let pokemonRepository = (function () {
    // array to store pokemon data
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
];
 // Function to get all Pokemon in the repository 
function getAll() {
    return pokemonList;
}

// Function to add a new Pokemon to the Repository
function add(pokemon) {
    pokemonList.push(pokemon);
}

// Return an object that can be accessed from the outside of the function
return {
    getAll: getAll,
    add: add,
     };
})();

// Log result of getAll() to console
console.log(pokemonRepository.getAll());

// Iterate over Pokemon using forEach
pokemonRepository.getAll().forEach(function (pokemon) {
    let pokemonDetails = pokemon.name + ` (height: `+ pokemon.height +`)`;

    if (pokemon.height > 1.8) {
        pokemonDetails += `- Wow, that is a big Pokemon!`;
    }

    document.write(pokemonDetails + `<br>`); // line break for formatting
});