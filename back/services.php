<?php
// Connexion à la base de données
$host = '127.0.0.1';
$db = 'projet_zoo';
$user = 'root';
$pass = '';
$charset = 'utf8mb4';

$dsn = "mysql:host=$host;dbname=$db;charset=$charset";
$options = [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES => false,
];

try {
    $pdo = new PDO($dsn, $user, $pass, $options);
} catch (\PDOException $e) {
    echo "Erreur de connexion : " . $e->getMessage();
    exit;
}

// Récupérer les services pour le biome sélectionné
if (isset($_GET['id_biome'])) {
    $id_biome = (int)$_GET['id_biome'];
    $stmt = $pdo->prepare("SELECT DISTINCT nom FROM services WHERE id_biome = ?");
    $stmt->execute([$id_biome]);
    $services = $stmt->fetchAll();

    // Liste des icônes associées aux services
    $icons = [
        'Boutique' => 'bi bi-bag-fill',
        'Café Nomade' => 'bi-egg-fried',
        'Espace Pique-Nique' => 'bi-hdmi-fill',
        'Gare' => 'bi-train-front',
        'Lodge' => 'bi-house',
        'Paillote' => 'bi-house-door-fill',
        'Petit Café' => 'bi-cup-hot-fill',
        'Plateau des jeux' => 'bi-dice-2-fill',
        'Point d\'eau' => 'bi-water',
        'Point de vue' => 'bi-binoculars',
        'Restaurant' => 'bi-shop',
        'Tente pédagogique' => 'bi-houses-fill',
        'Toilettes' => 'bi-badge-wc-fill',
    ];

    if ($services) {
        echo "<div class='services-list'>";
        foreach ($services as $service) {
            $nom = htmlspecialchars($service['nom']);
            $icon = $icons[$nom] ?? 'bi-star'; // Icône par défaut si non trouvée
            echo "
                <div class='service-card'>
                    <i class='bi $icon icon'></i>
                    <h3>$nom</h3>
                </div>
            ";
        }
        echo "</div>";
    } else {
        echo "<p>Aucun service trouvé pour ce biome.</p>";
    }
} else {
    echo "<p>Veuillez sélectionner un biome.</p>";
}
?>
