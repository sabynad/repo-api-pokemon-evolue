console.log("test code");


// ---------------------------------récupération de l'API listes éléments pokemons----------------
let elementsPokemons;
await getAllElementPokemons();
console.log("Voici les données via fetch: ", elementsPokemons);

async function getAllElementPokemons () {
    const res = await fetch("https://pokebuildapi.fr/api/v1/types", {
        method: 'GET',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-type': 'application/json',   
        }
    });
    elementsPokemons = await res.json();
}

// ------------------------------------récupération de l'API listes pokemons via methode fetch ---------------
let arrayPokemons;
await getAllPokemons();
console.log("Voici les données via fetch: ", arrayPokemons);

async function getAllPokemons () {
    const res = await fetch("https://pokebuildapi.fr/api/v1/pokemon/limit/100", {
        method: 'GET',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-type': 'application/json',   
        }
    });
    arrayPokemons = await res.json();
}

//------------------------------creation element select et option pour le texte----------------
let menuSelection = document.createElement("select");
document.querySelector("#cadre_liste").appendChild(menuSelection);

let menuOption = document.createElement("option");
menuSelection.appendChild(menuOption);

// ----------------------------------- liste pokemons----------------------------
for (let index = 0; index < arrayPokemons.length; index++) {
    let menuOption = document.createElement("option");
    menuOption.innerText = arrayPokemons[index].name;
    menuSelection.appendChild(menuOption);   
    console.log(arrayPokemons[index].name);
}
//------------------------------------ liste elements---------------------------
for (let index = 0; index < elementsPokemons.length; index++) {
    let menuOption = document.createElement("option");
    menuOption.innerText = elementsPokemons[index].name;
    menuSelection.appendChild(menuOption);   
    console.log(elementsPokemons[index].name);
}
// -------------------------------------informations Pokemon-------------------------------

