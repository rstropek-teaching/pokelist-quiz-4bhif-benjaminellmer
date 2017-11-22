const details = document.getElementById("details");
const pokeDetails = document.getElementById("pokeDetails");
const pokemonList = document.getElementById('pokemons');
const count = document.getElementById("count");
const pokeList = document.getElementById("pokemonList");
const uri = "https://pokeapi.co/api/v2/pokemon/?limit=20&offset=";

var offset = 0;
var query;
var countstring;

fillList();

if(details != null){
    details.style.display = 'none';
}

function prevPage() {
    if (offset >= 20) {
        offset = offset - 20;
        fillList();
    }
}

function nextPage() {
    offset = offset + 20;
    fillList();
}

function fillList() {
    query = uri + offset;
    if (pokemonList != null && count != null) {
        (function () {
            fetch(query).then(response => {
                response.json().then(pokelist => {
                    let html = '';
                    for (const pokemon of pokelist.results) {
                        html += `<li onclick=showDetails(this.id) id=${pokemon.url}>${pokemon.name}</li>`
                    }

                    countstring = "Pokemon " + (offset + 1) + " to " + (offset + 20);

                    pokemonList.innerHTML = html;
                    count.innerHTML = countstring;
                });
            });
        }());
    }
}

function showDetails(pokeURL:any){
    fetch(pokeURL).then(response => {
        response.json().then(pokedetails => {
            let html = '';
            html += `<b>Name: </b>${pokedetails.name}<br>`
            html += `<img src=${pokedetails.sprites.front_default}></img><br>`
            html += `<b>weight: </b>${pokedetails.weight}<br><br><b>abilities:</b><ul>`
            
            for (const ability of pokedetails.abilities) {
                html += `<li>${ability.ability.name}</li>`
            }
            
            html += "</ul>";

            if(details != null && pokeList != null && pokeDetails != null){
                pokeDetails.innerHTML = html;
                details.style.display = 'block';
                pokeList.style.display = 'none';
            }
        });
    });
}

function goBack() {
    if(details != null){
        details.style.display = 'none';
    }
    if(pokeList != null){
        pokeList.style.display = 'block';
    }
}