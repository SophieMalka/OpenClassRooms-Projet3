//Récupération de l'élément form
const form = document.querySelector("form");

/**
 * 
 * @param {string} event connexion 
 */
async function onSubmit(event) {
    event.preventDefault();
    // définition de l'utilisation
    let user = {
        email: form.email.value,
        password: form.password.value,
    };
    
    // récupération des données API
    let response = await fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: {
        "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(user),
    });
    
    let result = await response.json();

    // si les identifiants sont justes
    if (response.status === 200) {
        localStorage.setItem("token", result.token);
        window.location.replace(`index.html`);
    // sinon, si les identifiants sont faux
    } else if (response.status === 404 || response.status === 401) {
        form.email.value = "";
        form.password.value = "";
        alert("Les informations utilisateur et/ou mot de passe ne sont pas correctes.");
    }
};

form.addEventListener("submit", onSubmit);