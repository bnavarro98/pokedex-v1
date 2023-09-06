const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const pokemonList = document.getElementById('pokemon-list');

function searchPokemones(query) {
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=0`)
        .then(response => response.json())
        .then(data => {
            pokemonList.innerHTML = '';

            const filteredPokemons = data.results.filter(pokemon => 
                pokemon.name.includes(query.toLowerCase())
            );

            if (filteredPokemons.length === 0) {
                pokemonList.innerHTML = `<p>No se encontraron Pokémon que coincidan</p>`;
                return;
            }

            filteredPokemons.forEach(pokemon => {
                const pokemonCard = document.createElement('div');
                pokemonCard.classList.add('pokemon-card');
                pokemonCard.innerHTML = `
                    <h2>Nombre: ${pokemon.name}</h2>
                    <img src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${extractIDFromURL(pokemon.url)}.png' height='130' width='160'/>
                `;
                pokemonList.appendChild(pokemonCard);
            });
        })
        .catch(error => {
            console.error('Error:', error);
            pokemonList.innerHTML = `<p>Error en la búsqueda</p>`;
        });
}

function extractIDFromURL(url) {
    const idPattern = /\/(\d+)\/$/;
    const match = url.match(idPattern);
    if (match) {
        return match[1];
    }
    return '';
}

searchButton.addEventListener('click', function() {
    const pokemonText = searchInput.value.trim();

    if (pokemonText.length > 2) {
        searchPokemones(pokemonText);
    } else {
        pokemonList.innerHTML = `<p>Ingresa al menos 3 caracteres</p>`;
    }
});
