$(document).ready(function () {
    $("#search-btn").on("click", function () {
        const animalName = $("#search-animal").val().trim();
        if (!animalName) {
            $("#search-results").html("<p class='error'>Veuillez entrer un nom d'animal.</p>");
            return;
        }

        // Requête AJAX pour rechercher les animaux
        $.post("./back/research.php", { animaux: animalName }, function (response) {
            if (response.error) {
                $("#search-results").html(`<p class='error'>${response.error}</p>`);
            } else {
                let content = `
                    <h2>Résultats de la recherche</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Nom de l'Animal</th>
                                <th>Enclos</th>
                                <th>Biome</th>
                                <th>Autres Animaux</th>
                                <th>Horaires des Repas</th>
                                <th>Image</th>
                            </tr>
                        </thead>
                        <tbody>
                `;
                response.forEach(animal => {
                    content += `
                        <tr>
                            <td>${animal.animal}</td>
                            <td>${animal.enclos}</td>
                            <td>${animal.biome}</td>
                            <td>${animal.autres_animaux}</td>
                            <td>${animal.horaires_repas}</td>
                            <td>
                                ${animal.image ? `<img src="${animal.image}" class="animal-image" alt="${animal.animal}">` : "Image non disponible"}
                            </td>
                        </tr>
                    `;
                });
                content += `</tbody></table>`;
                $("#search-results").html(content);
            }
        }, "json").fail(function () {
            $("#search-results").html("<p class='error'>Une erreur est survenue. Veuillez réessayer.</p>");
        });
    });

    // Déclenche la recherche avec Entrée
    $("#search-animal").on("keypress", function (event) {
        if (event.key === "Enter") {
            event.preventDefault(); // Empêche le comportement par défaut
            $("#search-btn").click(); // Déclenche le clic du bouton
        }
    });
});
