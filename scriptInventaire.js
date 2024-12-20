$(document).ready(function () {
    // Fonction pour récupérer l'ID utilisateur depuis le localStorage
    function getUserId() {
        const userId = localStorage.getItem('userId');
        return userId ? parseInt(userId, 10) : null;
    }

    // Fonction pour charger les enclos selon le biome
    function chargerEnclos(id_biome) {
        $.post('./back/api.php', { action: 'getEnclos', id_biome: id_biome }, function (response) {
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

                response.data.forEach(enclos => {
                    const statusClass = enclos.status === 'open' ? 'bg-success text-white' : 'bg-danger text-white';

                    content += `
                        <tr>
                            <td class="${statusClass}">${enclos.id_enclos}</td>
                            <td>
                                <ul id="animal-list-${enclos.id_enclos}" class="list-group">
                                    <li class="text-muted">Chargement...</li>
                                </ul>
                            </td>
                            <td>
                                <div id="carousel-${enclos.id_enclos}" class="carousel slide" data-bs-ride="carousel" data-bs-interval="2000">
                                    <div class="carousel-inner" id="carousel-inner-${enclos.id_enclos}">
                                        <div class="carousel-item active">
                                            <img src="./media/images_animaux/default.jpg" class="d-block w-100 img-fluid" alt="Default">
                                        </div>
                                    </div>
                                    <button class="carousel-control-prev" type="button" data-bs-target="#carousel-${enclos.id_enclos}" data-bs-slide="prev">
                                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                        <span class="visually-hidden">Previous</span>
                                    </button>
                                    <button class="carousel-control-next" type="button" data-bs-target="#carousel-${enclos.id_enclos}" data-bs-slide="next">
                                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                        <span class="visually-hidden">Next</span>
                                    </button>
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
                                        <h6>Avis <span id="average-note-${enclos.id_enclos}" class="text-muted">- Calcul...</span></h6>
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

                response.data.forEach(enclos => {
                    chargerAnimaux(enclos.id_enclos);
                    chargerAvis(enclos.id_enclos);

                    // Activer le carrousel automatiquement
                    const carouselId = `#carousel-${enclos.id_enclos}`;
                    $(carouselId).carousel('cycle');
                });
            } else {
                $("#enclos-list").html("Erreur : " + response.error);
            }
        }).fail(function () {
            $("#enclos-list").html("Erreur lors du chargement des enclos.");
        });
    }

    // Fonction pour charger les animaux d'un enclos
    function chargerAnimaux(id_enclos) {
        $.post('./back/api.php', { action: 'getAnimaux', id_enclos: id_enclos }, function (response) {
            const animalList = $(`#animal-list-${id_enclos}`);
            const carouselInner = $(`#carousel-inner-${id_enclos}`);

            animalList.empty();
            carouselInner.empty();

            if (response.success && response.data.length > 0) {
                response.data.forEach((animal, index) => {
                    // Ajouter les animaux à la liste avec un attribut data-animal
                    animalList.append(`<li class="list-group-item animal-name" data-animal="${animal}">${animal}</li>`);

                    // Ajouter les images des animaux au carrousel
                    carouselInner.append(`
                        <div class="carousel-item ${index === 0 ? 'active' : ''}">
                            <img src="./media/images_animaux/${animal}.jpg" class="d-block w-100 img-fluid" alt="${animal}">
                        </div>
                    `);
                });
            } else {
                animalList.html('<li class="list-group-item text-muted">Aucun animal trouvé.</li>');
            }
        }).fail(function () {
            console.error(`Erreur lors du chargement des animaux pour l'enclos ${id_enclos}.`);
        });
    }

    // Gestion du clic sur le nom d'un animal pour afficher une description
    $(document).on('click', '.animal-name', function () {
        const animal = $(this).data('animal');

        // Charger la description de l'animal depuis le fichier
        $.get(`./media/descriptions/${animal}.txt`, function (data) {
            // Afficher la description dans le modal
            $('#animalDescriptionModalBody').html(data);
            $('#animalDescriptionModal').modal('show');
        }).fail(function () {
            $('#animalDescriptionModalBody').html("<p class='text-danger'>Description non disponible pour cet animal.</p>");
            $('#animalDescriptionModal').modal('show');
        });
    });

    // Fonction pour charger les avis d'un enclos
    function chargerAvis(id_enclos) {
        $.get('./back/api.php', { action: 'getAvis', id_enclos: id_enclos }, function (response) {
            const avisList = $(`#avis-list-${id_enclos}`);
            const averageNoteElement = $(`#average-note-${id_enclos}`);
            avisList.empty();

            if (response.success && response.data.length > 0) {
                let totalNotes = 0;

                response.data.forEach(avis => {
                    const commentaire = avis.commentaire || "Aucun commentaire";
                    const utilisateur = avis.utilisateur || "Anonyme";
                    const note = avis.note || 0;

                    totalNotes += parseFloat(note);

                    avisList.append(`
                        <li class="list-group-item">
                            <strong>Note :</strong> ${note}<br>
                            <strong>Commentaire :</strong> ${commentaire}<br>
                            <strong>Utilisateur :</strong> ${utilisateur}
                        </li>
                    `);
                });

                const averageNote = (totalNotes / response.data.length).toFixed(1);
                averageNoteElement.text(`- ${averageNote} / 5`);
            } else {
                avisList.html('<li class="list-group-item text-muted">Aucun commentaire pour l\'instant. N\'hésitez pas à être le premier ;)</li>');
                averageNoteElement.text('- Pas encore noté');
            }
        }).fail(function () {
            console.error(`Erreur lors du chargement des avis pour l'enclos ${id_enclos}.`);
        });
    }

    // Gérer l'ajout d'un avis
    $(document).on('click', '.btn-add-avis', function () {
        const id_enclos = $(this).data('id');
        const commentaire = $(`.commentaire[data-id="${id_enclos}"]`).val().trim();
        const note = parseInt($(`.note[data-id="${id_enclos}"]`).val(), 10);
        const userId = getUserId(); // Récupération du userId depuis le localStorage

        if (!commentaire || isNaN(note) || note < 1 || note > 5) {
            alert("Veuillez remplir correctement le commentaire et une note entre 1 et 5 avant d'envoyer.");
            return;
        }

        $.post('./back/api.php', {
            action: 'addAvis',
            commentaire: commentaire,
            note: note,
            id_enclos: id_enclos,
            userId: userId
        }, function (response) {
            if (response.success) {
                alert(response.message);
                chargerAvis(id_enclos);
                $(`.commentaire[data-id="${id_enclos}"]`).val('');
                $(`.note[data-id="${id_enclos}"]`).val('');
            } else {
                alert("Erreur lors de l'ajout de l'avis : " + response.error);
            }
        }).fail(function () {
            alert("Erreur réseau lors de l'ajout de l'avis.");
        });
    });

    // Charger le premier biome par défaut
    chargerEnclos(1);
    $('.biome-button[data-id="1"]').addClass('active');

    $('.biome-button').on('click', function () {
        const id_biome = $(this).data('id');
        $('.biome-button').removeClass('active');
        $(this).addClass('active');
        chargerEnclos(id_biome);
    });
});
