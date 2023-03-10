const urlCategories = 'http://localhost:5678/api/categories';
const urlWorks = 'http://localhost:5678/api/works';
const urlLogin = 'http://localhost:5678/api/users/login';
let selectedCategoryId = 0; // par défaut, afficher tous les works

/**
 * Suppression des works de la galerie index.html 
 */
function deleteWorks() {
    // Récupération de l'élément galerie d'index.html
    const gallery = document.getElementsByClassName("gallery").item(0);
    // Suppression des enfants de l'élément galerie
    while (gallery.firstChild) {
        gallery.removeChild(gallery.firstChild);
    };
};

/**
 * Affichage des works dans la galerie index.html grâce aux données de l'API
 */
function displayWorks() {
    // Récupération des données de l'API
    fetch(urlWorks)
        .then(function (response) {
            if (response.ok) {
                deleteWorks();
                return response.json();
            }
        })
        .then(function (data) {
            for (let work of data) {
                if (selectedCategoryId === 0 || selectedCategoryId === work.categoryId) {
                    // Récupération de l'élément galerie dans le DOM
                    const gallery = document.getElementsByClassName("gallery").item(0);
                    // Création des cartes pour chaque work de l'API
                    const figure = document.createElement('figure');
                    const image = document.createElement('img');
                    image.setAttribute("crossorigin", "anonymous");
                    image.setAttribute("src", work.imageUrl);
                    image.alt = work.title;
                    const figCaption = document.createElement('figcaption');
                    figCaption.innerText = work.title;
                    // Rattachement des éléments créés au DOM
                    gallery.appendChild(figure);
                    figure.append(image, figCaption);
                };
            };
        })
};

/**
 * Affichage des boutons de filtre par catégorie grâce aux données de l'API
 */
function displayFilters() {
    // Récupération des données de l'API
    fetch(urlCategories)
        .then(function (response) {
            if (response.ok) {
                return response.json();
            };
        })
        .then(function (data) {
            // Ajout de la catégorie "Tous" sur les données de l'API
            data.unshift({
                id: 0,
                name: 'Tous'
            });
            // Récupération des éléments du DOM pour le rattachement des boutons de filtre
            const portfolio = document.getElementById('portfolio');
            const gallery = document.getElementsByClassName('gallery').item(0);
            // Création du conteneur des boutons de filtres
            const divFilters = document.createElement('div');
            divFilters.setAttribute('id', 'container-filters');
            // Création des boutons de filtre en fonctions des données de l'API
            for (let category of data) {
                const button = document.createElement('button');
                button.classList.add('button-filter');
                button.innerText = category.name;
                button.value = category.id;
                // Rattachement des boutons de filtre au DOM
                divFilters.appendChild(button);
            }
            // Rattachement du conteneur des boutons de filtres au DOM
            portfolio.insertBefore(divFilters, gallery);
        })
};

/**
 * Filtrage des works en fonction leur catégorie 
 */
function filterWorks() {
    // Mettre à jour l'identifiant de la catégorie sélectionnée
    selectedCategoryId = parseInt(event.target.value);
    // Afficher les works filtrés
    displayWorks();
};

/**
 * Affichage du mode admin si le token a été correctement stocké lors de la connexion
 */
function displayAdminMode() {
    if (localStorage.getItem('token')) {
        // Affichage du bouton logout
        const log = document.querySelector('nav > ul > li > a');
        log.setAttribute('id', 'logout');
        log.innerText = "logout";
        // Affichage de la bannière noir
        const bannerTemplate = `<div class="edit_mode"><i class="fas fa-regular fa-pen-to-square fa-lg"></i><p>Mode édition</p><button class="edit_mode_btn">publier les changements</button></div>`;
        const header = document.querySelector("header");
        header.style.marginTop = "70px";
        header.insertAdjacentHTML("afterbegin", bannerTemplate);
        // Création du bouton modifier
        const editButtonTemplate = `<a href="#" class="edit-link"><i class="fa-regular fa-pen-to-square"></i> modifier</a>`;
        // Positionnement des différents boutons modifier
        const imgSophie = document.querySelector("#introduction img");
        const introSophie = document.querySelector('#introduction h2');
        const galleryTitle = document.querySelector("#portfolio h2");
        imgSophie.insertAdjacentHTML('afterend', editButtonTemplate);
        introSophie.insertAdjacentHTML('beforebegin', editButtonTemplate);
        galleryTitle.insertAdjacentHTML('afterend', editButtonTemplate);
        // Ajout d'un href="#modal" sur le bouton modifier de la galerie
        const editButtonGallery = document.querySelector("#portfolio a");
        editButtonGallery.href = '#modal';
        editButtonGallery.classList.add('open-modal');
        // Désactivation de la fonction de filtrage

    };
};

