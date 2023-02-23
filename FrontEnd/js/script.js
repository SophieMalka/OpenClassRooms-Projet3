const urlCategories = 'http://localhost:5678/api/categories';
const urlWorks = 'http://localhost:5678/api/works';
const urlLogin = 'http://localhost:5678/api/users/login';
let selectedCategoryId = 0; // par défaut, afficher tous les works

/**
 * Suppression des works de la gallerie
 */
function deleteWorks() {
    const gallery = document.getElementsByClassName("gallery").item(0);
    while (gallery.firstChild) {
        gallery.removeChild(gallery.firstChild);
    };
};

/**
 * Affichage des works dans la gallerie
 */
function displayWorks() {
    fetch(urlWorks)
        .then(function (response) {
            if (response.ok) {
                return response.json();
            }
        })
        .then(function (data) {
            deleteWorks(); // effacer les œuvres existantes avant d'afficher les nouvelles
            for (let work of data) {
                if (selectedCategoryId === 0 || selectedCategoryId === work.categoryId) {
                // afficher l'œuvre uniquement si elle appartient à la catégorie sélectionnée ou si toutes les catégories sont sélectionnées
                let figure = document.createElement("figure");
                let image = document.createElement("img");
                image.setAttribute("crossorigin", "anonymous");
                image.setAttribute("src", work.imageUrl);
                image.alt = work.title;
                figure.appendChild(image);
                let figCaption = document.createElement("figcaption");
                figCaption.innerText = work.title;
                figure.appendChild(figCaption);
                const gallery = document.getElementsByClassName("gallery").item(0);
                gallery.appendChild(figure);
                }
            };
        })
};

/**
 * Affichage et fonctionnement des boutons filtres
 */
function displayFilter() {
    fetch(urlCategories)
        .then(function (response) {
            if (response.ok) {
                return response.json();
            };
        })

        .then(function (data) {
            data.unshift({
                id: 0,
                name: 'Tous'
            });

            const portfolio = document.getElementById("portfolio");
            const gallery = document.getElementsByClassName("gallery").item(0);

            let divFiltres = document.createElement("div");
            divFiltres.classList.add("filtres");
            divFiltres.style.display = 'flex';
            divFiltres.style.flexDirection = 'row';
            divFiltres.style.justifyContent = 'center';
            divFiltres.style.columnGap = '10px';
            divFiltres.style.marginBottom = '50px';

            portfolio.insertBefore(divFiltres, gallery);

            for (let categorie of data) {
                let button = document.createElement("button");
                button.innerText = categorie.name;
                button.value = categorie.id;
                button.addEventListener('click', function (event) {
                    selectedCategoryId = parseInt(event.target.value); // mettre à jour l'identifiant de la catégorie sélectionnée
                    displayWorks(); // afficher les works filtrés
                });

                button.style.fontFamily = 'Syne';
                button.style.fontSize = '16px';
                button.style.fontWeight = '700';
                button.style.lineHeight = '19px';
                button.style.color = '#1D6154';
                button.style.border = '1px solid #1D6154';
                button.style.backgroundColor = '#FFFEF8';
                button.style.borderRadius = '60px';
                button.style.width = 'fit-content';
                button.style.padding = '8px 20px';

                button.addEventListener("mouseover", function(event){
                    event.target.style.textDecoration = 'none';
                    event.target.style.color = '#FFFFFF';
                    event.target.style.backgroundColor = '#1D6154';
                });
                button.addEventListener("mouseout", function(event){
                    event.target.style.color = '#1D6154';
                    event.target.style.backgroundColor = '#FFFEF8';
                });

                divFiltres.appendChild(button);
            };
        })
};

displayWorks();
displayFilter();

// AFFICHAGE DU MODE EDITION APRES CONNEXION DE L'ADMIN

/**
 * Affichage des éléments admin si la connexion est bien effectuée
 */
function token() {
    localStorage.getItem("token");
    if (localStorage.getItem("token")) {
        logout();
        displayEditMode();
        displayEditButtonIntro();
        displayEditButtonPhoto();
        displayEditButtonWorks();
    };
};

/**
 * Déconnexion du compte admin
 */
function logout() {
    const log = document.querySelector('nav > ul > li > a');
    log.innerText = "logout";
    log.addEventListener("click", function () {
        localStorage.clear();
    });
};

/**
 * Affichage de la bannière en mode édition
 */
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
    publi.setAttribute('id', 'publier');
    publi.innerText = 'publier les changements';
    publi.style.color = '#000000';
    publi.style.backgroundColor = '#FFFFFF';
    publi.style.border = 'none';
    publi.style.borderRadius = '60px';
    publi.style.padding = '11px 23px';
    publi.style.fontFamily = 'Work Sans';
    publi.style.fontSize = '14px'

    banniere.append(edit);
    banniere.appendChild(publi);
};

