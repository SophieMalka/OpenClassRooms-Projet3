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
        // on l'alimente en HTML avec les données issues de l'API
        newFigure.innerHTML = `<img crossorigin="anonymous" src=${work.imageUrl} alt="${work.title}"> <figcaption>${work.title}</figcaption>`;
        // on ajoute cet élement au DOM dans la DIV gallery
        gallery.appendChild(newFigure);
    }
})