/**
 * Déconnexion du mode admin
 */
function logout() {
    localStorage.removeItem('token');
    window.location.replace('index.html');
};

/**
 * Ouverture de la modal
 */
function openModal() {
    const modal = document.querySelector('#modal');
    modal.style.display = null;
    modal.removeAttribute('aria-hidden');
    modal.setAttribute('aria-modal', 'true');
    displayModalDeleteWorks();
    displayWorksModal();
};

/**
 * Fermeture de la modal
 */
function closeModal() {
    const modal = document.querySelector('#modal');
    modal.style.display = 'none';
    modal.setAttribute('aria-hidden', 'true');
    modal.removeAttribute('aria-modal');
    const modalWrapper = document.querySelector('.modal-wrapper');
    while (modalWrapper.firstChild) {
        modalWrapper.removeChild(modalWrapper.firstChild);
    };
};

/**
 * Affichage de la modale en mode suppression des works
 */
function displayModalDeleteWorks() {
    // Récupération de la modal de suppression de works
    const modalWrapper = document.querySelector('.modal-wrapper-delete');
    // Création de l'élément de navigation entre les deux modals
    const modalNav = document.createElement('div');
    modalNav.classList.add('modal-nav');
    // Création du bouton de fermeture de la modal
    const closeModalButton = document.createElement('i');
    closeModalButton.classList.add('fa-solid', 'fa-xmark', 'close-modal-button');
    // Création du titre de la modal
    const titleModal = document.createElement('h3');
    titleModal.innerText = 'Galerie photo';
    // Création du conteneur de la galerie
    const containerGallery = document.createElement('div');
    containerGallery.setAttribute('id', 'modal-gallery');
    // Création du bouton "Ajouter photo" pour passer à la modal d'ajout de works
    const addWorkButton = document.createElement('button');
    addWorkButton.classList.add('link-modal-add');
    addWorkButton.innerText = 'Ajouter une photo';
    // Création du bouton "Supprimer la galerie"
    const linkDelete = document.createElement('a');
    linkDelete.href = '#';
    linkDelete.classList.add('js-delete-works');
    linkDelete.innerText = 'Supprimer la galerie';
    // Rattachement des tous les éléments ci-dessus au DOM
    modalNav.append(closeModalButton);
    modalWrapper.append(modalNav, titleModal, containerGallery, addWorkButton, linkDelete);
};

/**
 * Affichage des works dans la modal en fonction des données de l'API
 */
function displayWorksModal() {
    

    // Récupération des données de l'API
    fetch(urlWorks)
        .then(function (response) {
            if (response.ok) {
                // Suppression de la galerie avant l'ajout des works de l'API
                const gallery = document.getElementById('modal-gallery');
                while (gallery.firstChild) {
                    gallery.removeChild(gallery.firstChild)
                };
                return response.json();
            };
        })
        .then(function (data) {
            for (let work of data) {
                // Récupération de l'élément galerie de la modal
                const gallery = document.getElementById('modal-gallery');
                // Création des cartes pour chaque work
                let figure = document.createElement('figure');
                figure.classList.add('modal-figure-works');
                let image = document.createElement('img');
                image.setAttribute('crossorigin', 'anonymous');
                image.setAttribute('src', work.imageUrl);
                image.alt = work.title;
                // Création du bouton "déplacer" sur le premier work
 
                // Création du bouton "poubelle" pour chaque work
                let deleteButton = document.createElement('i');
                deleteButton.setAttribute('id', work.id);
                deleteButton.classList.add('fa-solid', 'fa-trash-can', 'delete-work');
                // Création du texte "éditer" sous chaque work
                let figCaption = document.createElement('figcaption');
                figCaption.innerText = 'éditer';
                // Rattachement des éléments au DOM
                gallery.append(figure);
                figure.append(deleteButton, image, figCaption);
            };
        })
};

/**
 * Suppression des works de l'API
 */
function deleteWorksData(id) {
    fetch(`http://localhost:5678/api/works/${id}`, {
        method: 'DELETE',
        headers: {
            'content-type': "application/Json",
            'authorization': "Bearer " + localStorage.getItem("token"),
        },
    })
        .then((response) => {
            if (response.status === 201) {
                displayWorksModal();
                displayWorks();
            };
        });
};

