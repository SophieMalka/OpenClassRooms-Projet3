let modal = null;

const openModal = function (e) {
    e.preventDefault();
    const target = document.querySelector(e.target.getAttribute('href'));
    target.style.display = null;
    target.removeAttribute('aria-hidden');
    target.setAttribute('aria-modal', 'true');
    modal = target;
    modal.addEventListener('click', closeModal)
};

const closeModal = function (e) {
    if (modal === null) return;
    e.preventDefault();
    modal.style.display = "none";
    modal.setAttribute('aria-hidden', 'true');
    modal.removeAttribute('aria-modal');
    modal.removeEventListener('click', closeModal)
    modal = null;
}

document.querySelectorAll('.js-modal').forEach(a => {
    a.addEventListener('click', openModal);
});

function displayWorksModal() {
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

    const modalGallery = document.getElementById('modal-gallery');
    console.log(modalGallery);

    //ajout des works issus de l'API (boucle sur les données de l'API)
    //pour chaque donnée de l'API...
    setWorksModal(data);
    });

};

function setWorksModal(data) {

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

        let deleteIcon = document.createElement("i");
        deleteIcon.classList.add("fa-solid", "fa-trash-can");
        deleteIcon.style.position = 'absolute';
        deleteIcon.style.color = '#FFFFFF';
        deleteIcon.style.fontSize = '14px';
        deleteIcon.style.backgroundColor = '#000000';
        deleteIcon.style.padding = '4px';
        deleteIcon.style.borderRadius = '2px';
        deleteIcon.style.marginLeft = '55px';
        deleteIcon.style.marginTop = '6px';


        let newCaption = document.createElement("figcaption");
        newCaption.innerText = 'éditer';

        newFigure.appendChild(deleteIcon);
        newFigure.appendChild(newImg);
        newFigure.appendChild(newCaption);

        const modalGallery = document.getElementById('modal-gallery');
        console.log(modalGallery);

        modalGallery.appendChild(newFigure);
    }
};

displayWorksModal();
setWorksModal();