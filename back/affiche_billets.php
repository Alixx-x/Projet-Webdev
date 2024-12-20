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
    die(json_encode(["error" => "Connexion à la base de données échouée : " . $conn->connect_error]));
}

// Vérifier si la requête est une méthode GET
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Récupérer l'ID utilisateur depuis les paramètres
    $userId = isset($_GET['userId']) ? intval($_GET['userId']) : 0;

    // Vérifier si l'ID utilisateur est valide
    if ($userId <= 0) {
        echo json_encode(["error" => "ID utilisateur invalide ou manquant."]);
        exit();
    }

    // Récupérer les billets de l'utilisateur
    $query = "SELECT type, COUNT(*) as count FROM billets WHERE id_user = ? GROUP BY type";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("i", $userId);
    $stmt->execute();
    $result = $stmt->get_result();

    // Vérifier s'il y a des billets
    if ($result->num_rows > 0) {
        $billets = [];
        while ($row = $result->fetch_assoc()) {
            $billets[] = $row;
        }
        echo json_encode($billets);
    } else {
        echo json_encode([]);
    }
} else {
    echo json_encode(["error" => "Méthode non autorisée."]);
}

// Fermer la connexion
$conn->close();
?>