/**
 * Affichage de la modale en mode ajout de works
 */
function displayModalAddWork() {
    // Récupération de la modal de suppression de works
    const modalWrapper = document.querySelector('.modal-wrapper-add');
    modalWrapper.style.display = null;
    // Création de l'élément de navigation entre les deux modals
    const modalNav = document.createElement('div');
    modalNav.classList.add('modal-nav');
    // Création du bouton de retour à la précédente modal
    const goBackButton = document.createElement('i');
    goBackButton.classList.add('fa-solid', 'fa-arrow-left', 'go-back-button');
    // Création du bouton de fermeture de la modal
    const closeModalButton = document.createElement('i');
    closeModalButton.classList.add('fa-solid', 'fa-xmark', 'close-modal-button');
    // Création du titre de la modal
    const titleModal = document.createElement('h3');
    titleModal.innerText = 'Ajout photo';
    // Rattachement des éléments ci-dessus au DOM
    modalNav.append(goBackButton, closeModalButton);
    modalWrapper.append(modalNav, titleModal);
    displayFormAddWork();
};

/**
 * Retour vers la modale précédente
 */
function goBackModal() {
    const modalWrapperAdd = document.querySelector('.modal-wrapper-add');
    modalWrapperAdd.style.display = 'none';
    while (modalWrapperAdd.firstChild) {
        modalWrapperAdd.removeChild(modalWrapperAdd.firstChild);
    };
    const modalWrapperDelete = document.querySelector('.modal-wrapper-delete');
    modalWrapperDelete.style.display = null;
};

/**
 * Affichage du formulaire d'ajout de work
 */
function displayFormAddWork() {
    // Récupération de la modal de suppression de works
    const modalWrapper = document.querySelector('.modal-wrapper-add');
    // Création du formulaire
    const formAddWork = document.createElement('form');
    formAddWork.classList.add('form-add-works');
    // Création du conteneur image du formulaire
    const containerFormImg = document.createElement('div');
    containerFormImg.classList.add('container-add-img');
    // Création de la prévisualisation file
    const imgPreview = document.createElement('img');
    imgPreview.classList.add('img-preview');
    imgPreview.src = 'assets/icons/icon-img.png'
    // Création du label file
    const labelAddImgButton = document.createElement('label');
    labelAddImgButton.setAttribute('for', 'file');
    labelAddImgButton.innerText = '+ Ajouter photo';
    // Création de l'input file
    const addImgButton = document.createElement('input');
    addImgButton.type = 'file';
    addImgButton.setAttribute('id', 'file');
    addImgButton.classList.add('input-image', 'verif-form');
    addImgButton.setAttribute('required', 'required');
    // Création de la ligne d'information file
    const infoAddImg = document.createElement('p');
    infoAddImg.innerText = 'jpg, png : 4mo max';
    // Création du conteneur info du formulaire
    const containerFormInfo = document.createElement('div');
    containerFormInfo.classList.add('container-form-info');
    // Création du label titre
    const labelTitle = document.createElement('label');
    labelTitle.setAttribute('for', 'title');
    labelTitle.innerText = 'Titre';
    // Création de l'input titre
    let inputTitle = document.createElement('input');
    inputTitle.setAttribute('type', 'text');
    inputTitle.setAttribute('name', 'title');
    inputTitle.setAttribute('id', 'title');
    inputTitle.classList.add('verif-form');
    inputTitle.setAttribute('required', 'required');
    // Création du label catégorie
    const labelCategory = document.createElement('label');
    labelCategory.setAttribute('for', 'category');
    labelCategory.innerText = 'Catégorie';
    // Création du select catégorie
    const selectCategory = document.createElement('select');
    selectCategory.setAttribute('id', 'selectCategory');
    selectCategory.classList.add('verif-form');
    selectCategory.setAttribute('required', 'required');
    // Récupération des options catégorie
    setOptionsSelectForm();
    // Création du bouton valider
    const validForm = document.createElement('button');
    validForm.classList.add('js-add-works');
    validForm.innerText = 'Valider';
    validForm.style.backgroundColor = '#A7A7A7';
    // Rattachement des éléments ci-dessus au DOM
    modalWrapper.appendChild(formAddWork);
    formAddWork.append(containerFormImg, containerFormInfo, validForm);
    containerFormImg.append(imgPreview, labelAddImgButton, addImgButton, infoAddImg);
    containerFormInfo.append(labelTitle, inputTitle, labelCategory, selectCategory);
    // Ajout de la fonction de vérification pour changer la couleur du bouton
    verifForm();
};

