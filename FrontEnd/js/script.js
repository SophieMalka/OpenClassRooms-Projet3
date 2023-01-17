/**
 * Fonction afficher les projets
 */
function displayWorks(catId) {

        // récupération des projets sur l'API
    fetch("http://localhost:5678/api/works")
    .then(function(response) {
        console.log(response);
        if(response.ok) {
            return response.json();
    }
    })

    .then(function(data) {
    // une fois qu'on a les données de l'API
    console.log(data);

    //suppression des projets
    deleteWorks("api");

    const gallery = document.getElementsByClassName("gallery").item(0);
    console.log(gallery);

    //ajout des works issus de l'API (boucle sur les données de l'API)
    //alert("Alimentation !");
    //pour chaque donnée de l'API...
    setWorks(data, catId);
    });
}

function setWorks (data, catId) {
    console.log(catId);

    let fiteredData = data;
  if (catId !== 0) {
    fiteredData = data.filter((elt) => elt["categoryId"] == catId);
  } 

    for (let work of fiteredData) {

        //... on crée un noeud de type figure
        let newFigure = document.createElement("figure");
            
            // on créé une balise de type img
            let newImg = document.createElement("img");
            newImg.setAttribute("crossorigin", "anonymous");
            newImg.setAttribute("src", work.imageUrl);
            newImg.alt = work.title;

            // on crée une balise de type figcaption
            let newCaption = document.createElement("figcaption");
            newCaption.innerText = work.title;

            // on met en place la structure DOM des différentes balises crées ci dessus
            newFigure.appendChild(newImg);
            newFigure.appendChild(newCaption);

        const gallery = document.getElementsByClassName("gallery").item(0);

        // on ajoute cet élement au DOM dans la DIV gallery
        gallery.appendChild(newFigure);
    }
};

// récupération des catégories sur l'API
fetch("http://localhost:5678/api/categories")
    .then(function(response) {
        console.log(response);
        if(response.ok) {
            return response.json();
    }
})

.then(function(data){
    // une fois qu'on a les données de l'API
    console.log(data);

    //récupération de l'élément avec l'ID CSS portfolio
    const portfolio = document.getElementById("portfolio");
    console.log(portfolio);

    //on crée un noeud de type ul avec une classe filtres
    let divFiltres = document.createElement("div");
    divFiltres.classList.add("filtres");

    //on crée le filtre "Tous"
    let buttonTous = document.createElement("button");
    buttonTous.innerText = "Tous";
    buttonTous.setAttribute('id', 'btn-filtre-0');
    buttonTous.value = 0;

    //on met en place la structure DOM de l'élément crée ci-dessus
    divFiltres.appendChild(buttonTous);

    //ajout des catégories issus de l'API (boucle sur les données de l'API)
    //pour chaque donnée de l'API...
    for (let categorie of data) {
        // on créé une balise de type li
        let newButton = document.createElement("button");
        newButton.innerText = categorie.name;
        newButton.setAttribute('id', 'btn-filtre-' + categorie.id);
        newButton.value = categorie.id;
        newButton.addEventListener("click", function(event){
            console.log(event);
            console.log(event.target);
            console.log(event.target.id);
            deleteWorks("click");
            displayWorks(event.target.value);
        });
        
        // on met en place la structure DOM des différentes balises crées ci dessus
        divFiltres.appendChild(newButton);
    };

    // récupération de l'élément avec la class CSS gallery
    const gallery = document.getElementsByClassName("gallery").item(0);

    // on ajoute cet élement au DOM dans la section portfolio
    portfolio.insertBefore(divFiltres, gallery);

    // Création de la fonction filtrer sur les boutons

    // On récupère les données work de l'API
    // récupération des projets sur l'API
    fetch("http://localhost:5678/api/works")
    .then(function(response) {
        console.log(response);
        if(response.ok) {
            return response.json();
    }
    })

    .then(function(data) {
        console.log(data);

        const btnFilterObjet = document.getElementById("btn-filtre-1");
        console.log(btnFilterObjet);

        for (let work of data) {
            let workId = work.categoryId;
            console.log(workId);
        };
    });
});

/**
 * 
 * @param {String} param okok
 */
function deleteWorks (param) {
    console.log(param);
    //récupération de l'élément avec la classe CSS gallery (Objet HTMLcollection)
 const gallery = document.getElementsByClassName("gallery").item(0);
 console.log(gallery);

 //suppression de tous les enfants de cet élément (boucle WHILE)
 //alert("Purge !");
 while (gallery.hasChildNodes()) {
     gallery.removeChild(gallery.firstChild);
 }
};
 