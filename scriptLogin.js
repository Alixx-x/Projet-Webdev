document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');

    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault(); // Empêche la soumission par défaut du formulaire

        // Récupérer les données du formulaire
        const formData = new FormData(loginForm);

        try {
            // Envoyer les données au script PHP via une requête POST
            const response = await fetch(loginForm.action, {
                method: 'POST',
                body: formData,
            });

            // Convertir la réponse en JSON
            const result = await response.json();

            if (result.success) {
                // Stocker les informations utilisateur dans le localStorage
                localStorage.setItem('userId', result.data.id);
                localStorage.setItem('userRole', result.data.role);
                localStorage.setItem('userPrenom', result.data.prenom);
                localStorage.setItem('userNom', result.data.nom);

                // Afficher un message de succès (facultatif)
                alert(`Bienvenue, ${result.data.prenom} ! Redirection vers votre profil...`);

                // Rediriger vers la page profil
                window.location.href = 'profil.html';
            } else {
                // Afficher un message d'erreur en cas d'échec
                alert(result.message || "Identifiants incorrects. Veuillez réessayer.");
            }
        } catch (error) {
            console.error('Erreur lors de la connexion :', error);
            alert('Une erreur est survenue lors de la connexion. Veuillez réessayer.');
        }
    });

    // Fonctionnalités supplémentaires : vérifier si l'utilisateur est déjà connecté
    const userId = localStorage.getItem('userId');
    if (userId) {
        // Redirection automatique si déjà connecté
        alert("Vous êtes déjà connecté. Redirection vers votre profil...");
        window.location.href = 'profil.html';
    }
});
