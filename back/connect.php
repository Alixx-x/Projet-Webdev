<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Connexion</title>
</head>
<body>

    <?php
    session_start(); // Démarrer la session

    // Connexion à la base de données
    $server = "localhost";
    $username = "root";
    $password = "";
    $databaseName = "projet_zoo"; // Nom de la base de données

    $conn = new mysqli($server, $username, $password, $databaseName);

    // Vérification de la connexion
    if ($conn->connect_error) {
        die("Connexion à la base de données échouée : " . $conn->connect_error);
    }

    $message = ""; // Variable pour stocker les messages

    // Traitement du formulaire lors de la soumission
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        // Vérifier que les champs 'email' et 'password' sont définis et non vides
        if (!empty($_POST['email']) && !empty($_POST['password'])) {
            // Récupérer les données envoyées via POST
            $email = $_POST['email'];
            $password = $_POST['password'];

            // Requête pour récupérer l'utilisateur avec l'email donné
            $sql = "SELECT * FROM user WHERE email = '$email' LIMIT 1";
            $result = $conn->query($sql);

            if ($result && $result->num_rows > 0) {
                // L'email existe, vérifier le mot de passe
                $user = $result->fetch_assoc();

                if ($password == $user['mdp']) { // Comparaison directe du mot de passe
                    // Redirection vers une autre page
                    header("Location: ../profil.html");
                    exit();
                } else {
                    // Mot de passe incorrect
                    $message = "Mot de passe incorrect.";
                }
            } else {
                // L'email n'est pas trouvé dans la base de données
                $message = "Aucun utilisateur trouvé avec cet email.";
            }
        } else {
            $message = "Veuillez remplir tous les champs.";
        }
    }

    $conn->close();
    ?>

    <!-- Affichage du message d'erreur si la connexion échoue -->
    <?php if (!empty($message)): ?>
        <p style="color: red;">
            <?php echo $message; ?>
        </p>
    <?php endif; ?>

    