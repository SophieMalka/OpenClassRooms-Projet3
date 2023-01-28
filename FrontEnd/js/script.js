/**
 * 
 * @param {String} param Suppression de tous les projets dans la div Gallery
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
 
/**
 * 
 * @param {String} catId Ajout de tous les projets dans la div Gallery
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
    //pour chaque donnée de l'API...
    setWorks(data, catId);
    });
}

/**
 * 
 * @param {String} data Récupération des projets sur l'API
 * @param {String} catId Filtrage des projets en fonction de leur catégorie
 */
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

function displayButton() {
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
        divFiltres.style.display = 'flex';
        divFiltres.style.flexDirection = 'row';
        divFiltres.style.justifyContent = 'center';
        divFiltres.style.columnGap = '10px';
        divFiltres.style.marginBottom = '50px';

        //on crée le filtre "Tous"
        let buttonTous = document.createElement("button");
        buttonTous.innerText = "Tous";
        buttonTous.setAttribute('id', 'btn-filtre-0');
        buttonTous.value = 0;
        buttonTous.addEventListener("click", function(event){
        });
        buttonTous.style.fontFamily = 'Syne';
        buttonTous.style.fontSize = '16px';
        buttonTous.style.fontWeight = '700';
        buttonTous.style.lineHeight = '19px';
        buttonTous.style.color = '#1D6154';
        buttonTous.style.border = '1px solid #1D6154';
        buttonTous.style.backgroundColor = '#FFFEF8';
        buttonTous.style.borderRadius = '60px';
        buttonTous.style.width = 'fit-content';
        buttonTous.style.padding = '8px 20px';
        buttonTous.addEventListener("mouseover", function(event){
            event.target.style.textDecoration = 'none';
            event.target.style.color = '#FFFFFF';
            event.target.style.backgroundColor = '#1D6154';
        });
        buttonTous.addEventListener("mouseout", function(event){
            event.target.style.color = '#1D6154';
            event.target.style.backgroundColor = '#FFFEF8';
        });

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
            // on ajoute le style aux boutons de filtre
            newButton.style.fontFamily = 'Syne';
            newButton.style.fontSize = '16px';
            newButton.style.fontWeight = '700';
            newButton.style.lineHeight = '19px';
            newButton.style.color = '#1D6154';
            newButton.style.border = '1px solid #1D6154';
            newButton.style.backgroundColor = '#FFFEF8';
            newButton.style.borderRadius = '60px';
            newButton.style.width = 'fit-content';
            newButton.style.padding = '8px 20px';
            // on ajoute le style aux bouton de filtre lors du survol
            newButton.addEventListener("mouseover", function(event){
                event.target.style.textDecoration = 'none';
                event.target.style.color = '#FFFFFF';
                event.target.style.backgroundColor = '#1D6154';
            });
            newButton.addEventListener("mouseout", function(event){
                event.target.style.color = '#1D6154';
                event.target.style.backgroundColor = '#FFFEF8';
            });

            // on met en place la structure DOM des différentes balises crées ci dessus
            divFiltres.appendChild(newButton);
        };

        // récupération de l'élément avec la class CSS gallery
        const gallery = document.getElementsByClassName("gallery").item(0);

        // on ajoute cet élement au DOM dans la section portfolio
        portfolio.insertBefore(divFiltres, gallery);
    });
};

displayButton();

// PASSAGE AU MODE EDITION

/**
 * Création de la fonction Log Out
 */
function logout() {
    const log = document.querySelector('nav > ul > li > a');
    console.log(log);

    log.innerText = "logout";

    log.addEventListener("click", function () {
        localStorage.clear();
    });
};

function displayEditMode() {
    const body = document.querySelector('body');
    console.log(body);
    body.style.flexWrap = 'wrap';
    body.style.marginTop = '0';
    body.style.maxWidth = '100%';

    let banniere = document.createElement('div');
    banniere.style.backgroundColor = '#000000';
    banniere.style.width = '100%';
    banniere.style.margin = '0';
    banniere.style.height = '59px';
    banniere.style.marginBottom = '39px';
    banniere.style.display = 'flex';
    banniere.style.justifyContent = 'center';
    banniere.style.alignItems = 'center';
    banniere.style.columnGap = '21px';

    body.prepend(banniere);

    const header = document.querySelector('header');
    header.style.maxWidth = '1140px';
    header.style.margin = '50px auto';

    const main = document.querySelector('main');
    main.style.maxWidth= '1140px';
    main.style.margin = 'auto';

    let edit = document.createElement('p');
    edit.innerHTML = '<i class="fas fa-regular fa-pen-to-square fa-lg"></i> Mode édition';
    edit.style.color = '#FFFFFF';
    edit.style.fontFamily = 'Work Sans';
    edit.style.fontSize = '14px';

    let publi = document.createElement('button');
    publi.innerText = 'publier les changements';
    publi.style.color = '#000000';
    publi.style.backgroundColor = '#FFFFFF';
    publi.style.borderRadius = '60px';
    publi.style.padding = '11px 23px';
    publi.style.fontFamily = 'Work Sans';
    publi.style.fontSize = '14px'

    banniere.append(edit);
    banniere.appendChild(publi);
};

function displayModifButtonIntro() {
    let modifier = document.createElement('a');
    modifier.innerHTML = '<i class="fas fa-regular fa-pen-to-square fa-lg"></i> modifier';

    const articleIntro = document.querySelector('#introduction > article');
    console.log(articleIntro);

    const titleIntro = document.querySelector('#introduction > article > h2');
    titleIntro.style.marginTop = '1em';

    articleIntro.prepend(modifier);
};

function displayModifButtonPhoto() {
    let modifier = document.createElement('a');
    modifier.innerHTML = '<i class="fas fa-regular fa-pen-to-square fa-lg"></i> modifier';
    modifier.style.marginLeft = '56px';

    const figureIntro = document.querySelector('#introduction > figure');

    figureIntro.appendChild(modifier);

    const imgIntro = document.querySelector('#introduction > figure > img');
    imgIntro.style.marginBottom = '15px';
};

function displayModifButtonWorks() {
    let divTitle = document.createElement('div');
    divTitle.setAttribute('id', 'titlework');
    divTitle.style.display = 'flex';
    divTitle.style.justifyContent = 'center';
    divTitle.style.alignItems = 'center';
    divTitle.style.columnGap = '31px';

    const portfolio = document.getElementById('portfolio');
    portfolio.prepend(divTitle);

    let modifier = document.createElement('a');
    modifier.innerHTML = '<i class="fas fa-regular fa-pen-to-square fa-lg"></i> modifier';
    modifier.style.marginBottom = '2em';

    const title = document.querySelector('#portfolio > h2');

    divTitle.append(title);
    divTitle.appendChild(modifier);
};

function token() {
    // Vérification de la récupération du token
    localStorage.getItem("token");
    console.log(localStorage);

    // Si le token est récupéré
    if (localStorage.getItem("token")) {
        logout();
        displayEditMode();
        displayModifButtonIntro();
        displayModifButtonPhoto();
        displayModifButtonWorks();
    };
};

token();
