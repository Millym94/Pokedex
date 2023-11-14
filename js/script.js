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
            'name' in pokemon
        ) {
            pokemonList.push(pokemon);
        } else {
            console.log('pokemon is not correct');
        }
    }
    

// Function to add a list item with a button for a Pokemon
  function addListItem(pokemonItem) {
    let pokemonListContainer = document.querySelector('.pokemon-list');
    let listItem = document.createElement('li');
    let button = document.createElement('button');
    button.classList.add('button-class');
    button.innerText = pokemonItem.name;  // Use pokemonItem instead of pokemon
    listItem.appendChild(button);
    pokemonListContainer.appendChild(listItem);
    button.addEventListener('click', () => {
      showDetails(pokemonItem);
    });
  }

  
  function showDetails(item) {
    loadDetails(item).then(function () {
    });
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
            console.log(pokemon)
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
// ... (your existing code)

function showDetails(item) {
  pokemonRepository.loadDetails(item).then(function () {
    const modalContainer = document.getElementById("modal-container");
    const modalTitle = document.getElementById("modal-title");
    const modalHeight = document.getElementById("modal-height");
    const modalImage = document.getElementById("modal-image");
    const modalClose = document.getElementById("modal-close");

    modalTitle.textContent = "Name: " + item.name;
    modalHeight.textContent = "Height: " + item.height;

    modalImage.setAttribute("src", item.imageUrl);
    modalImage.setAttribute("alt", item.name);

    modalClose.addEventListener("click", function () {
      closeModal();
    });

    modalContainer.style.display = "block";

    // Add event listener for the "esc" key
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" || event.key === "Esc" || event.keyCode === 27) {
        closeModal();
      }
    });

    // Add event listener for clicks outside the modal
    modalContainer.addEventListener("click", function (event) {
      if (event.target === modalContainer) {
        closeModal();
      }
    });

    // Function to close the modal
    function closeModal() {
      modalContainer.style.display = "none";
      // Remove the "keydown" event listener when the modal is closed
      document.removeEventListener("keydown", closeModal);
    }
  });
}

        return {
          add: add,
          getAll: getAll,
          addListItem: addListItem,
          loadList: loadList,
          loadDetails: loadDetails,
          showDetails: showDetails
        };
      })();
    
      
// Load Pokemon list from API and add list items w/ buttons 
    pokemonRepository.loadList().then(function() {
      pokemonRepository.getAll().forEach(function(pokemon){
        pokemonRepository.addListItem(pokemon);
      });
    });