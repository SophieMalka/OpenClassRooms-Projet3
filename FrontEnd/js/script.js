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
            console.log(data);

            const portfolio = document.getElementById("portfolio");
            const gallery = document.getElementsByClassName("gallery").item(0);
            let divFiltres = document.createElement("div");
            divFiltres.classList.add("filters");
            portfolio.insertBefore(divFiltres, gallery);
            for (let categorie of data) {
                let button = document.createElement("button");
                button.classList.add("button-filter");
                button.innerText = categorie.name;
                button.value = categorie.id;
                button.addEventListener('click', function (event) {
                    selectedCategoryId = parseInt(event.target.value); // mettre à jour l'identifiant de la catégorie sélectionnée
                    displayWorks(); // afficher les works filtrés
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
    banniere.classList.add('ban-edit');

    body.prepend(banniere);

    const header = document.querySelector('header');
    header.style.maxWidth = '1140px';
    header.style.margin = '50px auto';

    const main = document.querySelector('main');
    main.style.maxWidth = '1140px';
    main.style.margin = 'auto';

    let edit = document.createElement('p');
    edit.innerHTML = '<i class="fas fa-regular fa-pen-to-square fa-lg"></i> Mode édition';

    let publi = document.createElement('button');
    publi.setAttribute('id', 'publier');
    publi.innerText = 'publier les changements';

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
    divTitle.setAttribute('id', 'title-work');

    const portfolio = document.getElementById('portfolio');
    portfolio.prepend(divTitle);

    let modifier = document.createElement('a');
    modifier.classList.add("js-modal");
    modifier.setAttribute("href", "#modal");
    modifier.innerHTML = '<i class="fas fa-regular fa-pen-to-square fa-lg"></i> modifier';

    const title = document.querySelector('#portfolio > h2');

    divTitle.append(title);
    divTitle.appendChild(modifier);
};

token();

// AFFICHAGE ET FONCTIONNALITES DE LA MODALE

/**
 * Affichage de la modale
 */
function displayModal() {
    const modalWrapper = document.querySelector('.modal-wrapper');

    const modalNav = document.createElement('div');
    modalNav.classList.add('modal-nav');

    const closeModalButton = document.createElement('button');
    closeModalButton.classList.add('js-close-modal');
    closeModalButton.innerHTML = '<i class="fa-solid fa-xmark"></i>';

    modalNav.appendChild(closeModalButton);

    const modalContent = document.createElement('div');
    modalContent.classList.add('modal-content');

    modalWrapper.appendChild(modalNav);
    modalWrapper.appendChild(modalContent);

    const titleModal = document.createElement('h3');
    titleModal.innerText = 'Galerie photo';

    const containerGallery = document.createElement('div');
    containerGallery.setAttribute('id', 'modal-gallery');

    const addWorkButton = document.createElement('button');
    addWorkButton.classList.add('js-add-works');
    addWorkButton.innerText = 'Ajouter une photo';
    addWorkButton.addEventListener('click', function () {
        deleteModal();
        updateModal();
    });

    const linkDelete = document.createElement('a');
    linkDelete.href = '#';
    linkDelete.classList.add('js-delete-works');
    linkDelete.innerText = 'Supprimer la galerie';

    modalContent.appendChild(titleModal);
    modalContent.appendChild(containerGallery);
    modalContent.appendChild(addWorkButton);
    modalContent.appendChild(linkDelete);
};

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
            console.log(data);

            for (let work of data) {
                
                let newFigure = document.createElement("figure");
                newFigure.classList.add('modal-figure-works')

                let newImg = document.createElement("img");
                newImg.setAttribute("crossorigin", "anonymous");
                newImg.setAttribute("src", work.imageUrl);
                newImg.alt = work.title;

                let deleteButton = document.createElement("button");
                deleteButton.setAttribute("id", `${work.id}`);
                deleteButton.classList.add('js-delete-button');
                deleteButton.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
                deleteButton.addEventListener('click', function (event) {
                    console.log(event.target.id);
                    deleteWorksApi(event.target.id);
                })

                let newCaption = document.createElement("figcaption");
                newCaption.innerText = 'éditer';

                newFigure.appendChild(deleteButton);
                newFigure.appendChild(newImg);
                newFigure.appendChild(newCaption);

                const modalGallery = document.getElementById('modal-gallery');
                modalGallery.appendChild(newFigure);
            };
        })
};

/**
 * Envoie une requête HTTP DELETE à l'API pour supprimer les works correspondant à l'identifiant fourni
 * @param {Number} id Identifiant des works à supprimer
 */
function deleteWorksApi(id) {
    fetch(`http://localhost:5678/api/works/${id}`, {
        method: 'DELETE',
        headers: {
            'content-type': "application/Json",
            'authorization': "Bearer " + localStorage.getItem("token"),
        },
    })
        .then((response) => {
            if (response.status === 201) {
                window.location.replace(`index.html`);
            };
        });
};

displayModal();
displayWorksModal();

/**
 * Affichage de la modale en mode ajout de works au clic sur le bouton ajouter une photo
 */
function displayAddWorksModal() {
    const addWorksButton = document.getElementsByClassName('js-add-works').item(0);
    addWorksButton.addEventListener('click', function () {
        deleteModal();
        updateModal();
    });
};

/**
 * Suppression du contenu intégral de la modal
 */
function deleteModal() {
    const modalWrapper = document.querySelector('.modal-wrapper');
    modalWrapper.innerHTML = "";
};

