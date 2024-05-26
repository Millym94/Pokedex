let limit = 100;
let loadMore = document.querySelector('.loadMoreButton');

let pokemonRepository = (function () {
  let e = [];

  function addPokemon(pokemon) {
    if (typeof pokemon === 'object' && 'name' in pokemon && 'detailsUrl' in pokemon) {
      e.push(pokemon);
    } else {
      console.log('wrong data type');
    }
  }

  function getAllPokemon() {
    return e;
  }

  function fetchPokemonDetails(pokemon) {
    return fetch(pokemon.detailsUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
        pokemon.imageUrl = data.sprites.front_default;
        pokemon.imageUrlBack = data.sprites.back_default;
        pokemon.height = data.height;
        pokemon.types = data.types;
        pokemon.abilities = data.abilities;
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  function displayPokemonDetails(pokemon) {
    fetchPokemonDetails(pokemon).then(function () {
      (function createPokemonModal(pokemon) {
        let modalBody = document.querySelector('.modal-body');
        let modalTitle = document.querySelector('.modal-title');
        let abilitiesParagraph = document.createElement('p');
        abilitiesParagraph.innerText = 'Abilities: ';

        pokemon.abilities.forEach(function (ability) {
          let abilitySpan = document.createElement('span');
          abilitySpan.classList.add('pokemonAbility');
          abilitySpan.innerText = ability.ability.name;
          abilitiesParagraph.appendChild(abilitySpan);
        });

        let typesParagraph = document.createElement('p');
        typesParagraph.innerText = 'Types: ';

        pokemon.types.forEach(function (type) {
          let typeSpan = document.createElement('span');
          typeSpan.classList.add('pokemonTypes');
          typeSpan.innerText = type.type.name;
          typesParagraph.appendChild(typeSpan);
        });

        let nameHeader = document.createElement('h1');
        nameHeader.innerText = pokemon.name;

        let image = document.createElement('img');
        image.src = pokemon.imageUrl;

        let heightParagraph = document.createElement('p');
        heightParagraph.innerText = `Height: ${pokemon.height}`;

        modalTitle.appendChild(nameHeader);
        modalBody.appendChild(image);

        if (pokemon.imageUrlBack) {
          let backImage = document.createElement('img');
          backImage.src = pokemon.imageUrlBack;
          modalBody.appendChild(backImage);
        }

        modalBody.appendChild(heightParagraph);
        modalBody.appendChild(abilitiesParagraph);
        modalBody.appendChild(typesParagraph);
      })(pokemon);
    });
  }

  return {
    add: addPokemon,
    getAll: getAllPokemon,
    addListItem: function (pokemon) {
      let pokemonList = document.querySelector('.pokemon-list');
      let listItem = document.createElement('div');
      listItem.classList.add('col-12', 'col-sm-6', 'col-md-4', 'col-xl-3', 'mb-4');

      let button = document.createElement('button');
      button.innerText = pokemon.name;
      button.classList.add(
        'btn',
        ['color1Button', 'color2Button', 'color3Button', 'color4Button', 'color5Button', 'color6Button'][Math.floor(6 * Math.random())],
        'btn-block'
      );

      button.setAttribute('data-toggle', 'modal');
      button.setAttribute('data-target', '#exampleModal');

      listItem.appendChild(button);
      pokemonList.appendChild(listItem);

      function addEventListenerToButton(pokemon, button) {
        button.addEventListener('click', function () {
          document.querySelector('.modal-body').innerHTML = '';
          document.querySelector('.modal-title').innerHTML = '';
          displayPokemonDetails(pokemon);
        });
      }

      addEventListenerToButton(pokemon, button);
    },
    loadDetails: fetchPokemonDetails,
    showDetails: displayPokemonDetails,
    loadList: function (offset, limit) {
      return fetch(`https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          data.results.forEach(function (result) {
            addPokemon({
              name: result.name,
              detailsUrl: result.url,
            });
          });
        })
        .catch(function (error) {
          console.error(error);
        });
    },
  };
})();

function showNumberDisplayedPokemons() {
  let displayNumberPokemons = document.querySelector('#displayNumberPokemons');
  let showNumberInNavbar = document.querySelector('#showNumberInNavbar');
  let numberOfPokemonShown = pokemonRepository.getAll().length;

  displayNumberPokemons.innerText = `${numberOfPokemonShown} pokemons of 1292 shown`;
  showNumberInNavbar.innerText = `${numberOfPokemonShown} pokemons of 1292 loaded`;
}

pokemonRepository.loadList(0, limit).then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
  showNumberDisplayedPokemons();
});

loadMore.addEventListener('click', function () {
  let numberOfPokemon = pokemonRepository.getAll().length;
  let remaining = numberOfPokemon + limit <= 1292 ? limit : 1292 - numberOfPokemon;

  pokemonRepository.loadList(numberOfPokemon, remaining).then(function () {
    pokemonRepository.getAll().slice(numberOfPokemon).forEach(function (pokemon) {
      pokemonRepository.addListItem(pokemon);
    });
    showNumberDisplayedPokemons();

    if (1292 === pokemonRepository.getAll().length) {
      loadMore.classList.add('invisible');
    }
  });
});

let backToListButton = document.querySelector('.backToList');
let loadMoreButton = document.querySelector('.loadMoreButton');
let inputField = document.querySelector('input');

function hideBackToListButton() {
  if (loadMoreButton.classList.contains('invisible') && pokemonRepository.getAll().length < 1292) {
    loadMoreButton.classList.remove('invisible');
  }

  if (!backToListButton.classList.contains('invisible')) {
    backToListButton.classList.add('invisible');
  }
}

function showBackToListButton() {
  if (backToListButton.classList.contains('invisible')) {
    backToListButton.classList.remove('invisible');
  }

  if (loadMoreButton.classList.contains('invisible')) {
    loadMoreButton.classList.remove('invisible');
  }
}

function searchPage() {
  let searchInput = inputField.value.toUpperCase();
  let totalPokemonCount = pokemonRepository.getAll().length;

  if (searchInput !== '') {
    document.querySelector('.pokemon-list').innerHTML = '';
    document.querySelector('#displayNumberPokemons').innerText = `Searched within ${totalPokemonCount} pokemons`;

    pokemonRepository.getAll().forEach(function (pokemon) {
      if (pokemon.name.toUpperCase().indexOf(searchInput) >= 0) {
        pokemonRepository.addListItem(pokemon);
      }
    });

    if (document.querySelector('.pokemon-list').innerHTML === '') {
      document.querySelector('.displayInfoText').innerText = 'No Pokemon found';
    } else {
      document.querySelector('.displayInfoText').innerText = 'Click on Pokemon name to show more details';
    }
  }

  showBackToListButton();
}

document.querySelector('.searchButton').addEventListener('click', function (e) {
  e.preventDefault();
  searchPage();
});

inputField.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') {
    e.preventDefault();
    searchPage();
  }
});

backToListButton.addEventListener('click', function () {
  document.querySelector('.pokemon-list').innerHTML = '';
  document.querySelector('.displayInfoText').innerText = 'Click on Pokemon name to show more details +++ Scroll down and click Load More to show more Pokemon';

  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });

  showNumberDisplayedPokemons();
  hideBackToListButton();
});
