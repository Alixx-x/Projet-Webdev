<?php
// Connexion à la base de données
$host = 'localhost';
$dbname = 'projet_zoo';
$username = 'root';
$password = '';

header('Content-Type: application/json');

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'error' => "Erreur de connexion : " . $e->getMessage()]);
    exit;
}

// Vérification de l'action
if (!isset($_POST['action'])) {
    echo json_encode(['success' => false, 'error' => "Aucune action spécifiée."]);
    exit;
}

$action = $_POST['action'];

// Gestion des actions
if ($action === 'get_enclos') {
    try {
        $sql = "SELECT e.id_enclos, e.status FROM enclos e";
        $stmt = $pdo->prepare($sql);
        $stmt->execute();
        $enclos = $stmt->fetchAll(PDO::FETCH_ASSOC);

        foreach ($enclos as &$enclosRow) {
            $id_enclos = $enclosRow['id_enclos'];

            // Récupérer les animaux
            $sql_animaux = "SELECT nom FROM animaux WHERE id_enclos = :id_enclos";
            $stmt_animaux = $pdo->prepare($sql_animaux);
            $stmt_animaux->execute(['id_enclos' => $id_enclos]);
            $enclosRow['animaux'] = $stmt_animaux->fetchAll(PDO::FETCH_ASSOC);

            // Récupérer les horaires
            $sql_horaires = "SELECT date_repas, heure_repas 
                             FROM horaire_repas 
                             WHERE id_enclos = :id_enclos
                             ORDER BY date_repas, heure_repas";
            $stmt_horaires = $pdo->prepare($sql_horaires);
            $stmt_horaires->execute(['id_enclos' => $id_enclos]);
            $horaires = $stmt_horaires->fetchAll(PDO::FETCH_ASSOC);

            $enclosRow['horaires_repas'] = array_map(function ($horaire) {
                return $horaire['date_repas'] . ' ' . $horaire['heure_repas'];
            }, $horaires);
        }

        echo json_encode(['success' => true, 'data' => $enclos]);
    } catch (PDOException $e) {
        echo json_encode(['success' => false, 'error' => "Erreur SQL : " . $e->getMessage()]);
    }
    exit;
}

if ($action === 'get_animaux') {
    try {
        $sql = "SELECT id_animaux, nom, id_enclos FROM animaux ORDER BY nom ASC";
        $stmt = $pdo->prepare($sql);
        $stmt->execute();
        $animaux = $stmt->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode(['success' => true, 'data' => $animaux]);
    } catch (PDOException $e) {
        echo json_encode(['success' => false, 'error' => "Erreur SQL : " . $e->getMessage()]);
    }
    exit;
}

if ($action === 'add_horaire') {
    $id_enclos = isset($_POST['id_enclos']) ? (int)$_POST['id_enclos'] : null;
    $heure_repas = $_POST['heure_repas'] ?? null;
    $date_repas = $_POST['date_repas'] ?? null;

    if (!$id_enclos || !$heure_repas || !$date_repas) {
        echo json_encode(['success' => false, 'error' => "Données manquantes pour ajouter l'horaire."]);
        exit;
    }

    try {
        $sql = "INSERT INTO horaire_repas (id_enclos, heure_repas, date_repas)
                VALUES (:id_enclos, :heure_repas, :date_repas)";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([
            'id_enclos' => $id_enclos,
            'heure_repas' => $heure_repas,
            'date_repas' => $date_repas
        ]);

        echo json_encode(['success' => true, 'message' => "Horaire ajouté avec succès."]);
    } catch (PDOException $e) {
        echo json_encode(['success' => false, 'error' => "Erreur SQL : " . $e->getMessage()]);
    }
    exit;
}

if ($action === 'delete_horaire') {
    $id_enclos = isset($_POST['id_enclos']) ? (int)$_POST['id_enclos'] : null;
    $heure_repas = $_POST['heure_repas'] ?? null;
    $date_repas = $_POST['date_repas'] ?? null;

    if (!$id_enclos || !$heure_repas || !$date_repas) {
        echo json_encode(['success' => false, 'error' => "Données manquantes pour supprimer l'horaire."]);
        exit;
    }

    try {
        $sql = "DELETE FROM horaire_repas 
                WHERE id_enclos = :id_enclos AND heure_repas = :heure_repas AND date_repas = :date_repas";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([
            'id_enclos' => $id_enclos,
            'heure_repas' => $heure_repas,
            'date_repas' => $date_repas
        ]);

        echo json_encode(['success' => true, 'message' => "Horaire supprimé avec succès."]);
    } catch (PDOException $e) {
        echo json_encode(['success' => false, 'error' => "Erreur SQL : " . $e->getMessage()]);
    }
    exit;
}

if ($action === 'update_status') {
    $id_enclos = isset($_POST['id_enclos']) ? (int)$_POST['id_enclos'] : null;
    $status = $_POST['status'] ?? null;

    if (!$id_enclos || !in_array($status, ['open', 'close'])) {
        echo json_encode(['success' => false, 'error' => "Données invalides pour mettre à jour le statut."]);
        exit;
    }

    try {
        $sql = "UPDATE enclos SET status = :status WHERE id_enclos = :id_enclos";
        $stmt = $pdo->prepare($sql);
        $stmt->execute(['status' => $status, 'id_enclos' => $id_enclos]);

        echo json_encode(['success' => true, 'message' => "Statut mis à jour avec succès."]);
    } catch (PDOException $e) {
        echo json_encode(['success' => false, 'error' => "Erreur SQL : " . $e->getMessage()]);
    }
    exit;
}

// Modifier l'enclos d'un animal
if ($action === 'update_animal_enclos') {
    $id_animaux = isset($_POST['id_animaux']) ? (int)$_POST['id_animaux'] : null;
    $new_enclos = isset($_POST['new_enclos']) ? (int)$_POST['new_enclos'] : null;

    if (!$id_animaux || !$new_enclos) {
        echo json_encode(['success' => false, 'error' => "Données manquantes ou invalides."]);
        exit;
    }

    try {
        $sql = "UPDATE animaux SET id_enclos = :new_enclos WHERE id_animaux = :id_animaux";
        $stmt = $pdo->prepare($sql);
        $stmt->execute(['new_enclos' => $new_enclos, 'id_animaux' => $id_animaux]);

        echo json_encode(['success' => true, 'message' => "L'animal a été déplacé avec succès."]);
    } catch (PDOException $e) {
        echo json_encode(['success' => false, 'error' => "Erreur SQL : " . $e->getMessage()]);
    }
    exit;
}



// Action non reconnue
echo json_encode(['success' => false, 'error' => "Action non valide : " . htmlspecialchars($action)]);
?>
