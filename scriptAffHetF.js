// Fonction pour charger le header dynamiquement
function loadHeader(callback) {
    fetch('header.html')
        .then(response => {
            if (!response.ok) {
                throw new Error("Erreur dans le chargement du header");
            }
            return response.text();
        })
        .then(data => {
            document.getElementById('header').innerHTML = data;
            if (callback) callback(); // Appelle le callback une fois le header inséré
        })
        .catch(error => console.error(error));
}

// Fonction pour charger le footer dynamiquement
function loadFooter() {
    fetch('footer.html')
        .then(response => {
            if (!response.ok) {
                throw new Error("Erreur dans le chargement du footer");
            }
            return response.text();
        })
        .then(data => {
            document.getElementById('footer').innerHTML = data;
        })
        .catch(error => console.error(error));
}

// Fonction pour gérer l'affichage du menu utilisateur
function setupUserMenu() {
    console.log("Vérification de l'état utilisateur...");
    const userDisplay = document.getElementById("userDisplay");
    const userName = document.getElementById("userName");
    const loginButton = document.getElementById("loginButton");
    const logoutButton = document.getElementById("logoutButton");

    const userPrenom = localStorage.getItem("userPrenom");
    const userNom = localStorage.getItem("userNom");
    const userRole = localStorage.getItem("userRole");

    console.log("Prénom : ", userPrenom, "Nom : ", userNom);

    if (userPrenom && userNom) {
        userName.textContent = `${userPrenom} ${userNom}`;
        userDisplay.style.display = "inline-block";
        loginButton.style.display = "none";

        if (userRole === "admin") {
            gestionLink.style.display = "inline-block";
        } else {
            gestionLink.style.display = "none";
        }

        logoutButton.addEventListener("click", (e) => {
            e.preventDefault();
            localStorage.clear();
            alert("Vous avez été déconnecté.");
            window.location.href = "connexion.html";
        });
    } else {
        userDisplay.style.display = "none";
        loginButton.style.display = "inline-block";
    }
}


// Charger le header, puis configurer le menu utilisateur
loadHeader(() => {
    // Une fois que le header est chargé, configurez le menu utilisateur
    setupUserMenu();
});

// Charger le footer
loadFooter();