/**
 * Afficher le bouton modifier dans l'introduction
 */
function displayEditButtonIntro() {
    let modifier = document.createElement('a');
    modifier.innerHTML = '<i class="fas fa-regular fa-pen-to-square fa-lg"></i> modifier';

    const articleIntro = document.querySelector('#introduction > article');
    console.log(articleIntro);

    const titleIntro = document.querySelector('#introduction > article > h2');
    titleIntro.style.marginTop = '1em';

    articleIntro.prepend(modifier);
};

/**
 * Afficher le bouton modifier pour la photo
 */
function displayEditButtonPhoto() {
    let modifier = document.createElement('a');
    modifier.innerHTML = '<i class="fas fa-regular fa-pen-to-square fa-lg"></i> modifier';
    modifier.style.marginLeft = '56px';

    const figureIntro = document.querySelector('#introduction > figure');

    figureIntro.appendChild(modifier);

    const imgIntro = document.querySelector('#introduction > figure > img');
    imgIntro.style.marginBottom = '15px';
};

/**
 * Afficher le bouton modifier pour les projets
 */
function displayEditButtonWorks() {
    let divTitle = document.createElement('div');
    divTitle.setAttribute('id', 'titlework');
    divTitle.style.display = 'flex';
    divTitle.style.justifyContent = 'center';
    divTitle.style.alignItems = 'center';
    divTitle.style.columnGap = '31px';

    const portfolio = document.getElementById('portfolio');
    portfolio.prepend(divTitle);

    let modifier = document.createElement('a');
    modifier.classList.add("js-modal");
    modifier.setAttribute("href", "#modal");
    modifier.innerHTML = '<i class="fas fa-regular fa-pen-to-square fa-lg"></i> modifier';
    modifier.style.marginBottom = '2em';
    modifier.style.textDecoration = 'none';
    modifier.style.color = '#000000';

    const title = document.querySelector('#portfolio > h2');

    divTitle.append(title);
    divTitle.appendChild(modifier);
};

token();

// AFFICHAGE ET FONCTIONNALITES DE LA MODALE

/**
 * Affichage et suppression des works dans la modale
 */
function displayWorksModal() {
    fetch("http://localhost:5678/api/works")
        .then(function (response) {
            if (response.ok) {
                return response.json();
            }
        })
    
        .then(function (data) {

            for (let work of data) {
                let newFigure = document.createElement("figure");
                newFigure.style.width = '85px';
                newFigure.style.height = '128px';
                newFigure.style.position = 'relative';

                let newImg = document.createElement("img");
                newImg.setAttribute("crossorigin", "anonymous");
                newImg.setAttribute("src", work.imageUrl);
                newImg.alt = work.title;
                newImg.style.width = '100%';
                newImg.style.objectFit = 'cover';

                let deleteButton = document.createElement("button");
                deleteButton.setAttribute("id", work.id);
                deleteButton.classList.add('js-delete-button');
                deleteButton.style.position = 'absolute';
                deleteButton.style.backgroundColor = '#000000';
                deleteButton.style.padding = '4px';
                deleteButton.style.border = 'none';
                deleteButton.style.borderRadius = '2px';
                deleteButton.style.marginLeft = '55px';
                deleteButton.style.marginTop = '6px';

                let deleteIcon = document.createElement("i");
                deleteIcon.classList.add("fa-solid", "fa-trash-can");
                deleteIcon.style.color = '#FFFFFF';
                deleteIcon.style.fontSize = '14px';

                deleteButton.appendChild(deleteIcon);

                let newCaption = document.createElement("figcaption");
                newCaption.innerText = 'éditer';

                newFigure.appendChild(deleteButton);
                newFigure.appendChild(newImg);
                newFigure.appendChild(newCaption);

                const modalGallery = document.getElementById('modal-gallery');
                modalGallery.appendChild(newFigure);

                deleteButton.addEventListener('click', function (event) {
                    event.preventDefault();
                    const idWorks = event.target.id;
                    deleteWorksModal(idWorks)
                })
            };
        })
};

/**
 * Envoie une requête HTTP DELETE à l'API pour supprimer les works correspondant à l'identifiant fourni
 * @param {Number} idWorks Identifiant des works à supprimer
 */
function deleteWorksModal(idWorks) {
    fetch(`http://localhost:5678/api/works/${idWorks}`, {
        method: 'DELETE',
        headers: {
            "Content-type": "application/Json",
            Authorization: "Bearer " + localStorage.getItem("token"),
        },
    })
        .then((response) => {
            if (response.status === 201) {
                displayWorks();
            };
        });
};

displayWorksModal();