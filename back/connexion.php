<?php
header("Content-Type: application/json; charset=UTF-8");

// Connexion à la base de données
$server = "localhost";
$username = "root";
$password = "";
$databaseName = "projet_zoo";

$conn = new mysqli($server, $username, $password, $databaseName);

if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => 'Erreur de connexion à la base de données']);
    exit();
}

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Récupérer les données JSON envoyées
    $rawData = file_get_contents("php://input");
    $data = json_decode($rawData, true);

    if (isset($data['email'], $data['password']) && !empty($data['email']) && !empty($data['password'])) {
        $email = $data['email'];
        $password = $data['password'];

        // Exécuter directement la requête SQL
        $query = "SELECT id, prenom, nom, mdp FROM user WHERE email = '$email' LIMIT 1";
        $result = $conn->query($query);

        echo $result;

        if ($result && $result->num_rows > 0) {
            $user = $result->fetch_assoc();

            if ($password === $user['mdp']) { // Vérification simplifiée
                // Générer un token simple (encodage en base64)
                $token = base64_encode(json_encode([
                    'id' => $user['id'],
                    'prenom' => $user['prenom'],
                    'nom' => $user['nom'],
                    'email' => $email
                ]));

                echo json_encode(['status' => 'good', 'token' => $token]);
                exit();
            } else {
                // Mot de passe incorrect
                echo json_encode(['status' => 403, 'message' => 'Mot de passe incorrect.']);
                exit();
            }
        } else {
            // Utilisateur non trouvé
            echo json_encode(['status' => 403, 'message' => 'Utilisateur non trouvé.']);
            exit();
        }
    } else {
        // Champs manquants
        echo json_encode(['status' => 403, 'message' => 'Veuillez remplir tous les champs.']);
        exit();
    }
} else {
    echo json_encode(['status' => 403, 'message' => 'Requête non autorisée.']);
}

$conn->close();

?>
