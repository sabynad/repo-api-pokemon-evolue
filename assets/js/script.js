console.log("test code");
let elementsPokemons;
let arrayPokemons=[];

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
namePokemon();
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
// ----------------------------------- liste pokemons click menu d'eroulant----------------------------
document.getElementById("choix1").addEventListener("click", () => {
    menuSelection.options.length = 0 ;
    for (let index = 0; index < arrayPokemons.length; index++) {
        let menuOption = document.createElement("option");
        menuOption.innerText = arrayPokemons[index].name;
        menuSelection.appendChild(menuOption);   
      
    }
    namePokemon()
    
})
//------------------------------------ liste elements click  menu d'éroulant--------------------------
document.getElementById("choix2").addEventListener("click", () => {
    menuSelection.options.length = 0 ;
    for (let index = 0; index < elementsPokemons.length; index++) {
        let menuOption = document.createElement("option");
        menuOption.innerText = elementsPokemons[index].name;
        menuSelection.appendChild(menuOption);   
        // console.log(elementsPokemons[index].name);
    } 
    document.querySelector("#element").innerText = "";   
    nameElement()
})


function nameElement() {

    menuSelection.addEventListener("change", function () {
        document.querySelector("#element").innerText = "";
    // console.log("arrayPokemon :",arrayPokemons)
    let valuePoke = menuSelection.value;
    const poke = arrayPokemons.filter(pokemon => {
    return pokemon.apiTypes.some(type => type.name === valuePoke); 
    });
   let listeElement = document.createElement("ul");
   document.querySelector("#element").appendChild(listeElement);
   for (let i = 0; i < poke.length; i++){
        
        let uneListeElement = document.createElement("li");
        uneListeElement.innerText = poke[i].name;

        // integrer les petits images de pokemon sur chaque elements listés
        // for (let a = 0; a < arrayPokemons.length; a++){
        //     if (arrayPokemons[a].name == listeElement[i].name){
        //         imgSprite.setAttribute("src",arrayPokemons[a].sprite);  
        //     }               
        // }   
        // let imgSprite = document.createElement("sprite");
        // imgSprite.classList.add("img-sprite");
        // uneListeElement.appendChild(imgSprite);


        listeElement.appendChild(uneListeElement);
        // console.log(poke[i].name)
    }
  })
}



    

    
    





