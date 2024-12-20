document.addEventListener("DOMContentLoaded", function () {
    // Récupérer les informations utilisateur depuis localStorage
    const userId = localStorage.getItem("userId");
    const userPrenom = localStorage.getItem("userPrenom");
    const userNom = localStorage.getItem("userNom");
    const billetsTable = document.getElementById("billetsTableBody");
    const userFullName = document.getElementById("userFullName");

    // Vérifier si l'utilisateur est connecté
    if (!userId || !userPrenom || !userNom) {
        alert("Vous devez être connecté pour accéder à cette page.");
        window.location.href = "connexion.html";
        return;
    }

    // Afficher le nom complet
    userFullName.textContent = `${userPrenom} ${userNom}`;

    // Récupérer les billets via Fetch
    fetch(`./back/affiche_billets.php?userId=${encodeURIComponent(userId)}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Erreur HTTP : ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            if (data.error) {
                alert(data.error);
                return;
            }

            if (data.length === 0) {
                billetsTable.innerHTML = `
                    <tr>
                        <td colspan="2">Aucun billet trouvé.</td>
                    </tr>
                `;
                return;
            }

            billetsTable.innerHTML = ""; // Réinitialiser le tableau
            data.forEach((billet) => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${billet.type}</td>
                    <td>${billet.count}</td>
                `;
                billetsTable.appendChild(row);
            });
        })
        .catch((error) => {
            console.error("Erreur :", error);
            alert("Une erreur est survenue lors de la récupération des billets.");
        });
});
