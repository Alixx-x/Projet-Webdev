$(document).ready(function () {
    // Charger les enclos
    function loadEnclos() {
        console.log("Chargement des enclos...");
        $.post("./back/gestion.php", { action: 'get_enclos' }, function (response) {
            console.log("Réponse du serveur pour les enclos :", response);
            if (response.success) {
                let content = `
                    <table class="table table-bordered">
                        <thead>
                            <tr>
                                <th>ID Enclos</th>
                                <th>Animaux présents</th>
                                <th>Horaires prévus</th>
                                <th>Ajouter un horaire</th>
                                <th>Statut</th>
                            </tr>
                        </thead>
                        <tbody>`;
                response.data.forEach(enclos => {
                    const animaux = enclos.animaux.map(a => `<li>${a.nom}</li>`).join('');
                    const horaires = enclos.horaires_repas.map(h => {
                        const [date, time] = h.split(' ');
                        return `
                            <li>
                                ${h}
                                <button class="delete-horaire btn btn-danger btn-sm" 
                                        data-id="${enclos.id_enclos}" 
                                        data-date="${date}" 
                                        data-time="${time}">
                                    ×
                                </button>
                            </li>`;
                    }).join('');
                    const statusOptions = `
                        <select class="status-select form-select" data-id="${enclos.id_enclos}">
                            <option value="open" ${enclos.status === 'open' ? 'selected' : ''}>Ouvert</option>
                            <option value="close" ${enclos.status === 'close' ? 'selected' : ''}>Fermé</option>
                        </select>`;
    
                    content += `
                        <tr>
                            <td>${enclos.id_enclos}</td>
                            <td><ul>${animaux || '<em>Aucun animal</em>'}</ul></td>
                            <td><ul>${horaires || '<em>Pas de repas prévus</em>'}</ul></td>
                            <td>
                                <input type="time" class="new-heure-repas form-control mb-2" data-id="${enclos.id_enclos}">
                                <input type="date" class="new-date-repas form-control mb-2" data-id="${enclos.id_enclos}">
                                <button class="btn btn-success add-horaire" data-id="${enclos.id_enclos}">Ajouter</button>
                            </td>
                            <td>${statusOptions}</td>
                        </tr>`;
                });
                content += '</tbody></table>';
                $('#enclos-list').html(content);
            } else {
                $('#enclos-list').html(`<p class="text-danger">${response.error}</p>`);
            }
        }).fail(function (jqXHR, textStatus, errorThrown) {
            console.error("Erreur AJAX pour les enclos :", textStatus, errorThrown);
        });
    }
    

    // Charger les animaux
    function loadAnimaux() {
        console.log("Chargement des animaux...");
        $.post("./back/gestion.php", { action: 'get_animaux' }, function (response) {
            console.log("Réponse du serveur pour les animaux :", response);
            if (response.success) {
                let content = `
                    <table class="table table-bordered">
                        <thead>
                            <tr>
                                <th>ID Animal</th>
                                <th>Nom</th>
                                <th>Enclos</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>`;
                response.data.forEach(animal => {
                    content += `
                        <tr>
                            <td>${animal.id_animaux}</td>
                            <td>${animal.nom}</td>
                            <td>${animal.id_enclos}</td>
                            <td>
                                <input type="number" class="new-enclos form-control" data-id="${animal.id_animaux}" placeholder="N° enclos">
                                <button class="btn btn-warning move-animal" data-id="${animal.id_animaux}">Déplacer</button>
                            </td>
                        </tr>`;
                });
                content += '</tbody></table>';
                $('#animaux-list').html(content);
            } else {
                $('#animaux-list').html(`<p class="text-danger">${response.error}</p>`);
            }
        }).fail(function (jqXHR, textStatus, errorThrown) {
            console.error("Erreur AJAX pour les animaux :", textStatus, errorThrown);
        });
    }

    // Ajouter un nouvel horaire
    $(document).on('click', '.add-horaire', function () {
        const idEnclos = $(this).data('id');
        const heureRepas = $(`.new-heure-repas[data-id="${idEnclos}"]`).val();
        const dateRepas = $(`.new-date-repas[data-id="${idEnclos}"]`).val();

        if (!heureRepas || !dateRepas) {
            alert('Veuillez entrer une heure et une date valides.');
            return;
        }

        $.post("./back/gestion.php", {
            action: 'add_horaire',
            id_enclos: idEnclos,
            heure_repas: heureRepas,
            date_repas: dateRepas
        }, function (response) {
            console.log("Réponse ajout horaire :", response);
            if (response.success) {
                alert(response.message);
                loadEnclos(); // Recharger la liste des enclos
            } else {
                alert(`Erreur : ${response.error}`);
            }
        }).fail(function (jqXHR, textStatus, errorThrown) {
            console.error("Erreur AJAX pour ajouter un horaire :", textStatus, errorThrown);
        });
    });

    // Changer le statut d'un enclos
    $(document).on('change', '.status-select', function () {
        const idEnclos = $(this).data('id');
        const newStatus = $(this).val();

        $.post("./back/gestion.php", {
            action: 'update_status',
            id_enclos: idEnclos,
            status: newStatus
        }, function (response) {
            console.log("Réponse mise à jour statut :", response);
            if (response.success) {
                alert(`Statut de l'enclos ${idEnclos} mis à jour avec succès.`);
            } else {
                alert(`Erreur : ${response.error}`);
            }
        }).fail(function (jqXHR, textStatus, errorThrown) {
            console.error("Erreur AJAX pour mettre à jour le statut :", textStatus, errorThrown);
        });
    });

    $(document).on('click', '.delete-horaire', function () {
        const idEnclos = $(this).data('id');
        const dateRepas = $(this).data('date');
        const heureRepas = $(this).data('time');

        if (confirm(`Voulez-vous vraiment supprimer l'horaire ${dateRepas} ${heureRepas} ?`)) {
            $.post("./back/gestion.php", {
                action: 'delete_horaire',
                id_enclos: idEnclos,
                date_repas: dateRepas,
                heure_repas: heureRepas
            }, function (response) {
                if (response.success) {
                    alert(response.message);
                    loadEnclos(); // Recharger la liste des enclos
                } else {
                    alert(`Erreur : ${response.error}`);
                }
            }).fail(function (jqXHR, textStatus, errorThrown) {
                console.error("Erreur AJAX pour supprimer un horaire :", textStatus, errorThrown);
            });
        }
    });

    function moveAnimal(idAnimal, newEnclos) {
        $.post("./back/gestion.php", {
            action: 'update_animal_enclos',
            id_animaux: idAnimal,
            new_enclos: newEnclos
        }, function (response) {
            console.log("Réponse du serveur pour déplacer l'animal :", response);
            if (response.success) {
                alert(response.message);
                loadAnimaux(); // Recharger la liste des animaux après mise à jour
            } else {
                alert(`Erreur : ${response.error}`);
            }
        }).fail(function (jqXHR, textStatus, errorThrown) {
            console.error("Erreur AJAX pour déplacer l'animal :", textStatus, errorThrown);
        });
    }

    // Déplacer un animal en cliquant sur "Déplacer"
    $(document).on('click', '.move-animal', function () {
        const idAnimal = $(this).data('id');
        const newEnclos = $(`.new-enclos[data-id="${idAnimal}"]`).val();

        if (!newEnclos || isNaN(newEnclos)) {
            alert("Veuillez entrer un numéro d'enclos valide.");
            return;
        }

        moveAnimal(idAnimal, newEnclos);
    });

    $(document).on('keypress', '.new-enclos', function (e) {
        if (e.key === 'Enter') {
            const idAnimal = $(this).data('id'); // ID de l'animal
            const newEnclos = $(this).val(); // Nouvelle valeur de l'enclos

            if (!newEnclos || isNaN(newEnclos)) {
                alert("Veuillez entrer un numéro d'enclos valide.");
                return;
            }

            moveAnimal(idAnimal, newEnclos);
        }
    });


    // Gestion des onglets
    $('#enclos-tab').on('click', function () {
        loadEnclos();
    });

    $('#animaux-tab').on('click', function () {
        loadAnimaux();
    });

    // Charger les données initiales pour l'onglet actif
    loadEnclos();
});