/**
 * Création des options pour le select du formulaire d'ajout de work
 */
function setOptionsSelectForm() {
    fetch(urlCategories)
        .then(function (response) {
            if (response.ok) {
                return response.json();
            }
        })
        .then(function (data) {
            for (let category of data) {
                const option = document.createElement('option');
                option.classList.add('cat-option');
                option.setAttribute('id', category.id);
                option.setAttribute('name', category.name);
                option.innerText = category.name;
                const selectCategory = document.getElementById('selectCategory');
                selectCategory.append(option);
            };
        })
};

/**
 * Vérification du formulaire d'ajout de work pour le changement de couleur du bouton ajouter
 */
function verifForm() {
    const formAddWork = document.querySelector('.form-add-works');
    const validForm = document.querySelector('.js-add-works');
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
};

/**
 * Ajout de works sur l'API
 */
function sendData() {
    // Récupération des valeurs du formulaire
    const title = document.getElementById('title').value;
    const selectCategory = document.getElementById('selectCategory');
    const choice = selectCategory.selectedIndex;
    const category = selectCategory.options[choice].id;
    const file = document.getElementById('file').files[0];
    // Création de l'objet formData
    const formData = new FormData();
    formData.append('image', file);
    formData.append('title', title);
    formData.append('category', category);

    // Récupération du token 
    const token = localStorage.getItem('token');
    //Envoi des données au serveur avec une requête HTTP POST
    fetch(urlWorks, {
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
                goBackModal();
                displayWorksModal();
                displayWorks();
            } else {
                console.error('Erreur lors de l\'envoi des données : ', response.status);
            }
        })
        .catch(error => console.error('Erreur lors de l\'envoi des données : ', error));
};

// Listing des évènements déclencheurs
/**
 * EVENT : Filtrage des works au clic sur la catégorie choisie
 */
document.addEventListener('click', function (event) {
    if (event.target.matches('.button-filter')) {
        filterWorks();
    };
});

/**
 * EVENT : Déconnexion au clic sur le bouton logout
 */
document.addEventListener('click', function (event) {
    if (event.target.matches('#logout')) {
        logout();
    };
});

/**
 * EVENT : Ouverture de la modal au clic sur le bouton modifier
 */
document.addEventListener('click', function (event) {
    if (event.target.matches('.open-modal')) {
        openModal();
    };
});

/**
 * EVENT : Fermeture de la modale au clic sur la croix ou hors de la modal
 */
document.addEventListener('click', function (event) {
    if (event.target.matches('.close-modal-button')) {
        closeModal();
    } else if (event.target.matches('#modal')){
        closeModal();
    };
});

/**
 * EVENT : Suppression des works sur la modal et l'index.html au clic sur la poubelle
 */
document.addEventListener('click', function (event) {
    if (event.target.matches('.delete-work')) {
        console.log(event.target.id);
        deleteWorksData(event.target.id);
        alert('Supression du work id=' + event.target.id);
        displayWorksModal();
        displayWorks();
    };
})

/**
 * EVENT : transfert vers la modal d'ajout de work au clic sur le bouton ajouter photo
 */
document.addEventListener('click', function (event) {
    if (event.target.matches('.link-modal-add')) {
        const modalWrapper = document.querySelector('.modal-wrapper-delete');
        modalWrapper.style.display = 'none';
        displayModalAddWork();
    };
});

/**
 * EVENT : retour vers la modal suppression de work au clic sur la fleche
 */
document.addEventListener('click', function (event) {
    if (event.target.matches('.go-back-button')) {
        goBackModal()
    };
});

/**
 * EVENT : Récupération du fichier et actualisation du preview
 */
document.addEventListener('change', function (event) {
    if (event.target.matches('.input-image')) {
        const imgPreview = document.querySelector('.img-preview');
        const file = event.target.files[0];
        const reader = new FileReader();
        if (file.size <= 4 * 1024 * 1024) {
            reader.addEventListener('load', () => {
                imgPreview.src = reader.result;
            });
            if (file) {
                reader.readAsDataURL(file);
            }
        } else {
            alert('La taille du fichier doit être inférieure à 4 Mo');
        };
    };
}); 

document.addEventListener('click', function (event) {
    if (event.target.matches('.js-add-works')) {
        sendData();
        displayWorks();
    };
});

// Déclanchement des fonctions au chargement de la page
displayWorks();
displayFilters();
displayAdminMode();

