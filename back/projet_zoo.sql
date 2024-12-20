-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : ven. 22 nov. 2024 à 09:42
-- Version du serveur : 8.3.0
-- Version de PHP : 8.2.18

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `projet zoo`
--

-- --------------------------------------------------------

--
-- Structure de la table `animaux`
--

DROP TABLE IF EXISTS `animaux`;
CREATE TABLE IF NOT EXISTS `animaux` (
  `id_animaux` int NOT NULL AUTO_INCREMENT,
  `nom` text NOT NULL,
  `id_enclos` int NOT NULL,
  `description` text NOT NULL,
  PRIMARY KEY (`id_animaux`),
  KEY `id_enclos` (`id_enclos`)
) ENGINE=MyISAM AUTO_INCREMENT=71 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `animaux`
--

INSERT INTO `animaux` (`id_animaux`, `nom`, `id_enclos`, `description`) VALUES
(1, 'Rhinocéros', 1, ''),
(2, 'Oryx beisa', 1, ''),
(3, 'Gnou', 1, ''),
(4, 'Suricate', 2, ''),
(5, 'Fennec', 3, ''),
(6, 'Coati', 4, ''),
(7, 'Saïmiri', 4, ''),
(8, 'Tapir', 5, ''),
(9, 'Gazelle', 6, ''),
(10, 'Autruche', 6, ''),
(11, 'Guépard', 7, ''),
(12, 'Casoar', 8, ''),
(13, 'Crocodile nain', 9, ''),
(14, 'Lion', 10, ''),
(15, 'Hippopotame', 11, ''),
(16, 'Zèbre', 12, ''),
(17, 'Hyène', 13, ''),
(18, 'Loup à crinière', 14, ''),
(19, 'Girafe', 15, ''),
(20, 'Eléphant', 16, ''),
(21, 'Varan de Komodo', 17, ''),
(22, 'Grivet Cercophitèque', 18, ''),
(23, 'Ouistiti ', 19, ''),
(24, 'Gibbon', 22, ''),
(25, 'Tamarin ', 20, ''),
(26, 'Capucin', 21, ''),
(27, 'Panthère', 23, ''),
(28, 'Grand Hocco', 24, ''),
(29, 'Ara perroquet', 25, ''),
(30, 'Panda roux', 26, ''),
(31, 'Chèvre naine', 27, ''),
(32, 'Lémurien', 28, ''),
(33, 'Tortue', 29, ''),
(34, 'Mouflon', 30, ''),
(35, 'Binturong', 31, ''),
(36, 'Loutre', 31, ''),
(37, 'Macaque Crabier', 32, ''),
(38, 'Cerf', 33, ''),
(39, 'Vautour', 34, ''),
(40, 'Antilope', 35, ''),
(41, 'Daim', 35, ''),
(42, 'Nilgaut', 35, ''),
(43, 'Loup d\'Europe', 36, ''),
(44, 'Dromadaire', 37, ''),
(45, 'Âne de Provence', 37, ''),
(46, 'Bison', 38, ''),
(47, 'Porc-épic', 39, ''),
(48, 'Émeu', 40, ''),
(49, 'Wallaby', 40, ''),
(50, 'Flamant rose', 41, ''),
(51, 'Nandou', 41, ''),
(52, 'Tamanoir', 41, ''),
(53, 'Pécari', 42, ''),
(54, 'Tortue', 43, ''),
(55, 'Ibis', 43, ''),
(56, 'Oryx algazelle', 44, ''),
(57, 'Watusi', 44, ''),
(58, 'Âne de Somalie', 44, ''),
(59, 'Yack', 45, ''),
(60, 'Mouton Noir', 45, ''),
(61, 'Cigogne', 46, ''),
(62, 'Chien des buissons', 47, ''),
(63, 'Tigre', 48, ''),
(64, 'Serval', 49, ''),
(65, 'Lynx', 50, ''),
(66, 'Python', 52, ''),
(67, 'Tortue', 52, ''),
(68, 'Iguane', 52, ''),
(69, 'Cercopithèque', 18, ''),
(70, 'Marabout', 46, '');

