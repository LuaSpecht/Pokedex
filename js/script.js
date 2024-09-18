let pokemonName = document.querySelector('.pokemon-name');
let pokemonNumber = document.querySelector('.pokemon-number');
let pokemonImage = document.querySelector('.pokemon-image');


let form = document.querySelector('.form');
let input = document.querySelector('#input-search');
let prev = document.querySelector('.prev-btn');
let next = document.querySelector('.next-btn');

let searchPokemon = 1;


const fetchPokemon = async (pokemon) => {

  const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)

  if (APIResponse.status === 200){
    const data = await APIResponse.json();
    return data
  }

  

}

const renderPokemon = async (pokemon) => {
  
  pokemonName.innerHTML = 'Loading...';
  pokemonNumber.innerHTML = '';
  pokemonImage.style.display = 'none';

  const data = await fetchPokemon(pokemon);

  if(data){
    pokemonImage.style.display = 'block';
    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = data.id + '-';
    pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];

    input.value = '';
    searchPokemon = data.id
  } else{
    pokemonImage.style.display = 'none';
    pokemonName.innerHTML = 'Not Found :c';
    pokemonNumber.innerHTML = '';
  }
}

form.addEventListener('submit', (event) => {
  event.preventDefault()

  renderPokemon(input.value.toLowerCase());

})

prev.addEventListener('click', () => {
  if(searchPokemon > 1){
    searchPokemon -= 1;
    renderPokemon(searchPokemon)
  }
  

})

next.addEventListener('click', () => {
  searchPokemon += 1;
  renderPokemon(searchPokemon)
})

renderPokemon(searchPokemon)
