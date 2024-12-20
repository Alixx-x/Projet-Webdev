<?php
header('Content-Type: application/json');

$server = "localhost";
$username = "root";
$password = "";
$databaseName = "projet_zoo";

function getMysqliConnection() {
    global $server, $username, $password, $databaseName;
    $conn = new mysqli($server, $username, $password, $databaseName);
    if ($conn->connect_error) {
        die(json_encode(['success' => false, 'error' => 'Erreur de connexion : ' . $conn->connect_error]));
    }
    return $conn;
}

function getPdoConnection() {
    global $server, $username, $password, $databaseName;
    try {
        $pdo = new PDO("mysql:host=$server;dbname=$databaseName;charset=utf8", $username, $password);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        return $pdo;
    } catch (PDOException $e) {
        die(json_encode(['success' => false, 'error' => 'Erreur de connexion : ' . $e->getMessage()]));
    }
}

$action = isset($_POST['action']) ? $_POST['action'] : (isset($_GET['action']) ? $_GET['action'] : null);

if (!$action) {
    echo json_encode(['success' => false, 'error' => 'Action non spécifiée.']);
    exit;
}

switch ($action) {
    case 'getEnclos':
        $id_biome = isset($_POST['id_biome']) ? intval($_POST['id_biome']) : 0;

        if ($id_biome <= 0) {
            echo json_encode(['success' => false, 'error' => "ID de biome invalide."]);
            exit;
        }

        $pdo = getPdoConnection();
        $stmt = $pdo->prepare("SELECT e.id_enclos, e.status, hr.heure_repas, hr.date_repas
                               FROM enclos e
                               LEFT JOIN horaire_repas hr ON e.id_enclos = hr.id_enclos
                               WHERE e.id_biome = :id_biome");
        $stmt->execute(['id_biome' => $id_biome]);
        $enclos = $stmt->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode(['success' => true, 'data' => $enclos]);
        break;

    case 'getAnimaux':
        $id_enclos = isset($_POST['id_enclos']) ? intval($_POST['id_enclos']) : 0;

        if ($id_enclos <= 0) {
            echo json_encode(['success' => false, 'error' => 'ID d\'enclos invalide.']);
            exit;
        }

        try {
            $pdo = getPdoConnection();
            $stmt = $pdo->prepare("SELECT nom FROM animaux WHERE id_enclos = :id_enclos");
            $stmt->execute(['id_enclos' => $id_enclos]);
            $animaux = $stmt->fetchAll(PDO::FETCH_COLUMN);

            echo json_encode(['success' => true, 'data' => $animaux]);
        } catch (PDOException $e) {
            echo json_encode(['success' => false, 'error' => $e->getMessage()]);
        }
        break;

    case 'getAvis':
        $id_enclos = isset($_GET['id_enclos']) ? intval($_GET['id_enclos']) : 0;

        if ($id_enclos <= 0) {
            echo json_encode(['success' => false, 'error' => 'ID d\'enclos invalide.']);
            exit;
        }

        $conn = getMysqliConnection();
        $stmt = $conn->prepare("
            SELECT a.note, a.commentaire, 
            CASE 
                WHEN u.id_user IS NULL THEN 'Anonyme' 
                ELSE CONCAT(u.prenom, ' ', LEFT(u.nom, 1), '.') 
            END AS utilisateur
            FROM avis a
            LEFT JOIN user u ON a.id_user = u.id_user
            WHERE a.id_enclos = ?
            ORDER BY a.id DESC
        ");
        $stmt->bind_param('i', $id_enclos);
        $stmt->execute();
        $result = $stmt->get_result();

        $avis = [];
        while ($row = $result->fetch_assoc()) {
            $avis[] = $row;
        }

        echo json_encode(['success' => true, 'data' => $avis]);
        break;

        case 'addAvis':
            $comment = isset($_POST['commentaire']) ? $_POST['commentaire'] : '';
            $userId = isset($_POST['userId']) && $_POST['userId'] !== 'null' ? intval($_POST['userId']) : null; // Gestion de null explicite
            $note = isset($_POST['note']) ? intval($_POST['note']) : 0;
            $id_enclos = isset($_POST['id_enclos']) ? intval($_POST['id_enclos']) : 0;
        
            if (empty($comment) || $note <= 0 || $id_enclos <= 0) {
                echo json_encode(['success' => false, 'error' => 'Paramètres invalides.']);
                exit;
            }
        
            $conn = getMysqliConnection();
            $stmt = $conn->prepare("INSERT INTO avis (note, commentaire, id_user, id_enclos) VALUES (?, ?, ?, ?)");
            $stmt->bind_param('isii', $note, $comment, $userId, $id_enclos);
        
            if ($stmt->execute()) {
                echo json_encode(['success' => true, 'message' => 'Avis ajouté avec succès.']);
            } else {
                echo json_encode(['success' => false, 'error' => $stmt->error]);
            }
            break;
        

}
?>
