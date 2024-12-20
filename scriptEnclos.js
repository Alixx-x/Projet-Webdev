$(document).ready(function () {
    // Fonction pour afficher les enclos en fonction du biome
    $(".biome-button").on("click", function () {
        const id_biome = $(this).data("id");
        $("#enclos-list").html("Chargement...");

        // Appel à l'API pour récupérer les enclos
        $.post("./back/affichage_animaux.php", { id_biome: encodeURIComponent(id_biome) }, function (response) {
            if (response.success) {
                let content = `
                    <table class="table table-bordered">
                        <thead>
                            <tr>
                                <th>ID Enclos</th>
                                <th>Animaux</th>
                                <th>Carrousel</th>
                                <th>Avis</th>
                            </tr>
                        </thead>
                        <tbody>`;

                // Générer le tableau des enclos
                response.data.forEach(enclos => {
                    // Détermine la classe CSS en fonction du statut
                    const statusClass = enclos.status === 'open' ? 'bg-success text-white' : 'bg-danger text-white';

                    content += `
                        <tr>
                            <td class="${statusClass}">${enclos.id_enclos}</td>
                            <td>
                                <ul id="animal-list-${enclos.id_enclos}"></ul>
                            </td>
                            <td>
                                <div id="carousel-${enclos.id_enclos}" class="carousel slide" data-bs-ride="carousel">
                                    <div class="carousel-inner" id="carousel-inner-${enclos.id_enclos}">
                                        <div class="carousel-item active">
                                            <img src="./media/images_animaux/default.jpg" class="d-block w-100 img-fluid" alt="Default">
                                        </div>
                                    </div>
                                    <a class="carousel-control-prev" href="#carousel-${enclos.id_enclos}" role="button" data-bs-slide="prev">
                                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                        <span class="visually-hidden">Previous</span>
                                    </a>
                                    <a class="carousel-control-next" href="#carousel-${enclos.id_enclos}" role="button" data-bs-slide="next">
                                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                        <span class="visually-hidden">Next</span>
                                    </a>
                                </div>
                            </td>
                            <td>
                                <div class="avis-container">
                                    <div class="avis-ajout">
                                        <h6>Ajouter un avis</h6>
                                        <textarea class="form-control commentaire" data-id="${enclos.id_enclos}" placeholder="Votre commentaire"></textarea>
                                        <input type="number" class="form-control note" data-id="${enclos.id_enclos}" min="1" max="5" placeholder="Votre note (1-5)">
                                        <button class="btn btn-primary btn-add-avis" data-id="${enclos.id_enclos}">Envoyer</button>
                                    </div>
                                    <div class="avis-existants">
                                        <h6>Avis existants</h6>
                                        <ul id="avis-list-${enclos.id_enclos}" class="list-group">
                                            <li class="text-muted">Chargement des avis...</li>
                                        </ul>
                                    </div>
                                </div>
                            </td>
                        </tr>`;
                });

                content += "</tbody></table>";
                $("#enclos-list").html(content);

                // Charger les animaux et les avis pour chaque enclos après avoir généré le tableau
                response.data.forEach(enclos => {
                    chargerAnimaux(enclos.id_enclos); // Charge les animaux pour cet enclos
                    chargerAvis(enclos.id_enclos);   // Charge les avis pour cet enclos
                });
            } else {
                $("#enclos-list").html("Erreur : " + response.error);
            }
        }).fail(function (jqXHR, textStatus, errorThrown) {
            console.error("Erreur API pour enclos : ", textStatus, errorThrown);
            $("#enclos-list").html("Une erreur est survenue lors du chargement des enclos.");
        });
    });

    // Charger les animaux d'un enclos
    function chargerAnimaux(id_enclos) {
        $.post("./back/affichage_animaux.php", { id_enclos: encodeURIComponent(id_enclos) }, function (animalResponse) {
            if (animalResponse.success) {
                const animalList = $(`#animal-list-${id_enclos}`);
                const carouselInner = $(`#carousel-inner-${id_enclos}`);

                // Afficher la liste des animaux
                animalList.html(
                    animalResponse.data.map(a => `
                        <li>
                            <button class="animal-button btn btn-link" data-animal="${a}" data-bs-toggle="modal" data-bs-target="#animalDescriptionModal">${a}</button>
                        </li>`).join("")
                );

                // Afficher les images des animaux dans le carrousel
                const images = animalResponse.data.map((a, index) => `
                    <div class="carousel-item ${index === 0 ? 'active' : ''}">
                        <img src="./media/images_animaux/${a}.jpg" class="d-block w-100 img-fluid" alt="${a}">
                    </div>
                `).join("");

                carouselInner.html(images);

                if (animalResponse.data.length > 1) {
                    $(`#carousel-${id_enclos}`).carousel({
                        interval: 2000,
                        ride: 'carousel'
                    });
                }
            } else {
                console.error("Erreur chargement animaux : " + animalResponse.error);
            }
        });
    }

    // Charger les avis pour un enclos
    function chargerAvis(id_enclos) {
        console.log("Chargement des avis pour l'enclos :", id_enclos);
    
        $.get("./back/avis.php", { id_enclos: id_enclos }, function (avisResponse) {
            console.log("Réponse du backend pour les avis :", avisResponse);
    
            const avisList = $(`#avis-list-${id_enclos}`);
            avisList.empty(); // Vider la liste avant d'ajouter de nouveaux éléments
    
            if (Array.isArray(avisResponse) && avisResponse.length > 0) {
                avisResponse.forEach(avis => {
                    const commentaire = avis.commentaire || "Aucun commentaire";
                    const utilisateur = avis.utilisateur || "Anonyme";
    
                    avisList.append(`
                        <li class="list-group-item">
                            <strong>Note :</strong> ${avis.note || "Non noté"}<br>
                            <strong>Commentaire :</strong> ${commentaire}<br>
                            <strong>Utilisateur :</strong> ${utilisateur}
                        </li>
                    `);
                });
            } else {
                // Aucun avis trouvé
                avisList.html(`
                    <li class="list-group-item text-muted">Aucun commentaire pour l'instant. N'hésitez pas à être le premier ;)</li>
                `);
            }
        }).fail(function () {
            console.error("Erreur lors de la récupération des avis pour l'enclos :", id_enclos);
            $(`#avis-list-${id_enclos}`).html(`
                <li class="list-group-item text-danger">Erreur lors du chargement des avis. Veuillez réessayer plus tard.</li>
            `);
        });
    }
    

    // Gérer l'ajout d'un avis
    $(document).on("click", ".btn-add-avis", function () {
        const id_enclos = $(this).data("id");
        const commentaire = $(`.commentaire[data-id="${id_enclos}"]`).val().trim();
        const note = parseInt($(`.note[data-id="${id_enclos}"]`).val(), 10);

        if (!commentaire || isNaN(note) || note < 1 || note > 5) {
            alert("Veuillez remplir correctement le commentaire et une note entre 1 et 5 avant d'envoyer.");
            return;
        }

        // Envoie l'avis au backend
        $.post("./back/avis.php", { id_enclos, commentaire, note, userId: 1 }, function (response) {
            console.log("Réponse du backend :", response);

            if (response.success) {
                alert(response.message); // Affiche "Avis ajouté avec succès."
                chargerAvis(id_enclos); // Recharge les avis pour cet enclos
                $(`.commentaire[data-id="${id_enclos}"]`).val('');
                $(`.note[data-id="${id_enclos}"]`).val('');
            } else {
                alert("Erreur lors de l'ajout de l'avis : " + (response.error || "Erreur inconnue."));
            }
        }).fail(function () {
            alert("Erreur réseau lors de l'ajout de l'avis. Veuillez réessayer.");
        });
    });
});