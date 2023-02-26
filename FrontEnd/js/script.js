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
                deleteButton.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
                deleteButton.style.position = 'absolute';
                deleteButton.style.backgroundColor = '#000000';
                deleteButton.style.padding = '4px';
                deleteButton.style.border = 'none';
                deleteButton.style.borderRadius = '2px';
                deleteButton.style.marginLeft = '55px';
                deleteButton.style.marginTop = '6px';
                deleteButton.style.color = '#FFFFFF';
                deleteButton.style.fontSize = '14px';

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
                    deleteWorksApi(idWorks)
                })
            };
        })
};

/**
 * Envoie une requête HTTP DELETE à l'API pour supprimer les works correspondant à l'identifiant fourni
 * @param {Number} idWorks Identifiant des works à supprimer
 */
function deleteWorksApi(idWorks) {
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

/**
 * Affichage de la modale en mode ajout de works au clic sur le bouton ajouter une photo
 */
function displayAddWorksModal() {
    const addWorksButton = document.getElementsByClassName('js-add-works').item(0);
    addWorksButton.addEventListener('click', function () {
        deleteModalGallery();
        updateModal();
    });
};

/**
 * Suppression du contenu de la div gallery dans la modal
 */
function deleteModalGallery() {
    const gallery = document.getElementById('modal-gallery');
    while (gallery.firstChild) {
        gallery.removeChild(gallery.firstChild);
    };
};

/**
 * Mise à jour du contenu de la modale avec les éléments d'ajout de works
 */
function updateModal() {
    const modalWrapper = document.querySelector('.modal-wrapper');

    const modalNav = document.createElement('div');
    modalNav.classList.add('modal-nav');
    modalNav.style.display = 'flex';
    modalNav.style.justifyContent = 'space-between';

    modalWrapper.prepend(modalNav);

    const closeButton = document.querySelector('.js-close-modal');

    const goBackButton = document.createElement('button');
    goBackButton.classList.add('js-go-back-button');
    goBackButton.innerHTML = '<i class="fa-solid fa-arrow-left"></i>';
    goBackButton.style.border = 'none';
    goBackButton.style.background = 'none';
    goBackButton.style.marginLeft = '36px';
    goBackButton.style.fontSize = '12px';

    modalNav.appendChild(goBackButton);
    modalNav.appendChild(closeButton);

    const titleModal = document.querySelector('.modal-wrapper > h3');
    titleModal.innerText = "Ajout photo";

    const gallery = document.getElementById('modal-gallery');

    const containImg = document.createElement('div');
    containImg.classList.add('container-img');
    containImg.style.width = '100%';
    containImg.style.height = 'fit-content';
    containImg.style.backgroundColor = '#E8F1F6';
    containImg.style.display = 'flex';
    containImg.style.flexDirection = 'column';
    containImg.style.alignItems = 'center';
    containImg.style.padding = '28px';
    containImg.style.marginBottom = '30px';

    const iconImg = document.createElement('img');
    iconImg.src = 'assets/icons/icon-img.png'
    iconImg.style.width = '58px';
    iconImg.style.height = '52px';
    iconImg.style.marginBottom = '21px';

    const formImg = document.createElement('form');
    formImg.style.marginBottom = '17px';

    const labelAddImgButton = document.createElement('label');
    labelAddImgButton.setAttribute('for', 'file');
    labelAddImgButton.innerText = '+ Ajouter photo';
    labelAddImgButton.style.padding = '10px 33px';
    labelAddImgButton.style.fontSize = '14px';
    labelAddImgButton.style.fontStyle = 'medium';
    labelAddImgButton.style.lineHeight = '16px';
    labelAddImgButton.style.color = '#306685';
    labelAddImgButton.style.fontFamily = 'Work Sans';
    labelAddImgButton.style.backgroundColor = '#CBD6DC';
    labelAddImgButton.style.border = 'none';
    labelAddImgButton.style.borderRadius = '50px';
    labelAddImgButton.style.cursor = 'pointer';

    const addImgButton = document.createElement('input');
    addImgButton.type = 'file';
    addImgButton.setAttribute('id', 'file');
    addImgButton.style.width = '0';
    addImgButton.style.height = '0';
    addImgButton.style.overflow = 'hidden';

    formImg.appendChild(labelAddImgButton);
    formImg.appendChild(addImgButton);

    const infoAddImg = document.createElement('p');
    infoAddImg.innerText = 'jpg, png : 4mo max';
    infoAddImg.style.fontFamily = 'Work Sans';
    infoAddImg.style.fontSize = '10px';
    infoAddImg.style.color = '#444444';

    gallery.appendChild(containImg);
    containImg.appendChild(iconImg);
    containImg.appendChild(formImg);
    containImg.appendChild(infoAddImg);

    const formAddImg = document.createElement('form');
    formAddImg.style.display = 'flex';
    formAddImg.style.flexDirection = 'column';
    formAddImg.style.rowGap = '10px';
    formAddImg.style.width = '100%';
    formAddImg.style.marginBottom = '17px';

    const labelTitle = document.createElement('label');
    labelTitle.setAttribute('for', 'title');
    labelTitle.innerText = 'Titre';
    labelTitle.style.fontFamily = 'Work Sans';
    labelTitle.style.fontSize = '14px';

    let inputTitle = document.createElement('input');
    inputTitle.setAttribute('type', 'text');
    inputTitle.setAttribute('name', 'title');
    inputTitle.setAttribute('id', 'title');
    inputTitle.setAttribute('required', 'required');
    inputTitle.style.border = 'none';
    inputTitle.style.boxShadow = '0px 4px 14px 0px rgba(0, 0, 0, 0.09)';
    inputTitle.style.marginBottom = '10px';
    inputTitle.style.padding = '17px';
    inputTitle.style.fontFamily = 'Work Sans';

    const labelCategory = document.createElement('label');
    labelCategory.setAttribute('for', 'category');
    labelCategory.innerText = 'Catégorie';
    labelCategory.style.fontFamily = 'Work Sans';
    labelCategory.style.fontSize = '14px';

    const selectCategory = document.createElement('select');
    selectCategory.style.height = '51px';
    selectCategory.style.border = 'none';
    selectCategory.style.boxShadow = '0px 4px 14px 0px rgba(0, 0, 0, 0.09)';
    selectCategory.style.backgroundColor = '#FFFFFF';
    selectCategory.style.padding = '17px';
    selectCategory.style.fontFamily = 'Work Sans';

    const optionObject = document.createElement('option');
    optionObject.setAttribute('id', '1');
    optionObject.setAttribute('name', 'Objets');
    optionObject.innerText = 'Objets';

    const optionAppart = document.createElement('option');
    optionAppart.setAttribute('id', '2');
    optionAppart.setAttribute('name', 'Appartements');
    optionAppart.innerText = 'Appartements';

    const optionHotel = document.createElement('option');
    optionHotel.setAttribute('id', '3');
    optionHotel.setAttribute('name', 'Hotels & restaurants');
    optionHotel.innerText = 'Hotels & restaurants';

    selectCategory.appendChild(optionObject);
    selectCategory.appendChild(optionAppart);
    selectCategory.appendChild(optionHotel);

    gallery.appendChild(formAddImg);
    formAddImg.appendChild(labelTitle);
    formAddImg.appendChild(inputTitle);
    formAddImg.appendChild(labelCategory);
    formAddImg.appendChild(selectCategory);

    const addWorkButton = document.querySelector('.js-add-works');
    addWorkButton.innerHTML = "Valider";
    addWorkButton.style.backgroundColor = '#A7A7A7';

    const linkDeleteGallery = document.querySelector('.js-delete-works');
    modalWrapper.removeChild(linkDeleteGallery);
};

displayAddWorksModal();