/**
 * Mise à jour du contenu de la modale avec les éléments d'ajout de works
 */
function updateModal() {
    const modalWrapper = document.querySelector('.modal-wrapper');

    const modalNav = document.createElement('div');
    modalNav.classList.add('modal-nav');

    const closeModalButton = document.createElement('button');
    closeModalButton.classList.add('js-close-modal');
    closeModalButton.innerHTML = '<i class="fa-solid fa-xmark"></i>';

    const goBackButton = document.createElement('button');
    goBackButton.classList.add('js-go-back-button');
    goBackButton.innerHTML = '<i class="fa-solid fa-arrow-left"></i>';
    goBackButton.addEventListener('click', function () {
        deleteModal();
        displayModal();
        displayWorksModal();
    });

    modalNav.appendChild(goBackButton);
    modalNav.appendChild(closeModalButton);

    const titleModal = document.createElement('h3');
    titleModal.innerText = "Ajout photo";

    const formAddWork = document.createElement('form');
    formAddWork.classList.add('form-add-works')

    modalWrapper.append(modalNav);
    modalWrapper.appendChild(titleModal);
    modalWrapper.appendChild(formAddWork);

    const containerFormImg = document.createElement('div');
    containerFormImg.classList.add('container-add-img');

    formAddWork.appendChild(containerFormImg);

    const imgPreview = document.createElement('img');
    imgPreview.src = 'assets/icons/icon-img.png'
    containerFormImg.appendChild(imgPreview);

    const labelAddImgButton = document.createElement('label');
    labelAddImgButton.setAttribute('for', 'file');
    labelAddImgButton.innerText = '+ Ajouter photo';

    const addImgButton = document.createElement('input');
    addImgButton.type = 'file';
    addImgButton.setAttribute('id', 'file');
    addImgButton.classList.add('verif-form');
    addImgButton.setAttribute('required', 'required');
    addImgButton.addEventListener('change', (event) => {
        const file = event.target.files[0];

        const reader = new FileReader();

        reader.addEventListener('load', () => {
            imgPreview.src = reader.result;
        });

        if (file) {
            reader.readAsDataURL(file);
        }
    });

    const infoAddImg = document.createElement('p');
    infoAddImg.innerText = 'jpg, png : 4mo max';

    containerFormImg.appendChild(labelAddImgButton);
    containerFormImg.appendChild(addImgButton);
    containerFormImg.appendChild(infoAddImg);

    const containerFormInfo = document.createElement('div');
    containerFormInfo.classList.add('container-form-info');
    formAddWork.appendChild(containerFormInfo);

    const labelTitle = document.createElement('label');
    labelTitle.setAttribute('for', 'title');
    labelTitle.innerText = 'Titre';

    let inputTitle = document.createElement('input');
    inputTitle.setAttribute('type', 'text');
    inputTitle.setAttribute('name', 'title');
    inputTitle.setAttribute('id', 'title');
    inputTitle.classList.add('verif-form');
    inputTitle.setAttribute('required', 'required');

    containerFormInfo.appendChild(labelTitle);
    containerFormInfo.appendChild(inputTitle);

    const labelCategory = document.createElement('label');
    labelCategory.setAttribute('for', 'category');
    labelCategory.innerText = 'Catégorie';

    const selectCategory = document.createElement('select');
    selectCategory.setAttribute('id', 'selectCategory');
    selectCategory.classList.add('verif-form');
    selectCategory.setAttribute('required', 'required');

    containerFormInfo.appendChild(labelCategory);
    containerFormInfo.appendChild(selectCategory);

    fetch(urlCategories)
        .then(function (response) {
            if (response.ok) {
                return response.json();
            }
        })
        .then(function (data) {
            for (let category of data) {
                const option = document.createElement('option');
                option.setAttribute('id', category.id);
                option.setAttribute('name', category.name);
                option.innerText = category.name;

                const selectCategory = document.getElementById('selectCategory');
                selectCategory.append(option);

            }
        });

    const validForm = document.createElement('button');
    validForm.classList.add('js-add-works');
    validForm.innerText = 'Valider';
    validForm.style.backgroundColor = '#A7A7A7';
    validForm.addEventListener('click', function (event) {
        event.preventDefault();
        sendData();
    });

    const requiredElements = document.querySelectorAll('.verif-form[required]');

    requiredElements.forEach(element => {
        element.addEventListener('input', function () {
            if (formAddWork.checkValidity()) {
                validForm.style.backgroundColor = '#1D6154';
            } else {
                validForm.style.backgroundColor = '#A7A7A7'; 
            }
        });
    });

    formAddWork.appendChild(validForm);
};

function sendData() {

    const title = document.getElementById('title').value;
    const category = document.querySelector('option').id;
    const file = document.getElementById('file').files[0];

    console.log(category);

    const formData = new FormData();
    formData.append('image', file);
    formData.append('title', title);
    formData.append('category', category);

    const token = localStorage.getItem('token');

  // Envoi des données au serveur avec une requête HTTP POST
    fetch('http://localhost:5678/api/works/', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: formData
    })
        .then(response => {
            console.log(response);
            if (response.ok) {
                console.log('Données envoyées avec succès !');
                window.location.replace(`index.html`);
            } else {
                console.error('Erreur lors de l\'envoi des données : ', response.status);
            }
        })
        .catch(error => console.error('Erreur lors de l\'envoi des données : ', error));
};

displayAddWorksModal();