let pokemonRepository = (function () {
    // array to store pokemon data //
    let repository = [
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

// Function to add a new Pokemon to the repository //
    function add(pokemon) {
        if (
            typeof pokemon === `object` &&
            'name' in pokemon &&
            `height` in pokemon &&
            `types` in pokemon
        ) {
            repository.push(pokemon);
        } else {
            console.log(`pokemon is not correct`);
        }
}

// Function to get all Pokemon in the repository //
    function getAll() {
        return repository;
    }

// Function to add a list item with a button for a Pokemon //
    function addListItem(pokemon) {
        let pokemonList = document.querySelector(`.pokemon-list`);
        let listpokemon = document.createElement(`li`);
        let button = document.createElement(`button`);
        button.innerText = pokemon.name;  // Set the button's text to the Pokemon's name //
        button.classList.add(`button-class`);
        button.addEventListener(`click`, function() {   //add a click event listener to the button //
            console.log(pokemon.name + ` was chosen!`);
        });

// Append the button to the list and the list item to the Pokemon List //
        listpokemon.appendChild(button);
        pokemonList.appendChild(listpokemon);
    }

// Function to show Pokemon details (currently just logs to the console) //
    function showDetails(pokemon) {
        console.log(pokemon);
    }
  
    return {
        add:add,
        getAll: getAll,
        addListItem: addListItem
    };
})();

// Add a new Pokemon to the repository //
pokemonRepository.add({ name: `Gyarados`, height: 6.5, types: [`water`, `flying`] });

// Log all Pokemon in the repository //
console.log(pokemonRepository.getAll());

// Iterate over the Pokemon list & add items with buttons for each //
pokemonRepository.getAll().forEach(function (pokemon) {
  pokemonRepository.addListItem(pokemon);
});