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

    //récupération de l'élément avec la classe CSS gallery (Objet HTMLcollection)
    const gallery = document.getElementsByClassName("gallery").item(0);
    console.log(gallery);

    //suppression de tous les enfants de cet élément (boucle WHILE)
    //alert("Purge !");
    while (gallery.hasChildNodes()) {
        gallery.removeChild(gallery.firstChild);
    }

    //ajout des works issus de l'API (boucle sur les données de l'API)
    //alert("Alimentation !");
    //pour chaque donnée de l'API...
    for (let work of data) {
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

        // on ajoute cet élement au DOM dans la DIV gallery
        gallery.appendChild(newFigure);
    }
});


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
    let newUl = document.createElement("ul");
    newUl.classList.add("filtres");

    //ajout des catégories issus de l'API (boucle sur les données de l'API)
    //pour chaque donnée de l'API...
    for (let categorie of data) {
        // on créé une balise de type li
        let newLi = document.createElement("li");
        newLi.innerText = categorie.name;

        // on met en place la structure DOM des différentes balises crées ci dessus
        newUl.appendChild(newLi);

        // on ajoute cet élement au DOM dans la section portfolio
        portfolio.appendChild(newUl);
    };
});