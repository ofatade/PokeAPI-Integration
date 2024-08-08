document.addEventListener('DOMContentLoaded', function() {
    const searchForm = document.getElementById('searchForm');
    const pokemonData = document.getElementById('pokemonData');
    const pokemonDetails = document.getElementById('pokemonDetails');

    if (searchForm) {
        searchForm.addEventListener('submit', async function(event) {
            event.preventDefault();
            const pokemonName = document.getElementById('pokemonName').value.toLowerCase().trim();
            if (pokemonName) {
                try {
                    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
                    const data = await response.json();
                    displayPokemonData(data);
                } catch (error) {
                    pokemonData.innerHTML = '<div class="alert alert-danger">Pokémon not found.</div>';
                }
            }
        });
    }

    function displayPokemonData(data) {
        pokemonData.innerHTML = `
            <div class="card">
                <img src="${data.sprites.front_default}" class="card-img-top" alt="${data.name}">
                <div class="card-body">
                    <h5 class="card-title">${data.name}</h5>
                    <p class="card-text">ID: ${data.id}</p>
                    <p class="card-text">Type: ${data.types.map(type => type.type.name).join(', ')}</p>
                    <a href="details.html?id=${data.id}" class="btn btn-primary">View Details</a>
                </div>
            </div>
        `;
    }

    if (pokemonDetails) {
        const urlParams = new URLSearchParams(window.location.search);
        const pokemonId = urlParams.get('id');
        if (pokemonId) {
            fetchPokemonDetails(pokemonId);
        }
    }

    async function fetchPokemonDetails(id) {
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
            const data = await response.json();
            displayPokemonDetails(data);
        } catch (error) {
            pokemonDetails.innerHTML = '<div class="alert alert-danger">Failed to load Pokémon details.</div>';
        }
    }

    function displayPokemonDetails(data) {
        pokemonDetails.innerHTML = `
            <div class="card">
                <img src="${data.sprites.front_default}" class="card-img-top" alt="${data.name}">
                <div class="card-body">
                    <h5 class="card-title">${data.name}</h5>
                    <p class="card-text">ID: ${data.id}</p>
                    <p class="card-text">Type: ${data.types.map(type => type.type.name).join(', ')}</p>
                    <h6>Abilities:</h6>
                    <ul class="list-group">
                        ${data.abilities.map(ability => `<li class="list-group-item">${ability.ability.name}</li>`).join('')}
                    </ul>
                    <h6>Stats:</h6>
                    <ul class="list-group">
                        ${data.stats.map(stat => `<li class="list-group-item">${stat.stat.name}: ${stat.base_stat}</li>`).join('')}
                    </ul>
                </div>
            </div>
        `;
    }
});
