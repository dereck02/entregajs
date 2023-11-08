async function fetchPokemonData() {
  const pokemonNumber = document.getElementById("pokemonNumber").value;
  const pokemonCard = document.getElementById("pokemonCard");
  pokemonCard.innerHTML = "";

  if (!pokemonNumber) {
    pokemonCard.innerText = "Por favor, ingresa un número de Pokémon válido.";
    return;
  }

  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemonNumber}`
    );
    const data = await response.json();

    const pokemonName = data.name;
    const pokemonTypes = data.types.map((type) => type.type.name).join(", ");
    const pokemonHeight = data.height / 10; // Convertir de decímetros a metros
    const pokemonWeight = data.weight / 10; // Convertir de hectogramos a kilogramos
    const pokemonImageUrl = data.sprites.front_default;

    const cardHtml = `
            <div class="card">
                <h2>${pokemonName}</h2>
                <p><strong>Tipo:</strong> ${pokemonTypes}</p>
                <p><strong>Altura:</strong> ${pokemonHeight} m</p>
                <p><strong>Peso:</strong> ${pokemonWeight} kg</p>
                <img src="${pokemonImageUrl}" alt="${pokemonName}">
            </div>
        `;
    pokemonCard.innerHTML = cardHtml;
  } catch (error) {
    pokemonCard.innerText = "No se encontró ningún Pokémon con ese número.";
  }
}
