<?php
header("Content-Type: application/json; charset=UTF-8");

// Activer les rapports d'erreurs pour le débogage (à désactiver en production)
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$response = [];

try {
    // Connexion à la base de données
    $conn = new mysqli("localhost", "root", "", "projet_zoo"); // Corrigez le nom si besoin 
    if ($conn->connect_error) {
        throw new Exception("Erreur de connexion à la base de données : " . $conn->connect_error);
    }

    if ($_SERVER["REQUEST_METHOD"] === "POST") {
        $email = isset($_POST['email']) ? $conn->real_escape_string($_POST['email']) : '';
        $password = isset($_POST['password']) ? $_POST['password'] : '';

        if (!empty($email) && !empty($password)) {
            // Préparer la requête SQL
            $stmt = $conn->prepare("SELECT id_user AS id, role, mdp, prenom, nom FROM user WHERE email = ? LIMIT 1");
            if (!$stmt) {
                throw new Exception("Erreur lors de la préparation de la requête SQL : " . $conn->error);
            }

            $stmt->bind_param("s", $email);
            $stmt->execute();
            $result = $stmt->get_result();

            if ($result && $result->num_rows > 0) {
                $user = $result->fetch_assoc();

                // Vérification du mot de passe (remplacez par password_verify si nécessaire)
                if ($password === $user['mdp']) { // Utilisez password_verify si vous stockez des mots de passe hachés
                    $response = [
                        "success" => true,
                        "data" => [
                            "id" => $user['id'],
                            "role" => $user['role'],
                            "nom" => $user['nom'],
                            "prenom" => $user['prenom']
                        ]
                    ];
                } else {
                    $response = ["success" => false, "message" => "Mot de passe incorrect."];
                }
            } else {
                $response = ["success" => false, "message" => "Utilisateur non trouvé."];
            }
        } else {
            $response = ["success" => false, "message" => "Veuillez remplir tous les champs."];
        }
    } else {
        $response = ["success" => false, "message" => "Requête non autorisée."];
    }

    $conn->close();
} catch (Exception $e) {
    $response = ["success" => false, "message" => $e->getMessage()];
}

// Retourner la réponse JSON
echo json_encode($response);
exit;
?>
