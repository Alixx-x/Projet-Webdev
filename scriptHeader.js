document.addEventListener("DOMContentLoaded", function () {
    const userDisplay = document.getElementById("userDisplay");
    const userName = document.getElementById("userName");
    const loginButton = document.getElementById("loginButton");
    const logoutButton = document.getElementById("logoutButton");

    // Vérifiez si l'utilisateur est déjà connecté
    const prenom = sessionStorage.getItem("userPrenom");
    const nom = sessionStorage.getItem("userNom");

    if (prenom && nom) {
        // Affiche le nom complet de l'utilisateur
        userName.textContent = `${prenom} ${nom}`;
        userDisplay.style.display = "inline-block"; // Affiche le menu utilisateur
        loginButton.style.display = "none"; // Cache le bouton de connexion

        // Gérer la déconnexion
        logoutButton.addEventListener("click", (e) => {
            e.preventDefault(); // Empêche le comportement par défaut
            sessionStorage.clear(); // Efface les données utilisateur
            alert("Vous avez été déconnecté.");
            window.location.href = "connexion.html"; // Redirige vers la page de connexion
        });
    } else {
        // Affiche le bouton de connexion si l'utilisateur n'est pas connecté
        userDisplay.style.display = "none"; // Cache le menu utilisateur
        loginButton.style.display = "inline-block"; // Affiche le bouton de connexion
    }
});
