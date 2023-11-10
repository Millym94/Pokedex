// IIFE: Pokemon Repository

let pokemonRepository = (function () {

    let pokemonList = [];  //  Initialize an empty array to store Pokemon data 

    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';   // URL for Pokemon API 

// Function to get all Pokemon in the repository
function getAll() {
  return pokemonList;
}

//  Function to add a new Pokemon to the repository

    function add(pokemon) {
        if (
            typeof pokemon === 'object' &&
            'name' in pokemon &&
            'detailsUrl' in pokemon
        ) {
            pokemonList.push(pokemon);
        } else {
            console.log('pokemon is not correct');
        }
    }
    

// Function to add a list item with a button for a Pokemon
  function addListItem(pokemon) {
    let fullList = document.querySelector('.pokemon-list');
    let listItem = document.createElement('li');
    let button = document.createElement('button');
    button.classList.add('button-class');
    button.innerText = pokemon.name;  // Set the button's text to the Pokemon's name
    listItem.appendChild(button);
    fullList.appendChild(listItem);
    button.addEventListener('click', () => { // Add a click event listener to button to show Pokemon details
      showDetails(pokemon);
    });
}
  
  function showDetails (pokemon) {
    showModal (pokemon);
  }

 // Load pokemon from API 
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
          });
        }).catch(function (e) {
          console.error(e);
        })
      }

//  Load details of pokemon from API 
      function loadDetails(item) {
        let url = item.detailsUrl;
        return fetch(url).then(function (response) {
          return response.json();
        }).then(function (details) {

          // Now we add the details to the item
          item.imageUrl = details.sprites.front_default;
          item.height = details.height;
          item.types = details.types;
          showModal(item);
        }).catch(function (e) {
          console.error(e);
        });
      }

// Displays the Modal with Pokemon
        function showModal(pokemon) {
          let modalContainer = document.querySelector('#modal-container');

          // Clear all existing modal content
          modalContainer.innerHTML = '';
          let modal = document.createElement('div');
          modal.classList.add('modal');

          // Add the new modal content
          let closeButtonElement = document.createElement('button');
          closeButtonElement.classList.add('modal-close');
          closeButtonElement.innerText = 'X';
          closeButtonElement.addEventListener('click', hideModal);

          let titleElement = document.createElement('h1');
          titleElement.innerText = pokemon.name;

          let imageElement = document.createElement('img');
          imageElement.classList.add('modal-img');
          imageElement.src = pokemon.imageUrl

          let contentElement = document.createElement('p');
          contentElement.innerText = 'HEIGHT: ' + pokemon.height;

          let typesElement = document.createElement('p');
          typesElement.innerText= 'TYPES: ' + pokemon.types;

          modal.appendChild(closeButtonElement);
          modal.appendChild(imageElement);
          modal.appendChild(titleElement);
          modal.appendChild(contentElement);
          /* model.appendChild(typesElement);*/
          modalContainer.appendChild(modal);

          modalContainer.classList.add('is-visible');
        }

        modalContainer.addEventListener('click', (e) => {
          // Since this is also triggered when clicking INSIDE the modal
          // We only want to close if the user clicks directly on the overlay
          let target = e.target;
          if (target === modalContainer) {
            hideModal();
          }
        });

        return {
          add: add,
          getAll: getAll,
          addListItem: addListItem,
          loadList: loadList,
          loadDetails: loadDetails,
          showDetails: showDetails
        };
      })();

       let dialogPromiseReject; // To set later

      // Hide Modal Function
        function hideModal() {
          let modalContainer = document.querySelector('#modal-container');
          modalContainer.classList.remove('is-visible');

          if (dialogPromiseReject) {
            dialogPromiseReject();
            dialogPromiseReject = null;
          }
        }

      // Declare the modal container visible & Remove by pressing ESQ key
        window.addEventListener('keydown', (e) => {
          let modalContainer = document.querySelector('#modal-container');
          if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
            hideModal();  
          }
        });
    
    
    
// Load Pokemon list from API and add list items w/ buttons 
    pokemonRepository.loadList().then(function() {
      pokemonRepository.getAll().forEach(function(pokemon){
        pokemonRepository.addListItem(pokemon);
      });
    });