-- --------------------------------------------------------

--
-- Structure de la table `avis`
--

DROP TABLE IF EXISTS `avis`;
CREATE TABLE IF NOT EXISTS `avis` (
  `id` int NOT NULL AUTO_INCREMENT,
  `note` int NOT NULL,
  `commentaire` text,
  `id_user` int NOT NULL,
  `id_enclos` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_user` (`id_user`),
  KEY `id_enclos` (`id_enclos`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `billets`
--

DROP TABLE IF EXISTS `billets`;
CREATE TABLE IF NOT EXISTS `billets` (
  `id_billet` int NOT NULL AUTO_INCREMENT,
  `type` enum('enfant','adulte') NOT NULL,
  `id_user` int DEFAULT NULL,
  PRIMARY KEY (`id_billet`),
  KEY `id_user` (`id_user`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `biome`
--

DROP TABLE IF EXISTS `biome`;
CREATE TABLE IF NOT EXISTS `biome` (
  `id_biome` int NOT NULL AUTO_INCREMENT,
  `nom` text NOT NULL,
  `couleur` text NOT NULL,
  PRIMARY KEY (`id_biome`)
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `biome`
--

INSERT INTO `biome` (`id_biome`, `nom`, `couleur`) VALUES
(1, 'Le Plateau', 'rouge'),
(2, 'Le Belvédère', 'gris'),
(3, 'Les Clairières', 'jaune'),
(4, 'Le Bois des pins', 'vert'),
(5, 'Le Vallon des cascades', 'bleu'),
(6, 'La Bergerie des reptiles', 'cyan'),
(7, 'Entrée', 'blanc');

-- --------------------------------------------------------

--
-- Structure de la table `enclos`
--

DROP TABLE IF EXISTS `enclos`;
CREATE TABLE IF NOT EXISTS `enclos` (
  `id_enclos` int NOT NULL AUTO_INCREMENT,
  `status` enum('open','close') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT 'open',
  `id_biome` int NOT NULL,
  PRIMARY KEY (`id_enclos`),
  KEY `id_biome` (`id_biome`)
) ENGINE=MyISAM AUTO_INCREMENT=52 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `enclos`
--

INSERT INTO `enclos` (`id_enclos`, `status`, `id_biome`) VALUES
(1, 'open', 2),
(2, 'open', 2),
(3, 'open', 2),
(4, 'open', 2),
(5, 'open', 2),
(6, 'open', 2),
(7, 'open', 2),
(8, 'open', 2),
(9, 'open', 2),
(10, 'open', 1),
(11, 'open', 1),
(12, 'open', 1),
(13, 'open', 1),
(14, 'open', 1),
(15, 'open', 1),
(16, 'open', 1),
(17, 'open', 1),
(18, 'open', 1),
(19, 'open', 1),
(20, 'open', 1),
(21, 'open', 1),
(22, 'open', 5),
(23, 'open', 5),
(24, 'open', 5),
(25, 'open', 5),
(26, 'open', 5),
(27, 'open', 5),
(28, 'open', 5),
(29, 'open', 5),
(30, 'open', 5),
(31, 'open', 4),
(32, 'open', 4),
(33, 'open', 4),
(34, 'open', 4),
(35, 'open', 4),
(36, 'open', 3),
(37, 'open', 3),
(38, 'open', 3),
(39, 'open', 3),
(40, 'open', 3),
(41, 'open', 3),
(42, 'open', 3),
(43, 'open', 3),
(44, 'open', 3),
(45, 'open', 3),
(46, 'open', 3),
(47, 'open', 3),
(48, 'open', 3),
(49, 'open', 3),
(50, 'open', 3),
(51, 'open', 6);

-- --------------------------------------------------------

--
-- Structure de la table `horaire_repas`
--

DROP TABLE IF EXISTS `horaire_repas`;
CREATE TABLE IF NOT EXISTS `horaire_repas` (
  `id_repas` int NOT NULL AUTO_INCREMENT,
  `heure_repas` text NOT NULL,
  `date_repas` text NOT NULL,
  `id_enclos` int NOT NULL,
  PRIMARY KEY (`id_repas`),
  KEY `id_enclos` (`id_enclos`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `images`
--

DROP TABLE IF EXISTS `images`;
CREATE TABLE IF NOT EXISTS `images` (
  `id_images` int NOT NULL AUTO_INCREMENT,
  `lien_images` varchar(255) NOT NULL,
  `id_animal` int DEFAULT NULL,
  PRIMARY KEY (`id_images`),
  KEY `fk_id_animal` (`id_animal`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `services`
--

DROP TABLE IF EXISTS `services`;
CREATE TABLE IF NOT EXISTS `services` (
  `id_service` int NOT NULL AUTO_INCREMENT,
  `nom` text NOT NULL,
  `id_biome` int DEFAULT NULL,
  PRIMARY KEY (`id_service`),
  KEY `id_biome` (`id_biome`)
) ENGINE=MyISAM AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `services`
--

INSERT INTO `services` (`id_service`, `nom`, `id_biome`) VALUES
(1, 'Café Nomade', 5),
(2, 'Point d\'eau', 5),
(3, 'Espace Pique-Nique', 5),
(4, 'Espace Pique-Nique', 5),
(5, 'Espace Pique-Nique', 5),
(6, 'Gare des cascades', 5),
(7, 'Point de vue', 2),
(8, 'Point de vue', 2),
(9, 'Point de vue', 2),
(10, 'Espace Pique-Nique', 1),
(11, 'Espace Pique-Nique', 1),
(12, 'Espace Pique-Nique', 1),
(13, 'Point d\'eau', 1),
(14, 'Point d\'eau', 1),
(15, 'Point de vue', 1),
(16, 'Toilettes', 1),
(17, 'Plateau des jeux', 1),
(18, 'Gare du plateau', 1),
(19, 'Lodge', 1),
(20, 'Paillote', 1),
(21, 'Tente pédagogique', 1),
(22, 'Point d\'eau', 3),
(23, 'Point d\'eau', 3),
(24, 'Point d\'eau', 3),
(25, 'Espace Pique-Nique', 3),
(26, 'Espace Pique-Nique', 3),
(27, 'Toilettes', 3),
(28, 'Restaurant du Parc', 7),
(29, 'Boutique', 7),
(30, 'Toilettes', 7),
(31, 'Petit Café', 7);

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `id_user` int NOT NULL AUTO_INCREMENT,
  `prenom` text NOT NULL,
  `nom` text NOT NULL,
  `email` text NOT NULL,
  `mdp` text NOT NULL,
  `role` enum('user','admin') NOT NULL DEFAULT 'user',
  PRIMARY KEY (`id_user`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `user`
--

INSERT INTO `user` (`id_user`, `prenom`, `nom`, `email`, `mdp`, `role`) VALUES
(1, 'Matteo', 'Revest', 'matteo810541@gmail.com', 'motdepasse', 'user'),
(2, 'Matteo', 'Revest', 'matteo810541@gmail.com', 'motdepasse', 'user'),
(3, 'Matteo', 'Revest', 'adresse@gmail.com', '$2y$10$QdcGQOsAMZfUHcVVIWkBbOu6GDRpkGnnnkePCR40mceJMzD/Pu7sy', 'user'),
(4, 'Matteo', 'Revest', 'adresse1@gmail.com', 'meurt', 'user'),
(5, 'Matteo', 'Revest', 'wolfblooder83390@gmail.com', 'motdepasse', 'user'),
(6, 'Berangere', 'Dejavu', 'adresse2@gmail.com', 'meurt', 'user');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
