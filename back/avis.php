<?php
$server = "localhost";
$username = "root";
$password = "";
$databaseName = "projet_zoo";

// Connexion à la base de données
$conn = new mysqli($server, $username, $password, $databaseName);

// Vérifier la connexion
if ($conn->connect_error) {
    die(json_encode(['success' => false, 'error' => 'Erreur de connexion : ' . $conn->connect_error]));
}

// Gestion des requêtes POST : Ajout d'un avis
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $comment = isset($_POST['commentaire']) ? $_POST['commentaire'] : '';
    $userId = isset($_POST['userId']) ? intval($_POST['userId']) : 0;
    $note = isset($_POST['note']) ? intval($_POST['note']) : 0;
    $id_enclos = isset($_POST['id_enclos']) ? intval($_POST['id_enclos']) : 0;

    $stmt = $conn->prepare("INSERT INTO avis (note, commentaire, id_user, id_enclos) VALUES (?, ?, ?, ?)");

    if ($stmt) {
        $stmt->bind_param('isii', $note, $comment, $userId, $id_enclos);

        if ($stmt->execute()) {
            echo json_encode(['success' => true, 'message' => 'Avis ajouté avec succès.']);
        } else {
            echo json_encode(['success' => false, 'error' => $stmt->error]);
        }

        $stmt->close();
    } else {
        echo json_encode(['success' => false, 'error' => 'Erreur lors de la préparation de la requête : ' . $conn->error]);
    }
}

// Gestion des requêtes GET : Récupération des avis existants
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $id_enclos = isset($_GET['id_enclos']) ? intval($_GET['id_enclos']) : 0;

    $query = "
        SELECT 
            a.note, 
            a.commentaire, 
            CONCAT(u.prenom, ' ', LEFT(u.nom, 1), '.') AS utilisateur
        FROM avis a
        LEFT JOIN user u ON a.id_user = u.id_user
        WHERE a.id_enclos = ?
        ORDER BY a.id DESC
    ";


    $stmt = $conn->prepare($query);

    if ($stmt) {
        $stmt->bind_param('i', $id_enclos);
        $stmt->execute();
        $result = $stmt->get_result();

        $avis = [];
        while ($row = $result->fetch_assoc()) {
            $avis[] = $row;
        }

        echo json_encode($avis);
        $stmt->close();
    } else {
        echo json_encode(['success' => false, 'error' => 'Erreur lors de la récupération des avis : ' . $conn->error]);
    }
}

$conn->close();
?>
