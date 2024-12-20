<?php
header('Content-Type: application/json');

// Connexion à la base de données
$server = "localhost";
$username = "root";
$password = "";
$databaseName = "projet_zoo"; // Nom de la base de données
$conn = new mysqli($server, $username, $password, $databaseName);

// Vérification de la connexion
if ($conn->connect_error) {
    die(json_encode(["error" => "Connexion à la BDD échouée : " . $conn->connect_error]));
}

// Vérifier la méthode de la requête
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (!isset($_POST['animaux']) || empty($_POST['animaux'])) {
        echo json_encode(["error" => "Le champ 'animaux' est vide ou non défini."]);
        exit();
    }

    // Récupérer et échapper les données pour éviter les injections SQL
    $animal = $conn->real_escape_string($_POST['animaux']);

    // Requête SQL avec jointures pour récupérer les informations nécessaires
    $sql = "
        SELECT 
            a.nom AS animal_nom, 
            e.id_enclos AS enclos_id, 
            b.nom AS biome_nom, 
            GROUP_CONCAT(DISTINCT a2.nom SEPARATOR ', ') AS autres_animaux,
            CONCAT('./media/images_animaux/', a.nom, '.jpg') AS image_path,
            GROUP_CONCAT(DISTINCT CONCAT(hr.heure_repas, ' ', hr.date_repas) SEPARATOR ', ') AS horaires_repas
        FROM 
            animaux AS a
        INNER JOIN 
            enclos AS e ON a.id_enclos = e.id_enclos
        INNER JOIN 
            biome AS b ON e.id_biome = b.id_biome
        LEFT JOIN 
            animaux AS a2 ON a2.id_enclos = e.id_enclos AND a2.id_animaux != a.id_animaux
        LEFT JOIN 
            horaire_repas AS hr ON hr.id_enclos = e.id_enclos
        WHERE 
            a.nom LIKE '%$animal%'
        GROUP BY 
            a.id_animaux
    ";
    $result = $conn->query($sql);

    if ($result && $result->num_rows > 0) {
        $data = [];
        while ($row = $result->fetch_assoc()) {
            // Vérifier si le fichier image existe
            /*if (file_exists($row['image_path'])) {
                $image = $row['image_path'];
            } else {
                $image = null;
            }*/
            $image = $row['image_path'];

            $data[] = [
                "animal" => $row['animal_nom'],
                "enclos" => $row['enclos_id'],
                "biome" => $row['biome_nom'],
                "autres_animaux" => $row['autres_animaux'] ?: "Aucun autre animal",
                "horaires_repas" => $row['horaires_repas'] ?: "Pas d'horaires disponibles",
                "image" => $image,
            ];
        }
        echo json_encode($data);
    } else {
        echo json_encode(["error" => "Aucun animal trouvé pour cette recherche."]);
    }
} else {
    echo json_encode(["error" => "Requête invalide."]);
}

// Fermer la connexion
$conn->close();
