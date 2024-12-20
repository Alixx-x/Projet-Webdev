document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("billetForm");
    const payButton = document.getElementById("payButton");
    const connectButton = document.getElementById("connectButton");

    // Vérifiez si l'utilisateur est connecté via sessionStorage
    const prenom = localStorage.getItem("userPrenom");
    const nom = localStorage.getItem("userNom");

    if (prenom && nom) {
        payButton.style.display = "inline-block";
        connectButton.style.display = "none";
    } else {
        payButton.style.display = "none";
        connectButton.style.display = "inline-block";
    }

    // Gestion des totaux
    function calculateTotal(inputId, price, displayId) {
        const input = document.getElementById(inputId);
        let value = parseInt(input.value, 10) || 0;

        if (value < 0) value = 0;
        if (value > 10) value = 10;

        input.value = value; 
        const total = value * price;
        const display = document.getElementById(displayId);
        display.textContent = total > 0 ? `${total}€` : "0€";
    }

    function calculateGrandTotal() {
        const adultTotal = parseInt(document.getElementById("adultTotal").textContent.replace("€", "")) || 0;
        const kidTotal = parseInt(document.getElementById("kidTotal").textContent.replace("€", "")) || 0;
        const grandTotal = adultTotal + kidTotal;

        const totalDisplay = document.getElementById("total");
        totalDisplay.textContent = `${grandTotal}€`;
    }

    document.getElementById("tadult").addEventListener("input", function () {
        calculateTotal("tadult", 20, "adultTotal");
        calculateGrandTotal();
    });

    document.getElementById("tkid").addEventListener("input", function () {
        calculateTotal("tkid", 12, "kidTotal");
        calculateGrandTotal();
    });

    form.addEventListener("submit", function (e) {
        e.preventDefault(); // Empêcher l'envoi classique du formulaire
    
        const userId = localStorage.getItem("userId"); // Récupérer l'ID utilisateur
        const tadult = document.getElementById("tadult").value;
        const tkid = document.getElementById("tkid").value;
    
        // Vérifier si l'utilisateur est connecté
        if (!userId) {
            alert("Vous devez être connecté pour effectuer cet achat.");
            return;
        }
    
        // Construire les données à envoyer
        const formData = new URLSearchParams();
        formData.append("userId", userId);
        formData.append("tadult", tadult);
        formData.append("tkid", tkid);
    
        // Envoyer les données via fetch
        fetch("./back/billet.php", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: formData.toString(),
        })
            .then((response) => response.text())
            .then((data) => {
                console.log("Réponse du serveur :", data);
                alert(data); // Affiche la réponse du serveur (confirmation ou erreur)
                if (data.includes("succès")) {
                    window.location.href = "billetterie.html"; // Redirection en cas de succès
                }
            })
            .catch((error) => {
                console.error("Erreur :", error);
                alert("Une erreur est survenue lors de l'envoi des données.");
            });
    });
});

