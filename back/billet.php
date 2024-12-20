<?php
// Paramètres de connexion à la base de données
$server = "localhost";
$username = "root";
$password = "";
$databaseName = "projet_zoo";

// Connexion à la base de données
$conn = new mysqli($server, $username, $password, $databaseName);

// Vérifier la connexion
if ($conn->connect_error) {
    die("La connexion à la base de données a échoué : " . $conn->connect_error);
}

// Vérifier si la requête est une méthode POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Récupérer les données envoyées depuis le formulaire
    $tadult = isset($_POST['tadult']) ? intval($_POST['tadult']) : 0;
    $tkid = isset($_POST['tkid']) ? intval($_POST['tkid']) : 0;
    $userId = isset($_POST['userId']) ? intval($_POST['userId']) : 0;

    // Vérifier si les données sont valides
    if ($userId <= 0) {
        echo "Erreur : ID utilisateur manquant ou invalide.";
        exit();
    }
    if ($tadult <= 0 && $tkid <= 0) {
        echo "Erreur : Aucun billet sélectionné.";
        exit();
    }

    // Préparer l'insertion dans la table "billets"
    $stmt = $conn->prepare("INSERT INTO billets (type, id_user) VALUES (?, ?)");
    if (!$stmt) {
        echo "Erreur lors de la préparation de la requête : " . $conn->error;
        exit();
    }

    // Insérer les billets adultes
    for ($i = 0; $i < $tadult; $i++) {
        $type = 'adulte';
        $stmt->bind_param("si", $type, $userId);
        $stmt->execute();
    }

    // Insérer les billets enfants
    for ($i = 0; $i < $tkid; $i++) {
        $type = 'enfant';
        $stmt->bind_param("si", $type, $userId);
        $stmt->execute();
    }

    // Fermer la déclaration
    $stmt->close();

    // Confirmation de l'achat
    echo "Vos billets ont été ajoutés avec succès !";
} else {
    // Message si l'accès au fichier n'est pas via POST
    echo "Erreur : méthode non autorisée.";
}

// Fermer la connexion
$conn->close();
?>
