<?php
// Connexion à la base de données
$server = "localhost";
$username = "root";
$password = "";
$databaseName = "projet_zoo";

$conn = new mysqli($server, $username, $password, $databaseName);

// Vérification de la connexion
if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "Erreur de connexion à la base de données."]);
    exit();
}

// Traitement du formulaire d'inscription
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nom = $conn->real_escape_string($_POST['nom']);
    $prenom = $conn->real_escape_string($_POST['prenom']);
    $email = $conn->real_escape_string($_POST['email']);
    $password = $_POST['password'];

    // Vérification de l'existence de l'email
    $sql = "SELECT id_user FROM user WHERE email = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows > 0) {
        echo json_encode(["success" => false, "message" => "Cet email est déjà utilisé."]);
        $stmt->close();
        $conn->close();
        exit();
    }
    // Insertion des données
    $sql = "INSERT INTO user (nom, prenom, email, mdp) VALUES (?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssss", $nom, $prenom, $email, $password);

    if ($stmt->execute()) {
        echo json_encode(["success" => true, "redirect" => "connexion.html"]);
    } else {
        echo json_encode(["success" => false, "message" => "Erreur lors de l'inscription."]);
    }

    $stmt->close();
    $conn->close();
}