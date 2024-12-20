document.addEventListener("DOMContentLoaded", function () {
    const biomeSelect = document.getElementById("biome");
    const servicesContainer = document.getElementById("services-container");

    // Fonction pour charger les services
    const loadServices = (biomeId) => {
        fetch(`./back/services.php?id_biome=${biomeId}`)
            .then((response) => response.text())
            .then((data) => {
                servicesContainer.innerHTML = data;
            })
            .catch((error) => {
                servicesContainer.innerHTML = "<p>Une erreur est survenue. Veuillez réessayer.</p>";
                console.error("Erreur:", error);
            });
    };

    // Charger les services au chargement initial
    loadServices(biomeSelect.value);

    // Charger les services lors de la sélection d'un nouveau biome
    biomeSelect.addEventListener("change", function () {
        loadServices(biomeSelect.value);
    });
});
