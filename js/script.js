// ------------------------------ IIFE -------------------------------------- //

let pokemonRepository = (function () {
    let pokemonList = [];  // * Initialize an empty array to store Pokemon data 
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';   //* URL for Pokemon API *//


// ----------- Function to add a new Pokemon to the repository---------------  //

    function add(pokemon) {
        if (
            typeof pokemon === `object` &&
            'name' in pokemon
        ) {
            pokemonList.push(pokemon);
        } else {
            console.log(`pokemon is not correct`);
        }
    }
    
// ------------- Function to get all Pokemon in the repository---------------- //
    function getAll() {
      return pokemonList;
  }
// ---------- Function to add a list item with a button for a Pokemon-------- //
    function addListItem(pokemon) {
        let pokemonList = document.querySelector(`.pokemon-list`);
        let listpokemon = document.createElement(`li`);
        let button = document.createElement(`button`);
        button.innerText = pokemon.name;  // * Set the button's text to the Pokemon's name * //
        button.classList.add(`button-class`);
        listpokemon.appendChild(button);
        pokemonList.appendChild(listpokemon);
        button.addEventListener(`click`, function(event) {   // * Add a click event listener to button to show Pokemon details * /
            showDetails(pokemon);
        });
    }
  
 // ------------------ Load pokemon from API -------------------------------- //
    function loadList() {
        return fetch(apiUrl).then(function (response) {
          return response.json();
        }).then(function (json) {
          json.results.forEach(function (item) {
            let pokemon = {
              name: item.name,
              detailsUrl: item.url
            };
            add(pokemon);
            console.log(pokemon);
          });
        }).catch(function (e) {
          console.error(e);
        })
      }

// ------------------- Load details of pokemon from API ------------------------ //
      function loadDetails(item) {
        let url = item.detailsUrl;
        return fetch(url).then(function (response) {
          return response.json();
        }).then(function (details) {
          // -----Now we add the details to the item--- //
          item.imageUrl = details.sprites.front_default;
          item.height = details.height;
          item.types = details.types;
        }).catch(function (e) {
          console.error(e);
        });
      }
    
      function showDetails(item) {
        pokemonRepository.loadDetails(item).then(function () {
          console.log(item);
        });
      }

      return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails
      };
    })();
    
// ------- Load Pokemon list from API and add list items w/ buttons --------- //
    pokemonRepository.loadList().then(function() {
      pokemonRepository.getAll().forEach(function(pokemon){
        pokemonRepository.addListItem(pokemon);
      });
    });