console.log("test code");
let elementsPokemons = [];
let arrayPokemons=[];
// INITIALISATION - DEBUT
// ---------------------------------récupération de l'API listes éléments pokemons----------------
await getAllElementPokemons();
console.log("Voici les éléments pokemon via fetch: ", elementsPokemons);

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

//------------------------------creation element select et option pour le menu deroulant----------------
let menuSelection = document.createElement("select");
document.querySelector("#cadre_liste").appendChild(menuSelection);

let menuOptionDefault = document.createElement("option");
menuOptionDefault.textContent = "--Sélection--";
menuSelection.appendChild(menuOptionDefault);

for (let index = 0; index < arrayPokemons.length; index++) {
    let menuOption = document.createElement("option");
    menuOption.innerText = arrayPokemons[index].name;
    menuSelection.appendChild(menuOption);   
}
// INITIALISATION - FIN
//
// -----------------------------------Action sur changement bouton radio----------------------------
document.querySelectorAll("input[type='radio']").forEach(radio => {
   
    radio.addEventListener("change", (eventChange) => {
     
        menuSelection.options.length = 0;
        let selectionParDefaut = document.createElement("option");
        selectionParDefaut.textContent = "--Sélection--";
        // selectionParDefaut.value = 0;
        menuSelection.appendChild(selectionParDefaut);
        
       
        console.log(menuSelection);
        console.log(menuSelection.options);
        if (eventChange.target.value == "par-nom") {
            for (let index = 0; index < arrayPokemons.length; index++) {
                let menuOption = document.createElement("option");
                menuOption.innerText = arrayPokemons[index].name;
                menuSelection.appendChild(menuOption);    
            }
        } else {
            for (let index = 0; index < elementsPokemons.length; index++) {
                let menuOption = document.createElement("option");
                menuOption.innerText = elementsPokemons[index].name;
                menuSelection.appendChild(menuOption);    
            }
        }
        console.log(menuSelection);
        console.log(menuSelection.options);
    })
});


// ON SUREVEILLE LE CHANGEMENT DE VALEUR DE LA SELECT
//
menuSelection.addEventListener("change", () => {
    document.querySelector("#image").innerHTML = ""; // Permet de pas additionner les images a chaque selection
    document.querySelector("#stats").innerHTML = "";  // Permet de pas additionner les competences a chaque selection
    if (document.querySelector("input[type='radio']:checked").value == "par-nom") {
        //remplissage div stats et images avec données du pokemon
    } else { 
        //remplissage du contenu html avec la liste des pokemon du type sélectionné
    }
})



function namePokemon() {
    menuSelection.addEventListener("change", function () {
      // On ne récupère les informations du pokemon que si la valeur de select est différente de 0 "--Selection--"
      document.querySelector("#image").innerHTML = ""; // Permet de pas additionner les images a chaque selection
      document.querySelector("#stats").innerHTML = "";  // Permet de pas additionner les competences a chaque selection
          if (menuSelection.value != 0) {
            
              // On récupère l'objet pokemon correspondant au choix de la select
                  // On cherche dans le tableau des pokemons(arrayPokemons) le poste de tableau (donc le pokemon)
                  //pour lequel la valeur de la propriété "name" est égale 
                  //à la valeur de mon élément <select>
                      let pokemonChoisi2 = arrayPokemons.find((pokemon) => pokemon.name == menuSelection.value);

                      // console.log("pokemonChoisi 2 : ", pokemonChoisi2);
                  
              // Récupération de l'image
              // partie image apparait celon le nom du pokemon choisie
                  let imagePokemon = document.createElement("img");
                  imagePokemon.classList.add("img");
                  imagePokemon.style.display = "block"; // sinon l'image reste en none si retour sur selection
                  console.log("pokemonChoisi2 : ", pokemonChoisi2);
                  imagePokemon.setAttribute("src", pokemonChoisi2.image);
                  document.querySelector("#image").appendChild(imagePokemon);
              // Récupération des stats
              for (const [propriete, valeur] of Object.entries(pokemonChoisi2.stats)) {  //METHODE; object.entries(pour injecter )
                  // console.log(`${propriete}: ${valeur}`);
                  let uneStat = document.createElement("div");
                  uneStat.classList.add("une-statistique");
                  uneStat.textContent = propriete + " : " +  valeur;
                  document.querySelector("#stats").appendChild(uneStat);                 
              }        
          }    
    })
  }
function nameElement() {

    menuSelection.addEventListener("change", function () {
        document.querySelector("#element").innerText = "";
    // console.log("arrayPokemon :",arrayPokemons)
    let valuePoke = menuSelection.value;
    const poke = arrayPokemons.filter(pokemon => { pokemon.apiTypes.some(type => type.name === valuePoke); 
    });
   let listeElement = document.createElement("ul");
   document.querySelector("#element").appendChild(listeElement);
   for (let i = 0; i < poke.length; i++){
        
        let uneListeElement = document.createElement("li");
        uneListeElement.innerText = poke[i].name;
    
        listeElement.appendChild(uneListeElement);

            const typeChoisi = elementsPokemons.find((type) => type.name == menuSelection.value);
        document.querySelector(".image-element").setAttribute("src", typeChoisi.image);

        // console.log(poke[i].name)
    }
  })
}



    

    
    





